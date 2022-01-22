import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "././files");
  },
  filename(req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(
        null,
        new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
      );
    } else {
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), null);
    }
  },
});

module.exports = multer({ storage: storage });
