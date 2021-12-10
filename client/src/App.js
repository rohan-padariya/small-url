import './App.css';
import { useEffect, useState } from 'react';
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

const headerArr = [
    "Small-URL"
]

function App() {

    // const [newUrl, setnewUrl] = useState(initialState)
    // useEffect(() => {
    //     getList()
    // }, [])

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    {headerArr.map((val, index) => {
                        const key = index + 1;
                        return <Menu.Item key={key}>{val}</Menu.Item>;
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
