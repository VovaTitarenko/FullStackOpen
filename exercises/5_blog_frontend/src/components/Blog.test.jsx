import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders title and author without hidden info', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Vovka',
    url: 'dedoo.ru',
    likes: 50,
    user: '66741dad2f711aad74dbbb67',
  };

  let container = render(<Blog blog={blog} />).container;

  //   screen.debug();

  const title = screen.getByText(
    'Component testing is done with react-testing-library',
  );
  const author = screen.getByText('Vovka');
  const togglable = container.querySelector('.togglableContent');
  const url = container.querySelector('.url');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(togglable).toBeDefined();
  expect(togglable).toHaveStyle('display: none');
});

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Vovka',
    url: 'dedoo.ru',
    likes: 50,
    user: '66741dad2f711aad74dbbb67',
  };

  const mockHandler = vi.fn();
  render(<Blog blog={blog} likeBlog={mockHandler} />);
  screen.debug();

  const user = userEvent.setup();
  const button = screen.getByText('Like');
  await user.click(button);
  await user.click(button);

  //   expect(button).toHaveStyle('display: none');
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test('renders hidden info after clicking button', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Vovka',
    url: 'dedoo.ru',
    likes: 50,
    user: '66741dad2f711aad74dbbb67',
  };

  let container = render(<Blog blog={blog} />).container;

  //   screen.debug();

  const user = userEvent.setup();
  const button = screen.getByText('show details');
  await user.click(button);

  const title = screen.getByText(
    'Component testing is done with react-testing-library',
  );
  const author = screen.getByText('Vovka');
  const togglable = container.querySelector('.togglableContent');
  const url = container.querySelector('.url');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeDefined();
  expect(togglable).not.toHaveStyle('display: none');
  expect(url).not.toHaveStyle('display: none');
});
