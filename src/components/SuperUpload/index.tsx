import 'cropperjs/dist/cropper.css';

import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import { clsx } from 'clsx';
import Cropper from 'cropperjs';
import { useCallback, useEffect, useRef, useState } from 'react';

import { requestUpload, requestUploadConfig } from '@/services/upload';
import { getImageAspect } from '@/utils';

// import { getAuthToken } from '@/utils/token';
import styles from './style.module.less';

type UploadValueItem = {
  id: string;
  name: string;
};

type SuperUploadProps = {
  value?: UploadValueItem[];
  onChange?: (value: UploadValueItem[]) => void;
  className?: string;
  /** 是否显示上传文件的限制条件 */
  showTips?: boolean;
  /** 自定义的上传按钮 */
  children?: React.ReactNode;
  /** 允许上传图片的长宽尺寸。格式（宽x高，eg: 100x300） */
  imageAspect?: string;
  /** 单张图片的最大大小，单位字节。 2MB = 2\*1024\*1024字节 */
  maxFileSize?: number;
  /** 允许上传的图片数量 */
  maxFileNum?: number;
  /** 是否裁剪图片 */
  needCropImage?: boolean;
  /** 裁剪比例 */
  cropAspectRatio?: number;
} & UploadProps;

/**
 * 上传组件，功能清单：
 * 1. 支持限制文件数量、单个文件大小
 * 2. 支持图片裁剪
 * 3. 支持展示提示信息（支持的文件类型、文件数量、单个文件大小等）
 */
export function SuperUpload(props: SuperUploadProps) {
  let {
    value = [],
    onChange = () => {},
    showTips = false,
    imageAspect,
    maxFileSize = 18 * 1024 * 1024,
    maxFileNum = 1,
    needCropImage = false,
    cropAspectRatio,
    accept = 'image/png,image/jpg,image/jpeg',
    listType,
    ...restProps
  } = props;
  const { className = '', disabled } = restProps;

  if (imageAspect) cropAspectRatio = eval(imageAspect.replace('x', '/'));

  const imageRef = useRef<HTMLImageElement>(null);
  const [cropModalVisible, setCropModalVisible] = useState<boolean>(false);
  const [cropImageUrl, setCropImageUrl] = useState<string>();
  const [cropperInstance, setCropperInstance] = useState<Cropper>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadName, setName] = useState<string>('');

  const [innerFileList, setInnerFileList] = useState<UploadFile[]>([]);
  const prevValueRef = useRef<UploadValueItem[]>([]);

  const rootClassName = clsx(styles.superUpload, className ? className : false, {
    [styles.hideUploadBtn]: innerFileList.length >= maxFileNum,
    [styles.disabled]: disabled,
  });

  // 判断文件大小限制是否正确
  const isFileSizeError = useCallback(
    (fileSize: number) => {
      if (maxFileSize && fileSize > maxFileSize) {
        message.error('文件大小超过限制');
        return true;
      }

      return false;
    },
    [maxFileSize],
  );

  // 判断图片尺寸是否正确
  const isImageAspectError = useCallback(
    (aspect: string) => imageAspect && imageAspect !== aspect,
    [imageAspect],
  );

  // 初始化图片裁剪器
  const initCropper = useCallback(() => {
    if (imageRef.current === null) return;

    setCropperInstance(
      new Cropper(imageRef.current, {
        viewMode: 1,
        aspectRatio: cropAspectRatio,
        dragMode: 'move',
        toggleDragModeOnDblclick: false,
        autoCropArea: 1,
        cropBoxMovable: true,
        cropBoxResizable: true,
      }),
    );
  }, [imageRef, cropAspectRatio]);

  // 确定裁剪图片，并执行上传逻辑
  const handleImageCrop = () => {
    if (cropperInstance) {
      cropperInstance.getCroppedCanvas().toBlob((blob) => {
        setUploading(true);

        requestUpload({
          key: '49e27928735c3bd80e8aa27349a34c5b',
          image: new File([blob!], uploadName || 'file.png'),
        })
          .then((res) => {
            console.log('superUpload & crop Response:', res);

            if (res?.data) {
              setCropModalVisible(false);
              setInnerFileList((prevState: any) => {
                const tempList = [...prevState];
                const originalFile = tempList.pop();
                const arr = [
                  ...tempList,
                  {
                    uid: res.data?.id,
                    id: res.data?.id,
                    name: originalFile?.name,
                    status: 'done',
                    response: { data: res.data },
                    thumbUrl: URL.createObjectURL(blob!),
                  },
                ];
                setTimeout(() => {
                  onChange(arr.map((el) => ({ id: el.id, name: el.name })));
                });
                return arr;
              });
            } else {
              message.error('图片上传失败');
            }
          })
          .finally(() => {
            setUploading(false);
          });
      }, 'image/jpeg');
    }
  };

  // 取消裁剪
  const cancelImageCrop = () => {
    setInnerFileList((prevState: any) => {
      const tempList = [...prevState];
      tempList.pop();
      return [...tempList];
    });

    setCropModalVisible(false);
  };

  const innerBeforeUpload = async (file: File) => {
    if (isFileSizeError(file.size)) {
      return Upload.LIST_IGNORE;
    }

    if (
      needCropImage ||
      (imageAspect && isImageAspectError(await getImageAspect(file)))
    ) {
      setName(file.name);
      setCropModalVisible(true);
      setCropImageUrl(URL.createObjectURL(file));
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const innerOnChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const tempFileList: UploadValueItem[] = [];

    fileList.forEach((file) => {
      if (file.status === 'done') {
        if (file.url) {
          tempFileList.push({ id: file.uid, name: file.name });
        } else if (file.response) {
          const { data } = file.response;
          tempFileList.push({ id: data.fileId, name: data.name });
        }
      }
    });

    if (value.length > 0 || tempFileList.length > 0) {
      onChange(tempFileList);
    }

    setInnerFileList(
      fileList.map((el) => {
        // 上传过程中，禁用 antd Upload 组件默认的预览
        if (el.status === 'uploading') delete el.originFileObj;
        return el;
      }),
    );
  };

  const innerOnPreview = (file: UploadFile) => {
    console.log('onPreview', file);
    window.open(file.response.data.url, '_blank');
  };

  const innerOnRemove = () => {
    const { disabled } = restProps;
    return !disabled;
  };

  const UploadTips = useCallback(() => {
    const tipMaxFileNum = `最多可以上传 ${maxFileNum} 份文件`;
    const tipAccept = `支持的格式: ${accept
      .replace(/\b[^,]+?\//g, '.')
      .replace(/,/g, ', ')}`;
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
    beforeUpload: innerBeforeUpload,
    onChange: innerOnChange,
    onPreview: innerOnPreview,
    onRemove: innerOnRemove,
    headers: {
      // Authorization: getAuthToken(),
      // @ts-ignore
      'X-Requested-With': null,
    },
    ...restProps,
    ...requestUploadConfig(),
  };

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(prevValueRef.current || '')) {
      const result: UploadFile[] = [];

      value.forEach((item) => {
        const url = item.id;

        result.push({
          uid: item.id,
          name: item.name,
          status: 'done',
          url,
          thumbUrl: url,
        });
      });

      setInnerFileList(result);
      prevValueRef.current = value;
    }
  }, [value]);

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
    <div className={rootClassName}>
      <Upload {...uploadProps}>{children}</Upload>
      <UploadTips />

      <Modal
        title="图片裁剪"
        visible={cropModalVisible}
        onOk={handleImageCrop}
        onCancel={cancelImageCrop}
        destroyOnClose
        maskClosable={false}
        okText="确认上传"
        okButtonProps={{ loading: uploading }}
        cancelText="取消"
      >
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
    </div>
  );
}
