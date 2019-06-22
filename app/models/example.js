module.exports = function(sequelize, DataTypes) {
    var Example = sequelize.define("Example", {
      recipeName: DataTypes.STRING,
      ingredientList: DataTypes.TEXT,
      description: DataTypes.TEXT,
      author: DataTypes.STRING
    });
    return Example;
  };
  