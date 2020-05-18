import React from 'react';
import { Menu, Button } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Category from '../../reducers/Category/domain';


export interface CategoryListProps {
  categories: Array<Category>
}

const CategoryList: React.FC<CategoryListProps> = (props) => {
  const categories = props.categories.map((category) => {
    if (!category.children) {
      return []
    }

    const children = category.children.map((child) => {
      return (
        <Menu.Item key={child.key}>
          <a href={"/" + child.key + "/"}>{child.title}</a>
        </Menu.Item>
      )
    })
    
    return (
      <SubMenu key={category.key} title={category.title} >
        {children}
      </SubMenu>
    )
  })

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {categories}
    </Menu>
  );
}

export default CategoryList;