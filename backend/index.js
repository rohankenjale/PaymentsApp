const cors = require('cors')
const express = require("express");
const mainRouter = require('./routes/index')

const app = express();
app.use(cors(
    {
    origin : ["https://payments-app-backend-three.vercel.app/"]
    }
));
app.use(express.json());
app.use('/api/v1',mainRouter)

app.listen(3000,()=>{
    console.log(' listening on http://localhost:3000')
})
