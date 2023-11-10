const router = require('express').Router();
const { User } = require('../../models');

// Sign up new user
router.post('/', async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            where: { user_name: req.body.user_name }
        });

        if (existingUser) {
            // User already exists, send a conflict response
            return res.status(409).json({ message: 'User already exists.' });
        }

        // If user does not exist, create a new user
        const userData = await User.create({
            user_name: req.body.user_name,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // Redirect to the profile page
            res.redirect('/profile');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Password must be atleast 8 characters.' });
    }
});


// Login route for user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { user_name: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(401).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            // res.status(200).json({ user: userData, message: 'You are now logged in!' });
            res.redirect('/profile');
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// Logout route for user
router.post('/logout', (req, res) => {
    console.log("logging out")
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
