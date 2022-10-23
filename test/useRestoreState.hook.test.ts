import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import useRestoreState from './hooks/useRestoreState'

const ENV = 'test'
describe("测试 useRestoreState", () => {
    it('缓存数据与输出数据是否一致', async() => {
      const { result } = renderHook(() => {
        const [createDialogFormData, setCreateDialogFormData]= useState({
          'word': 'string',
          'brand': 'string',
          'site': 'string',
          'lang': 'string',
          'wtype': 'string',
          'caseReason': 'string',
          'handleUserIds': 'string',
          'handleTeamId': '',
        })
        const [restoreCond, setRestoreCond] = useState(false)
        useRestoreState({
            test: true,
            key: '新建 badcase', // 唯一标识 key
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
              when: restoreCond, // 触发恢复数据的时机
              callback: (data) => {
                expect(data).toStrictEqual({
                  'word': 'string',
                  'brand': 'string',
                  'site': 'string',
                  'lang': 'string',
                  'wtype': 'string',
                  'caseReason': 'string',
                  'handleUserIds': 'string',
                  'handleTeamId': 'ffff',
                })
              },
            },
        })
        return [
          [createDialogFormData, setCreateDialogFormData] as const, 
          [restoreCond, setRestoreCond] as const
        ] as const
      })

      await new Promise(resolve => {
        act(() => {
          const [[createDialogFormData, setCreateDialogFormData]] = result.current
          setCreateDialogFormData({
            ...createDialogFormData,
            handleTeamId:'ffff'
          })
          setTimeout(() => {
            resolve('')
          }, 600)
        })
      })

      await new Promise(resolve => {
        act(() => {
          const [[createDialogFormData, setCreateDialogFormData], [, setRestoreCond]] = result.current
          setCreateDialogFormData({
            ...createDialogFormData,
            handleTeamId:''
          })
          setRestoreCond(true)
          setTimeout(() => {
            resolve('')
          }, 600)
        })
      })
    })
})