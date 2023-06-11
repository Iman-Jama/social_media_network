const connection = require('../config/connection');
const {Thought, Reaction} = require('../models/Thought');
const User = require('../models/User');
//Connect to DB
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected')

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

// Seed data
const seedData = async () => {
  try {
    // Create users
    const user1 = new User({ username: 'Tupac', email: 'Tupac@example.com' });
    const user2 = new User({ username: 'Beyonce', email: 'Beyonce@example.com' });
    const user3 = new User({ username: 'Rihanna', email: 'Rihanna@example.com' });
    const user4 = new User({ username: 'Coldplay', email: 'Coldplay2@example.com' });
    const user5 = new User({ username: 'Drake', email: 'Drake@example.com' });
    const user6 = new User({ username: 'BrunoMars', email: 'Bruno@example.com' });


    await User.insertMany([user1, user2, user3, user4, user5, user6]);

    // Create thoughts
    const thought1 = new Thought({
      thoughtText: "Changes, we gotta start makin' changes,",
      username: user1.username,
    });
    const thought2 = new Thought({
      thoughtText: "put a ring on it, divas!",
      username: user2.username,
    });
    const thought3 = new Thought({
        thoughtText:"Shine bright like a diamond",
        username: user1.username,
      });
    const thought4 = new Thought({
        thoughtText: "Lights will guide you home",
        username: user2.username,
    });

    const thought5 = new Thought({
        thoughtText: "Started from the bottom, now we're here",
        username: user1.username,
    });
    const thought6 = new Thought({
        thoughtText: "Don't believe me, just watch!",
        username: user2.username,
    });
    

    // Save thoughts
    await Thought.insertMany([thought1, thought2, thought3, thought4, thought5, thought6]);

    // Create reactions
    const reaction1 = new Reaction({
      reactionBody: 'ethereal magic, pure bliss',
      username: user6.username,
    });
    const reaction2 = new Reaction({
      reactionBody: 'emotional journey, pure magic',
      username: user5.username,
    });
    const reaction3 = new Reaction({
        reactionBody: 'emotional journey, pure magic',
        username: user4.username,
      });
      const reaction4 = new Reaction({
        reactionBody: 'Master storyteller, capturing raw emotions.',
        username: user3.username,
      });
      const reaction5 = new Reaction({
        reactionBody: 'Fearless trendsetter, breaking all boundaries.',
        username: user2.username,
      });
      const reaction6 = new Reaction({
        reactionBody: 'Reigns with unmatched talent',
        username: user1.username,
      });

    // Add reactions to thoughts
    thought1.reactions.push(reaction1);
    thought2.reactions.push(reaction2);
    thought3.reactions.push(reaction3);
    thought4.reactions.push(reaction4);
    thought5.reactions.push(reaction5);
    thought6.reactions.push(reaction6);

    // Save thoughts and reactions
    await Promise.all([thought1.save(), thought2.save(),thought3.save(),thought4.save(), thought5.save(),thought6.save()]);

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } 
}
});

seedData().then(() => process.exit());


