// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../services/user.service"; // Import the functions

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
}

export async function getUserByIdHandler(req: Request, res: Response) {
  try {
    const user = await getUserById(req.params.id);
    user ? res.status(200).json(user) : res.status(404).send("User not found");
  } catch (error) {
    handleError(res, error);
  }
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    handleError(res, error);
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    updatedUser ? res.status(200).json(updatedUser) : res.status(404).send("User not found");
  } catch (error) {
    handleError(res, error);
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const success = await deleteUser(req.params.id);
    success ? res.status(204).send() : res.status(404).send("User not found");
  } catch (error) {
    handleError(res, error);
  }
}

function handleError(res: Response, error: unknown) {
  const message = error instanceof Error ? error.message : "Internal server error";
  res.status(500).json({ message });
}
