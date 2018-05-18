// this model is used to save student results for every session

module.exports = function(sequelize, DataTypes){
    var test_result = sequelize.define("test_result", {
        student_result : {
            type : DataTypes.JSON,
            allowNull : false
        },
        session_id : {
            type : DataTypes.STRING,
            allowNull: false
        }  
    })

    test_result.associate = function(models){
        test_result.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
              }
        });

    };
    return test_result
}