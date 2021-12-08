import axios from 'axios';
import { React, useState } from 'react'
import { Input } from 'antd';
const { Search } = Input;

function saveURL(val) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.post('/api/short', { origUrl: val });
        if (response.status == 200) {
            resolve(response.data)
        } else {
            reject(false)
        }
    })
}

function InputElement() {

    const [value, setvalue] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const handleOnSearch = async (val) => {
        console.log(val)
        if (!val) {
            return;
        }
        setisLoading(true)
        let data = await saveURL(val)
        console.log(data)
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


