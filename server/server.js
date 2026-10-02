const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Appointment = require("./models/Appointment");
const Owner = require("./models/Owner");

const authenticateOwner = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.ownerId = decoded.ownerId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

const app = express();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Appointment = require("./models/Appointment");
const Owner = require("./models/Owner");

const authenticateOwner = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.ownerId = decoded.ownerId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Aura Beauty Studio backend is running!");
});

app.get("/api/services", (req, res) => {
  res.json([
    "Haircut",
    "Hair Styling",
    "Facial",
    "Bridal Makeup",
    "Manicure",
    "Pedicure"
  ]);
});

app.post("/api/owner/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      owner.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { ownerId: owner._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login"
    });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    const savedAppointment = await appointment.save();

    console.log("New appointment saved:");
    console.log(savedAppointment);

    res.status(201).json({
      message: "Appointment saved successfully",
      appointment: savedAppointment
    });
  } catch (error) {
    console.error("Error saving appointment:", error);

    res.status(500).json({
      message: "Failed to save appointment"
    });
  }
});

app.get("/api/appointments", authenticateOwner, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);

    res.status(500).json({
      message: "Failed to fetch appointments"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Aura Beauty Studio backend is running!");
});

app.get("/api/services", (req, res) => {
  res.json([
    "Haircut",
    "Hair Styling",
    "Facial",
    "Bridal Makeup",
    "Manicure",
    "Pedicure"
  ]);
});

app.post("/api/owner/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      owner.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { ownerId: owner._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login"
    });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    const savedAppointment = await appointment.save();

    console.log("New appointment saved:");
    console.log(savedAppointment);

    res.status(201).json({
      message: "Appointment saved successfully",
      appointment: savedAppointment
    });
  } catch (error) {
    console.error("Error saving appointment:", error);

    res.status(500).json({
      message: "Failed to save appointment"
    });
  }
});

app.get("/api/appointments", authenticateOwner, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);

    res.status(500).json({
      message: "Failed to fetch appointments"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});