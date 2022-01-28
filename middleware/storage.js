var multer = require("multer");
var memoryStorage = multer.memoryStorage();
var memoryUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 500000, files: 1 },
}).single("image");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const upload = multer({ storage, fileFilter });

module.exports = upload;
