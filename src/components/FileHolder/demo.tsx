import { FileHolder } from './index';

export const DemoFileHolder = () => ({
  title: 'FileHolder',
  desc: '用来展示文件，支持下载文件和预览部分类型的文件',
  children: <Demo />,
});

function Demo() {
  return (
    <div>
      <FileHolder
        width={400}
        file={{
          fileName: '我是一张图片.jpeg',
          fileUrl:
            'https://pic.rmb.bdstatic.com/bjh/news/63c55daecde0a31b7436e0846154211c.jpeg',
        }}
      />
      <FileHolder
        width={300}
        file={{
          fileName: '乱七八糟的前端面经.pdf',
          fileUrl: 'https://xxx.pdf',
        }}
      />
      <FileHolder
        file={{
          fileName: '史诗级重要资料.zip',
          fileUrl: 'https://xxx.zip',
        }}
      />
      <FileHolder
        file={{
          fileName: '未知文件.ppp',
          fileUrl: 'https://xxx.ppp',
        }}
      />
    </div>
  );
}
