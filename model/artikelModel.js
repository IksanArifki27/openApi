const sequelize = require('sequelize');
const db = require('../config/db')
const category = require('./categoryModel')

var artikel = db.define('artikel', {
    id:{type:sequelize.INTEGER,primaryKey:true},
    title:{type:sequelize.STRING,},
    shortreview:{type:sequelize.STRING,},
    imgurl:{type:sequelize.STRING,},
    publicid:{type:sequelize.STRING,},
    idcategory:{type:sequelize.INTEGER,},
    medium:{type:sequelize.STRING,},
    github:{type:sequelize.STRING,},
    creator:{type:sequelize.STRING,}
},{
    freezeTableName: true,
    timestamps: false,
});
// ke model artikel
artikel.hasOne(category, {foreignKey:'id'});
// ke model category
artikel.belongsTo(category, {foreignKey:'idcategory'});

module.exports = artikel;