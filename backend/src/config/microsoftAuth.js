const passport = require("passport");
const AzureAdOAuth2Strategy = require("passport-azure-ad-oauth2").Strategy;
const User = require("../models/User"); // Import the User model

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      callbackURL: process.env.AZURE_REDIRECT_URI,
      tenant: process.env.AZURE_TENANT_ID,
    },
    async (accessToken, refreshToken, params, profile, done) => {
      try {
        const decodedToken = JSON.parse(
          Buffer.from(params.id_token.split(".")[1], "base64").toString("utf-8")
        );

        const email = decodedToken.email || decodedToken.preferred_username;
        const name = decodedToken.name;

        // Check if user exists in the database
        let user = await User.findOne({ where: { email } });

        if (!user) {
          // Create a new user if not exists
          user = await User.create({
            name,
            email,
            password: null, // Password is null as this is OAuth flow
            role: "hunter", // Default role, modify as needed
            image: null, // Default image if needed
            cv: null,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error authenticating user:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
