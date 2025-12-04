import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders home page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );


 const checkInfoText = screen.getByText(/check info/i); 
  expect(checkInfoText).toBeInTheDocument();
});
