const router = require('express').Router();
let Feedback = require('../schemas/feedback.model');

router.route('/').get((req, res) => {
    Feedback.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const reply = req.body.reply;

    const newFeedback = new Feedback({
        name,
        email,
        rating,
        comment,
        reply
    });

    newFeedback.save()
        .then(() => res.json('Feedback Posted!'))
        .catch(err => res.status(400).json('Error is: ' + err));
});

router.route('/:feedbackID').put((req, res) => {

    const ID = req.params.feedbackID;

    const feedback = {
        name: req.body.name,
        email: req.body.email,
        rating: req.body.rating,
        comment: req.body.comment,
        reply: req.body.reply,
    }


    Feedback.updateOne({_id: ID}, feedback)
        .then(() => res.json('Feedback Posted!'))
        .catch(err => res.status(400).json('Error is: ' + err));

})

module.exports = router;