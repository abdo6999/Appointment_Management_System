import { Router } from "express";
import { DoctorController } from "../controllers/doctorsController";

const doctorRouter = Router();
const doctorController = new DoctorController();

// Routes for doctor operations
doctorRouter.post("/", doctorController.createDoctor);
doctorRouter.get("/", doctorController.getAllDoctors);
doctorRouter.get("/:doctorId", doctorController.getDoctorById);
doctorRouter.put("/:doctorId", doctorController.updateDoctor);
doctorRouter.delete("/:doctorId", doctorController.deleteDoctor);

export default doctorRouter;
