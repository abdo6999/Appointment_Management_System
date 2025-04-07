import { Request, Response } from "express";
import { WorkSchedulesModel } from "../models/work_schedulesModel";
import { Tables } from "../database.types";
import { scheduleSchema } from "../schema/workSchedules";

const model = new WorkSchedulesModel();

export class WorkSchedulesController {

  // Create a single work schedule
  async create(req: Request, res: Response): Promise<any> {
      const workSchedule: Tables<"work_schedules"> = req.body;
      const parsed = scheduleSchema.safeParse(workSchedule);
      if (!parsed.success) {
        return res.status(400).json({
          error: "Invalid work schedule data",
          details: parsed.error.format(),
        });
      }

      const result = await model.createWorkSchedule(workSchedule);
      if ("error" in result) return res.status(400).json(result);
      res.status(201).json(result);
    
  }

  async getByDoctorId(req: Request, res: Response): Promise<any> {
    try {
      const { doctor_id } = req.params;
      const result = await model.getWorkScheduleByDoctorId(doctor_id);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const result = await model.getAllWorkSchedules();
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const updatedSchedule: Partial<Tables<"work_schedules">> = req.body;
      const result = await model.updateWorkSchedule(id, updatedSchedule);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const result = await model.deleteWorkSchedule(id);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async isAvailable(req: Request, res: Response): Promise<any> {
    try {
      const { doctorId, dayOfWeek, requestedTime } = req.body;

      if (!doctorId || !dayOfWeek || !requestedTime) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await model.isDoctorAvailable(doctorId, dayOfWeek, requestedTime);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
