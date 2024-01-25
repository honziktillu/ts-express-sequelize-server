import { dbConfig } from "../config/db";
import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
  },
});

let db = {
  Sequelize,
  sequelize,
  users: require("./user")(sequelize, DataTypes),
  accountRoles: require("./accountroles")(sequelize, DataTypes),
  userAccountRoles: require("./useraccountroles")(sequelize, DataTypes),
};

db.users.belongsToMany(db.accountRoles, { through: db.userAccountRoles, as: "userRole" });

/*
db.userAccountRoles.belongsTo(db.users, {
  foreignKey: "userid",
  onDelete: "cascade",
  as: "User"
});
db.userAccountRoles.belongsTo(db.accountRoles, {
  foreignKey: "accountroleid",
  onDelete: "cascade",
  as: "AccountRole"
});*/

export default db;
