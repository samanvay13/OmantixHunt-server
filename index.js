const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const ruleModel = require("./models/rule.model");
const notificationModel = require("./models/notification.model");
const questionModel = require("./models/question.model");
const userScoreModel = require("./models/userScore.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "Mayank_Ekaghara";
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//test get api
// app.get("/", (req, res) => {
//   res.send("hello from node api server");
// });

//existing user check
//user creation
//hashed password
//token Generated

app.post("/register", async (req, res) => {

  const { fName, lName, email, whatsapp, username, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      fName: fName,
      lName: lName,
      email: email,
      whatsapp: whatsapp,
      username: username,
      password: hashedPassword,
      role: role,
    });

    const token = jwt.sign({ username: result.username, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password,existingUser.password);

    if(!matchPassword){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET_KEY);
    res.status(201).json({ user: existingUser, token: token });


  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// get all rules
app.get("/api/rules", async (req, res) => {
  try {
    const rule = await ruleModel.find({});
    res.status(200).json(rule);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// get rules by id
app.get("/api/rule/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await ruleModel.findById(id);
    res.status(200).json(rule);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//update rules by id
app.put("/api/rules/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await ruleModel.findByIdAndUpdate(id, req.body);
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }
    const updatedRule = await ruleModel.findById(id);
    res.status(200).json(updatedRule);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//add rule
app.post("/api/rules/create", async (req, res) => {
  try {
    const rule = await ruleModel.create(req.body);
    res.status(201).json(rule);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//delete rules by id
app.delete("/api/rules/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await ruleModel.findByIdAndDelete(id);
    if (!rule) {
      return res.status(404).json({ message: "Rule not found" });
    }
    res.status(200).json(rule);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// notifications api 

// get all notifications
app.get("/api/notifications", async (req, res) => {
  try {
    const notification = await notificationModel.find({});
    res.status(200).json(notification);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// get notification by id
app.get("/api/notification/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findById(id);
    res.status(200).json(notification);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//update notification by id
app.put("/api/notifications/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findByIdAndUpdate(id, req.body);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    const updatednotification = await notificationModel.findById(id);
    res.status(200).json(updatednotification);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//add notification by id
app.post("/api/notifications/create", async (req, res) => {
  try {
    const notification = await notificationModel.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//delete notification by id
app.delete("/api/notifications/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// question API

// get all questions
app.get("/api/questions", async (req, res) => {
  try {
    const question = await questionModel.find({});
    res.status(200).json(question);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// get question by id
app.get("/api/question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionModel.findById(id);
    res.status(200).json(question);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//update question by id
app.put("/api/questions/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionModel.findByIdAndUpdate(id, req.body);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const updatedquestion = await questionModel.findById(id);
    res.status(200).json(updatedquestion);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//add question by id
app.post("/api/questions/create", async (req, res) => {
  try {
    const question = await questionModel.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

//delete question by id
app.delete("/api/questions/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionModel.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// leader board API

// get all Leaderboard Username
app.get("/api/userscore", async (req, res) => {
  try {
    const aggregatedScores = await userScoreModel.aggregate([
      {
        $sort: {
          currentQuestion: -1, // Sort by question number in descending order
          updatedAt: 1 // Sort by updatedAt in ascending order if question numbers are the same
        }
      }
    ]);

    res.status(200).json(aggregatedScores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://omantixhunt:root@cluster0.xzipwwq.mongodb.net/Omantix"
  )
  .then(() => {
    console.log("connected to database ");
    app.listen(5000, () => {
      console.log("server is running on port 5000!");
    });
  })
  .catch((err) => {
    console.log(`an error occurred: ${err}`);
  });
