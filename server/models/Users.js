module.exports = (sequelize, DataTypes) => {

    // define posts model, representing posts table in database
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: 'cascade'
        })
    }

    return Users

}