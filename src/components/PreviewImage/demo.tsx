import { PreviewImage } from './index';

export const DemoPreviewImage = () => ({
  title: 'PreviewImage',
  desc: (
    <div>
      预览图片(依赖{' '}
      <a
        href="https://github.com/MinJieLiu/react-photo-view"
        target="_blank"
        rel="noreferrer">
        react-photo-view
      </a>
      )
    </div>
  ),
  children: <Demo />,
});

function Demo() {
  const imgs = [
    'https://cdn.pixabay.com/photo/2022/05/22/07/39/climb-mountains-7212848__480.jpg',
    'https://cdn.pixabay.com/photo/2022/06/29/10/58/fox-7291456_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/03/30/13/16/betta-7101167_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/09/30/01/16/kitten-2801007__480.jpg',
  ];
  return (
    <div style={{ display: 'flex' }}>
      <PreviewImage
        thumbWidth={200}
        thumbHeight={120}
        imgs={imgs}
        style={{ marginRight: 30 }}
      />
      <PreviewImage imgs={imgs[0]} />
    </div>
  );
}
