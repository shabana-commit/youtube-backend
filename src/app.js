import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential :true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded());
app.use(express.static("public"));

export {app};