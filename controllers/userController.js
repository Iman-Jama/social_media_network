const User = require('../models/User');
const Thought = require('../models/Thought');
const router = require('express').Router();

router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error("Error fetching all users")
      res.status(500).json(err)
    }
  });

  router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
        res.json(user);
    } catch (err) {
      console.error("Error fetching user")
      res.status(500).json(err);
    }
  });

  // create a new user
  router.post('/users', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //update a user
  router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
          {_id: req.params.userid },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    });
//delete a courses
router.delete('/users/:id', async (req, res) => {
    try {
    const user = await User.findOneAndDelete({ _id: req.params.userid });

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

