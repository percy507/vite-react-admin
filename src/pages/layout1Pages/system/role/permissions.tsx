import { Checkbox, Col, Row } from 'antd';

import styles from './style.module.less';

const permissions = [
  {
    label: '模块想休息休息',
    children: [
      ['[一级菜单]xx管理', '0020000'],
      [
        ['[二级菜单]用户管理', '0021000'],
        ['[按钮]导出xxx', '0021001'],
        ['[按钮]新增用户', '0021002'],
        ['[按钮]删除用户', '0021003'],
      ],
      [
        ['[二级菜单]角色管理', '0022000'],
        ['[按钮]新增角色', '0022001'],
        ['[字段]角色描述', '0022002'],
      ],
    ],
  },
  {
    label: '模块想休息休息',
    children: [
      ['[一级菜单]xx管理', '0030000'],
      [
        ['[二级菜单]用户管理', '0031000'],
        ['[按钮]导出xxx', '0031001'],
        ['[按钮]新增用户', '0031002'],
        ['[按钮]删除用户', '0031003'],
        ['[按钮]删除用户', '0031004'],
        ['[按钮]删除用户', '0031005'],
        ['[按钮]删除用户', '0031006'],
        ['[按钮]删除用户', '0031007'],
        ['[按钮]删除用户', '0031008'],
      ],
      [
        ['[二级菜单]角色管理', '0032000'],
        ['[按钮]新增角色', '0032001'],
        ['[字段]角色描述', '0032002'],
      ],
    ],
  },
  {
    label: '系统管理',
    children: [
      ['[一级菜单]系统管理', '0010000'],
      [
        ['[二级菜单]用户管理', '0011000'],
        ['[按钮]导出xxx', '0011001'],
        ['[按钮]新增用户', '0011002'],
        ['[按钮]删除用户', '0011003'],
      ],
      [
        ['[二级菜单]角色管理', '0012000'],
        ['[按钮]新增角色', '0012001'],
        ['[字段]角色描述', '0012002'],
      ],
    ],
  },
];

export const PermissionCheckboxGroup = () => {
  return (
    <Checkbox.Group className={styles.pgroup}>
      {permissions.map((el1, i1) => {
        return (
          <div className={styles.pgroupItem} key={i1}>
            <div className={styles.plabel}>{el1.label}</div>
            <div className={styles.pchildren}>
              {el1.children.map((el2, i2) => {
                const arr = Array.isArray(el2[0]) ? el2 : [el2];
                return (
                  <Row className={styles.pchildrenItem} key={i2}>
                    {arr.map((el3, i3) => {
                      return (
                        <Col span={8} key={i3}>
                          <Checkbox value={el3[1]}>{el3[0]}</Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
            </div>
          </div>
        );
      })}
    </Checkbox.Group>
  );
};
