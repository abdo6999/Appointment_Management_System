import { Router } from "express";
import { UserController } from "../controllers/usersController";  // Update with correct path to your UserController

const userRouter = Router();

const userController = new UserController();

// Routes for user operations
userRouter.post("/admin", userController.createAdmin);  
userRouter.post("/doctor", userController.createDoctor);  
userRouter.post("/patient", userController.createPatient);  
userRouter.post("/signin", userController.signIn)
userRouter.get("/status", userController.status)
userRouter.post("/refresh", userController.refresh);
userRouter.get("/:id", userController.getById); 
userRouter.get("/", userController.getAll);
userRouter.put("/:id", userController.update);  
userRouter.delete("/:id", userController.delete);  

export default userRouter;
