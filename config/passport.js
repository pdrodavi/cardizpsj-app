const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/github/callback',
        scope: 'user:email'
      },
      async (accessToken, refreshToken, profile, done) => {
        //console.log(profile.emails[0].value)
        // window.value=profile.emails[0].value; 
        let profileurl = profile.profileUrl
        let username = profileurl.replace("https://github.com/", "")

        let emailUser;

        try {
          let emailProfile = profile.emails[0].value
          emailUser = emailProfile
        } catch (err) {
          console.error(err)
        }

        const newUser = {
          githubId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
          email: emailUser,
          username: username
        }

        try {
          let user = await User.findOne({ githubId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
