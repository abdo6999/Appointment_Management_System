// controllers/appointmentsController.ts
import { Request, Response } from "express";
import { AppointmentsModel } from "../models/appointmentsModel";
import { Tables } from "../database.types";
import { AppointmentSchema } from "../schema/appointments";

const model = new AppointmentsModel();

export class AppointmentsController {
  
  async create(req: Request, res: Response) : Promise<any>  {
    const parsed = AppointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid appointment data",
        details: parsed.error.format(),
      });
    }
  
    const appointment = parsed.data as Tables<"appointments">; 
    const result = await model.createAppointment(appointment);
    if ("error" in result) return res.status(400).json(result);
    res.status(201).json(result);
  }

  async getBookedSlotIds(req: Request, res: Response): Promise<any> {
    const { date, doctor_id } = req.query;
    
    if (typeof date !== "string" || typeof doctor_id !== "string") {
      return res.status(400).json({ error: "Missing or invalid query parameters." });
    }

    try {
      const slotIds = await model.getBookedSlotIdsByDate(date, doctor_id);
      if (slotIds === null) {
        return res.status(500).json({ error: "Error retrieving booked slot IDs." });
      }
      return res.status(200).json(slotIds);
    } catch (err) {
      return res.status(500).json({ error: "Server error", details: err });
    }
  }

  async getByDoctorId(req: Request, res: Response) : Promise<any>  {
    const { doctor_id } = req.params;
    const result = await model.getAppointmentsByDoctorId(doctor_id);
    if ("error" in result) return res.status(400).json(result);
    res.status(200).json(result);
  }

  async getByPatientId(req: Request, res: Response) : Promise<any>  {
    const { patient_id } = req.params;
    const result = await model.getAppointmentsByPatientId(patient_id);
    if ("error" in result) return res.status(400).json(result);
    res.status(200).json(result);
  }
  
  async getByGuestIdId(req: Request, res: Response) : Promise<any>  {
    const { guest_id } = req.params;
    const result = await model.getAppointmentsByGuestId(guest_id);
    if ("error" in result) return res.status(400).json(result);
    res.status(200).json(result);
  }

  async update(req: Request, res: Response) : Promise<any>  {
    const { id } = req.params;
    const updatedAppointment: Partial<Tables<"appointments">> = req.body;
    const result = await model.updateAppointment(id, updatedAppointment);
    if ("error" in result) return res.status(400).json(result);
    res.status(200).json(result);
  }

  async cancel(req: Request, res: Response) : Promise<any>  {
    const { id } = req.params;
    const result = await model.cancelAppointment(id);
    if ("error" in result) return res.status(400).json(result);
    res.status(200).json(result);
  }

}
