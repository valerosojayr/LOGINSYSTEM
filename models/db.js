const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
require('./user.model');


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Connected to MongoDb") })
    .catch((err) => { console.error("Could not connect to MongoDB", + JSON.stringify(err, undefined, 2)) })


