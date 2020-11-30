const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventsSchema = Schema({
  topic: { type: String, ref: "events",  required: true , unique: true, dropDups: true},
  message: { type: String, required: true, unique: true, dropDups: true },
  subscription:{type: Array, required: false}
});

const Events = mongoose.model("event", eventsSchema);

module.exports = {
    Events
  }