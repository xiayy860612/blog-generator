import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const AppIndex: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{
        overflow: 'auto',
        height: 'auto',
        position: 'fixed',
      }}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <UserOutlined />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <VideoCameraOutlined />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <UploadOutlined />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
          <Content className="site-layout-background">
              <Switch>
                <Route path="/" exact={true} component={AppIndex} />
              </Switch>
            </Content>
            <Content className="site-layout-background">
              <Switch>
                <Route path="/" exact={true} component={AppIndex} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
