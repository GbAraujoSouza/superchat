import prismaConnection from "../PrismaConnection";
import { Request, Response } from "express";

class UserController {
  public async create(req: Request, res: Response) {
    console.log(req.body);
    try {
      const { username, email, password } = req.body;
      const newUser = await prismaConnection.user.create({
        data: {
          username,
          email,
          hash: '123',
          salt: '456',
        }
      })

      return res.status(401).json(newUser);
      
    } catch (error) {
      console.log(error.message)
      return res.status(500).json("internal error while creating user");
    }

  }
}

export const userController = new UserController();