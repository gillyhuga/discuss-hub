/**
 * Scenario test for CommentForm
 * * - CommentForm Components
 *   - should render the form
 *   - should submit the form
 *   - should display login message if not authenticated
 */

import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import CommentForm from './CommentForm';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

describe('CommentForm', () => {
  const onSubmit = vi.fn();
  const auth = {
    id: 'user-CxKB8668YtusCQW5',
    name: 'Gilly',
    email: 'hello@gillyhuga.com',
    avatar: 'https://ui-avatars.com/api/?name=Gilly&background=random',
  };
  afterEach(() => {
    cleanup();
  });

  it('renders the form', () => {
    render(
        <MemoryRouter>
          <CommentForm onSubmit={onSubmit} auth={auth} />
        </MemoryRouter>);
    expect(screen.getByText('Leave a Comment'));
    expect(screen.getByPlaceholderText('Write your comment here...'));
    expect(screen.getByText('Submit'));
  });

  it('submits the form', async () => {
    render(
        <MemoryRouter>
          <CommentForm onSubmit={onSubmit} auth={auth} />
        </MemoryRouter>,
    );
    const commentInput = screen.getByPlaceholderText(
        'Write your comment here...',
    );
    const submitButton = screen.getByText('Submit');

    await userEvent.type(commentInput, 'This is a test comment');
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('This is a test comment');
  });

  it('displays login message if not authenticated', () => {
    render(
        <MemoryRouter>
          <CommentForm onSubmit={onSubmit} auth={null} />
        </MemoryRouter>,
    );
    expect(screen.getByText('log in'));
  });
});
