var router = require("express").Router();

var mongoose = require('mongoose');
const controllerSnake = require('../controllers/snake.controller.js'); //conect with controller snake

// Register a new user
router.get("/:username/:passwd/:email", controllerSnake.registerUser);

// Login a new  User
router.get("/:username/:passwd", controllerSnake.loginUser);

// Comprobar que exista o no el usario para logearte o para registrarte
router.get("/", controllerSnake.findUsers);


module.exports = router;
