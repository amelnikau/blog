const passport = require("passport");
const passportJWT = require("passport-jwt");
const {findByUsername} = require("../controllers/user_controller");
const {to} = require("await-to-js");
const config = require("../config/config");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = config.jwt.pass;

const strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
    let [err, user] = await to(findByUsername(jwt_payload.username));
    if (err) {
        next(err);
        return;
    }

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

module.exports = passport;