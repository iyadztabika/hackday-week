module.exports = (sequelize, DataTypes) => {

    // define posts model, representing posts table in database
    const Likes = sequelize.define("Likes")

    return Likes

}