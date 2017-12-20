// NPM modules
var path = require("path");
// user modules
var friends = require("../data/friends.js");

module.exports = function (app) {
  // shows JSON objects
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  // finds most compatible friend and pushes JSON object to friends.js
  app.post("/api/friends", function(req, res) {
    var newUser = req.body;
    var answers = newUser.scores;
    var matchName = "";
    var matchPhoto = "";
    var lowDiff = 100;
    // compatibility algorithm
    for (var i = 0; i < friends.length; i++) {
			var totalDiff = 0;
			for (var j = 0; j < answers.length; j++) {
				totalDiff += Math.abs(answers[j] - friends[i].scores[j]);
			}
			// get least difference
			if (totalDiff < lowDiff) {
				lowDiff = totalDiff;
				matchName = friends[i].name;
				matchPhoto = friends[i].photo;
			}
		}
    // passes name and photo of best match
    var bestFriend = {
      name: matchName,
      photo: matchPhoto
    };
    friends.push(newUser);
    res.json(bestFriend);
  });
};
