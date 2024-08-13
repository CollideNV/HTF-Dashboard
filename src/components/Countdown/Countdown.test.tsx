import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Countdown from './Countdown'

describe('<Countdown />', () => {
    test('it should mount', () => {
        render(<Countdown targetDate={Date.now()} />)

        const countdown = screen.getByTestId('Countdown')

        expect(countdown).toBeInTheDocument()
    })
})
