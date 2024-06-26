// // Import necessary modules
// const express = require('express');
// const session = require('express-session');
// const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const crypto = require('crypto');
// const path = require('path');
// const encoder = bodyParser.urlencoded();


// // Initialize Express app
// const app = express();

// // Generate a random secret key
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log(secretKey);

// // Configure middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: false
// }));

// // Configure MySQL database connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sharvipw#2003',
//     database: 'docgenius',
// });

// // Connect to the database
// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         process.exit(1); // Exit the application if the database connection fails
//     } else {
//         console.log('Connected to MySQL database');
//     }
// });

// app.get('/', (req, res) => {
//     res.redirect('/LogIn');
// });

// // Set up a route for the login page
// app.get('/logIn', (req, res) => {
//     res.sendFile(__dirname + '/LogIn.html');
// });

// // Serve the CSS file for the login page with the correct MIME type
// app.get('/style.css', (req, res) => {
//     res.header('Content-Type', 'text/css');
//     res.sendFile(__dirname + '/style.css');
// });

// // Serve the JavaScript file for the login page with the correct MIME type
// app.get('/script.js', (req, res) => {
//     res.header('Content-Type', 'application/javascript');
//     res.sendFile(__dirname + '/script.js');
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', '/login.html'));
//   });

// // Route for handling login requests
// // Route for handling login requests
// // app.post('/login', (req, res) => {
// //     const { Email, Password } = req.body;

// //     console.log('Received login request for email:', Email);

// //     // Query the database to find the user by email
// //     const sql = 'SELECT * FROM user WHERE Email = ?';
// //     db.query(sql, [Email], (err, results) => {
// //         if (err) {
// //             console.error('Error querying database:', err);
// //             return res.status(500).send('Error occurred while logging in.');
// //         }

// //         console.log('Query results:', results);

// //         // If user with the provided email is found
// //         if (results.length > 0) {
// //             const user = results[0];

// //             console.log('User found in database:', user);

// //             // Compare the hashed password with the provided password
// //             bcrypt.compare(Password, user['Hashed-Password'], (err, isValid) => {
// //                 if (err) {
// //                     console.error('Error comparing passwords:', err);
// //                     return res.status(500).send('Error occurred while logging in.');
// //                 }

// //                 console.log('Password comparison result:', isValid);

// //                 // Display alert messages
// //                 if (isValid) {
// //                     res.send('<script>alert("Login successful!"); window.location.href = "http://localhost:8080/#";</script>');
// //                 } else {
// //                     res.send('<script>alert("Wrong credentials"); window.location.href = "/login";</script>');
// //                 }
// //             });
// //         } else {
// //             // User not found
// //             console.log('User not found in database');
// //             res.send('<script>alert("User not found"); window.location.href = "/login";</script>');
// //         }
// //     });
// // });

// //youtube code
// app.post("/login",encoder, function(req,res){
//     var Email = req.body.Email;
//     var Password = req.body.Password;
//     Connection.query("select * from user where Email = ? and Password = ?", [Email, Password],function(error,results,fields){
//         if (results.length > 0){
//             res.redirect("/docgenius");
//         }
//         else{
//             res.redirect("/");
//         }
//         res.end();
//     })
// })

// //when log in is successful
// app.get("/docgenius",function(req,res){
//     res.sendFile(__dirname + "docgenius-app\public\index.html");
// })

// // Start the Express server
// const port = 7000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


//-----------------------------------------------------------------------------------------
//Thislogin funct works
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based MySQL library
const path = require('path'); // Import the path module
const app = express();
const session = require('express-session');
const port = 7000; // Adjust port number if needed

// Replace with your actual database credentials
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sharvipw#2003', // **Important:** Secure your password in production!
  database: 'docgenius'
});

//session
app.use(session({
  secret: '10',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// Route for the root path (/)
app.get('/', (req, res) => {
    // Send the HTML content for your main page
    res.sendFile(path.join(__dirname, 'public', 'LogIn.html')); // Assuming your main page is index.html
  });

// Parse incoming form data (replace with error handling)
app.use(bodyParser.urlencoded({ extended: false }));

// Login route handling
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );
    await connection.release();

    if (rows.length === 0) {
      // Handle invalid email case (optional: display error message)
      console.error('Invalid email');
      res.status(401).send('Invalid email or password'); // Send appropriate error response
      return;
    }

    const user = rows[0]; // Assuming there's only one matching email
    // Implement secure password hashing/comparison (replace with appropriate hashing library)
    if (password !== user.Password) { // Replace 'hashed_password' with your actual column name
      // Handle invalid password case (optional: display error message)
      console.error('Invalid password');
    //   res.status(401).send('Invalid email or password'); // Send appropriate error response
      return;
    }

    // Login successful:
    console.log('Login successful for user:', user.Email);
    // Store username in the session
    req.session.username = user.Username;
    // Replace with appropriate response based on your authentication strategy (e.g., session management or token)
    res.redirect('http://localhost:8080/#'); // Redirect to the target URL
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error'); // Handle database errors gracefully
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
