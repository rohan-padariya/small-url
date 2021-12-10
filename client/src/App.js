import './App.css';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import TableList from './components/TableList';
import InputElement from './components/InputElement';
import { Layout, Menu, Breadcrumb, Descriptions } from 'antd';
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
        <Layout className="layout" style={{ minHeight: "100vh" }}>
            <Header>

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    {headerArr.map((val, index) => {
                        const key = index + 1;
                        return <Menu.Item style={{ 'font-size': 18, fontWeight: 600 }} key={key}>{val}</Menu.Item>;
                    })}
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', margin: '16px 0' }}>
                <div className="site-layout-content">
                    <Descriptions
                        title="Paste the Long URL to be shortened"
                        bordered
                        size="middle"
                    ></Descriptions>
                    <InputElement />
                    <br></br>
                    <TableList />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Small-url ©2021 | Online Service to shorten a long link/Url.</Footer>
        </Layout>
    );
}

export default App;
