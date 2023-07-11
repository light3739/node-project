const express = require('express');
const path = require('path');
const fs = require('fs');
const prometheus = require('prom-client');

const app = express();

// Define a counter metric for the number of requests to the app
const counter = new prometheus.Counter({
  name: 'nodejsapp_requests_total',
  help: 'Total number of requests to the Node.js app',
});

app.get('/', function (req, res) {
  // Increment the counter metric for each request to the app
  counter.inc();

  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture-andrea', function (req, res) {
  fs.readFile(path.join(__dirname, "images/profile-andrea.jpg"), function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading file");
    } else {
      res.writeHead(200, {'Content-Type': 'image/jpg' });
      res.end(data);
    }
  });
});

app.get('/profile-picture-ari', function (req, res) {
  try {
    let img = fs.readFileSync(path.join(__dirname, "images/profile-ari.jpeg"));
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  } catch (error) {
    console.log(error);
    res.status(500).send("Error reading file");
  }
});

app.get('/metrics', function (req, res) {
  // Expose the Prometheus metrics endpoint
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

app.listen(8080, function () {
  console.log("App listening on port 3000!");
});