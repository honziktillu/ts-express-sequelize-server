import { Request, Response } from "express";
import { genSalt, hash } from "bcrypt";
import db from "../models/index";
const User = db.users;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: any = await User.findAll();
    if (!users || users.length === 0) return res.status(500).send({ message: "Users not found" });
    return res.status(200).send({ message: "Users found", payload: users });
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Missing details!" });
    const user: any = await User.findOne({ where: { id: id } });
    if (!user) return res.status(500).send({ message: "User not found" });
    return res.status(200).send({ message: "User found", payload: user });
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "Missing details!" });
    const user: any = await User.findOne({ where: { email: email } });
    if (user) return res.status(400).send({ message: "User already exists" });
    const salt = await genSalt(10);
    const hashedString = await hash(password, salt);
    await User.create({
      email: email,
      username: username,
      password: hashedString,
      verified: false,
    });
    return res.status(200).send({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).end()
  }
};
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id || !data) return res.status(400).send({ message: "Missing details!" });
        const user: any = await User.findOne({ where: { id: id } });
        if (!user) return res.status(500).send({ message: "User not found" });
        for (const ops of data) {
            user[ops.propName] = ops.value;
        }
        const action = await user.save();
        if (!action) return res.status(500).send({ message: "Something went wrong!" });
        return res.status(200).send({ message: "User updated", payload: user });
      } catch (err) {
        console.log(err);
        res.status(500).end()
      }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: "Missing details!" });
    const user: any = await User.destroy({ where: { id: id } });
    if (!user) return res.status(500).send({ message: "User not found" });
    return res.status(200).send({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
