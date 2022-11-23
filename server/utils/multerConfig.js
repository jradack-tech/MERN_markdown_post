const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "../client/public/uploads",
  // destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      "upload_" +
        file.fieldname +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

module.exports = () =>
  multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        console.log("error");
        return cb(new Error("Only .png, .jpg, .jpeg, .gif format allowed!"));
      }
    },
  }).single("image");
