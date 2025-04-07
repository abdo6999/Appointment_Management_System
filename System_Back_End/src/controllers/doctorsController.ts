import { Request, Response } from "express";
import { DoctorModel } from "../models/doctorsModel"; 

const doctorModel = new DoctorModel();

export class DoctorController {

  // Create a new doctor
  async createDoctor(req: Request, res: Response): Promise<any> {
    try {
      const doctor = req.body; 
      const result = await doctorModel.createDoctor(doctor);
      if ("error" in result) {
        return res.status(400).json({ error: result.error });
      }
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<any> {
    try {
      const { doctorId } = req.params;
      const result = await doctorModel.getDoctorById(doctorId);
      if ("error" in result) {
        return res.status(404).json({ error: "Doctor not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllDoctors(req: Request, res: Response): Promise<any> {
    try {
      const result = await doctorModel.getAllDoctors();
      if ("error" in result) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<any> {
    try {
      const { doctorId } = req.params;
      const updatedDoctor = req.body; // Get updated doctor data from the request body
      const result = await doctorModel.updateDoctor(doctorId, updatedDoctor);
      if ("error" in result) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<any> {
    try {
      const { doctorId } = req.params;
      const result = await doctorModel.deleteDoctor(doctorId);
      if ("error" in result) {
        return res.status(400).json({ error: result.error });
      }
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
