require('dotenv').config;
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"]
    })
);

const connection = () => app.listen(process.env.PORT, () => console.log('Server is running'));

connection();
