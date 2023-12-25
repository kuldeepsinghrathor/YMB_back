const galleryModal = require("../modal/gallery.js");
const clientReviewModal = require("../modal/clientReview.js");
const contactModel = require("../modal/contact.js");
const careerModal = require("../modal/career.js");

exports.getGalleryImage = async (req,res)=>{
    try {
        galleryModal.find({}).then((result,error)=>{
            const galleryLength = result.length;
        if (result) {
            res.send({ success: true, message: 'Gallery data fetch successfully', galleryLength: galleryLength, result });
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', err });
    }
}

exports.getClientReview = async (req,res)=>{
    try {
        clientReviewModal.find({}).then((clients,error)=>{
            const clientLength = clients.length;
        if (clients) {
            res.send({ success: true, message: 'Client reviews fetch successfully', galleryLength: clientLength, clients });
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', err });
    }
}

exports.getContacts = async (req,res)=>{
    try {
        contactModel.find({}).then((contact,error)=>{
            const contactLength = contact.length;
        if (contact) {
            res.send({ success: true, message: 'Contact data fetch successfully', contactLength: contactLength, contact });
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', err });
    }
}

exports.getCareer = async (req,res)=>{
    try {
        careerModal.find({}).then((career,error)=>{
            const careerLength = career.length;
        if (career) {
            res.send({ success: true, message: 'Career data fetch successfully', careerLength: careerLength, career });
        } else {
            res.status(400).send({ success: false, message: 'Internal Error!' })
        }
        })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Internal Error!', err });
    }
}