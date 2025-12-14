import { Router } from "express";
import { createTicket, getDeskTickets, getTicketById, getTickets, getUserTickets, shareTicket, updateTicketStatus } from "./tickets.controller.js";
import { validate } from "../validation/validate.js";
import { shareTicketSchema, ticketSchema, updateTicketStatusSchema } from "./tickets.schema.js";
import { requireAuth, requireDeskRole, requireStandardRole } from "../auth/auth.js";
import { upload } from "../validation/upload.js";




const router = Router();

router.get("/", getTickets);
router.get("/my-tickets", requireAuth, requireStandardRole, getUserTickets);
router.get("/my-desk-tickets", requireAuth, requireDeskRole, getDeskTickets);
router.get("/:id", requireAuth, getTicketById);
//router.get("/office", requireAuth, requireDeskRole, getOfficeTickets);
router.post("/share/:id", requireAuth, validate(shareTicketSchema), shareTicket)
router.post("/", requireAuth, requireStandardRole, upload.single("image"), validate(ticketSchema), createTicket);
router.patch("/update-status/:id", requireAuth, requireDeskRole, validate(updateTicketStatusSchema), updateTicketStatus);


export default router;