// Initialize express and define a port
var express = require("express");
var app = express();
var path = require("path");
var port = 3000;

// Use the json parser for all non GET requests
app.use(express.json());

// GET endpoint for test
app.get("/", function (req, res) {
  res.send("Calculator status: Running");
});

function inputValidator(req) {
  // Check if request contains two numbers as num1 and num2
  if (req.body.num1 === undefined || req.body.num2 === undefined) {
    return {
      check: false,
      message: "Please input two numbers in the request body as num1 and num2",
    };
  }
  // Try to parse the numbers from the request
  // parseInt typically throws error when input does not have a .toString() function
  try {
    var num1 = parseInt(req.body.num1);
    var num2 = parseInt(req.body.num2);
  } catch (e) {
    return {
      check: false,
      message: "Input could not be parsed to integer",
    };
  }
  // Check if either num1 or num2 is NaN (not a number)
  if (isNaN(num1) || isNaN(num2)) {
    return {
      check: false,
      message: "Please input valid numbers",
    };
  }
  // If all checks pass, return true
  return {
    check: true,
    message: "OK",
  };
}

// POST endpoint for addition
app.post("/add", function (req, res) {
  // Validate input
  var check = inputValidator(req);
  // If input is invalid, return error message from validator function
  if (!check.check) {
    res.status(400).send(check.message);
    return;
  }

  // Perform operation if input is valid
  var num1 = parseInt(req.body.num1);
  var num2 = parseInt(req.body.num2);
  var result = num1 + num2;
  res.send("Result: " + result.toString());
});

// POST endpoint for subtraction
app.post("/subtract", function (req, res) {
  // Validate input
  var check = inputValidator(req);
  // If input is invalid, return error message from validator function
  if (!check.check) {
    res.status(400).send(check.message);
    return;
  }

  // Perform operation if input is valid
  var num1 = parseInt(req.body.num1);
  var num2 = parseInt(req.body.num2);
  var result = num1 - num2;
  res.send("Result: " + result.toString());
});

// POST endpoint for multiplication
app.post("/multiply", function (req, res) {
  // Validate input
  var check = inputValidator(req);
  // If input is invalid, return error message from validator function
  if (!check.check) {
    res.status(400).send(check.message);
    return;
  }

  // Perform operation if input is valid
  var num1 = parseInt(req.body.num1);
  var num2 = parseInt(req.body.num2);
  var result = num1 * num2;
  res.send("Result: " + result.toString());
});

// POST endpoint for division
app.post("/divide", function (req, res) {
  // Validate input
  var check = inputValidator(req);
  // If input is invalid, return error message from validator function
  if (!check.check) {
    res.status(400).send(check.message);
    return;
  }

  var num1 = parseInt(req.body.num1);
  var num2 = parseInt(req.body.num2);

  // Final input validation for division: if num2 is 0, return error
  if (num2 === 0) {
    res.status(400).send("Cannot divide by 0");
    return;
  }

  // Perform operation if input is valid
  var result = num1 / num2;
  res.send("Result: " + result.toString());
});

// POST endpoint for power
app.post("/power", function (req, res) {
  // Validate input
  var check = inputValidator(req);
  // If input is invalid, return error message from validator function
  if (!check.check) {
    res.status(400).send(check.message);
    return;
  }

  // Perform operation if input is valid
  var num1 = parseInt(req.body.num1);
  var num2 = parseInt(req.body.num2);
  var result = Math.pow(num1, num2);
  res.send("Result: " + result.toString());
});

// POST endpoint for square root
app.post("/sqrt", function (req, res) {
  // Validate input for single number
  if (req.body.num1 === undefined) {
    res.status(400).send("Please input a number in the request body as num1");
    return;
  }
  // Try to parse the number from the request
  // parseInt typically throws error when input does not have a .toString() function
  try {
    var num1 = parseInt(req.body.num1);
  } catch (e) {
    res.status(400).send("Input could not be parsed to integer");
    return;
  }
  // Check if num1 is NaN (not a number)
  if (isNaN(num1)) {
    res.status(400).send("Please input a valid number");
    return;
  }
  // Check if number is negative
  if (num1 < 0) {
    res.status(400).send("Please input a positive number");
    return;
  }

  // Perform operation if input is valid
  var num1 = parseInt(req.body.num1);
  var result = Math.sqrt(num1);
  res.send("Result: " + result.toString());
});

// POST endpoint for modulo
app.post("/mod", function (req, res) {
  // Validate input
  var check = inputValidator(req);
  // If input is invalid, return error message from validator function
  if (!check.check) {
    res.status(400).send(check.message);
    return;
  }

  var num1 = parseInt(req.body.num1);
  var num2 = parseInt(req.body.num2);

  // Final input validation for modulo: if num2 is 0, return error
  if (num2 === 0) {
    res.status(400).send("Cannot divide by 0");
    return;
  }

  var result = num1 % num2;
  res.send("Result: " + result.toString());
});

// Run server on defined port
app.listen(port, function () {
  console.log("Server listening on port 3000");
});
