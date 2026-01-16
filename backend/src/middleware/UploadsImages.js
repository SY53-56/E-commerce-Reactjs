

const multer= require("multer")
const storage = multer.memoryStorage()
const uploads = multer({storage})

module.exports = (field, maxCount) => uploads.array(field, maxCount);

