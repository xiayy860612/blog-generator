import React from 'react';
import { CategoryArticles } from '../../reducers/Article/domain';
import { List, Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

const { Header, Content, Footer } = Layout;

export interface ListPageProps {
  categoryArticles: CategoryArticles
}

const ListPage: React.FC<ListPageProps> = (props: ListPageProps) => {
  return (
    <Typography>
      <Title style={{textAlign:"center"}}>{props.categoryArticles.categoryKey}</Title>
      <Paragraph strong>
      <List
        bordered
        dataSource={props.categoryArticles.articles}
        renderItem={item => <List.Item>
          <List.Item.Meta 
            title={<Button type="link" href={item.path} target="_blank">{item.title}</Button>}
          />
        </List.Item>}
      />
      </Paragraph>
    </Typography>
  );
}

export default ListPage;