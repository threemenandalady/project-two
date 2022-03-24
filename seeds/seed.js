const sequelize = require('../config/connection');
const { User, Posts, Categories, Replies } = require('../models');

const userData = require('./userData.json');
const categories = require('./categories.json');
const replies = require('./replies.json');
const posts = require('./posts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const category of categories) {
    await Categories.create({
      ...category,
    });
  }

  for (const post of posts) {
    await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const reply of replies) {
    await Replies.create({
      ...reply,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();