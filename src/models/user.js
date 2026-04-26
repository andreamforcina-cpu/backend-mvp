const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Name is required"
      }
    }
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Email already in use"
    },
    validate: {
      isEmail: {
        msg: "Must be a valid email"
      },
      notEmpty: {
        msg: "Email is required"
      }
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: "Password must be at least 6 characters"
      }
    }
  },

  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user"
  }
}, {
  timestamps: true, 
  hooks: {
  
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },

    beforeUpdate: async (user) => {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});



User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = User;