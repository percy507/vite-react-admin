import { styled } from '@stitches/react';
import { Button } from 'antd';

import { SuperUpload } from './index';

export const DemoSuperUpload = () => ({
  title: 'SuperUpload',
  desc: (
    <div>
      <div style={{ marginBottom: 10 }}>(表单组件)上传文件</div>
      <div>
        <div>1. 支持限制文件数量、单个文件大小</div>
        <div>2. 支持图片裁剪</div>
        <div>3. 支持展示提示信息（支持的文件类型、文件数量、单个文件大小等）</div>
      </div>
    </div>
  ),
  children: <Demo />,
});

const Wrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',

  '& > div': {
    width: '25%',
  },
});

function Demo() {
  return (
    <Wrapper>
      <SuperUpload name="image">
        <Button>上传图片</Button>
      </SuperUpload>

      <SuperUpload name="image" accept="*">
        <Button>上传任意文件</Button>
      </SuperUpload>

      <SuperUpload
        showTips
        name="file"
        imageAspect="150x250"
        listType="picture-card"
        maxFileSize={20 * 1024 * 1024}
      />

      <SuperUpload needCropImage>
        <Button>上传图片（自由裁剪）</Button>
      </SuperUpload>
    </Wrapper>
  );
}
