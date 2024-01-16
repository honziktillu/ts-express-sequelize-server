"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const bcrypt_1 = require("bcrypt");
const index_1 = __importDefault(require("../models/index"));
const User = index_1.default.users;
const getAllUsers = (req, res) => { };
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => { };
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Missing details" });
        const user = await User.findOne({ where: { email: email } });
        if (user)
            return res.status(400).json({ message: "User already exists" });
        const salt = await (0, bcrypt_1.genSalt)(10);
        const hashedString = await (0, bcrypt_1.hash)(password, salt);
        await User.create({
            email: email,
            username: username,
            password: hashedString,
            verified: false,
        }).save();
        return res.status(200).json({ message: "User created" });
    }
    catch (err) {
        if (err)
            return res.status(400).json({ message: "An error occurred" });
    }
};
exports.createUser = createUser;
const updateUser = (req, res) => { };
exports.updateUser = updateUser;
const deleteUser = (req, res) => { };
exports.deleteUser = deleteUser;
