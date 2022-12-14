import 'dotenv/config';
import express from 'express';
const app = express();
import cors from "cors";
import helmet from "helmet";
// import { adminAuth } from './src/middlewares/auth-middleware/authMiddleware.js';
import path from 'path';

const PORT = process.env.PORT || 8001;

//db connection
import dbConnection from './src/config/dbConfig.js';
dbConnection();

//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());


// serve static files
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "public")));

//api calls
import productRouter from "./src/routers/ProductRouter.js";
import categoryRouter from "./src/routers/CategoryRouter.js";

app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
// app.use("/api/v1/admin-user", adminUserRouter);
// app.use("/api/v1/payment-method", adminAuth, paymentMethodRouter);
// app.use("/api/v1/order", adminAuth, orderRouter);
// app.use("/api/v1/reviews", adminAuth, reviewRouter);
// app.use("/api/v1/users", adminAuth, userRouter);

app.get("/", (req, res) => {
    res.json({
        message: "In the main page"
    });
});



app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.status || 404;

    res.status(statusCode).json({
        status: "error",
        message: error.message,

    })
}
)


app.listen(PORT, error => {
    error ? console.log(error) : console.log(`server running at http://localhost:${PORT}`);
})