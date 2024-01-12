import express from "express";
import { Role } from "../auth/roles/role.enum";

declare global {
  namespace Express {
    interface Request {
      username?: Record<string>
      id?: Record<number>
      roles: Record<Role[]>
    }
  }
}