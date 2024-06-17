const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('return 1 from JSON array', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('of an empty array', () => {
    const list = [];
    assert.strictEqual(listHelper.totalLikes(list), 0);
  });
  test('of a singleton', () => {
    const list = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];
    assert.strictEqual(listHelper.totalLikes(list), 5);
  });
  test('of a list with several blogs', () => {
    const list = [
      { title: 'I was here', author: 'Vova', likes: 40 },
      { title: 'I was there', author: 'Vova', likes: 140 },
      { title: 'I was everywhere', author: 'Vova', likes: 1040 },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1200,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 500,
        __v: 0,
      },
    ];
    assert.strictEqual(listHelper.totalLikes(list), 2920);
  });
});

describe('favorite blog', () => {
  test('in an empty array', () => {
    const list = [];
    assert.strictEqual(listHelper.favoriteBlog(list), 'empty blog list');
  });
  test('of a singleton', () => {
    const list = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(listHelper.favoriteBlog(list), {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('of a list with several blogs', () => {
    const list = [
      { title: 'I was here', author: 'Vova', likes: 40 },
      { title: 'I was there', author: 'Vova', likes: 140 },
      { title: 'I was everywhere', author: 'Vova', likes: 1040 },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1200,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 500,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(listHelper.favoriteBlog(list), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 1200,
    });
  });
});

describe('author with most blogs', () => {
  test('in an empty list', () => {
    const list = [];
    assert.strictEqual(listHelper.mostBlogs(list), 'empty blog list');
  });
  test('in a singleton list', () => {
    const list = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1200,
      },
    ];
    assert.deepStrictEqual(listHelper.mostBlogs(list), {
      'Edsger W. Dijkstra': 1,
    });
  });
  test('in a full list', () => {
    const list = [
      { title: 'I was here', author: 'Vova', likes: 40 },
      { title: 'I was there', author: 'Vova', likes: 140 },
      { title: 'I was everywhere', author: 'Vova', likes: 1040 },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1200,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 500,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(listHelper.mostBlogs(list), {
      Vova: 3,
    });
  });
});

describe('author with most likes', () => {
  test('in an empty list', () => {
    const list = [];
    assert.strictEqual(listHelper.mostLikes(list), 'empty blog list');
  });
  test('in a singleton list', () => {
    const list = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1200,
      },
    ];
    assert.deepStrictEqual(listHelper.mostLikes(list), {
      'Edsger W. Dijkstra': 1200,
    });
  });
  test('in a full list', () => {
    const list = [
      { title: 'I was here', author: 'Vova', likes: 40 },
      { title: 'I was there', author: 'Vova', likes: 140 },
      { title: 'I was everywhere', author: 'Vova', likes: 1040 },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1200,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 500,
        __v: 0,
      },
    ];
    assert.deepStrictEqual(listHelper.mostLikes(list), {
      'Edsger W. Dijkstra': 1700,
    });
  });
});
