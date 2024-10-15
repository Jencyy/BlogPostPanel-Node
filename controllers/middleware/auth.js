const isAuth = (req, res, next) => {

    console.log("is Authenticated",req.isAuthenticated());
    
    if (req.isAuthenticated()) {
        console.log("Auth")
        next();
    } else {
        res.redirect('/logInForm')
    }
 
    
}

module.exports = isAuth;