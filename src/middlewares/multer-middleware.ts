import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "././public");
  },
  filename(req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname
    );
  },
});

module.exports = multer({ storage: storage });
