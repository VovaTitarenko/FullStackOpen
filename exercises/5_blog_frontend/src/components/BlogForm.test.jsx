import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const notifySuccess = vi.fn(() => {
    console.log('success!');
  });
  const notifyError = vi.fn((error) => {
    console.error(error);
  });
  const user = userEvent.setup();

  render(
    <BlogForm
      createBlog={createBlog}
      notifySuccess={notifySuccess}
      notifyError={notifyError}
    />,
  );

  const titleInput = screen.getByPlaceholderText('Enter blog title');
  const authorInput = screen.getByPlaceholderText('Enter blog author');
  const urlInput = screen.getByPlaceholderText('Attach a link');
  const postButton = screen.getByText('post');

  await user.type(titleInput, 'testing a form...');
  await user.type(authorInput, 'Vovka');
  await user.type(urlInput, 'testing.com');
  await user.click(postButton);

  console.log(createBlog.mock.calls);
  console.log(notifySuccess.mock.calls);
  console.log(notifyError.mock.calls);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(notifySuccess.mock.calls).toHaveLength(1);
  expect(notifyError.mock.calls).toHaveLength(0);
  expect(createBlog.mock.calls[0][0].author).toBe('Vovka');
});
