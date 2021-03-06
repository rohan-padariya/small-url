import axios from 'axios';
import { React, useState } from 'react'
import { Input } from 'antd';
import eventBus from "../service/EventBusService";
const { Search } = Input;
const NotificationService = require('../service/NotificationService');


function saveURL(val) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.post('/api/short', { originalURL: val });
        if (response.status == 200) {
            resolve(response.data)
        } else {
            reject(false)
        }
    })
}

function InputElement(props) {

    const [value, setvalue] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const handleOnSearch = async (val) => {
        console.log(val)
        if (!val) {
            NotificationService.notify.error('URL cannot be empty')
            return;
        }
        setisLoading(true)
        let data = await saveURL(val)
        console.log(data)
        if (data.success) {
            NotificationService.notify.success(data.message)
        } else {
            NotificationService.notify.error(data.message)
        }
        eventBus.dispatch("newURLAdded", { message: data.message });
        setisLoading(false)
        setvalue('')
    }
    return (
        <div>
            <Search placeholder="Enter you url here..." loading={isLoading} value={value} onChange={e => setvalue(e.target.value)} enterButton="Get Link" size="large" onSearch={handleOnSearch} />
        </div>
    )
}

export default InputElement


