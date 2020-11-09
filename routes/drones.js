const express = require('express');
const Drone = require("../models/Drone.models")

// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((allTheDroneFromDB) => {
    res.render("drones/list", { drones: allTheDroneFromDB });
  })
  // ... your code here
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
  // ... your code here
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  let { name, propellers, maxSpeed } = req.body
  Drone.create({
    name: name,
    propellers: propellers,
    maxSpeed: maxSpeed
  }).then(() => {
    res.redirect("/drones")
  })
  // ... your code here
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneID = req.params.id;
  Drone.findById(droneID)
    .then(theDrone => res.render('drones/update-form', { drone: theDrone }))
    .catch(error => res.render("error", { error }))
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let droneID = req.params.id;
  let { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(droneID, {
    name,
    propellers,
    maxSpeed,  
  })
    .then(() => {
      res.redirect("/drones")
    })
    .catch(error => res.render("error", { error }))
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  let droneID = req.params.id;
  Drone.findByIdAndRemove(droneID)
    .then(() => {
      res.redirect("/drones")
    })
    .catch(error => res.render("error", { error }))
  // ... your code here
});

module.exports = router;
