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
        // adds a foreign key to target
        Users.hasMany(models.Likes, {
            // when users deleted, the likes on the users will also get deleted
            onDelete: 'cascade'
        })
    }

    return Users

}