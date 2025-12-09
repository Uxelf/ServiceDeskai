import { Router } from "express";
import { validate } from "../validation/validate.js";
import { officeSchema } from "./offices.schema.js";
import { createOffice, getOffices } from "./offices.controller.js";
import { requireAdminRole, requireAuth } from "../auth/auth.js";

const router = Router();

router.get("/", getOffices);
router.post("/", requireAuth, requireAdminRole, validate(officeSchema), createOffice);


export default router;