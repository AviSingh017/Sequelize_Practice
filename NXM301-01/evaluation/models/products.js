


module.exports = (sequelize, DataTypes) => {
    const products= sequelize.define("products", {
        name: {type: DataTypes.STRING, allowNull: false},
        image : {type: DataTypes.STRING, allowNull: false},
        price : DataTypes.INTEGER,
        brandID:
        {
            type: DataTypes.INTEGER,
            references: {
                model: "brands",
                key: "id",
            }
        }
    })
    return products;
}