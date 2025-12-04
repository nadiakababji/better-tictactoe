import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CheckInfo } from './CheckInfo';

describe('CheckInfo Component', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); 
  });

  test('renders form inputs and button', () => {
    render(<CheckInfo />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Age')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('DateOfBirth')).toBeInTheDocument();
    expect(screen.getByLabelText(/married/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  test('updates input values when typing', () => {
    render(<CheckInfo />);

    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput).toHaveValue('John');

    const ageInput = screen.getByPlaceholderText('Age');
    fireEvent.change(ageInput, { target: { value: '30' } });
    expect(ageInput).toHaveValue(30);

    const dateInput = screen.getByPlaceholderText('DateOfBirth');
    fireEvent.change(dateInput, { target: { value: '1990-01-01' } });
    expect(dateInput).toHaveValue('1990-01-01');

    const marriedCheckbox = screen.getByLabelText(/married/i);
    fireEvent.click(marriedCheckbox);
    expect(marriedCheckbox).toBeChecked();
  });

  test('shows success popup on successful fetch', async () => {
    const fakeResponse = { success: true };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(fakeResponse),
    } as any);

    render(<CheckInfo />);
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/valid data sent/i)).toBeInTheDocument();
    });
  });

  test('shows failure popup on unsuccessful fetch', async () => {
    const fakeResponse = { success: false };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(fakeResponse),
    } as any);

    render(<CheckInfo />);
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/invalid data sent/i)).toBeInTheDocument();
    });
  });

 
});
