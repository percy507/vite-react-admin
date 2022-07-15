import { styled } from '@stitches/react';
import { Button } from 'antd';
import { useState } from 'react';

import type { ValueType } from './index';
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
  marginBottom: 20,

  '& > div': {
    width: '50%',
  },
});

function Demo() {
  const [value, setValue] = useState<ValueType[]>([]);

  return (
    <div>
      <button
        style={{ marginBottom: 10 }}
        onClick={() => {
          setValue([
            {
              name: '1252748.png',
              url: 'https://i.ibb.co/pWqB5GQ/1252748.png',
            },
            {
              name: 'EL-INDIO-wanted.jpg',
              url: 'https://i.ibb.co/tH42wMx/EL-INDIO-wanted.jpg',
            },
            {
              name: 'milky-way-2750627.jpg',
              url: 'https://i.ibb.co/Rp0tDzT/milky-way-2750627.jpg',
            },
          ]);
        }}>
        给下方组件加载3条文件数据
      </button>
      <Wrapper>
        <SuperUpload
          name="image"
          maxFileNum={5}
          value={value}
          onChange={(val) => setValue(val)}>
          <Button>上传任意文件(最多五份)</Button>
        </SuperUpload>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </Wrapper>
      <Wrapper>
        <SuperUpload
          showTips
          name="image"
          onlyImage
          imageRatio="150x250"
          maxFileSize={20 * 1024 * 1024}
          maxFileNum={3}
          listType="picture-card"
        />

        <SuperUpload name="image" onlyImage imageRatio={-1}>
          <Button>上传图片（自由裁剪）</Button>
        </SuperUpload>
      </Wrapper>
    </div>
  );
}
