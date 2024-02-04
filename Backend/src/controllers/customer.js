import Customer from '../models/customer.js';
import { customerSchema } from '../schemas/customer.js';
// ADD customer
export const addcustomer = async (req, res) => {
      try {
            const { error } = customerSchema.validate(req.body, { abortEarly: false });
            if (error) {
                  const errors = error.details.map((err) => err.message);
                  return res.status(400).json({ errors });
            }
            const newCustomer = await Customer.create(req.body);
            return res.status(201).json(newCustomer);
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            });
      }
};

// GET LIST customer
export const getcustomers = async (req, res) => {
      try {
            const customers = await Customer.find();
            return res.status(200).json(customers);
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            });
      }
};

// GET ONE customer
export const getcustomer = async (req, res) => {
      const { id } = req.params;
      try {
            const customer = await Customer.findById(id);
            if (!customer) {
                  return res.status(404).json({ message: "Không tìm thấy khách hàng." });
            }
            return res.status(200).json(customer);
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            });
      }
};

// UPDATE customer
export const updatecustomer = async (req, res) => {
      const { id } = req.params;
      try {
            const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCustomer) {
                  return res.status(404).json({ message: "Không tìm thấy khách hàng." });
            }
            return res.status(200).json(updatedCustomer);
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            });
      }
};

// DELETE customer
export const deletecustomer = async (req, res) => {
      const { id } = req.params;
      try {
            const deletedCustomer = await Customer.findByIdAndDelete(id);
            if (!deletedCustomer) {
                  return res.status(404).json({ message: "Không tìm thấy khách hàng." });
            }
            return res.status(200).json({ message: "Khách hàng đã được xóa thành công." });
      } catch (error) {
            return res.status(500).json({
                  error: error.message
            });
      }
};




