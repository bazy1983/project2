module.exports = function(sequelize, DataTypes){
    var topic = sequelize.define("topic", {
        topic_name : {
            type : DataTypes.STRING,
            allowNull : false
        },  
    })

    topic.associate = function(models){
        topic.hasMany(models.question, {
            onDelete : "cascade"
        });
    };
    return topic
}