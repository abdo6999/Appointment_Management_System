import { Router } from "express";
import { TimeSlotsController } from "../controllers/timeSlotsController";

const timeSlotsRouter = Router();
const timeSlotsController =  new TimeSlotsController()
// Routes for time slots
timeSlotsRouter.get("/doctor/:doctor_id", timeSlotsController.getByDoctorId);
timeSlotsRouter.get("/doctor/:doctor_id/available/:appointment_date", timeSlotsController.getAvailable);
timeSlotsRouter.delete("/:id", timeSlotsController.delete);
timeSlotsRouter.put("/:id", timeSlotsController.update);

export default timeSlotsRouter;
