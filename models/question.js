module.exports = function (sequelize, DataTypes) {
    var question = sequelize.define("question", {
        question_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correct_answer: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active_ind: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    question.associate = function (models) {
        question.belongsTo(models.topic, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return question;
}