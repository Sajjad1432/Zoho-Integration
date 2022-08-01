const express=  require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const keys = require("./config/keys");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const documentRouter = require('./routes/documentRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const rateGridRouter = require('./routes/rateGridRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const stateRouter = require('./routes/stateRoutes');
const subscriptionPlanRouter = require('./routes/subscriptionPlanRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');
const stripeRouter = require("./routes/stripeRoutes")
const applicationForm = require("./routes/applicationRoutes")

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/documents", documentRouter)
app.use("/api/v1/payments", paymentRouter)
app.use("/api/v1/rateGrid", rateGridRouter)
app.use("/api/v1/resources", resourceRouter)
app.use("/api/v1/services", serviceRouter)
app.use("/api/v1/states", stateRouter)
app.use("/api/v1/subscriptionPlans", subscriptionPlanRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/stripe", stripeRouter)
app.use("/api/v1/applicationForm", applicationForm)

// Have Node serve the files for our built React app
// SET CORS POLICY
let origin;

if(keys.environment === 'development') {
  app.use(express.static(path.resolve(__dirname, './client/src/App.js')));
  origin = 'http://localhost:5000';
}

// console.log(keys.environment);
if(keys.environment === 'production') {
  app.use(express.static('client/build'));
  origin = 'https://frozen-ocean-05352.herokuapp.com'
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
  });
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(
  cors({
    origin,
    methods: ["GET", "POST"]
  })
  )

app.use(globalErrorHandler);

module.exports = app;