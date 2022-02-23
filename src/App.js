import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'antd/dist/antd.css';
import Register from './component/Register'
import Success from "./component/Success"
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';





//The first 2 popular artists happen to be Picasso and Banksy. Thus, we pass in the argument "size" as 2. 

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends React.Component {
  
  constructor(){
    super();
    this.state = {
     products: ''
    }
   }
  

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
        
          </Menu>
        </Sider> 
     

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <Router>
    <Routes>
     <Route path="/" element={<Register/>}></Route>
     <Route path="/Success" element={<Success/>}></Route>
    </Routes>
           </Router>

          </Content>
      
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

