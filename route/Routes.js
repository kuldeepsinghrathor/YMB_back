const router = require("express").Router();
const RouterController = require("../controller/Routercontroller.js");
const multer = require("multer");
const checkAuth = require("../middleware/Auth.js");

// Pdf
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pdf');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' +file.originalname);
    }
});
const upload = multer({storage:storage});

// Images
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' +file.originalname);
    }
});
const upload2 = multer({storage:storage2});

// ClientReviewImages
const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/clientReviewImages');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' +file.originalname);
    }
});
const upload3 = multer({storage:storage3});



router.post("/contactUs",checkAuth,RouterController.contact);

router.get("/dashboard",checkAuth,RouterController.getAdminDashboard);

router.get("/addGallery",checkAuth,RouterController.getAddGallery);

router.get("/viewGallery",checkAuth,RouterController.viewGallery);

router.get("/addClientReview",checkAuth,RouterController.addClientReview);

router.get("/viewClientReview",checkAuth,RouterController.viewClientReview);

router.get("/viewContact",checkAuth,RouterController.viewContact);

router.get("/viewCareer",checkAuth,RouterController.viewCareer);

router.get("/login",RouterController.login);

router.post("/addCareer",checkAuth,upload.single("resume_pdf"),RouterController.career);

router.post("/addGalleryImage",checkAuth,upload2.single("image"),RouterController.gallery);

router.post("/addClientReview",checkAuth,upload3.single("image"),RouterController.clientreview);

router.post("/adminLogin",RouterController.adminLogin);

router.get("/logout",RouterController.logout);

module.exports = router;