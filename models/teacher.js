module.exports = function(sequelize, DataTypes) {
    var teacher = sequelize.define("teacher", {
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
        role_id : DataTypes.INTEGER,
        active_int : DataTypes.BOOLEAN,

        //association
    });
    return teacher
}