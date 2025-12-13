import { Router } from "express";
import { createTicket, getOfficeTickets, getTicketById, getTickets, getUserTickets, updateTicketStatus } from "./tickets.controller.js";
import { validate } from "../validation/validate.js";
import { ticketSchema, updateTicketStatusSchema } from "./tickets.schema.js";
import { requireAuth, requireDeskRole, requireStandardRole } from "../auth/auth.js";



const router = Router();

router.get("/", getTickets);
router.get("/:id", getTicketById);
router.get("/my-tickets", requireAuth, requireStandardRole, getUserTickets);
router.get("/office", requireAuth, requireDeskRole, getOfficeTickets);
router.post("/", requireAuth, requireStandardRole, validate(ticketSchema), createTicket);
router.patch("/update-status/:id", requireAuth, requireDeskRole, validate(updateTicketStatusSchema), updateTicketStatus);


export default router;