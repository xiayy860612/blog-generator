import React from 'react';
import Markdown from 'react-markdown';
import { Article } from '../../reducers/Article/domain';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import axios from "axios";
import { Typography, Layout, Menu, Breadcrumb } from 'antd';
import ShareCommon from '../ShareCommon';

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
      <Layout className="layout">
        <Content>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <a href={"/" + this.props.categoryKey + "/"}>{this.props.category}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{this.props.article.title}</Breadcrumb.Item>
          </Breadcrumb> */}
          <Typography>
            {/* <Title>{this.props.article.title}</Title> */}
            <Paragraph>
              <Markdown source={this.state.content} />
            </Paragraph>
          </Typography>
        </Content>
        <Footer>
          <ShareCommon />
        </Footer>
      </Layout>
        
      );
  }
}

export default SinglePage;