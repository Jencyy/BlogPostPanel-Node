const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const passport = require('../config/passport')
const upload = require('../config/multer');
// const { isUser, isAdmin } = require('../role'); // Importing the role-based middleware
const isAuth = require('../controllers/middleware/auth');

// Blog routes
router.get('/', isAuth,blogController.defaultRoute);
router.get('/blogs',isAuth, blogController.getAllBlogs);
router.get('/blogs/my-blogs',isAuth, blogController.getMyBlogs); // Only authors can view their own blogs
router.post('/blogs/add',isAuth, upload.single('image'), blogController.addBlog); // Only authors can add blogs
router.post('/blogs/edit/:id',isAuth, upload.single('image'), blogController.editBlog); // Only authors can edit their blogs
router.get('/blogs/delete/:id',isAuth, blogController.deleteBlog); // Only admins can delete blogs
router.get('/blogs/new',isAuth, blogController.addForm);
router.get('/blogs/editForm/:id',isAuth, blogController.editForm);



// topic
router.get('/addTopicForm',isAuth, blogController.addTopicForm);
router.post('/addTopic',blogController.addTopic)
router.post('/deleteTopic/:id', isAuth, blogController.deleteTopic); 

// sub topic
router.get('/subTopicForm',blogController.subTopicForm);
router.post('/addSubTopic',blogController.addSubTopic);

// comment
router.post('/blogs/:blogId/comment', blogController.addComment);

// Auth routes
router.get('/signUpForm', authController.signUpFormCon);
router.post('/register', upload.single('profilePic'), authController.signUpCon);
router.get('/logInForm', authController.logInFormCon);
router.post('/login',passport.authenticate('local', { failureRedirect: '/logInForm'}), authController.logInCon)
router.get('/logout', authController.logoutCon);
router.get('/changePassForm',authController.changePassForm);
router.post('/changePassword',authController.changePass)
router.get('/forgotPassForm',authController.forgotPassForm)
router.post('/verifyEmail',authController.verifyEmail);
router.get('/resetPassForm/:id',authController.resetPassForm);
router.get('/verifyOtpForm/:id',authController.verifyOtpForm);
router.post('/verifyOTP/:id',authController.verifyOTP);
router.post('/resetPassword/:id',authController.resetPassword);

module.exports = router;
    