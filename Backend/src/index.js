import dotenv from 'dotenv';
dotenv.config();

import express from  'express';
import cookieParser from 'cookie-parser';

import {connectToDb} from './db/ConnectDb.js';
import userRoutes from './route/user.route.js';



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Backend server is running');
});


app.listen(port, () => {
    connectToDb();
    console.log(`Server is running on port ${port}`);

});

