const User = require('../../models/User');
const Thought = require('../../models/Thought');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error("Error fetching all users")
      res.status(500).json(err)
    }
  });

  router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');
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
  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //update a user
  router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
          {_id: req.params.userId },
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
router.delete('/:userId', async (req, res) => {
    try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
//add a friend to users friends list:

// POST route to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
  
      // Find the user by ID and update the friends array
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );
  
      res.json(user);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  //delete friend using $pull method in mongo
  router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
  
      // Find the user by ID and update the friends array
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      );
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
  

  
