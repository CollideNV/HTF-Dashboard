import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import DashboardBadge from './DashboardBadge'

describe('<DashboardBadge />', () => {
    test('it should mount', () => {
        render(<DashboardBadge />)

        const badge = screen.getByTestId('DashboardBadge')

        expect(badge).toBeInTheDocument()
    })
})
