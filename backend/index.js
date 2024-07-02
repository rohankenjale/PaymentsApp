const express = require("express");
const cors = require('cors')
const mainRouter = require('./routes/index')
const app = express();
app.use(cors());
app.options('*',cors());

// app.options('*', cors(
//     {
//         origin: [
//           "*"    ],
//         methods: ['GET', 'POST', 'PUT'],
//         credentials: true,
//         preflightContinue: false
//       }
// ))
app.use(express.json());
app.use('/api/v1',mainRouter)

app.listen(8080,()=>{
    console.log(' listening on http://localhost:3000')
})
