// models/Medicine.js
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    emailSent: { type: Boolean, default: false } // to track if an alert has been sent
});

module.exports = mongoose.model('Medicine', MedicineSchema);
