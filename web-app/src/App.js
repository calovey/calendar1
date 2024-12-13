import React, { useState, useEffect } from "react";
import axios from "axios";

// Set up API instance
const API = axios.create({ baseURL: "http://localhost:5002" });

// API Functions
const fetchEvents = async () => {
  const response = await API.get("/events");
  return response.data;
};

const createEvent = async (newEvent) => {
  const response = await API.post("/events", newEvent);
  return response.data;
};

const updateEvent = async (id, updatedEvent) => {
  const response = await API.put(`/events/${id}`, updatedEvent);
  return response.data;
};

const deleteEvent = async (id) => {
  await API.delete(`/events/${id}`);
};

const App = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [status, setStatus] = useState("Unknown");
  const [message, setMessage] = useState("");

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      setForm({ title: "", description: "", date: "" });
      loadEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const checkServerStatus = async () => {
    try {
      const response = await API.get("/status");
      setStatus(response.data.status);
      setMessage(response.data.message);
    } catch (error) {
      setStatus("Error");
      setMessage("Connection failed: " + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Calendar App</h1>

      <h2>Server Check</h2>
      <button onClick={checkServerStatus}>Check Server Status</button>
      <p>Status: {status}</p>
      <p>Message: {message}</p>

      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.title}</strong> on {new Date(event.date).toLocaleDateString()}
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
