const express = require('express')
const cors = require('cors')
const fs = require('fs')
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req, res) => {
  res.status(200).send(`Base64 Encoded PDF Download. Call POST /getpdf`)
})

// Fetch static PDF file from disk and send in base64 format
app.post('/getpdf', (req, res) => {
  const buff = fs.readFileSync('hello.pdf')
  const base64data = buff.toString('base64')
  
  res.status(200).json({
    FileContents: base64data
  })
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
