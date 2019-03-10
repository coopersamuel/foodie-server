const stream = require('../index');
const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = async (userId, postId) => {
  // Remove the post from MongoDB
  const post = await Post.findOne({ _id: postId })
    .orFail()
    .catch(error => {
      throw new Error('Unable to locate this post');
    });

  await post.remove();

  // Remove the post from stream
  await stream.feed('user', userId).removeActivity({ foreignId: postId });
};
