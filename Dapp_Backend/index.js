import express, { json } from 'express'
import { certRoute } from './Routes/certRoute.js'

const app = express()
app.use(json())
app.use('/',certRoute)

app.listen(8000,function() {
    console.log("Port 8000 is connected");
    
})

