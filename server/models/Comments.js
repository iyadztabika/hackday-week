module.exports = (sequelize, DataTypes) => {

    // define posts model, representing posts table in database
    const Comments = sequelize.define("Comments", {
        commentBoyd: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Comments

}