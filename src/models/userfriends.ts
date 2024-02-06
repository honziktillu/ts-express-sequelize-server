module.exports = (sequelize: any, DataTypes: any) => {
  const Friends = sequelize.define(
    "userfriends",
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
  return Friends;
};
