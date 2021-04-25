// Imports
const express = require("express");
const Member = require("../models/member");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/add-member", (req, res) => {
  res.render("addMember");
});

router.get("/add-new-member", (req, res) => {
  res.send({ redirect: "/api/add-member" });
});

router.get("/cancel", (req, res) => {
  res.send({ redirect: "/api" });
});

router.get("/members", (req, res) => {
  Member.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        distanceField: "distance",
        spherical: true,
        maxDistance: 500000,
      },
    },
  ]).then((response) => {
    res.send(response);
  });
});

router.post("/members", (req, res) => {
  // const member = new Member(req.body);
  // member.save();
  console.log(req.body);
  let coordinates = req.body.location.coordinates;
  coordinates = [parseInt(coordinates[0]), parseInt(coordinates[1])];
  Member.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

router.put("/members/:id", (req, res) => {
  const id = req.params.id;
  Member.findByIdAndUpdate(id, req.body)
    .then(() => {
      Member.find({ _id: id })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.status(400).send({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message,
      });
    });
});

router.delete("/members/:id", (req, res) => {
  const id = req.params.id;
  Member.findByIdAndDelete(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message,
      });
    });
});

module.exports = router;
