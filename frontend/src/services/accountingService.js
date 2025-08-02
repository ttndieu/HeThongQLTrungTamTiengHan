// src/services/accountingService.js
import { mockFetchAllPayments, mockUpdatePaymentStatus, mockGenerateInvoice, mockCalculatePayroll, mockRecordPayment, mockGenerateFinancialReport } from '../mockData/mockdata';

const getAllPayments = async () => {
    try {
        const payments = await mockFetchAllPayments();
        return payments;
    } catch (error) {
        throw error;
    }
};

const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
        const payment = await mockUpdatePaymentStatus(paymentId, newStatus);
        return payment;
    } catch (error) {
        throw error;
    }
};

const generateInvoice = async (paymentId) => {
    try {
        const invoice = await mockGenerateInvoice(paymentId);
        return invoice;
    } catch (error) {
        throw error;
    }
};

const calculatePayroll = async (period) => {
    try {
        const payroll = await mockCalculatePayroll(period);
        return payroll;
    } catch (error) {
        throw error;
    }
};

const recordPayment = async (paymentData) => {
    try {
        const newPayment = await mockRecordPayment(paymentData);
        return newPayment;
    } catch (error) {
        throw error;
    }
};

const generateFinancialReport = async (month, year) => {
    try {
        const report = await mockGenerateFinancialReport(month, year);
        return report;
    } catch (error) {
        throw error;
    }
};

const accountingService = {
  getAllPayments,
  updatePaymentStatus,
  generateInvoice,
  calculatePayroll,
  recordPayment,
  generateFinancialReport,
};

export default accountingService;