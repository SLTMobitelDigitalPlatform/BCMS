const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventRoutes = require('./routes/eventRoutes');  // Corrected import path

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://BCMS:BCMS@cluster0.tewri0m.mongodb.net/?retryWrites=true&w=majority';  // Replace with your MongoDB URI

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/events', EventRoutes);

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to the database', err);
    });
