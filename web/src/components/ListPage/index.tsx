import React from 'react';
import { List, Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Category from '../../reducers/Category/Category';
import { HomeOutlined } from '@ant-design/icons';
import BreadcrumbElement from '../BreadcrumbElement';

const { Header, Content, Footer } = Layout;

export interface ListPageProps {
  category: Category
}

enum ListItemType {
  CATEGORY,
  ARTICLE
}

interface ListItem {
  type: ListItemType
  title: string
}

function getListItems(category: Category): Array<ListItem> {
  const subCategories = category.children?.map(sub => {
    return {
      type: ListItemType.CATEGORY,
      title: sub.title
    }
  }) ?? []

  const articles = category.articles?.map(article => {
    return {
      type: ListItemType.ARTICLE,
      title: article.title
    }
  }) ?? []
  return [...subCategories, ...articles]
}

function getAriticleUrl(item: ListItem) {
  return item.type == ListItemType.CATEGORY ? item.title + "/" : item.title
}

const ListPage: React.FC<ListPageProps> = (props: ListPageProps) => {
  return (
    <Layout className="layout" style={{marginTop: 30}}>
        {/* <Header /> */}
        <Content>
          <BreadcrumbElement />
          <Typography>
            <Title style={{textAlign:"center"}}>{props.category.title}</Title>
            <Paragraph strong>
            <List
              bordered
              dataSource={getListItems(props.category)}
              renderItem={item => <List.Item>
                <List.Item.Meta 
                  title={<Button type="link" href={getAriticleUrl(item)}>{item.title}</Button>}
                />
              </List.Item>}
            />
            </Paragraph>
          </Typography>
        </Content>
      </Layout>
  );
}

export default ListPage;