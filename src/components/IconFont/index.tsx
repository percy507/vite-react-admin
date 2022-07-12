import { createFromIconfontCN } from '@ant-design/icons';

type IconFontProps = {
  type: string;
};

// iconfont.cn
const MyIcon = createFromIconfontCN({
  scriptUrl: '/iconfont.js',
});

export default function IconFont(props: IconFontProps) {
  return <MyIcon type={props.type} />;
}
