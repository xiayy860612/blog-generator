import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import IndexPage from '../../components/IndexPage';
import UserInfoCard from '../../components/UserInfo';
import CategoryList from '../../components/Category';
import { connect } from 'react-redux';
import UserInfo from '../../reducers/UserInfo/domain';
import Category from '../../reducers/Category/domain';
import { AppState } from '../../reducers';
import { dispatchGetUserInfoAction } from '../../actions/UserInfo';
import { dispatchGetCategoriesAction } from '../../actions/Category';
import ListPage, { ListPageProps } from '../../components/ListPage';
import SinglePage, { SinglePageProps } from '../../components/SinglePage';
import { dispatchGetAllArticlesAction } from '../../actions/Article';
import { CategoryArticles, Article } from '../../reducers/Article/domain';
import FooterView from '../../components/Footer';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface AppProps {
  match?: any,
  userInfo: UserInfo,
  categories: Array<Category>,
  articles: Array<CategoryArticles>

  getUserInfoAction: any,
  getCategoriesAction: any,
  getArticlesAction: any
}

class App extends React.Component<AppProps> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  getCategoryArticles(categoryKey: string): ListPageProps {
    const category = this.props.categories
      .filter(v => v.children)
      .flatMap(v => v.children)
      .find(v => v?.key == categoryKey)
    if (!category) {
      return {
        category: "",
        categoryKey: "",
        articles: []
      }
    }

    let articles: Array<Article> = this.props.articles
      .filter(v => v.categoryKey == categoryKey)
      .flatMap(v => v.articles)
    return {
      category: category.title,
      categoryKey: categoryKey,
      articles: articles
    }
  }

  getCategoryArticle(categoryKey: string, articleKey: string): SinglePageProps {
    const category = this.props.categories
      .filter(v => v.children)
      .flatMap(v => v.children)
      .find(v => v?.key == categoryKey)
    if (!category) {
      return {
        category: "",
        categoryKey: categoryKey,
        article: {
          title: "",
          key: "",
          path: ""
        }
      }
    }

    const article: Article | undefined = this.props.articles
      .filter(v => v.categoryKey == categoryKey)
      .flatMap(v => v.articles)
      .find(a => a.key == articleKey)
    if (!article) {
      return {
        category: "",
        categoryKey: categoryKey,
        article: {
          title: "",
          key: "",
          path: ""
        }
      }
    }

    return {
      category: category.title,
      categoryKey: category.key,
      article: article
    }
  }

  componentDidMount() {
    this.props.getUserInfoAction()
    this.props.getCategoriesAction()
    this.props.getArticlesAction()
  }

  render() {
    const userInfoCardProps = this.props.userInfo;
    let userElement = <UserInfoCard {...userInfoCardProps} />;
    if (this.state.collapsed) {
      userElement = <div />;
    }
    const menus = this.props.categories;
    return (
      <Router>
        <Row>
        <Layout>
          <Sider
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} 
            // style={{
            //   overflow: 'auto',
            //   // position: 'fixed',
            //   backgroundColor: 'dark',
            //   height: '100%'
            // }}
          >
            {userElement}
            <CategoryList categories={menus} />
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px 0' }}>
              <div className="site-layout-backgroud">
                <Switch>
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/:category(\w+[\w/]*\w+)/:article(.+)" exact strict render={(routeProps) => {
                    return <SinglePage 
                      {...this.getCategoryArticle(routeProps.match.params.category, routeProps.match.params.article)}
                    />
                  }} />
                  <Route path="/:category(\w+[\w/]*\w+)/" exact strict render={(routeProps) => {
                    return <ListPage {...this.getCategoryArticles(routeProps.match.params.category)} />
                  }} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <FooterView />
            </Footer>
          </Layout>
        </Layout>
        </Row>
        
        </Router>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    userInfo: state.userInfo,
    categories: state.categories,
    articles: state.articles
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUserInfoAction: () => dispatch(dispatchGetUserInfoAction()),
    getCategoriesAction: () => dispatch(dispatchGetCategoriesAction()),
    getArticlesAction: () => dispatch(dispatchGetAllArticlesAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
