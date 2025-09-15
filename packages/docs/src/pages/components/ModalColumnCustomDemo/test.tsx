import React, { useState } from 'react'
import { Button } from 'antd'
import { ModalColumnCustom, ColumnCustomType } from 'ant-design-plus-ui'

// 简单的测试组件
const TestModalColumnCustom: React.FC = () => {
    const [open, setOpen] = useState(false)

    const options: ColumnCustomType[] = [
        { label: '姓名', value: 'name' },
        { label: '年龄', value: 'age' },
        { label: '邮箱', value: 'email' },
    ]

    const handleSubmit = async (selectedValues: string[]) => {
        console.log('选中的列:', selectedValues)
        setOpen(false)
        return true
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                测试自定义列组件
            </Button>
            
            <ModalColumnCustom
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                options={options}
                defaultSelecteds={['name']}
            />
        </div>
    )
}

export default TestModalColumnCustom