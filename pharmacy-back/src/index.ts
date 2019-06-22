import express from 'express'
import requests from './request/AuthRequest'
import autoRoute from './dev/automate'

const app = express();
const port = 8081;

app.use(express.json());
app.use('/api',requests)

// dev insert
app.use('/auto',autoRoute)


app.get('/', (req, res) => {
  res.send("Hello,backend")
});

app.listen(port,()=>console.log(`server is listening on ${port}`));