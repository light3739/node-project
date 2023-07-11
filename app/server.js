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

// Define a gauge metric for whether the server is alive
const aliveGauge = new prometheus.Gauge({
  name: 'nodejsapp_alive',
  help: 'Whether the Node.js app is alive',
});

// Set the initial value of the alive gauge to 1
aliveGauge.set(1);

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
      res.set('Content-Type', 'image/jpg');
      res.send(data);
    }
  });
});

app.get('/profile-picture-ari', function (req, res) {
  try {
    let img = fs.readFileSync(path.join(__dirname, "images/profile-ari.jpeg"));
    res.set('Content-Type', 'image/jpg');
    res.send(img);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error reading file");
  }
});

app.get('/metrics', function (req, res) {
  // Set the value of the alive gauge to 1
  aliveGauge.set(1);

  // Expose the Prometheus metrics endpoint
  res.set('Content-Type', prometheus.register.contentType);
  res.send(prometheus.register.metrics());
});

// Start the server and set the value of the alive gauge to 1
const server = app.listen(8080, function () {
  console.log("App listening on port 8080!");
  aliveGauge.set(1);
});

// Set the value of the alive gauge to 0 when the server is closed
process.on('SIGTERM', function () {
  server.close(function () {
    console.log("Server closed");
    aliveGauge.set(0);
    process.exit(0);
  });
});