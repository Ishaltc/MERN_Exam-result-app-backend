const jwt= require("jsonwebtoken")

exports.generateAdminToken = (payload,expired)=>{
    return jwt.sign(payload,process.env.ADMIN_SECRET ,{
        expiresIn:expired,
    })
}


exports.generateUserToken = (payload,expired) => {
    return jwt.sign(payload,process.env.USER_SECRET,{
        expiresIn:expired,
    })
}