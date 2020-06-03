import React from 'react';
import { Menu, Button } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Category from '../../reducers/Category/Category';

export interface CategoryListProps {
  categories: Array<Category>
}

const CategoryList: React.FC<CategoryListProps> = (props) => {
  const categories = props.categories.map((category) => {
    let children: JSX.Element[] = []
    if (category.children) {
      const items = category.children.map((child) => {
        return (
          <Menu.Item key={child.title}>
            <a href={"/" + category.title + "/" + child.title + "/"}>{child.title}</a>
          </Menu.Item>
        )
      })
      children.push(...items)
    }

    if (category.articles) {
      const items = category.articles.map(article => {
        return (
          <Menu.Item key={article.title}>
            <a href={"/" + category.title + "/" + article.title}>{article.title}</a>
          </Menu.Item>
        )
      })
      children.push(...items)
    }
    
    return (
      <SubMenu key={category.title} title={category.title} >
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