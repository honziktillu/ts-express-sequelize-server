module.exports = (sequelize: any, DataTypes: any) => {
  const UserAccountRole = sequelize.define(
    "useraccountrole",
    {
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
  return UserAccountRole;
};
