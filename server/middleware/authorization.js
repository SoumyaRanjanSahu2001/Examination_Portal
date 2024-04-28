const jwt = require('jsonwebtoken')

const authorization = async(req,res,next) => {
    const token = req.cookies.jwtoken;
    if(!token){
        return res.status(403);
    }
    try{
        const data = jwt.verify(token,process.env.SECRET);
        // console.log(data);
        req.userId = data.userId;
        req.name = data.name;
        req.isAdmin = data.isAdmin;
        req.year = data.year;
        return next();
    }catch{
        res.status(403)
    } 
}

module.exports = authorization;