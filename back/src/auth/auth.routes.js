import { Router } from "express";
import { login, logout, me } from "./auth.controller.js";
import { validate } from "../validation/validate.js";
import { authSchema } from "./auth.schemas.js";
import { requireAuth } from "./auth.js";


const router = Router();

router.post("/login", validate(authSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);


export default router;