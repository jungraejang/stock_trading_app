const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const init = require("./passport");
const helpers = require("./helpers");
const { db } = require("../db/index.js");
// const pgp = require("pg-promise")({});
// const connectionString = "postgres://localhost:5432/stock_data";
// const db = pgp(connectionString);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      db.one("SELECT * FROM users WHERE email = ${email}", {
        email: email
      })
        .then(user => {
          if (!helpers.comparePass(password, user.password_digest)) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

init();

module.exports = passport;
