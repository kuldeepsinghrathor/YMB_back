const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try {
        if(req.cookies.YMB_token){
            const token = req.cookies.YMB_token;
            const decode = jwt.verify(token,process.env.SecretKey);
            req.userData = decode;
            next();
        }else if(!req.cookies.YMB_token){
            return res.redirect("/api/login");
        }
    } catch (error) {
        res.json({success:false,message:"Auth Failed",error:error});
    }
}