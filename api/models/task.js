const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    car: {type: String, required: true},
    action: {type: String, required: true},
    address: {type: String, required: true},
    scheduledTimeMilli: {type: Number, required: true},
    comment: {type: String},
    carMileageStart: {type: Number},
    carMileageStop: {type: Number},
    driverId: {type: String }, 
    createdTimeMilli: {type: String},  // zrobić żeby przy generowaniu ustawiało aktualną datę
    receiveTimeMilli: {type: String}, 
    endTimeMilli: {type: Number }, 
    coordinatorId: {type: String, required: true}
});
    
module.exports = mongoose.model('Task', taskSchema);
