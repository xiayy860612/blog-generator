import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import AppIndex from '../AppIndex';
import UserInfoCard from '../UserInfo';
import MenuList from '../Menu';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };
  
  render() {
    let userElement = <UserInfoCard />;
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
              height: '100%'
            }}
          >
            {userElement}
            <MenuList />
          </Sider>
          <Layout className="site-layout">
            <Content className="site-layout-background">
              <Switch>
                <Route path="/" exact={true} component={AppIndex} />
              </Switch>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
