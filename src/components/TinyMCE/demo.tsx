import { styled } from '@stitches/react';
import { Empty, Switch } from 'antd';
import { useState } from 'react';

import { TinyMCE } from './index';

export const DemoTinyMCE = () => ({
  title: 'TinyMCE',
  desc: (
    <div>
      <div>
        (表单组件)基于 <a href="https://www.tiny.cloud/docs/tinymce/6/">TinyMCE</a>{' '}
        的富文本编辑器
      </div>
      <div>
        本组件使用的是
        <a href="https://www.tiny.cloud/docs/tinymce/6/zip-install/">
          tinymce的zip包版本
        </a>
        （存放于public目录，并在index.html中引入tinymce.min.js脚本）
      </div>
      <div>[TODO] 测试与 Form.Item 联动</div>
    </div>
  ),
  children: <Demo />,
});

const PreWrapper = styled('pre', {
  width: 500,
  maxHeight: 500,
  overlay: 'auto',
  whiteSpace: 'break-spaces',
  padding: 10,
  background: '#fafafa',
});

function Demo() {
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState(initValue);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <span style={{ marginRight: 20 }}>
          <span>只读: </span>
          <Switch checked={readOnly} onChange={(v) => setReadOnly(v)} />
        </span>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 'calc(100% - 500px)' }}>
          {readOnly ? (
            TinyMCE.isEmpty(value) ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <TinyMCE value={value} readOnly />
            )
          ) : (
            <TinyMCE value={value} onChange={(val) => setValue(val)} />
          )}
        </div>
        <PreWrapper contentEditable>{value}</PreWrapper>
      </div>
    </div>
  );
}

const initValue = `<div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl ">
<p><strong>热化了！重庆浙江等多地40℃频现 &ldquo;蹲守式&rdquo;闷热超长在线</strong></p>
<p><span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">昨天南方大部地区热度依<span style="color: rgb(224, 62, 45);">旧不减，早晨5时25分左右，重庆</span>沙坪坝的最低气温为33℃，打破了当地有观测记录以来最低气温的最高纪录。白天，各地气温继续走高，截昨天至14时，重庆、贵州、浙江、江苏及上海一带部分地区气温已冲上40℃，其中上海<span style="color: rgb(224, 62, 45);">徐家汇站最高气温达到</span>40.9℃，追平1873年建站以来的历史最高气温纪录。</span></p>
</div>
<div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl ">
<p><img src="https://pic.rmb.bdstatic.com/bjh/news/63c55daecde0a31b7436e0846154211c.jpeg" alt="bqzp"></p>
<p>昨天，北京开启暴晒模式，热力满满。图：中国天气网王晓</p>
</div>
<div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl ">
<p>今起三天，副热带高压仍将&ldquo;赖着&rdquo;不走，江南、华南及重庆、四川等地高温继续&ldquo;上岗&rdquo;，特别是江浙沪及重庆等地，40℃及以上的高温频频现身。上述地区不仅白天热得疯狂，夜间也是热浪汹汹。</p>
</div>
<div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl ">
<p>其中今天白天，陕西南部、河南中南部、四川东部、重庆、江汉、江淮、江南、华南等地有35℃以上高温天气，安徽中南部、江苏中南部、上海、湖北、湖南中北部、江西、浙江、福建、四川东部、重庆、贵州东北部等地的部分地区最高气温37～39℃，江苏南部、浙江中北部、四川东南部、重庆、陕西南部等地局地可达40℃以上。</p>
</div>
<div class="index-module_textWrap_3ygOc index-module_newStyle_lg-fl ">
<p>省会级城市中，长沙、南昌、重庆等地，未来几天高温将天天见，夜温也可接近或超过30℃，再加上湿度较大，体感温度甚至可达50℃左右，体验全天候闷热。</p>
<p><span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">气象专家提醒，高温天气频繁出现，容易导致人体中暑，严重的还会导致热射病，危及生命。公众一旦出现头晕、恶心等中暑先兆，要及时妥善处理，避免情况恶化。</span></p>
</div>`;
