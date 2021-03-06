export function requestData() {
  return new Promise((resolve) => resolve(landList));
}

export const landList = [
  {
    name: '备用地块111-9800',
    type: '住宅用地',
    district: '杭州市',
    useSize: '50亩以下',
    address: '杭州市滨江区江陵路33号附近',
    status: '未出让',
    link: 'https://720yun.com/t/b5vkbl77z7h?scene_id=86719291',
    paths: [
      [120.21310867363495, 30.20712698027955],
      [120.21847271708984, 30.207527282029915],
      [120.21871289814005, 30.205365652577946],
      [120.21350897538531, 30.20472516977736],
    ],
  },
  {
    name: '地块1204-xdsdf',
    type: '商服用地',
    district: '杭州市',
    useSize: '50-200亩',
    address: '杭州市滨江区丰二路与民和路路口',
    status: '已出让',
    link: 'https://720yun.com/t/bevkzbflOib?scene_id=85970175',
    paths: [
      [120.25033673641887, 30.22113754154232],
      [120.25522041777333, 30.22257862784363],
      [120.25482011602296, 30.215293135986993],
      [120.252658486571, 30.217694946489182],
      [120.25001649501858, 30.215373196337065],
    ],
  },
  {
    name: '杭州用地-666',
    type: '工业用地',
    district: '杭州市',
    useSize: '50亩以下',
    address: '杭州市滨江区丰二路与民和路路口',
    status: '已出让',
    link: 'https://720yun.com/t/bevkzbflOib?scene_id=85970175',
    paths: [
      [120.22081080288471, 30.22496848876614],
      [120.22262383272265, 30.226836458902188],
      [120.22471156405116, 30.225298130554854],
      [120.22317323570384, 30.22315545892821],
    ],
  },
  {
    name: '杭州鲁公社区333号用地',
    type: '住宅用地',
    district: '杭州市',
    useSize: '500亩以上',
    address: '杭州市西湖区钱塘大厦旁',
    status: '未出让',
    link: 'https://720yun.com/t/e3vkzbdws27?scene_id=86261682',
    paths: [
      [120.19159964911508, 30.250266897677655],
      [120.18762212596465, 30.248344428154954],
      [120.19352211863777, 30.245361285792143],
      [120.19458279147788, 30.24628937452724],
      [120.19498054379292, 30.247482631472366],
      [120.19418503916285, 30.248941056627515],
      [120.19166594116759, 30.250266897677655],
    ],
  },
  {
    name: '杭州未来大社区120号用地',
    type: '住宅用地',
    district: '杭州市',
    useSize: '50亩以下',
    address: '杭州市西湖区钱塘大厦旁',
    status: '已出让',
    link: 'https://720yun.com/t/e3vkzbdws27?scene_id=86261682',
    paths: [
      [120.24340545593478, 30.238291068113412],
      [120.24204694004031, 30.235724982534983],
      [120.24446207940824, 30.234517412851016],
      [120.24627343393419, 30.237385390850438],
    ],
  },
];
