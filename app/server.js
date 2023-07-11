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
  let img = fs.readFileSync(path.join(__dirname, "images/profile-andrea.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.get('/profile-picture-ari', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-ari.jpeg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.get('/metrics', function (req, res) {
  // Expose the Prometheus metrics endpoint
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});