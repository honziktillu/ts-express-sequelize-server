module.exports = (sequelize: any, DataTypes: any) => {
  const AccountRole = sequelize.define(
    "accountrole",
    {
      rolename: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );
  return AccountRole;
};
