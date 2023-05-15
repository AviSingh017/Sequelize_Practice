

module.exports= (sequelize, DataTypes)=>{
    const brands= sequelize.define("brands",{
        name :{type: DataTypes.STRING, allowNull: false},
        logo :{type: DataTypes.STRING, allowNull: false},
    });
    return brands;
}