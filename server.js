import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './models/User';
import BSLog from './models/BSLog';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000'}));

// API endpoints
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

app.get('/bslog', (req, res) =>
    res.send('http get request sent to bslog api endpoint')
);

/**
 * @route POST api/users
 * @desc Register user
 */
app.post('/api/users',
  [
    check('name', 'Please enter your name')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email: email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists'}] });
        }

        // Create a new user
          user = new User({
          name: name,
          email: email,
          password: password
        });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save to the db and return
        await user.save();
       
        // Generate and return a JWT token
        const payload = {
          user: {
            id: user.id
          }
        }

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '10hr' },
          (err, token) => {
            if (err) {
              throw (err);              
            }
            res.json({ token: token });
          }
        );
      } catch (error) {
        res.status(500).send('Server error');
      }
    }
});


/**
 * @route POST bslentry
 * @desc Enter Blood Sugar Record
 */
app.post('/api/bslentry',
  [
    check('date', 'Please enter date of blood sugar measurement')
      .not()
      .isEmpty(),
    check('time', 'Please enter time of blood sugar measurement')
      .not()
      .isEmpty(),
    check('mgdl', 'Please enter blood sugar measurement')
      .isLength({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { time, date, mgdl } = req.body;
      try {
        let bslentry = BSLog.create();

        // Create a new Blood Sugar Log Entry
          bslentry = new BSLog({
          date: date,
          time: time,
          mgdl: mgdl
        });

        // Save to the db and return
        await bslentry.save();
       
        // Generate and return a JWT token
        const payload = {
          bslentry: {
            id: bslentry.id
          }
        }

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '10hr' },
          (err, token) => {
            if (err) {
              throw (err);              
            }
            res.json({ token: token });
          }
        );
      } 
      catch (error) {
        res.status(500).send('Server error');
      }
    }
});

// Connection listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));
