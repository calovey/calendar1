const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // React port
app.use(express.json()); // For parsing JSON requests

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/calendarApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// MongoDB Model
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

// CREATE
app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).send(newEvent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// READ
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE
app.put("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(updatedEvent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE
app.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Test Routes
app.get('/', (req, res) => {
  res.json({ message: 'API created' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'running', message: 'Currently working' });
});

// Start Server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
