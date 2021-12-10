import React from 'react'
import { Table, Tag, Modal, Space, Tooltip, Button, Skeleton, SkeletonProps } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchOutlined, CopyOutlined, QrcodeOutlined, LogoutOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

const NotificationService = require('../service/NotificationService');

var QRCode = require('qrcode.react');

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
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
    const [qrCodeVal, setqrCodeVal] = useState('')

    const getDomainFromUrl = (url) => {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        console.log(url, match)
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0)
            return 'https://www.google.com/s2/favicons?domain=' + match[2];
        else
            return 'https://www.google.com/s2/favicons?domain=null'
    }

    const columns = [
        // {
        //     title: '',
        //     dataIndex: 'Icon',
        //     key: 'icon',
        //     // width: '25%',
        //     width: 0,
        //     render: (text) => <> <img src="https://www.google.com/s2/favicons?domain=stackoverflow.com" alt="Smiley face" width="32" height="32" style={{ "vertical-align": "bottom" }}></img></>
        // },
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
            render: (text, record, index) =>
                <>
                    <div style={{ 'display': 'flex' }}>
                        <img src={getDomainFromUrl(text)} alt="" width="20" height="20" ></img>
                        <EllipsisTooltip style={{ marginRight: 10, 'text-align': 'center' }} title={text}>{text}</EllipsisTooltip>
                    </div>

                </>


        },
        {
            title: 'Short Url',
            dataIndex: 'shortUrl',
            key: 'shortUrl',
            width: 10,
            onCell: () => {
                return {
                    style: {
                        whiteSpace: 'nowrap',
                        maxWidth: 10,
                    }
                }
            },
            render: (text) => <EllipsisTooltip title={text}>{text}</EllipsisTooltip>,
        },
        {
            title: 'Actions',
            key: 'action',
            width: '10%',
            dataIndex: 'action',
            render: (text, record, index) => (
                <>
                    <CopyOutlined onClick={() => onCopyHandle(record)} style={{ fontSize: '20px', color: 'black', marginLeft: 8 }} />
                    <QrcodeOutlined onClick={() => onQRHandle(record)} style={{ fontSize: '20px', color: 'black', marginLeft: 8 }} />
                    <IconFont type="icon-tuichu" onClick={() => onRedirectHandle(record)} style={{ fontSize: '20px', color: 'black', marginLeft: 8 }} />
                </>
            ),
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            width: '5%',
            onCell: () => {
                return {
                    style: {
                        whiteSpace: 'nowrap',
                        maxWidth: 10,
                    }
                }
            },
            render: (text) => <EllipsisTooltip title={text}>{text}</EllipsisTooltip>
        },
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
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

    const refreshTable = async () => {
        let responseData = await getList();
        // let arr = JSON.parse(JSON.stringify(urlList));
        // arr = []
        seturlList(responseData.data)

    }

    const onCopyHandle = (record) => {
        // console.log('onCopyHandle ::', record)
        navigator.clipboard.writeText(record.shortUrl)
        NotificationService.notify.success('Short Url copied to clipboard')
    }
    const onQRHandle = (record) => {
        // console.log('onQRHandle ::', record)
        setqrCodeVal(record.shortUrl)
        showModal()
    }
    const onRedirectHandle = (record) => {
        // console.log('onRedirectHandle ::', record)
        window.open(record.shortUrl, '_blank')
    }

    useEffect(() => {
        try {
            refreshTable()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (

        <div>
            <Modal
                title="QR Code"
                visible={isModalVisible}
                onOk={handleOk}
                footer={null}
                onCancel={handleCancel}>
                <div style={{ textAlign: 'center' }}>
                    <QRCode value={qrCodeVal} />
                    <br></br>
                    {/* <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <QRCode value="http://facebook.github.io/react/" /> */}
                    <div style={{ marginTop: '10px' }}>
                        Scan QR to get short URL
                    </div>
                </div>
            </Modal >
            <Table columns={columns} dataSource={urlList}
                style={{ width: '100%', height: '100%' }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => { }, // click row
                        onDoubleClick: event => { }, // double click row
                        // onContextMenu: event => { console.log('EVENT onContextMenu', event) }, // right button click row
                        // onMouseEnter: event => { console.log('EVENT onMouseEnter', event) }, // mouse enter row
                        // onMouseLeave: event => { console.log('EVENT onMouseLeave', event) }, // mouse leave row
                    };
                }} />
        </div >
    )
}

export default TableList;