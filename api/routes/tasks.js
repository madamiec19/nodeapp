const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

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

// zwraca liste wszystkich tasków
router.get('/', (req, res, next) => {
    Task.find()
        .select('title car address scheduledDate comment driverId taskCreator _id')
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
    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        car: req.body.car,
        address: req.body.address,
        scheduledDate: req.body.scheduledDate,
        comment: req.body.comment,
        driverId: req.body.driverId,
        taskCreator: req.body.taskCreator
    });

    task.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "handling post tasks",
                createdTask: {
                    id: result.id,
                    title: result.title,
                    car: result.car,
                    address: result.address,
                    scheduledDate: result.scheduledDate,
                    comment: result.comment,
                    driverId: result.driverId,
                    taskCreator: result.taskCreator,
                    request: {
                        type: "GET",
                        url: 'http://vps-f1c11595.vps.ovh.net:3000/tasks/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err)
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

module.exports = router;
