const BlogModel = require('../models/blog');
const commentModel = require('../models/commentsModel');
const SubtopicModel = require('../models/subTopic');
const topicModel = require('../models/topicModel');
const UserModel = require('../models/usermodel');
// const flash= require('connect-flash')

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find();

        const comments =  await commentModel.find().populate({
            path: 'blog',
        }).populate({
            path: 'user',
        });
        
        console.log("anya forger", comments)
        res.render('blogs/allBlogs', {
            blogs,
            title: 'All Blogs',
            user: req.user,
            comments

        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Server Error");
    }
};

const defaultRoute = async (req, res) => {
    const blogs = await BlogModel.find();

    const topic = await SubtopicModel.find().populate({
        path: 'topic',
        populate: {
            path: 'author',
        }
    })
    console.log('default topic', topic)
    res.render('layout', { title: 'blog', blogs, user: req.user, login: req.flash('login') });

};


const addForm = (req, res) => {
    console.log("add form in");
    res.render('blogs/addBlogs.ejs');
}


const getMyBlogs = (req, res) => {


    BlogModel.find({ author: req.user._id })
        .then((myBlogs) => {
            res.render('blogs/myBlogs', { myBlogs, user: req.user });
        })
        .catch((err) => res.status(500).send(err));
};


// Add a new blog
const addBlog = (req, res) => {

    console.log('add blog in')
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBlog = new BlogModel({ title, content, image, author: req.user._id });
    newBlog.save()
        .then(() => res.redirect('/'))
        .catch((err) => res.status(500).send(err));
};
const editForm = async (req, res) => {
    const { id } = req.params;

    const blog = await BlogModel.findById(id); // Fetch the blog by ID
    if (!blog) {
        return res.status(404).send('Blog not found');
    }
    // Render the edit form with the blog data
    res.render('blogs/editBlogs', { blog }); // Pass the blog to the template

};

const editBlog = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    BlogModel.findById(id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).send('Blog not found');
            }

            // Check if the logged-in user is the author
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(403).send('Unauthorized action');
            }

            blog.title = title;
            blog.content = content;
            if (image) blog.image = image;

            return blog.save();
        })
        .then(() => res.redirect('/'))
        .catch((err) => res.status(500).send(err));
};

// Delete a blog  
const deleteBlog = (req, res) => {
    const { id } = req.params;

    BlogModel.findById(id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).send('Blog not found');
            }

            // Check if the logged-in user is the author
            if (blog.author.toString() !== req.user._id.toString()) {
                return res.status(403).send('Unauthorized action');
            }

            return BlogModel.findByIdAndDelete(id);
        })
        .then(() => res.redirect('/'))
        .catch((err) => res.status(500).send(err));
};

const addTopicForm = async (req, res) => {
    const topics = await topicModel.find();
    const user = await UserModel.findById(req.user._id);

    console.log('topics', topics)
    res.render('blogs/addTopicForm', { topics, user });
}
const addTopic = async (req, res) => {

    console.log('add topic in')
    const { title } = req.body;

    const newTopic = await new topicModel({ title, author: req.user._id });
    await newTopic.save()
    res.redirect('/addTopicForm')
}
const deleteTopic = async (req, res) => {
    const { id } = req.params;

    const topic = await topicModel.findById(id);
    console.log('deleted topic', topic)
    await topicModel.findByIdAndDelete(id);
    res.redirect('/addTopicForm');
};


const subTopicForm = async (req, res) => {
    const topics = await topicModel.find();
    console.log("topics", topics)
    res.render('blogs/subTopicForm', { topics });

}

const addSubTopic = async (req, res) => {
    const { subtopic, topic } = req.body;
    const newSubTopic = new SubtopicModel({
        subtopic,
        topic,

    });

    console.log("New Subtopic:", newSubTopic);

    await newSubTopic.save();
    res.redirect('/subTopicForm');

}

const addComment = async (req, res) => {

    console.log("tanjiro",req.params);
    const { comment } = req.body;
 
    const blog= await BlogModel.findById(req.params.blogId);
    const user = await UserModel.findById(req.user._id)

    const newComment = await new commentModel({
        comment,
        user,
        blog
        
    });
    await newComment.save();
    res.redirect('/blogs')
}




module.exports = {
    getAllBlogs,
    getMyBlogs,
    addBlog,
    editForm,
    editBlog,
    deleteBlog,
    defaultRoute,
    addForm,
    addTopicForm,
    addTopic,
    deleteTopic,
    subTopicForm,
    addSubTopic,
    addComment
}