import dotenv from 'dotenv';
dotenv.config();

import express from  'express';

import {connectToDb} from './db/ConnectDb.js';



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(port, () => {
    connectToDb();
    console.log(`Server is running on port ${port}`);

});

