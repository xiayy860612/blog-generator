import React from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';


const MenuList: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <SubMenu key="sub1" title="Category 1" >
        <Menu.Item key="1">
          <span>nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span>nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span>nav 3</span>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default MenuList;