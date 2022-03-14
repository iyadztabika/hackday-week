module.exports = (sequelize, DataTypes) => {

    // define posts model, representing posts table in database
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Comments

}