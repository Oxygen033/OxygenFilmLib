import express from "express";

declare global {
  namespace Express {
    interface Request {
      username?: Record<string>
      id?: Record<number>
    }
  }
}