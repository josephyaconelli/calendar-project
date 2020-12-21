const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')


const mongoose = require('mongoose')

const DB = "mongodb+srv://test:pass@cluster0.7zw4v.mongodb.net/calendar-project?retryWrites=true&w=majority"

mongoose.connect(
    DB || process.env.MONGODB_URI || LOCAL_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  ) 

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  console.log("Database connection established")
})

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use('/', express.static(path.join(__dirname + '/dist')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const validateAuth = require("./middleware/validateAuth")

const authRoutes = require("./routes/auth")
const eventsRouthes = require("./routes/events")
const shareRoutes = require("./routes/share")

app.use("/auth", authRoutes)
app.use("/events", validateAuth, eventsRouthes)
app.use("/share", shareRoutes)


app.listen(port, () => console.log(`Listening on port ${port}`))