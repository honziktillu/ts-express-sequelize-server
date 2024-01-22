module.exports = (sequelize: any, Sequelize: any) => {
  const UserAccountRoles = sequelize.define(
    "useraccountroles",
    {
      userid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      accountroleid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    },
    {
      timestamps: true,
    }
  );
  return UserAccountRoles;
};
