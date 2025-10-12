import mongoose from "mongoose";

const gistSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,    
        ref : 'User',
        default : null
    },
    title : {
        type : String,    
        required : true
    },
    language : {
        type : String,    
        required : true
    },
    code : {
        type : String,    
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
});

const Gist = mongoose.model("Gist", gistSchema)

export default Gist