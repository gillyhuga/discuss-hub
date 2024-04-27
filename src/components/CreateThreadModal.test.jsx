/**
 * Scenario test for CreateThreadModal
 * * - CreateThreadModal Components
 *   - should render the modal
 *   - should submit the form
 *   - should cancel the modal
 */

import {describe, it, expect, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import CreateThreadModal from './CreateThreadModal';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

describe('CreateThreadModal', () => {
  const onCreateThread = vi.fn();
  const onClose = vi.fn();
  afterEach(() => {
    cleanup();
  });

  it('renders the modal', () => {
    render(
        <MemoryRouter>
          <CreateThreadModal
            isOpen={true}
            onClose={onClose}
            onCreateThread={onCreateThread}
          />
        </MemoryRouter>,
    );
    expect(screen.getByText('Create Thread'));
    expect(screen.getByLabelText('Title'));
    expect(screen.getByLabelText('Category'));
    expect(screen.getByLabelText('Body'));
    expect(screen.getByText('Create'));
    expect(screen.getByText('Cancel'));
  });

  it('submits the form', async () => {
    render(
        <MemoryRouter>
          <CreateThreadModal
            isOpen={true}
            onClose={onClose}
            onCreateThread={onCreateThread}
          />
        </MemoryRouter>,
    );
    const titleInput = screen.getByLabelText('Title');
    const categoryInput = screen.getByLabelText('Category');
    const bodyInput = screen.getByLabelText('Body');
    const createButton = screen.getByText('Create');

    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(categoryInput, 'Test Category');
    await userEvent.type(bodyInput, 'Test Body');
    await userEvent.click(createButton);

    expect(onCreateThread).toHaveBeenCalledWith({
      title: 'Test Title',
      category: 'Test Category',
      body: 'Test Body',
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('cancels the modal', () => {
    render(
        <MemoryRouter>
          <CreateThreadModal
            isOpen={true}
            onClose={onClose}
            onCreateThread={onCreateThread}
          />
        </MemoryRouter>,
    );
    const cancelButton = screen.getByText('Cancel');
    userEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });
});
