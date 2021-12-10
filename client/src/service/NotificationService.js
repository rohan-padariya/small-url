import { message } from 'antd';

export const notify = {
    success: (msg) => {
        message.success(msg);
    },

    error: (msg) => {
        message.error(msg);
    },

    warning: (msg) => {
        message.warning(msg);
    },
}

