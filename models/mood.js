// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");


// Creating our Mood model
module.exports = function(sequelize, DataTypes) {
    const Mood = sequelize.define("Mood", {
        // The email cannot be null, and must be a proper email before creation
        zip: {
          type: DataTypes.INTEGER
        },
        weather_abbrev: {
          type: DataTypes.STRING,
          allowNull: true
        },
        with_others: {
          type: DataTypes.BOOLEAN
        },
        eaten_today: {
          type: DataTypes.BOOLEAN
        },
        medications_today: {
          type: DataTypes.BOOLEAN
        },
        user_diary: {
          type: DataTypes.TEXT
        },
        mood_rating: {
          type: DataTypes.INTEGER
        }
      },
      {freezeTableName: true}
      );
  

Mood.associate = function(models) {
    // We're saying that a Mood should belong to an User
    // A Mood can't be created without an User due to the foreign key constraint
    Mood.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

    return Mood;
};


