/**
 * Scenario test for RegisterFrom
 * * - RegisterFrom Components
 *   - should render the form
 *   - should submit the form
 *   - should navigate to registration page
 */

import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import RegisterForm from './RegisterForm';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

describe('RegisterForm', () => {
  const onRegister = vi.fn();
  afterEach(() => {
    cleanup();
  });

  it('renders the form', () => {
    render(
        <MemoryRouter>
          <RegisterForm onRegister={onRegister} />
        </MemoryRouter>);
    expect(screen.getByLabelText('Name'));
    expect(screen.getByLabelText('Email address'));
    expect(screen.getByLabelText('Password'));
    expect(screen.getByText('Register'));
    expect(screen.getByText('Already have an account?'));
  });

  it('submits the form', async () => {
    render(
        <MemoryRouter>
          <RegisterForm onRegister={onRegister} />
        </MemoryRouter>,
    );
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Register');

    await userEvent.type(nameInput, 'Test User');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(submitButton);

    expect(onRegister).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('navigates to login page', () => {
    render(
        <MemoryRouter initialEntries={['/register']}>
          <RegisterForm onRegister={onRegister} />
        </MemoryRouter>,
    );
    const loginLink = screen.getByText('Login here');
    userEvent.click(loginLink);
    expect(screen.getByText('Login here'));
  });
});
