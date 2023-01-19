const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Minimum password length is 8 characters"]
  }
}, { 
  versionKey: false 
})

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
}

const User = mongoose.model("user", userSchema)

module.exports = User;
