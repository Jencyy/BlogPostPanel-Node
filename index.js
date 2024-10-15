// Import necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const db = require('./config/db'); 
const express_session = require('express-session')
const passport = require('./config/passport');
const flash = require('connect-flash'); 
// Initialize environment variables from     .env file
dotenv.config();

// Create Express app instance
const app = express();

// Define port, fallback to 3003 if no environment variable is set
const PORT = process.env.PORT || 3003;

// Define the directory path for views
const dirPath = path.join(__dirname, '/views/');


// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', dirPath);
    
// Middleware to parse request bodies (URL-encoded and JSON)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());


// Serve static files from the views directory
app.use("/",express.static(dirPath));

// Serve static files from the upload directory
app.use('/upload', express.static(path.join(__dirname, '/upload')));

app.use(express_session({ secret: 'tanjiro kamado', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Use the router for handling routes   
app.use(flash());

app.use('/', router);


// Start the server and log the URL if successful
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on http://localhost:${PORT}`);
    } else {
        console.error('Error starting the server:', err);
    }
});
