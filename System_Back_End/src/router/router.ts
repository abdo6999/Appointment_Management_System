import { Router } from "express";
import workSchedulesRouter from "./work_schedulesRouter";  
import userRouter from "./usersRouter";  
import appointmentsRouter from "./appointmentsRouter";  
import doctorRouter from "./doctorsRouter";
import timeSlotsRouter from "./timeSlotsRouter";

const router = Router();

router.use("/work-schedules", workSchedulesRouter);
router.use("/users", userRouter);
router.use("/appointments", appointmentsRouter);
router.use("/doctors", doctorRouter);
router.use("/time-slot",timeSlotsRouter)


export default router;