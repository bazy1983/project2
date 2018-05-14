module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("user", {
        username : {
            type : DataTypes.STRING,
            allawNull : false,
            unique: true
        },
        password : {
            type : DataTypes.STRING,
            allawNull : false
        },
        first_name : {
            type : DataTypes.STRING,
            allawNull : false
        },
        last_name : {
            type : DataTypes.STRING,
            allawNull : false
        },
        email : DataTypes.STRING,
        role_id : {
            type : DataTypes.INTEGER,
            defaultValue: 3 //student  (1 for admin, 2 teacher, 3 student)
        },
        active_int : DataTypes.BOOLEAN,

    });
    //association
    user.associate = function(models){
        user.hasMany(models.test, {
            onDelete : "cascade"
        });
    };
    return user
}