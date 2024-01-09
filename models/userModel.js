import mongoose from "mongoose";




const userSchema = new mongoose.Schema({
    username : String,
    hashedPassword: String,
}
);

export default mongoose.model("User", userSchema);