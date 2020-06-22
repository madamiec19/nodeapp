const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    car: {type: String, required: true},
    address: {type: String, required: true},
    scheduledDate: {type: String, required: true},
    createdTimeMilli: {type: String},  // zrobić żeby przy generowaniu ustawiało aktualną datę
    receiveTimeMilli: {type: String }, 
    endTimeMilliTimeMilli: {type: String }, 
    comment: {type: String},
    driverId: {type: String }, 
    carMileageStart: {type: String},
    carMileageStop: {type: String}, 
    taskCreator: {type: String, required: true}
});
    
module.exports = mongoose.model('Task', taskSchema);