const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const authroute=require('./routes/auth');


app.use('/api/auth',authroute);

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
