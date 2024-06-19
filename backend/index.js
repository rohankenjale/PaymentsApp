const cors = require('cors')
const express = require("express");
const mainRouter = require('./routes/index')
const corsMiddleware = require('./middleware')
const app = express();
app.use(cors());
app.enableCors({
    origin: [
      "*"    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  });
app.use(corsMiddleware)
app.use(express.json());
app.use('/api/v1',mainRouter)

app.listen(3000,()=>{
    console.log(' listening on http://localhost:3000')
})
