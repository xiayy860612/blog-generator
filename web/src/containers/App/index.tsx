import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import 'antd/dist/antd.css';
import './index.css';

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

  getCategoryArticles(categoryPath: string): ListPageProps {
    const categories = categoryPath.split("/", 2)
    const category = this.props.categories
      .filter(c => c.title == categories[0])
      .flatMap(c => c.children)
      .find(c => c?.title == categories[1])
    if (!category) {
      return {
        category: "",
        articles: []
      }
    }

    let articles: Array<Article> = this.props.articles
      .filter(v => v.categoryKey == categoryPath)
      .flatMap(v => v.articles)
    return {
      category: category.title,
      articles: articles
    }
  }

  getCategoryArticle(categoryPath: string, articleKey: string): SinglePageProps {
    const categories = categoryPath.split("/", 2)
    const category = this.props.categories
      .filter(c => c.title == categories[0])
      .flatMap(c => c.children)
      .find(c => c?.title == categories[1])
    if (!category) {
      return {
        article: {
          title: "",
          key: "",
          path: ""
        }
      }
    }

    const article: Article | undefined = this.props.articles
      .filter(v => v.categoryKey == categories.join("/"))
      .flatMap(v => v.articles)
      .find(a => {
        const paths = a.path.split("/")
        return paths.length == 0 ? false : paths[paths.length-1].startsWith(articleKey)
      })
    if (!article) {
      return {
        article: {
          title: "",
          key: "",
          path: ""
        }
      }
    }

    return {
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
            <CategoryList categories={menus} />
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '0 16px 0' }}>
              <div className="site-layout-backgroud">
                <Switch>
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/:category(.+)/" exact strict render={(routeProps) => {
                    return <ListPage {...this.getCategoryArticles(routeProps.match.params.category)} />
                  }} />
                  <Route path="/:category(.+)/:article" exact strict render={(routeProps) => {
                    return <SinglePage 
                      {...this.getCategoryArticle(routeProps.match.params.category, routeProps.match.params.article)}
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
