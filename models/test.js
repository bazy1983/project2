// this model is used to save tests ahead of time before the actual session

odule.exports = function(sequelize, DataTypes){
    var test = sequelize.define("test", {
        question_ids : {
            type : DataTypes.STRING,
            allowNull : false
        },  
    })

    test.associate = function(models){
        test.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
              }
        });
    };
    return test
}