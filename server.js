require("dotenv").config();
require("express-async-errors");

//App starters Import
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// //Swagger
// const swaggerUi = require("swagger-ui-express");
// const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");

//Database connection Import
const db = require("./database/connectDB");

//Cookie Parser Import
const cookieParser = require("cookie-parser");

//Router Imports
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const reviewRouter = require("./routers/reviewRouter");
const orderRouter = require("./routers/orderRouter");

//Middleware Import
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// //Invoking Middleware
// app.set("trust proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
//   })
// );
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST']
}));


// Define a route to serve the login.html file
app.get('/', (req, res) => {
  // Adjust the file path to point to the login.html file location
  res.sendFile(path.join(__dirname, 'public/login-register.html'));
});

// Set up static file serving for other static assets if needed
app.use(express.static(path.join(__dirname, 'public')));// app.use(helmet());
// app.use(xss());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//Invoking Routers
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/orders", orderRouter);

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

//Port Variable
const port = process.env.PORT || 3000;

//Project Startup Logic
const start = async () => {
  try {
    await db(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error.message);
  }
};

//Invoking the start method to run the app
start();

// TODO: Solevt the remove mant review issue
// TODO: AVG RATING Is not working
