import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Users from "./models/userthoughts.model.mjs";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.post("/api/post", async (req, res) => {
  try {
    const data = req.body;
    if (!data) res.status(404).json({ message: "Not Entered the Data" });

    const inputData = await Users.create(data);
    res.status(200).json(inputData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/api/get", async (req, res) => {
  try {
    const data = await Users.find();
    if (!data) return res.status(404).json({ message: "No Data Found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.delete("/api/delete/:id", async (req, res) => {
  try {
    const uid = req.params.id;
    if (!uid) return res.status(500).json({ message: "No Id Found" });

    const deleteIdea = await Users.findByIdAndDelete(uid);

    return res.status(200).json({ message: "Idea Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
mongoose
  .connect(
    "mongodb+srv://root:1234@thoughts.osuu3.mongodb.net/?retryWrites=true&w=majority&appName=thoughts",
    {
      ssl: true,
    }
  )
  .then(
    app.listen(`${PORT}`, () => {
      console.log(`${PORT}`);
    })
  );
