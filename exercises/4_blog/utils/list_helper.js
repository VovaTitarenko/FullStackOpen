const initialBlogList = [
  {
    title: 'The story of React',
    author: 'uidotdev',
    url: 'https://youtu.be/Wm_xI7KntDs?si=R3tIjDPQixzwZuwx',
    likes: 20,
  },
  {
    title: 'The story of NextJS',
    author: 'uidotdev',
    url: 'https://youtu.be/BILxV_vrZO0?si=qqruENFgNWtnhCp3',
    likes: 30,
  },
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) {
    return 'empty blog list';
  }
  let currentFavoriteIndex = 0;
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[i - 1].likes) {
      currentFavoriteIndex = i;
    }
  }
  return {
    title: blogs[currentFavoriteIndex].title,
    author: blogs[currentFavoriteIndex].author,
    likes: blogs[currentFavoriteIndex].likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return 'empty blog list';
  }
  let authorBlogPair = {};
  let highestBlogCount = 0;
  let mostProlificAuthor = '';
  for (let i = 0; i < blogs.length; i++) {
    if (!authorBlogPair.hasOwnProperty(blogs[i].author)) {
      authorBlogPair[blogs[i].author] = 1;
    } else {
      authorBlogPair[blogs[i].author] += 1;
    }
  }

  for (const author in authorBlogPair) {
    if (authorBlogPair[author] > highestBlogCount) {
      highestBlogCount = authorBlogPair[author];
      mostProlificAuthor = author;
    }
  }

  return { [mostProlificAuthor]: highestBlogCount };
};

const mostLikes = (blogs) => {
  if (blogs.length < 1) {
    return 'empty blog list';
  }
  let authorLikePair = {};
  let highestLikeCount = 0;
  let mostPopularAuthor = '';
  for (let i = 0; i < blogs.length; i++) {
    if (!authorLikePair.hasOwnProperty(blogs[i].author)) {
      authorLikePair[blogs[i].author] = blogs[i].likes;
    } else {
      authorLikePair[blogs[i].author] += blogs[i].likes;
    }
  }

  for (const author in authorLikePair) {
    if (authorLikePair[author] > highestLikeCount) {
      highestLikeCount = authorLikePair[author];
      mostPopularAuthor = author;
    }
  }

  return { [mostPopularAuthor]: highestLikeCount };
};

module.exports = {
  initialBlogList,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
