import { Router } from "express";
import { WorkSchedulesController } from "../controllers/work_schedulesController";

const WorkSchedulesRouter = Router();

const workSchedules = new WorkSchedulesController()


// Routes for work schedules
WorkSchedulesRouter.post("/", workSchedules.create);
WorkSchedulesRouter.get("/doctor/:doctor_id", workSchedules.getByDoctorId);
WorkSchedulesRouter.get("/", workSchedules.getAll);
WorkSchedulesRouter.put("/:id", workSchedules.update);
WorkSchedulesRouter.delete("/:id", workSchedules.delete);
WorkSchedulesRouter.post("/availability", workSchedules.isAvailable);

export default WorkSchedulesRouter;