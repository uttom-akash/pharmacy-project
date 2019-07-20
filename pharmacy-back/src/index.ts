import express from 'express'
import autoRoute from './dev/automate'
import routes from './request/Requests'

const app = express();
const port = 8081;

app.enable('trust proxy')
app.use(express.json({ limit: "25mb" }));
app.use(express.json());
app.use("/api",routes)

// dev insert
app.use('/auto',autoRoute)


app.get('/', (req, res) => {
  res.send("Hello,backend")
});

app.listen(port,()=>console.log(`server is listening on ${port}`));