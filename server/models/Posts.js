module.exports = (sequelize, DataTypes) => {

    // define posts model, representing posts table in database
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Posts.associate = (models) => {
        // add foreign keys to target
        Posts.hasMany(models.Comments, {
            // when users deleted, the likes on the users will also get deleted
            onDelete: 'cascade'
        })

        Posts.hasMany(models.Likes, {
            // when users deleted, the likes on the users will also get deleted
            onDelete: 'cascade'
        })
    }

    return Posts

}