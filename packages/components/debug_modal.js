import { render, screen } from '@testing-library/react'
import { ModalColumnCustom } from './src/components/ModalColumnCustom/ModalColumnCustom'

const mockOptions = [
    { label: '姓名', value: 'name' },
    { label: '年龄', value: 'age' },
]

const defaultProps = {
    open: true,
    onClose: () => {},
    onSubmit: () => Promise.resolve(true),
    options: mockOptions,
    defaultSelecteds: ['name'],
    currentSelecteds: ['name'],
}

render(<ModalColumnCustom {...defaultProps} />)
console.log(document.body.innerHTML)
