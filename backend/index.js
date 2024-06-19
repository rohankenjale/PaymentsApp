const cors = require('cors')
const express = require("express");
const mainRouter = require('./routes/index')
const app = express();
app.use(cors({
    origin: [
      "*"    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  }));
app.options('*', cors(
    {
        origin: [
          "*"    ],
        methods: ['GET', 'POST', 'PUT', 'PATCH'],
        credentials: true,
      }
))
app.use(express.json());
app.use('/api/v1',mainRouter)

app.listen(8080,()=>{
    console.log(' listening on http://localhost:3000')
})
