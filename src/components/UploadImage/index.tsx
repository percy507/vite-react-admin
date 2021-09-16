import 'cropperjs/dist/cropper.css';

import { Button, message, Modal, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import classNames from 'classnames';
import Cropper from 'cropperjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { requestUploadImage } from '@/services/upload';
import { getImageAspect } from '@/utils';

// import { getAuthToken } from '@/utils/token';
import styles from './style.module.less';

type UploadValueItem = {
  id: string;
  name: string;
};

type UploadImageProps = {
  value?: UploadValueItem[];
  onChange?: (value: UploadValueItem[]) => void;
  className?: string;
  /** 是否显示上传文件的限制条件 */
  showTips?: boolean;
  /** 自定义的上传按钮 */
  children?: React.ReactNode;
  /** 允许上传图片的长宽尺寸。格式（宽x高，eg: 100x300） */
  imageAspect?: string;
  /** 单张图片的最大大小，单位字节。 2MB = 2*1024*1024字节 */
  maxFileSize?: number;
  /** 允许上传的图片数量 */
  maxFileNum?: number;
  /** 是否裁剪图片 */
  needCropImage?: boolean;
  /** 裁剪比例 */
  cropAspectRatio?: number;
} & UploadProps;

/**
 * 图片上传组件，功能清单：
 * 1. 支持图片类型、大小、以及长宽尺寸校验
 * 2. 支持图片裁剪
 */
export default function UploadImage(props: UploadImageProps) {
  const {
    value = [],
    onChange = () => {},
    showTips = false,
    children = <Button>上传</Button>,
    imageAspect,
    maxFileSize = 18 * 1024 * 1024,
    maxFileNum = 1,
    needCropImage = false,
    cropAspectRatio = 1,
    accept = 'image/png,image/jpg,image/jpeg',
    ...restProps
  } = props;
  const { className = '', disabled } = restProps;

  const imageRef = useRef<HTMLImageElement>(null);
  const [cropModalVisible, setCropModalVisible] = useState<boolean>(false);
  const [cropImageUrl, setCropImageUrl] = useState<string>();
  const [cropperInstance, setCropperInstance] = useState<Cropper>();
  const [uploading, setUploading] = useState<boolean>(false);

  const [innerFileList, setInnerFileList] = useState<UploadFile[]>([]);
  const prevValueRef = useRef<UploadValueItem[]>([]);

  const rootClassName = classNames(styles.uploadImage, {
    className: !!className,
    [styles.uploadImage__hideUploadBtn]: innerFileList.length >= maxFileNum,
    [styles.uploadImage__disabled]: disabled,
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
    (aspect: string) => {
      if (imageAspect && imageAspect !== aspect) {
        message.error(`请上传尺寸为${imageAspect}px的图片`);
        return true;
      }

      return false;
    },
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
        requestUploadImage({
          key: '49e27928735c3bd80e8aa27349a34c5b',
          image: blob,
        })
          .then(({ data }) => {
            console.log('uploadImage & crop Response:', data);

            if (data.url) {
              setCropModalVisible(false);
              setInnerFileList((prevState: any) => {
                const tempList = [...prevState];
                const originalFile = tempList.pop();
                return [
                  ...tempList,
                  {
                    uid: data.id,
                    name: originalFile?.name,
                    status: 'done',
                    response: { data },
                    thumbUrl: URL.createObjectURL(blob),
                  },
                ];
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
    if (isFileSizeError(file.size) || isImageAspectError(await getImageAspect(file))) {
      return Promise.reject();
    }

    if (needCropImage) {
      setCropModalVisible(true);
      setCropImageUrl(URL.createObjectURL(file));

      return Promise.reject();
    }

    return Promise.resolve();
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

    // this.setState({ fileList, value: tempFileList });
    setInnerFileList(fileList);
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
    const tipAccept = `支持的扩展名: ${accept
      .replace(/\b[^,]+?\//g, '.')
      .replace(/,/g, ', ')}`;
    const tipMaxSize = `单个图片大小不能超过 ${maxFileSize / 1024 / 1024}MB`;
    const tipMaxFileNum = maxFileNum > 1 ? `最多可以上传 ${maxFileNum} 份图片` : '';

    return showTips ? (
      <div className={styles.uploadImage__tips}>
        {`${tipAccept}; ${tipMaxSize}; ${tipMaxFileNum}`}
      </div>
    ) : null;
  }, [showTips, accept, maxFileSize, maxFileNum]);

  const uploadProps: UploadProps = {
    accept,
    fileList: innerFileList,
    beforeUpload: innerBeforeUpload,
    onChange: innerOnChange,
    onPreview: innerOnPreview,
    onRemove: innerOnRemove,
    headers: {
      // Authorization: getAuthToken(),
    },
    ...restProps,
  };

  useEffect(() => {
    if (value.length !== prevValueRef.current.length) {
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

  return (
    <div className={rootClassName}>
      <UploadTips />
      <Upload {...uploadProps}>{children}</Upload>

      <Modal
        title="图片裁剪"
        visible={cropModalVisible}
        onOk={handleImageCrop}
        onCancel={cancelImageCrop}
        destroyOnClose
        maskClosable={false}
        okText="确认上传"
        okButtonProps={{ loading: uploading }}
        cancelText="取消">
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
