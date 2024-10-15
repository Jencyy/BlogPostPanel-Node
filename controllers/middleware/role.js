const isAdmin = (req, res, next) =>{
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.redirect('/');
}
const isUser = (req, res, next) =>{
    if (req.user && req.user.role === 'user') {
        return next();
    }
    return res.redirect('/');
}

module.exports= {
    isAdmin,
    isUser
}
