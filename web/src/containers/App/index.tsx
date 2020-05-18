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
import ListPage from '../../components/ListPage';
import SinglePage from '../../components/SinglePage';
import { dispatchGetAllArticlesAction } from '../../actions/Article';
import { CategoryArticles, Article } from '../../reducers/Article/domain';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface AppProps {
  match?: any,
  userInfo: UserInfo,
  menus: Array<Category>,
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

 getCategoryArticles(category: string): CategoryArticles {
    let articles: Array<Article> = this.props.articles
      .filter(v => v.categoryKey == category)
      .flatMap(v => v.articles)
    return {
      categoryKey: category,
      articles: articles
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
    const menus = this.props.menus;
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
                  <Route path="/:category(\w+[\w/]*\w+)/:article(\w+)" exact strict render={(routeProps) => {
                    return <SinglePage 
                      category={routeProps.match.params.category} 
                      article={routeProps.match.params.article} 
                    />
                  }} />
                  <Route path="/:category(\w+[\w/]*\w+)/" exact strict render={(routeProps) => {
                    return <ListPage categoryArticles={this.getCategoryArticles(routeProps.match.params.category)} />
                  }} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              {/* mv to Footer component */}
              <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <small className="text-muted">Copyright© 2018-2020 s2u2m</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <a href="http://www.miitbeian.gov.cn/">
                            <small className="text-muted">蜀ICP备18013492号</small>
                          </a>
                      </div>
                  </div>
              </div>
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
    menus: state.categories,
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
