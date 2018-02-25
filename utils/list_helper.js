const dummy = (blogs) => {
  // ...
  return 1
}



const totalLikes = (blogs) => {
  let likes = 0;

  for (var index in blogs) {
      const blog = blogs[index]
      likes += blog.likes;
  }
  return likes
}

const favoriteBlog = (blogs) => {

  if (blogs.length == 0) {
    return undefined
  }
  let mostLikes = 0;
  let mostLiked = 0;

  for (var index in blogs) {
      const blog = blogs[index]
      if (blog.likes > mostLikes) {
        mostLikes = blog.likes
        mostLiked = index;

      }
  }
  return {
    title: blogs[mostLiked].title,
    author: blogs[mostLiked].author,
    likes: blogs[mostLiked].likes
  }
}

const mostBlogs = (blogs) => {

  if (blogs.length == 0) {
    return undefined
  }

  let writers = {}
  for (var index in blogs) {
      const blog = blogs[index]
      if (writers[blog.author] === undefined) {
        writers[blog.author] = 1;
      }
      else {
        writers[blog.author]++
      }
    }

    let mostBlogs = 0;
    let author = undefined;

    Object.keys(writers).forEach(function(key,index) {
      if (writers[key] > mostBlogs) {
        mostBlogs = writers[key];
        author = key
      }
    });
    return {
      author: author,
      blogs: mostBlogs
    }
}


const mostLikes = (blogs) => {

  if (blogs.length == 0) {
    return undefined
  }

  let writers = {}
  for (var index in blogs) {
      const blog = blogs[index]
      if (writers[blog.author] === undefined) {
        writers[blog.author] = blog.likes;
      }
      else {
        writers[blog.author] += blog.likes
      }
    }

    let mostLikes = 0;
    let author = undefined;

    Object.keys(writers).forEach(function(key,index) {
      if (writers[key] > mostLikes) {
        mostLikes = writers[key];
        author = key
      }
    });
    return {
      author: author,
      likes: mostLikes
    }
}







module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
