import { useState } from 'react';

import { EnumManager } from '@/components/EnumManager';

export const DemoEnumManager = () => ({
  title: 'EnumManager',
  desc: (
    <div>
      <div>
        (表单组件)本质上是一个与Select类似的选择器，只不过增加了对选项的增删改操作
      </div>
      <div>[TODO] 测试与 Form.Item 联动</div>
    </div>
  ),

  children: <Demo />,
});

function Demo() {
  const [value, setValue] = useState<string>();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 16 }}>商品类型: </div>
        <EnumManager
          value={value}
          onChange={(v) => setValue(v)}
          confirmDelete
          services={{
            get: { request: requestTypeList, params: { year: 2001 } },
            update: { request: requestEditType },
            delete: { request: requestDeleteType },
          }}
        />
      </div>
      <div style={{ marginTop: 20 }}>当前值：{JSON.stringify(value, null, 2)}</div>
    </div>
  );
}

let typeList = ['类型111', '类型222', '😂333333333'];

function requestTypeList(params) {
  console.log('requestTypeList params:', params);
  return new Promise((r) => setTimeout(() => r({ data: typeList }), 1000));
}

// 新增或更新类型
function requestEditType(params) {
  console.log('requestEditType params:', params);
  if (params.oldName) {
    typeList.forEach((el, index) => {
      if (el === params.oldName) typeList[index] = params.name;
    });
  } else typeList.push(params.name);
  return new Promise((r) => setTimeout(() => r({ data: null }), 500));
}

function requestDeleteType(params) {
  console.log('requestDeleteType params:', params);
  let index = typeList.findIndex((el) => el === params.name);
  typeList.splice(index, 1);
  return new Promise((r) => setTimeout(() => r({ data: null }), 500));
}
