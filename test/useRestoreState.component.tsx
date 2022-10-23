import React from "react";
import useRestoreState from "./hooks/useRestoreState";
const ENV = 'test'

const createDialogFormData = {
    'word': 'string',
    'brand': 'string',
    'site': 'string',
    'lang': 'string',
    'wtype': 'string',
    'caseReason': 'string',
    'handleUserIds': 'string',
    'handleTeamId': 'string',
}

export default () => {
    useRestoreState({
        key: '新建 badcase', // 唯一标识 key
        test: true,
        open: ['dev', 'test'].includes(ENV), // 是否开启，线上或灰度环境应该关闭
        mode: 'local', // 使用 sessionStorage 还是 localStorage
        store: {
          data: createDialogFormData, // 传入需要缓存的表单数据
          required: [
            'word',
            'brand',
            'site',
            'lang',
            'wtype',
            'caseReason',
            'handleUserIds',
            'handleTeamId',
          ], // 传入需要必填的表单属性
        },
        restore: {
          when: true, // 触发恢复数据的时机
          callback: (data) => {
            
          },
        },
      })
    return <>ddd</>
}