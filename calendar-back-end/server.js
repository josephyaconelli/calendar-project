const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const mongoose = require('mongoose')
const LOCAL_DB = 'mongodb://127.0.0.1:27017/calendar-project'
mongoose.connect(
    process.env.MONGODB_URI || LOCAL_DB,
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
app.use("/api/auth", authRoutes)

app.post("/api/auth/validate", validateAuth, (req, res) => {
  res.status(200).json({ validated: true })
})


app.listen(port, () => console.log(`Listening on port ${port}`))