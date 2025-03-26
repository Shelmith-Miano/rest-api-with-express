
const express = require('express')// import express from "express";

const app = express()
const port = 4000


//handles GET requests
app.get('/', (req, res) => {
    const user = {
        id:1,
        name:"miano",
        age:20,
    }
  res.json(user)
});

//start server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
