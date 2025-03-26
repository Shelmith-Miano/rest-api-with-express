
const express = require('express')// import express from "express";

const app = express()
const port = 4000


//handles GET requests
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//start server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

