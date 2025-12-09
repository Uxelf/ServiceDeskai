import { Router } from "express";
import { login, logout } from "./auth.controller.js";
import { validate } from "../validation/validate.js";
import { authSchema } from "./auth.schemas.js";


const router = Router();

router.post("/login", validate(authSchema), login)
router.post("/logout", logout);


export default router;