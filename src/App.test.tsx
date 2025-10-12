import { render, screen } from '@testing-library/react';
import HTFDashboard from './App';

test('renders mission briefing header', () => {
  render(<HTFDashboard />);
  const headerElement = screen.getByText(/MISSION BRIEFING/i);
  expect(headerElement).toBeInTheDocument();
});
