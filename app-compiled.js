"use strict";

var express = require('express');
var mongoose = require("mongoose");
var dotenv = require('dotenv');
var categorieRouter = require("./routes/categorie.route"); //Page7
var scategorieRouter = require("./routes/scategorie.route");
var articleRouter = require("./routes/article.route");
dotenv.config();
var app = express();
//BodyParser Middleware
app.use(express.json()); // pour comprendre req .body

mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connexion à la base de données réussie");
})["catch"](function (err) {
  console.log('Impossible de se connecter à la base de données', err);
  process.exit();
});
app.get("/", function (req, res) {
  res.send("Bonjour");
});
app.use('/api/categorie', categorieRouter); //Page7
app.use('/api/scategorie', scategorieRouter);
app.use('/api/article', articleRouter);
app.listen(process.env.PORT, function () {
  console.log("Server is listening on port ".concat(process.env.PORT));
});
