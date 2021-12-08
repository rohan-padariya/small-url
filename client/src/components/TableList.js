import React from 'react'
import { Table, Tag, Space, Tooltip, Button, Skeleton, SkeletonProps, } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchOutlined, CopyOutlined, QrcodeOutlined, LogoutOutlined } from '@ant-design/icons';

class EllipsisTooltip extends React.Component {
    state = {
        visible: false
    }
    handleVisibleChange = (visible) => {
        if (this.container.clientWidth < this.container.scrollWidth) {
            this.setState({
                visible: visible
            })
        }
    }
    render() {
        return (
            <Tooltip visible={this.state.visible} onVisibleChange={this.handleVisibleChange} title={this.props.title}>
                <div ref={node => this.container = node} style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                }}>{this.props.children}</div>
            </Tooltip>
        )
    }
}

const columns = [
    {
        title: 'Url',
        dataIndex: 'origUrl',
        key: 'origUrl',
        // width: '25%',
        width: 20,
        onCell: () => {
            return {
                style: {
                    whiteSpace: 'nowrap',
                    maxWidth: 20,
                }
            }
        },
        render: (text) => <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
    },
    {
        title: 'Short Url',
        dataIndex: 'shortUrl',
        key: 'shortUrl',
        width: 20,
        onCell: () => {
            return {
                style: {
                    whiteSpace: 'nowrap',
                    maxWidth: 20,
                }
            }
        },
        render: (text) => <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
    },
    {
        title: '',
        dataIndex: '',
        key: '',
        width: '20%',
        render: tags => (
            <>
                {['copy', 'Link', 'QR Code'].map(tag => {
                    // let color = tag.length > 5 ? 'geekblue' : 'green';
                    // // if (tag === 'loser') {
                    // //     color = 'volcano';
                    // // }
                    let color = 'gray'
                    let icon = '<QrcodeOutlined />'
                    switch (tag) {
                        case 'Link':
                            color = 'geekblue'
                            icon = '<LogoutOutlined />'
                            break;
                        case 'QR Code':
                            icon = '<QrcodeOutlined />'
                            color = 'green'
                            break;
                        default:
                            break;
                    }
                    return (
                        // <Tag color={color} key={tag}>
                        //     {tag.toUpperCase()}
                        // </Tag>
                        <Button color={color} size="large" icon={<CopyOutlined />}></Button>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Click',
        dataIndex: 'clicks',
        key: 'clicks',
        width: '5%',
        // onCell: () => {
        //     return {
        //         style: {
        //             whiteSpace: 'nowrap',
        //             maxWidth: 10,
        //         }
        //     }
        // },
        // render: (text) => <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
    },
    {
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
        render: tags => (
            <>
                {['loser', 'yo'].map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Button color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Button>
                    );
                })}
            </>
        ),
        width: 50,
        onCell: () => {
            return {
                style: {
                    whiteSpace: 'nowrap',
                    maxWidth: 20,
                }
            }
        },
        render: (text) => <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];


function getList() {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get('/api/list');
        if (response.status == 200) {
            resolve(response.data)
        } else {
            reject(false)
        }
    })
}

export const TableList = () => {

    const [urlList, seturlList] = useState([])
    const [loading, setloading] = useState(true)

    const refreshTable = async () => {
        let data = await getList();
        // let arr = JSON.parse(JSON.stringify(urlList));
        // arr = []
        seturlList(data)

    }

    useEffect(() => {
        refreshTable()
    }, [])


    return (
        <div>
            <Table columns={columns} dataSource={urlList}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { console.log('EVENT onClick', event) }, // click row
                        onDoubleClick: event => { console.log('EVENT onDoubleClick', event) }, // double click row
                        // onContextMenu: event => { console.log('EVENT onContextMenu', event) }, // right button click row
                        // onMouseEnter: event => { console.log('EVENT onMouseEnter', event) }, // mouse enter row
                        // onMouseLeave: event => { console.log('EVENT onMouseLeave', event) }, // mouse leave row
                    };
                }} />
        </div>
    )
}

export default TableList;