const User = require('./User');
const Posts = require('./Posts');
const Categories = require('./Categories');
const Replies = require('./Replies');

User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Categories.hasMany(Posts, {
  foreignKey: 'categories_id',
  onDelete: 'CASCADE',
});

Posts.belongsTo(User, {
  foreignKey: 'user_id',
});

Posts.belongsTo(Categories, {
  foreignKey: 'categories_id',
});

User.hasMany(Replies, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Posts.hasMany(Replies, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Replies.belongsTo(User, {
  foreignKey: 'user_id',
});

Replies.belongsTo(Posts, {
  foreignKey: 'post_id',
});

module.exports = { User, Posts, Categories, Replies };
