// Import necessary modules
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const crypto = require('crypto');

// Initialize Express app
const app = express();

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

// Configure MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sharvipw#2003',
  database: 'docgenius',
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Exit the application if the database connection fails
    } else {
        console.log('Connected to MySQL database');
    }
});

// Route for handling login requests
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user by email
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error occurred while logging in.');
        }

        // If user with the provided email is found
        if (results.length > 0) {
            const user = results[0];

            // Compare the hashed password with the provided password
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).send('Error occurred while logging in.');
                }

                // If passwords match, create a session and redirect
                if (isValid) {
                    req.session.userId = user.id;
                    res.redirect('/dashboard'); // Redirect to dashboard or any other page
                    console.log("Log in successful!");
                } else {
                    res.status(401).send('Invalid email or password.'); // Unauthorized
                }
            });
        } else {
            res.status(401).send('User not found.'); // Unauthorized
        }
    });
});

// Start the Express server
const port = 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
