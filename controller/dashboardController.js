

const DashboardController = {
    
    getDashboardData : async (req,res) =>
    {

        const userId = req.session.userId

        const user = await User.findById(userId);
        const {username,email,role} = user;

        



    }


}

export default DashboardController