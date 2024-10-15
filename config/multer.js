const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        console.log("file",file)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname
        console.log("uniqueSuffix", uniqueSuffix)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage })

module.exports = upload