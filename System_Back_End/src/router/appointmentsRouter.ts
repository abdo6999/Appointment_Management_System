import { Router } from "express";
import { AppointmentsController } from "../controllers/appointmentsController";  

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.post("/", appointmentsController.create);  

appointmentsRouter.get("/doctor/:doctor_id", appointmentsController.getByDoctorId);  
appointmentsRouter.get("/patient/:patient_id", appointmentsController.getByPatientId);  
appointmentsRouter.get("/guest/:guest_id", appointmentsController.getByGuestIdId);  
appointmentsRouter.get("/booked-slots", appointmentsController.getBookedSlotIds);
appointmentsRouter.put("/:id", appointmentsController.update);  
appointmentsRouter.delete("/:id", appointmentsController.cancel);  

export default appointmentsRouter;
