import { isJsonString } from '@/utils';

import styles from './style.module.less';

export function JSONTable({ json = '[]' }: { json?: string }) {
  if (!isJsonString(json)) {
    return <div style={{ color: 'red' }}>无效的JSON字符串</div>;
  }

  let jsonData = JSON.parse(json);
  let result = table(jsonData);

  console.log('json ==>', jsonData);
  console.log('table ==>', result);

  return (
    <div className={styles.jsonTable}>
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
}

function whatType(val) {
  const str = Object.prototype.toString.call(val);
  const type = str.replace(/\[object\s+|\]/g, '');
  return type === 'Object' ? val.constructor.name : type;
}

function table(val) {
  let res = val;
  if (whatType(val) === 'Object') res = mapObject(val);
  else if (whatType(val) === 'Array') res = mapArray(val);
  return `<table>${res}</table>`;
}

function tr(...tds: string[]) {
  return `<tr>${tds.join('')}</tr>`;
}

function td(v, noGap = false) {
  return `<td ${noGap ? 'data-no-gap' : ''}>${v ?? '-'}</td>`;
}

function mapObject(obj) {
  let str = '';
  Object.entries(obj).forEach(([key, value]) => {
    if (['Object', 'Array'].includes(whatType(value))) {
      str += tr(td(key), td(table(value), true));
    } else {
      str += tr(td(key), td((value as any)?.toString()));
    }
  });
  return str;
}

function mapArray(arr) {
  let str = '';
  if (isObjectArr(arr)) {
    let keyMap = {};
    arr.forEach((el) => Object.keys(el).forEach((key) => (keyMap[key] = true)));
    let keys = Object.keys(keyMap);
    str += tr(...keys.map((key) => td(key)));
    arr.forEach((el) => {
      str += tr(...keys.map((key) => handleValue(el[key])));
    });
  } else {
    arr.forEach((el) => (str += handleValue(el)));
  }
  return str;
}

function handleValue(item) {
  let str = '';
  if (['Object', 'Array'].includes(whatType(item))) {
    str += td(table(item), true);
  } else {
    str += td(item?.toString());
  }
  return str;
}

function isObjectArr(arr: any[]) {
  return arr.every((el) => whatType(el) === 'Object');
}
