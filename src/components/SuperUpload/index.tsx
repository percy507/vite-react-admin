import 'cropperjs/dist/cropper.css';

import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Modal, Upload } from 'antd';
import { clsx } from 'clsx';
import Cropper from 'cropperjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import { requestUpload, requestUploadConfig } from '@/services/common';

// import { requestAliOSSUpload, useAliOSS } from './alioss';
// import { getAuthToken } from '@/utils/storage';
import styles from './style.module.less';

// 定义与后端约定的文件字段名称
const VALUE_URL = 'url';
const VALUE_NAME = 'name';

// 转换上传接口响应体为指定的数据格式
const resp2value = (res: any): ValueType => ({
  [VALUE_NAME]: res.data.image.filename,
  [VALUE_URL]: res.data.image.url,
});

export interface ValueType {
  [VALUE_URL]: string;
  [VALUE_NAME]: string;
}

export interface SuperUploadProps extends Omit<UploadProps, 'value' | 'onChange'> {
  value?: ValueType[];
  onChange?: (value: ValueType[]) => void;
  /** 是否显示上传文件的限制条件，默认false */
  showTips?: boolean;
  /** 自定义的上传按钮 */
  children?: React.ReactNode;
  /** 是否仅允许上传图片，默认false */
  onlyImage?: boolean;
  /** 单个文件的最大大小(单位字节)，默认20MB。 2MB = 2\*1024\*1024 字节 */
  maxFileSize?: number;
  /** 允许上传的图片数量，默认1 */
  maxFileNum?: number;
  /**
   * 允许上传的图片的宽高比例。如果该字段不为空且设置了onlyImage字段，则会触发裁剪图片的弹窗。
   * - string, 宽度x高度，eg: '300x150'
   * - number, 宽度/高度的结果，eg: 1.515
   */
  imageRatio?: number | string;
}

/**
 * 上传组件，功能清单：
 * 1. 支持限制文件数量、单个文件大小
 * 2. 支持图片裁剪
 * 3. 支持展示提示信息（支持的文件类型、文件数量、单个文件大小等）
 *
 * 上传方式
 * - 如果使用传统的上传接口，则需要配置 `requestUpload, requestUploadConfig`
 * - 如果使用 ali-oss，则需要配置 `requestAliOSSUpload, useAliOSS`
 */
export function SuperUpload(props: SuperUploadProps) {
  let {
    value = [],
    onChange = () => {},
    showTips,
    onlyImage,
    maxFileSize = 20 * 1024 * 1024,
    maxFileNum = 1,
    imageRatio,
    listType,
    accept,
    className,
    disabled,
    ...restProps
  } = props;

  if (onlyImage) accept = '.png, .jpg, .jpeg, .gif';
  if (typeof imageRatio === 'string') imageRatio = eval(imageRatio.replace('x', '/'));

  // const { customRequest } = useAliOSS();

  const allowCrop = imageRatio !== undefined;
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropModalVisible, setCropModalVisible] = useState<boolean>(false);
  const [cropFileName, setCropFileName] = useState<string>('');
  const [cropImageUrl, setCropImageUrl] = useState<string>();
  const [cropper, setCropper] = useState<Cropper>();
  const [uploading, setUploading] = useState<boolean>(false);

  const [innerFileList, setInnerFileList] = useState<UploadFile[]>([]);
  const prevValueRef = useRef<ValueType[]>([]);

  const onInnerChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const list: ValueType[] = [];
    fileList.forEach((file) => {
      if (file.status !== 'done') return;
      if (file.url) list.push({ [VALUE_NAME]: file.name, [VALUE_URL]: file.url });
      else if (file.response) {
        let val = resp2value(file.response);
        list.push(val);
        file.url = val[VALUE_URL];
      }
    });
    if (value?.length > 0 || list.length > 0) onChange(list);

    setInnerFileList(
      fileList.map((el) => {
        // 当文件在上传中时，禁用 antd Upload 组件默认的预览
        // 否则会过度占用内存（尤其是上传大文件时，容易让页面崩溃😅）
        if (el.status === 'uploading') delete el.originFileObj;
        return el;
      }),
    );
  };

  useEffect(() => {
    if (JSON.stringify(value) === JSON.stringify(prevValueRef.current)) return;
    // FIX: 在上传A文件的过程中，同时上传B文件，结果最后只显示最先完成上传的文件
    if (innerFileList.find((el) => el.status === 'uploading')) return;
    setInnerFileList(
      value.map((el, index) => ({
        ...{ uid: `${index}`, status: 'done', name: el[VALUE_NAME], url: el[VALUE_URL] },
      })),
    );
    prevValueRef.current = value;
  }, [value, innerFileList]);

  const initCropper = useCallback(() => {
    if (imageRef.current === null) return;
    setCropper(
      new Cropper(imageRef.current, {
        viewMode: 1,
        aspectRatio: (imageRatio as number) > 0 ? (imageRatio as number) : undefined,
        dragMode: 'move',
        toggleDragModeOnDblclick: false,
        autoCropArea: 1,
        cropBoxMovable: true,
        cropBoxResizable: true,
      }),
    );
  }, [imageRatio]);

  const handleImageCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        if (!blob) return;
        let req = requestUpload;
        // let req = requestAliOSSUpload;
        setUploading(true);
        req(new File([blob], cropFileName || 'unknown.png'))
          .then((res) => {
            const val = resp2value(res);
            onInnerChange({
              fileList: [
                ...innerFileList,
                {
                  uid: `${innerFileList.length}`,
                  status: 'done',
                  name: val[VALUE_NAME],
                  url: val[VALUE_URL],
                },
              ],
            });
            setCropModalVisible(false);
          })
          .finally(() => setUploading(false));
      }, 'image/png');
    }
  };

  const UploadTips = useCallback(() => {
    const tipMaxFileNum = `最多可以上传 ${maxFileNum} 份文件`;
    const tipAccept = `支持的格式: ${accept || '任意类型'}`;
    const tipMaxSize = `单个文件大小不能超过 ${maxFileSize / 1024 / 1024}MB`;

    return showTips ? (
      <div className={styles.showTips}>
        {[tipMaxFileNum, tipAccept, tipMaxSize]
          .filter((el) => !!el)
          .map((el) => {
            return <div key={el}>{el}</div>;
          })}
      </div>
    ) : null;
  }, [showTips, accept, maxFileSize, maxFileNum]);

  const uploadProps: UploadProps = {
    listType,
    accept,
    fileList: innerFileList,
    beforeUpload: async (file) => {
      if (maxFileSize && file.size > maxFileSize) {
        message.error('文件大小超过限制');
        return Upload.LIST_IGNORE;
      }
      if (onlyImage && allowCrop) {
        setCropModalVisible(true);
        setCropFileName(file.name);
        setCropImageUrl(URL.createObjectURL(file));
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange: onInnerChange,
    onPreview: (file) => window.open(file.url, '_blank'),
    onRemove: () => !disabled,
    headers: {
      // Authorization: getAuthToken(),
      // @ts-ignore
      'X-Requested-With': null,
    },
    ...restProps,
    ...requestUploadConfig(),
    // customRequest,
  };

  let children = props.children || <Button>上传</Button>;
  if (listType === 'picture-card') {
    children = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
  }

  return (
    <div
      className={clsx(styles.superUpload, className, {
        [styles.hideUploadBtn]: innerFileList.length >= maxFileNum,
        [styles.disabled]: disabled,
      })}>
      <Upload {...uploadProps}>{children}</Upload>
      <UploadTips />

      {allowCrop ? (
        <Modal
          title="图片裁剪"
          visible={cropModalVisible}
          onOk={handleImageCrop}
          onCancel={() => {
            // 当截图在上传中时，禁止关闭窗口
            if (uploading) return;
            setCropModalVisible(false);
          }}
          destroyOnClose
          maskClosable={false}
          okText="确认上传"
          okButtonProps={{ loading: uploading }}
          cancelText="取消"
          cancelButtonProps={{ disabled: uploading }}>
          <div>
            <img
              style={{ maxWidth: '100%' }}
              src={cropImageUrl}
              onLoad={initCropper}
              ref={imageRef}
              alt="图片"
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
