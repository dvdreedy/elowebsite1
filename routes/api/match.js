const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Match = require("../../models/Match");
const User = require("../../models/User");

function probability(rank1, rank2) {
  return (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rank1 - rank2)) / 400));
}

function calc(rank1, rank2, K, score) {
  let Pb = probability(rank1, rank2);

  let Pa = probability(rank2, rank1);

  if (score >= 1) {
    rank1 = rank1 + K * (1 - Pa);
    rank2 = rank2 + K * (0 - Pb);
  } else if (score < 0) {
    rank1 = rank1 + K * (0 - Pa);
    rank2 = rank2 + K * (1 - Pb);
  }

  return (x = [rank1, rank2]);
}

// get users
// get all users
//public
//router.get("/", (req, res) => res.send("match route"));

// post match
// create a match
//private
router.post(
  "/",
  [
    [
      check("name1", "name1 is required")
        .not()
        .isEmpty(),
      check("name2", "name2 is required")
        .not()
        .isEmpty(),
      check("score1", "score1 is required")
        .not()
        .isEmpty(),
      check("score2", "score2 is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const user1 = await User.findOne({ name: req.body.name1 }).select(
      "-password"
    );
    const user2 = await User.findOne({ name: req.body.name2 }).select(
      "-password"
    );

    const winner1 =
      Number(req.body.score1) > Number(req.body.score2)
        ? user1.name
        : user2.name;
    const score = Number(req.body.score1) > Number(req.body.score2) ? 1 : -1;

    newMatch = new Match({
      score1: req.body.score1,
      score2: req.body.score2,
      name1: user1.name,
      name2: user2.name,
      rating1: user1.rating,
      rating2: user2.rating,
      winner: winner1
    });
    await newMatch.save();
    let newRank = calc(user1.rating, user2.rating, 52, score);

    user1.rating = newRank[0];
    user2.rating = newRank[1];

    if (user1.rating > user1.peak) user1.peak = user1.rating;

    if (user2.rating > user2.peak) user2.peak = user2.rating;
    if (score == 1) {
      user1.wins += 1;
      user2.losses += 1;
    } else {
      user1.losses += 1;
      user2.wins += 1;
    }

    await user1.save();
    await user2.save();
    res.send("match complete, rankings updated");
  }
);

router.get("/", async (req, res) => {
  try {
    const matches = await Match.find()
      .sort({ date: -1 })
      .limit(10);
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/:name", async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ name1: req.params.name }, { name2: req.params.name }]
    })

      .sort({ date: -1 })
      .limit(10);
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
