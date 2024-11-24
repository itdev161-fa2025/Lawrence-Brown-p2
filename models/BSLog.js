import mongoose from 'mongoose';

const BSLogSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },    
    time: {
        type: String,
        required: true,
        unique: false
    },
    mgdl: {
        type: String,
        required: false
    }
});

const BSLog = mongoose.model('bslentry', BSLogSchema);

export default BSLog;
