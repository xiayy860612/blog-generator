import React from 'react';
import { Layout, List, Button, Typography, Tag, Card, Divider } from 'antd';
import Category from '../../reducers/Category/Category';
import Article, { getArticleHref, articleOrder } from '../../reducers/Category/Article';

const { Header, Content, Footer } = Layout;

export interface IndexPageProps {
  categories: Array<Category>
}

interface CategoryEx {
  category: Category,
  href: string
}

interface IndexPageViewModel {
  latest_articles: Array<Article>
  labels: Array<CategoryEx>
}

function getViewModel(categories: Array<Category>): IndexPageViewModel {
  let latest_articles: Array<Article> = []
  const excludeLabels = categories.map(category => category.title)
  const labels: Array<CategoryEx> = []
  const category_queue = categories.map<CategoryEx>(c => {
    return {
      category: c,
      href: "/" + c.title + "/"
    }
  })
  let cur_category = category_queue.pop()
  while(cur_category) {
    if (excludeLabels.indexOf(cur_category.category.title) == -1) {
      labels.push(cur_category)
    }

    if (cur_category.category.children) {
      const parentHref = cur_category.href
      const sub = cur_category.category.children.map(c => {
        return {
          category: c,
          href: parentHref + c.title + "/"
        }
      })
      category_queue.push(...sub)
    }
    if (cur_category.category.articles) {
      latest_articles.push(...cur_category.category.articles)
      latest_articles = latest_articles.sort(articleOrder).slice(0, Math.min(latest_articles.length, 7))
    }
    cur_category = category_queue.pop()
  }

  return {
    latest_articles,
    labels
  }
}

const IndexPage: React.FC<IndexPageProps> = (props: IndexPageProps) => {
    const viewModel = getViewModel(props.categories)
    const tags = viewModel.labels.map(label => {
      return <Tag><Button type="link" href={label.href}>{label.category.title}</Button></Tag>
    })
    return (
      <Layout className="layout" style={{marginTop: 30}}>
        {/* <Header /> */}
        <Content>
          
          <List
            bordered
            dataSource={viewModel.latest_articles}
            renderItem={item => <List.Item>
              <List.Item.Meta 
                title={<Button type="link" href={getArticleHref(item)}>{item.title}</Button>}
              />
            </List.Item>}
          />
          <Card title="标签" size="small">
            {tags}
          </Card>
        </Content>
      </Layout>
    );
  }

  export default IndexPage;