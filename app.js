const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const routes = require('./routes/index.router');
const passport = require('passport');

require('./config/config');
require('./models/db');
require('./config/passportConfig');

app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
app.use(passport.initialize());

app.use("/api", routes);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }

});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))





