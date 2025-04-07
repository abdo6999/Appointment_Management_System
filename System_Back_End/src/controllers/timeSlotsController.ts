import { Request, Response } from "express";
import { TimeSlotsModel } from "../models/timeSlotsModel";
import { Tables } from "../database.types";

const model = new TimeSlotsModel();

export class TimeSlotsController {

  // Get time slots by doctor ID
  async getByDoctorId(req: Request, res: Response): Promise<any> {
    try {
      const { doctor_id } = req.params;
      const result = await model.getTimeSlotsByDoctorId(doctor_id);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Get available time slots for a doctor on a specific date
  async getAvailable(req: Request, res: Response): Promise<any> {
    try {
      const { doctor_id, appointment_date } = req.params;
      const result = await model.getAvailableTimeSlots(doctor_id, appointment_date);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete a time slot by ID
  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const result = await model.deleteTimeSlotById(id);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Update a time slot by ID
  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const updatedData: Partial<Tables<"time_slots">> = req.body;
      const result = await model.updateTimeSlot(id, updatedData);
      if ("error" in result) return res.status(400).json(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
