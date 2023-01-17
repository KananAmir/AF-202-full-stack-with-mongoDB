const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

dotenv.config();

const { Schema } = mongoose;

// const userSchema = new Schema({
//   fullName: String,
//   userName: String,
//   age: Number,
//   imageUrl: String,
// });

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    age: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// const port = 8000;

//GET ALL USERS
app.get("/users", (req, res) => {
  Users.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
      //   res.json(docs);
    } else {
      res.status(500).json({ message: err });
    }
  });
});

//GET USER BY ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  Users.findById(id, (err, doc) => {
    // if (!err) {
    //   res.send(doc);
    // } else {
    //   res.status(500).json({ message: err });
    // }

    if (!err) {
      if (doc) {
        res.send(doc);
        res.status(200);
      } else {
        res.status(404).json({ message: "NOT FOUND" });
      }
    } else {
      res.status(500).json({ message: err });
    }
  });
});

//DELETE USER BY ID
app.delete("/users/:id", (req, res) => {
  //   const id = req.params.id;
  const { id } = req.params;
  Users.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.send("SUCCESSFULLY DELETED");
    } else {
      res.status(404).json({ message: err });
    }
  });
});

//POST NEW USER
app.post("/users/", (req, res) => {
  let user = new Users({
    fullName: req.body.fullName,
    userName: req.body.userName,
    age: req.body.age,
    imageUrl: req.body.imageUrl,
  });

  user.save();
  res.send({ message: "SUCCESS" });
});

//UPDATE USER DATA
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  //   console.log(req.body);
  //   console.log(id);
  Users.findByIdAndUpdate(id, req.body, (err, doc) => {
    console.log(doc);
    if (!err) {
      res.status(201);
    } else {
      res.status(500).json(err);
    }
  });
  res.send({ message: "SUCCESSFULLY UPDATED" });
});

// mongoose.connect(
//   "mongodb+srv://kananamir:kananamir@cluster0.zssgazx.mongodb.net/AF202",
//   (err) => {
//     if (!err) {
//       console.log("DB CONNECTED");
//       app.listen(port, () => {
//         console.log(`Example app listening on port http://localhost:${port}`);
//       });
//     }
//   }
// );

const PORT = process.env.PORT;
const DB = process.env.DB_URL.replace("<password>", process.env.PASSWORD);

mongoose.connect(DB, (err) => {
  if (!err) {
    console.log("DB CONNECTED");
    app.listen(PORT, () => {
      console.log(`Example app listening on port http://localhost:${PORT}`);
    });
  }
});
