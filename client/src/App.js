import './App.css';
// import { useEffect } from 'react';
// import axios from 'axios';
import TableList from './components/TableList';
import InputElement from './components/InputElement';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;


// async function getList() {
//     try {
//         const response = await axios.get('/api/list');
//         console.log(response);
//     } catch (error) {
//         console.error(error);
//     }
// }

function App() {

    // useEffect(() => {
    //     getList()
    // }, [])

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    {new Array(1).fill(null).map((_, index) => {
                        const key = index + 1;
                        return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', margin: '16px 0' }}>
                <div className="site-layout-content">
                    <InputElement />
                    <br></br>
                    <TableList />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default App;
