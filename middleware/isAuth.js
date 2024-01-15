


const IsAuth =
{
    allRoles: (req,res,next) =>{
        console.log("Check Session:" , req.session)
        if(req.session.isAuth && (req.session.role == "user" || req.session.role == "admin" ))
        {
            console.log("ID:", req.sessionID)
            next();
        }
        else
        {
            res.status(401).json({message:"Not authorized to access this resource. No valid user authorization transmitted"})
        }


    },

    admin: (req,res,next) => {
        if(req.session.isAuth && req.session.role == "admin")
        {
            console.log(req.sessionID)
            next();
        }
        else
        {
            res.status(401).json({message:"Not authorized to access this resource. No valid admin authorization transmitted"})
        }


    },
    notLoggedIn: (req,res,next) =>{
        console.log("Check Session:" , req.session)
        if(req.session.isAuth)
        {
            res.status(401).json({message:"You are already logged in. If you really want to do this please log out."})
        }
        else
        {
            next();
        }


    },



}


export default IsAuth;