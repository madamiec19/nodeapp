const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

// zwraca liste wszystkich tasków
router.get('/', (req, res, next) => {
    Task.find()
        .select()
        .exec()
        .then(docs => {
            res.status(200).json({
                tasks: docs.map(doc => {
                    return {
                        id: doc.id,
                        action: doc.action,
                        address: doc.address,
                        car: doc.car,
                        scheduledTimeMilli: doc.scheduledTimeMilli,
                        carMileageStart: doc.carMileageStart,
                        carMileageStop: doc.carMileageStop,
                        driverId: doc.driverId,
                        comment: doc.comment,
                        coordinatorId: doc.taskCreator,
                        request: {
                            type: "GET",
                            url: 'http://vps-f1c11595.vps.ovh.net:3000/tasks/' + doc._id
                        }
                    }
                })
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// zwraca task o podanym id
router.get('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
        .exec()
        .then(doc => {
            console.log("From db", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "No valid entry found for given id" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//zwraca liste tasków o danym driverId
router.get('/driver/:driverId', (req, res, next) => {
    const driverId = req.params.driverId;
    Task.find()
        .select('title car address scheduledDate comment driverId taskCreator _id')
        .where("driverId").equals(driverId)
        .exec()
        .then(docs => {
            const response =
                docs.map(doc => {
                    return {
                        id: doc.id,
                        title: doc.title,
                        car: doc.car,
                        address: doc.address,
                        scheduledDate: doc.scheduledDate,
                        driverId: doc.driverId,
                        comment: doc.comment,
                        taskCreator: doc.taskCreator,
                        request: {
                            type: "GET",
                            url: 'http://vps-f1c11595.vps.ovh.net:3000/tasks/' + doc._id
                        }
                    }
                });
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });


});

// dodaje nowy task
router.post('/', (req, res, next) => {
    const createdTime = Date.now();
    
    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        car: req.body.car,
        action: req.body.action,
        address: req.body.address,
        scheduledTimeMilli: req.body.scheduledTimeMilli,
        comment: req.body.comment,
        carMileageStart: req.body.carMileageStart,
        carMileageStop: req.body.carMileageStop,
        driverId: req.body.driverId,
        createdTimeMilli: createdTime,
        receiveTimeMilli: 0,
        endTimeMilli: 0,
        coordinatorId: req.body.coordinatorId
    });

    task.save()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });

});

// updateuje task o podanym id
router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const props = req.body;
    Task.update({ _id: id }, props).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// usuwa task o podanym id
router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//TODO! usuwa wszystkie taski
router.delete('/', (req, res, next) => {
    Task.remove().exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;
