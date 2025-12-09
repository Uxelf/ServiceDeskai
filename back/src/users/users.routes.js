import { Router } from "express";
import { validate } from "../validation/validate.js";
import { updateUserSchema, userSchema } from "./users.schema.js";
import { createUser, getUsers, updateUser } from "./users.controller.js";
import { requireAdminRole, requireAuth } from "../auth/auth.js";


const router = Router();

router.get("/", getUsers);
router.post("/create", requireAuth, requireAdminRole, validate(userSchema), createUser);
router.patch("/update", requireAuth, validate(updateUserSchema), updateUser)

export default router;