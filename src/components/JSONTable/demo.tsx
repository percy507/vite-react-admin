import { Input } from 'antd';
import { useState } from 'react';

import { JSONTable } from './index';

export const DemoJSONTable = () => ({
  title: 'JSONTable',
  desc: '用于将JSON数据以表格形式展示',
  children: <Demo />,
});

function Demo() {
  const [json, setJSON] = useState<string>(defaultJson);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', paddingRight: 10 }}>
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 24 }}
          value={json}
          onChange={(e) => setJSON(e.target.value)}
        />
      </div>
      <div style={{ width: '70%' }}>
        <JSONTable json={json} />
      </div>
    </div>
  );
}

const defaultJson = `{
  "errorCode": 0,
  "errorMessage": "操作成功",
  "data": {
    "pageNo": 1,
    "pageSize": 10,
    "total": 5,
    "list": [
      {
        "id": "1234123421341234",
        "accountName": "xxxx供应链管理有限公司",
        "accountNo": "330578924982173497129841",
        "unRelateNum": "4309",
        "acStatus": "正常",
        "updateTime": {
          "id": "1111111111115",
          "accountName": "jkjjkk有限公司",
          "accountNo": "3098890890809890000000691",
          "openBank": "中国建设银行",
          "totalNum": "40922"
        }
      },
      {
        "id": "1111111111114",
        "accountName": "xxx有限公司",
        "accountNo": "33050161709000000689",
        "openBank": "中国建设",
        "acStatus": "正常",
        "balance": ["aaaaaa", "14682673.55", "1468673.55"],
        "useBalance": "18673.55",
        "updateTime": "2022-11-44 13:33:54"
      },
      {
        "id": "1111111111113",
        "accountName": "杭州999有限公司",
        "accountNo": "33050161704700000417",
        "openBank": "中国建支行",
        "acStatus": "正常",
        "balance": "2428046.37",
        "updateTime": "2022-11-44 13:33:52"
      },
      {
        "id": "1111111111112",
        "accountName": "日技有限公司",
        "accountNo": "33050110245300001210",
        "openBank": "中国信息支行",
        "acStatus": "正常",
        "balance": "2122327",
        "updateTime": "2022-11-44 13:33:50"
      },
      {
        "id": "1111111111111",
        "accountName": "宁波休息休息有限公司",
        "accountNo": "33150198367900005898",
        "openBank": "xxxx营业部",
        "acStatus": "正常",
        "balance": "395922.92",
        "updateTime": "2022-11-44 15:09:37"
      }
    ],
    "current": 1
  },
  "success": true
}`;
