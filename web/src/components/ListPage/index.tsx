import React from 'react';
import { CategoryArticles, Article } from '../../reducers/Article/domain';
import { List, Layout, Menu, Breadcrumb, Typography, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

const { Header, Content, Footer } = Layout;

export interface ListPageProps {
  category: string,
  articles: Array<Article>
}

function getAriticleUrl(article: Article) {
  const prefix = article.path.lastIndexOf(".")
  return article.path.substring(0, prefix)
}

const ListPage: React.FC<ListPageProps> = (props: ListPageProps) => {
  return (
    <Typography>
      <Title style={{textAlign:"center"}}>{props.category}</Title>
      <Paragraph strong>
      <List
        bordered
        dataSource={props.articles}
        renderItem={item => <List.Item>
          <List.Item.Meta 
            title={<Button type="link" href={getAriticleUrl(item)}>{item.title}</Button>}
          />
        </List.Item>}
      />
      </Paragraph>
    </Typography>
  );
}

export default ListPage;