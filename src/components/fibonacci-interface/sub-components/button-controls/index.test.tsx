import '@testing-library/jest-dom'
import { fireEvent, render, within } from '@testing-library/react'
import { ButtonControls } from './index'

describe('Test ButtonControls Component', () => {
  it('Test initial render', () => {
    const onSubmit = jest.fn();
    const onHalt = jest.fn();
    const onResume = jest.fn();
    const onQuit = jest.fn();

    const { getByTestId } = render(
      <ButtonControls
        onSubmit={onSubmit}
        onHalt={onHalt}
        onResume={onResume}
        onQuit={onQuit}
      />)

    const buttonControls = getByTestId('fibonacci-interface-button-container')
    const [submitButton, haltButton, resumeButton, quitButton] = [...buttonControls.children];

    expect(within(buttonControls).getByText('Submit'))
    expect(within(buttonControls).getByText('Halt'))
    expect(within(buttonControls).getByText('Resume'))
    expect(within(buttonControls).getByText('Quit'))

    fireEvent.click(submitButton)
    fireEvent.click(haltButton)
    fireEvent.click(resumeButton)
    fireEvent.click(quitButton)

    expect(onSubmit).toHaveBeenCalled();
    expect(onHalt).toHaveBeenCalled();
    expect(onResume).toHaveBeenCalled();
    expect(onQuit).toHaveBeenCalled();
  })
})