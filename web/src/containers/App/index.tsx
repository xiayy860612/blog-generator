import React, { Children } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import AppIndex from '../../components/AppIndex';
import UserInfoCard from '../../components/UserInfo';
import CategoryList from '../../components/Category';
import { connect } from 'react-redux';
import UserInfo from '../../reducers/UserInfo/domain';
import Category from '../../reducers/Category/domain';
import { AppState } from '../../reducers';
import { dispatchGetUserInfoAction } from '../../actions/UserInfo';
import { dispatchGetCategoriesAction } from '../../actions/Category';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface AppProps {
  userInfo: UserInfo,
  menus: Array<Category>,

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
    const menus = this.props.menus;
    return (
      <Router>
        <Layout>
          <Sider
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} 
            style={{
              overflow: 'auto',
              position: 'fixed',
              height: '100%'
            }}
          >
            {userElement}
            <CategoryList categories={menus} />
          </Sider>
          <Layout>
            <Content style={{ margin: '0 16px 0' }}>
              <div className="site-layout-backgroud">
                <Switch>
                  <Route path="/" exact={true} component={AppIndex} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    userInfo: state.userInfo,
    menus: state.categories
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUserInfoAction: () => dispatch(dispatchGetUserInfoAction()),
    getCategoriesAction: () => dispatch(dispatchGetCategoriesAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
