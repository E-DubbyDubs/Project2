module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
   ingredient: DataTypes.STRING, //replace text with ingredient
   recipe: DataTypes.TEXT,
   author: DataTypes.TEXT
   
  });
  return Example; 
};
