import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import IndexPage from '../../components/IndexPage';
import UserInfoCard from '../../components/UserInfo';
import CategoryList, { CategoryListProps } from '../../components/Category';
import { connect } from 'react-redux';
import UserInfo from '../../reducers/UserInfo/domain';
import Category from '../../reducers/Category/Category';
import { AppState } from '../../reducers';
import { dispatchGetUserInfoAction } from '../../actions/UserInfo';
import { dispatchGetCategoriesAction } from '../../actions/Category';
import ListPage, { ListPageProps } from '../../components/ListPage';
import SinglePage, { SinglePageProps } from '../../components/SinglePage';
import FooterView from '../../components/Footer';
import 'antd/dist/antd.css';
import './index.css';
import Article from '../../reducers/Category/Article';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface AppProps {
  match?: any,
  userInfo: UserInfo,
  categories: Array<Category>,

  getUserInfoAction: any,
  getCategoriesAction: any
}

class App extends React.Component<AppProps> {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  getCategory(categoryPath: string): Category | undefined {
    const titles = categoryPath.split("/")
    let categories = this.props.categories
    let category = undefined;
    for(let title of titles) {
      if(categories.length == 0) {
        break
      }
      category = categories.find(c => c.title == title)
      categories = category?.children ?? []
    }

    return category
  }

  getCategoryArticle(categoryPath: string, articleKey: string): Article | undefined {
    const category = this.getCategory(categoryPath)
    if (!category || !category.articles) {
      return undefined
    }
    return category.articles.find(a => a.title == articleKey)
  }

  componentDidMount() {
    this.props.getUserInfoAction()
    this.props.getCategoriesAction()
  }

  render() {
    const userInfoCardProps = this.props.userInfo;
    let userElement = <UserInfoCard {...userInfoCardProps} />;
    if (this.state.collapsed) {
      userElement = <div />;
    }
    return (
      <Router>
        <Layout>
          <Sider
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} 
            style={{
              overflow: 'auto',
              position: 'fixed',
              height: '100%',
              left: 0
            }}
          >
            {userElement}
            <CategoryList categories={[...this.props.categories]} />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '0 16px 0' }}>
              <div className="site-layout-backgroud">
                <Switch>
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/:category(.+)/" exact strict render={(routeProps) => {
                    return <ListPage category={
                      this.getCategory(routeProps.match.params.category) ?? {
                        title: ""
                      }
                    } />
                  }} />
                  <Route path="/:category(.+)/:article" exact strict render={(routeProps) => {
                    return <SinglePage 
                      article={
                        this.getCategoryArticle(routeProps.match.params.category, routeProps.match.params.article) ?? {
                          title: "",
                          path: "",
                          update_time: 0
                        }
                      }
                    />
                  }} />
                  <Route render={() => {
                    return <div>Not Found</div>
                  }} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <FooterView />
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    userInfo: state.userInfo,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUserInfoAction: () => dispatch(dispatchGetUserInfoAction()),
    getCategoriesAction: () => dispatch(dispatchGetCategoriesAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
