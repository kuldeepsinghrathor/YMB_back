const contactModal = require("../modal/contact.js");
const careerModal = require("../modal/career.js");
const galleryModal = require("../modal/gallery.js");
const clientReviewModal = require("../modal/clientReview.js");
const adminUserModal = require("../modal/adminUser.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAdminDashboard = async (req,res) =>{
    try {
        var gallery = await galleryModal.find({});
        var contact = await contactModal.find({});
        var career = await careerModal.find({});
        var careerReview = await clientReviewModal.find({});
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        return res.render('dashboard',{galleryData:gallery.length,contactData:contact.length,careerData:career.length,careerReview:careerReview.length,adminName:adminDatail.userName,adminImage:adminDatail.profilePhoto.path});
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.getAddGallery = async (req,res) =>{
    try {
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        return res.render('addGallery',{adminName:adminDatail.userName,adminImage:adminDatail.profilePhoto.path});
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.viewGallery = async (req,res) =>{
    try {
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        galleryModal.find({}).then((result,error)=>{
            const galleryLength = result.length;
        if (result) {
            return res.render('viewGallery',{galleryLength: galleryLength, galleryData:result,adminName:adminDatail.userName,adminImage:adminDatail.profilePhoto.path});
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.addClientReview = async (req,res) =>{
    try {
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        return res.render('addClientReview',{adminName:adminDatail.userName,adminImage:adminDatail.profilePhoto.path});
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.login = async (req,res) =>{
    try {
        return res.render('login');
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.viewClientReview = async (req,res) =>{
    try {
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        clientReviewModal.find({}).then((clients,error)=>{
            const clientLength = clients.length;
        if (clients) {
            return res.render('viewClientReview',{adminImage:adminDatail.profilePhoto.path,adminName:adminDatail.userName,galleryLength: clientLength, clientReviewData:clients});
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.viewContact = async (req,res) =>{
    try {
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        contactModal.find({}).then((contact,error)=>{
            const contactLength = contact.length;
        if (contact) {
            return res.render('viewContact',{adminImage:adminDatail.profilePhoto.path,adminName:adminDatail.userName,contactLength: contactLength, contactdata:contact});
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.viewCareer = async (req,res) =>{
    try {
        var adminDatail = await adminUserModal.findById(req.userData.userId);
        careerModal.find({}).then((career,error)=>{
            const careerLength = career.length;
        if (career) {
            return res.render('viewCareer',{adminImage:adminDatail.profilePhoto.path,adminName:adminDatail.userName,careerLength: careerLength, careerData:career});
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', error });
    }
}

exports.contact = async (req,res)=>{
    try {
        if(!req.body.name || !req.body.email || !req.body.mobile || !req.body.subject || !req.body.message){
            res.json({success:false,message:"All fields is required"});
        }else if(req.body.name && req.body.email && req.body.mobile && req.body.subject && req.body.message){
            const contact = new contactModal({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                subject:req.body.subject,
                message:req.body.message
            })
            await contact.save();
            res.json({success:true,message:"Contact form submitted successfully"});
        }
    } catch (error) {
        if(error.keyPattern.mobile && error.code == "11000"){
            res.json({success:false,message:"Mobile number is already exist"});
        }else if(error.keyPattern.email && error.code == "11000"){
            res.json({success:false,message:"Email id is already exist"});
        }
    }
}

exports.career = async(req,res)=>{
    try {
        if(!req.body.name || !req.body.email || !req.body.mobile || !req.body.education_level || !req.body.message || !req.body.resume_pdf){
            res.json({success:false,message:"All fields are required"});
        }else if(req.body.name && req.body.email && req.body.mobile && req.body.education_level && req.body.message && req.body.resume_pdf){
            const career = new careerModal({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                education_level:req.body.education_level,
                message:req.body.message,
                resume_pdf:{
                    filename:req.file.originalname,
                    path:req.file.path
                }
            })
            await career.save();
            res.json({success:true,message:"Career form submitted successfully"});
        }
    } catch (error) {
        if(error.keyPattern.mobile && error.code == "11000"){
            res.json({success:false,message:"Mobile number is already exist"});
        }else if(error.keyPattern.email && error.code == "11000"){
            res.json({success:false,message:"Email id is already exist"});
        }
    }
}

exports.gallery = async(req,res)=>{
    try {
        if(!req.body.text_1 || !req.file){
            res.json({success:false,message:"All fields are required"});
        }else if(req.body.text_1 && req.file){
            const gallery = new galleryModal({
                text_1:req.body.text_1,
                image:{
                    filename:req.file.originalname,
                    path:req.file.path
                }
            })
            await gallery.save();
            res.json({success:true,message:"Gallery data added successfully"});
        }
    } catch (error) {
        if(error.keyPattern.text_1 && error.code == "11000"){
            res.json({success:false,message:"teext_1 name is already exist"});
        }
    }
}

exports.clientreview = async(req,res)=>{
    try {
        if(!req.body.name || !req.body.designation || !req.body.message || !req.file){
            res.json({success:false,message:"All fields are required"});
        }else if(req.body.name && req.body.designation && req.body.message && req.file){
            const clientreview = new clientReviewModal({
                name:req.body.name,
                designation:req.body.designation,
                message:req.body.message,
                image:{
                    filename:req.file.originalname,
                    path:req.file.path
                }
            })
            await clientreview.save();
            res.json({success:true,message:"Client review submitted successfully"});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.adminLogin = async(req,res) =>{
    adminUserModal.find({ email: req.body.email }).exec().then((result) => {
        if (result.length < 1) {
            return res.json({ success: false, message: 'User Not Found!' });
        } else {
            const user = result[0]
            bcrypt.compare(req.body.password, user.password, (err, ret) => {
                if (ret) {
                    const payload = {
                        userId: user._id,
                    }
                    const token = jwt.sign(payload, process.env.SecretKey);
                    res.cookie("YMB_token",token,{httpOnly:true,maxAge:86400000});
                    return res.json({ success: true, token: token, message: 'Login Successfully !' })
                } else {
                    return res.json({ success: false, message: 'Password does not match!' })
                }
            })
        }
    }).catch(err => {
        res.json({ success: false, message: 'Authentication Failed!' })
    })
}

exports.logout = async (req,res) =>{
    try {
        res.clearCookie("YMB_token");
        res.redirect("/api/login");
    } catch (error) {
        res.json({ success: false, message: 'Authentication Failed!' });
    }
}