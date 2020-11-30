var express = require('express');
var router = express.Router();
const EventsCollection = require("../models/schemas").Events;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sub/Pub Event System' });
});

// create event topic
router.post('/publish/:topic', async function(req, res, next) {
  console.log(req.params, req.body)

  const {topic} = req.params || {}
  const {message} = req.body || {} 

  await EventsCollection.create({
    topic, 
    message
  }).then(() => {
    res.status(200).json({
      status: true,
      message: "Event Published successfully.",
      error: null,
    });
  }).catch((err) => {
    return res.status(400).json({
      status: false,
      message: err.message,
      data: null,
    });
  })
});

// subscribe to event topic
router.post('/subscribe/:topic', async function(req, res) {
  console.log(req.params, req.body)


// find event by this {topic}
// and update the subscription {message}
const filter = { topic: req.params.topic };
const update = { message: req.body.message };
  let doc = await EventsCollection.findOneAndUpdate(
    filter,
    { "$push": { "subscription": update } },
    { new: true});
    if (doc){
      res.status(200).json({
        status: true,
        message: "Event Subscription successfully.",
        error: null,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Topic not found! Try another topic.",
        data: null,
      });
    }


return res.status(200).json({
  status: true,
  message: "Subscription successfully",
  data: doc,
});
})


// get all events
router.get('/events', async function(req, res) {
  await EventsCollection.find({})
  .then((data) => {
       // Clean up data
    //    data = {
    //     _id: data._id,
    //     Events: data.topic,
    //     message: data.message
    // }
    return res.status(200).json({
      status: true,
      message: "All Events successfully",
      data: data,
    });
  }).catch((err)=> {
    return res.status(400).json({
      status: false,
      message: err.message,
      data: null,
    });
    });
})

module.exports = router;
