import React from 'react';
import Markdown from 'react-markdown';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import axios from "axios";
import { Typography, Layout, Menu, Breadcrumb, Space } from 'antd';
import ShareCommon from '../ShareCommon';
import Article from '../../reducers/Category/Article';
import BreadcrumbElement from '../BreadcrumbElement';

const { Header, Content, Footer } = Layout;

export interface SinglePageProps {
  article: Article
}

interface SinglePageState {
  content: string
}

class SinglePage extends React.Component<SinglePageProps, SinglePageState> {
  constructor(props: SinglePageProps) {
    super(props);
    this.state = {
      content: ""
    }
  }

  componentDidUpdate() {
    if (this.props.article.path === "" || this.state.content) {
      return
    }

    axios.get<string>(this.props.article.path)
      .then(response => {
        this.setState({
          content: response.data
        })
      });
  }

  render() {
    return (
      <Layout className="layout" style={{marginTop: 30}}>
        <Content>
          <Space direction="vertical">
            <BreadcrumbElement />
            <Typography>
              {/* <Title>{this.props.article.title}</Title> */}
              <Paragraph>
                <Markdown source={this.state.content} />
              </Paragraph>
            </Typography>
          </Space>
        </Content>
        <Footer>
          <ShareCommon />
        </Footer>
      </Layout>
        
      );
  }
}

export default SinglePage;