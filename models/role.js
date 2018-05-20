module.exports = function (sequelize, DataTypes) {
    var role = sequelize.define("role", {
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 3
        }
    },
        { freezeTableName: true });
    role.associate = function (models) {
        role.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        },
        { freezeTableName: true });
    };
    return role;
}