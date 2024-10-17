import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { Input } from './index'

describe('Test Input Component', () => {
  it('Test initial render', () => {
    const onChange = jest.fn()
    const onSubmit = jest.fn()

    const { getByTestId } = render(
      <Input
        placeholder='test-placeholder'
        label='test-label'
        onChange={onChange}
        onSubmit={onSubmit}
      />)

    const inputOuter = getByTestId('fibonacci-interface-textfield')
    const inputInner = inputOuter.querySelector('input')

    expect(inputOuter).toHaveTextContent('test-label')
    expect(inputInner).toHaveAttribute('placeholder', 'test-placeholder')

    if (inputInner) { // Key press needs charCode 13 in order to work: https://github.com/testing-library/react-testing-library/issues/269#issuecomment-455854112
      fireEvent.change(inputInner, { target: { value: 'test' } });
      fireEvent.keyPress(inputInner, { key: 'Enter', charCode: 13 })
    }

    expect(onChange).toHaveBeenCalledWith('test');
    expect(onSubmit).toHaveBeenCalled();
  })
})