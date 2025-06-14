import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Omnimart API is running 🚀");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
