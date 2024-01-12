


const IsAuth =
{
    user: (req,res,next) =>{
        console.log("Check Session:" , req.session)
        if(req.session.isAuth && (req.session.role == "user" || req.session.role == "admin" ))
        {
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
            next();
        }
        else
        {
            res.status(401).json({message:"Not authorized to access this resource. No valid admin authorization transmitted"})
        }


    }



}


export default IsAuth;