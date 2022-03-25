const router = require('express').Router();
const { Replies } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newReply = await Replies.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReply);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
