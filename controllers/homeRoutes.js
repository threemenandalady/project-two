const router = require('express').Router();
const { Posts, User, Categories, Replies } = require('../models');
const { sequelize } = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Categories,
          attributes: ['name'],
        },
        {
          model: Replies,
          attributes: ['message'],
        },
      ],
      order: [[  Replies, "id", "desc"  ], [  "id", "desc"  ]]
    });

    // Serialize data so the template can read it
    let posts = postData.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// filters posts based on category
router.get('/posts/:categories_id', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Posts.findAll({
      where: {
        categories_id: req.params.categories_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Categories,
          attributes: ['name'],
        },
        {
          model: Replies,
          attributes: ['message'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/reply/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {});

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('reply', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/reply/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {});

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('reply', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Pass serialized posts data

router.get('/posts', withAuth, async (req, res) => {
  try {
    res.render('posts', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
