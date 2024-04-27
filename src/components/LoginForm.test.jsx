/**
 * Scenario test for LoginForm
 * * - LoginForm Components
 *   - should render the form
 *   - should submit the form
 *   - should navigate to registration page
 */

import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

describe('LoginForm', () => {
  const onLogin = vi.fn();
  afterEach(() => {
    cleanup();
  });

  it('renders the form', () => {
    render(
        <MemoryRouter>
          <LoginForm onLogin={onLogin} />
        </MemoryRouter>);
    expect(screen.getByLabelText('Email address'));
    expect(screen.getByLabelText('Password'));
    expect(screen.getByText('Sign in'));
  });

  it('submits the form', async () => {
    render(
        <MemoryRouter>
          <LoginForm onLogin={onLogin} />
        </MemoryRouter>,
    );
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('navigates to registration page', () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
          <LoginForm onLogin={onLogin} />
        </MemoryRouter>,
    );
    const registerLink = screen.getByText('Register here');
    userEvent.click(registerLink);
    expect(screen.getByText('Register here'));
  });
});
