const express = require('express')
const router = require('./routes/routeur')
const app = express()

app.use(express.urlencoded())







app.use('/', router)



app.listen(4000, () => {
    console.log(`Application should be ready on port 4000 : http://localhost:4000/`)
})