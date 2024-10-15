const passport = require('passport');
const LocalStrategy = require('passport-local');
const user_model = require('../models/usermodel');
const bcrypt = require('bcrypt');

// Set up the local strategy
passport.use(new LocalStrategy(
    { usernameField: "email" }, 
    
    async function (email, password, done) {
        console.log("passport in" , email,password)
        try {
            const user = await user_model.findOne({ email: email });

            if (!user) {
                return done(null, false);
            }

            // Compare the password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user); // If successful, return the user
        } catch (err) {
            return done(err); // Pass any errors to done
        }
    }
));

// Serialize user to store in session
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async function (id, done) {
    try {
        const user = await user_model.findById(id);
        done(null, user); // Return user object if found
    } catch (err) {
        done(err, false); // Handle errors
    }
});

module.exports = passport;
