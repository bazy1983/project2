// this model is used to save tests ahead of time before the actual session

module.exports = function(sequelize, DataTypes){
    var test = sequelize.define("test", {
        question_ids : {
            type : DataTypes.JSON,
            allowNull : false
        },
        secret_key : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        }
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