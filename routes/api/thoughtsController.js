const {Thought, Reaction} = require('../../models/Thought');
const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  });

  router.get('/:thoughtId', async (req, res) => {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
        res.json(thoughts);
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  });

  // create a new thought
  router.post('/', async (req, res) => {
    try {
      const thoughtData = await Thought.create(req.body);
      const userId = req.body.userId;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { thoughts: thoughtData._id} },
        { new: true }
      );

      res.json(thoughtData);
    } catch (error) {
      console.error('Error creating thought:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  //update a thought
  router.put('/:thoughtId', async (req, res) => {
    try {
        const thoughts = await Thought.findOneAndUpdate(
          {_id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thoughts) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    });
//delete a thought
router.delete('/:thoughtId', async (req, res) => {
    try {
    const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    res.status(200).json({ message: 'thoughts deleted!' });

    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    };
  } catch (err) {
    res.status(500).json(err);
  }
});

//get thought reactions:

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody, username } = req.body;
      const newReaction = new Reaction({ reactionBody, username })
  
      // Find the user by ID and update the friends array
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      );
  
      return res.status(200).json({message:'reaction added!'});
    } catch (err) {
      console.error("unable to add reaction")
      return res.status(500).json(err);
    }
  });


  router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.params.reactionId;
  
      // Find the user by ID and update the friends array
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );
  
      return res.status(200).json({message:'reaction deleted'});
    } catch (err) {
      return res.status(500).json(err);
    }
  });
 
module.exports = router;