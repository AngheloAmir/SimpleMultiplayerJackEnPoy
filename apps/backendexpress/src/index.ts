import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import helloRouter from "./routes/hello";
import fightRouter from "./routes/fight";

const app = express();
const port = 3500;

// AGGRESSIVE CORS - Allow everything
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: '*',
  credentials: true
}));

// Additional CORS headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

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
