const multer = require("multer");
const path = require("path");
const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};
var storage = multer.diskStorage({

  destination: (req, file, cb) => {
  const destinationPath= path.join(__dirname,'../public/uploads/')

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, `${file.originalname}`,
    // `${Date.now()}-bezkoder-${file.originalname}`
    );
  },
});
var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;