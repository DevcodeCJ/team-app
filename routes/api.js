// Imports
const express = require("express");
const Member = require("../models/member");

const router = express.Router();

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
        maxDistance: 100000,
      },
    },
  ]).then((response) => {
    res.send(response);
  });
});

router.post("/members", (req, res, next) => {
  // const member = new Member(req.body);
  // member.save();
  Member.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(400).send({
        error: err.message,
      });
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
