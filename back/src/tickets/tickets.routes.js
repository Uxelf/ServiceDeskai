import { Router } from "express";
import { createTicket, getOfficeTickets, getTicketById, getTickets, getUserTickets, updateTicketStatus } from "./tickets.controller.js";
import { validate } from "../validation/validate.js";
import { ticketSchema, updateTicketStatusSchema } from "./tickets.schema.js";
import { requireAuth, requireDeskRole, requireStandardRole } from "../auth/auth.js";
import { upload } from "../validation/upload.js";




const router = Router();

router.get("/", getTickets);
router.get("/my-tickets", requireAuth, requireStandardRole, getUserTickets);
router.get("/office", requireAuth, requireDeskRole, getOfficeTickets);
router.post("/", requireAuth, requireStandardRole, upload.single("image"), validate(ticketSchema), createTicket);
router.patch("/update-status/:id", requireAuth, requireDeskRole, validate(updateTicketStatusSchema), updateTicketStatus);
router.get("/:id", getTicketById);


export default router;