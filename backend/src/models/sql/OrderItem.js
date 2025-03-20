const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class OrderItem extends Model {}

    OrderItem.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            orderId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            productId: {
                type: DataTypes.STRING, // Change this to STRING to accept ObjectId
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "OrderItem",
            tableName: "OrderItems",
            timestamps: true,
        }
    );

    return OrderItem;
};