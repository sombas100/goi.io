const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000
const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {console.log(`Server is listening on port: ${PORT}`)});

mongoose.connect('mongodb://127.0.0.1:27017/goi')
.then(() => {
    console.log('MongoDB connected')
})
.catch((error) => {
    console.log(error)
})