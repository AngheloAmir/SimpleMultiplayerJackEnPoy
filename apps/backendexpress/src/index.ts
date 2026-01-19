import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import helloRouter from "./routes/hello";
import fightRouter from "./routes/fight";

const app = express();
const port = 3500;

// Enable CORS for all origins (for development)
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.use("/hello", helloRouter);
app.use("/fight", fightRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// Only start server if not running on Vercel
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log("Server running at http://localhost:" + port);
    });
}

export default app;
