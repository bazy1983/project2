module.exports = function(sequelize, DataTypes){
    var topic = sequelize.define("topic", {
        topic_name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },  
    },
    { freezeTableName: true })

    topic.associate = function(models){
        topic.hasMany(models.question, {
            onDelete : "cascade"
        },
        { freezeTableName: true });
    };
    return topic
}