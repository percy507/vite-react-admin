// import request from '@/utils/request';

export function requestSayingList() {
  return new Promise<any>((r) => {
    setTimeout(() => {
      r({
        code: 1,
        msg: '数据返回成功！',
        data: [
          {
            content: '嫌贫爱富的人性本质推动着社会的发展',
            author: '',
          },
          {
            content: '人最好不要错过两样东西，最后一班回家的车和一个深爱你的人。',
            author: '',
          },
          {
            content: '我坚信属于的不会离开我！',
            author: '',
          },
          {
            content:
              '女人：漂泊时，不能失去自我；落寞时，不能没有闺蜜；恋爱和结婚则要与一个或一群男人斗智斗勇。',
            author: 'VILIN',
          },
          {
            content: '爱你的人没走远 安静的守在身边 等你有天发现',
            author: '小怪怪 丫头',
          },
          {
            content: 'Life is not all beer and skittles. \n人生并非尽是乐事。',
            author: '',
          },
          {
            content: 'Man Always Remember Love Because of Romance Over.',
            author: '',
          },
          {
            content:
              '快乐靠自己，没有谁能够同情和分担你的悲切；坚强靠自己，没有谁会怜悯你的懦弱；努力靠自己，没有谁会陪你原地停留。',
            author: '朵朵',
          },
          {
            content: '小时候说到梦想，整晚都不想睡觉。现在说到梦想，只想赶快睡觉。',
            author: '',
          },
          {
            content: '没有人关心你飞得多高，倒是有一群人，等着看你摔得多惨。',
            author: '',
          },
        ],
      });
    }, 1500);
  });
}
