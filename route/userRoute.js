const router = require("express").Router();
const usercontroller = require("../controller/usercontroller.js");

router.get("/getGalleryImage",usercontroller.getGalleryImage);

router.get("/getClientReview",usercontroller.getClientReview);

router.get("/getContacts",usercontroller.getContacts);

router.get("/getCareer",usercontroller.getCareer);

module.exports = router;