// notification.js
const nodemailer = require('nodemailer');
const Medicine = require('./models/Medicine');

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
        user: 'niharikasanthoshi2004@gmail.com', // your email
        pass: 'zmio vsaq vqqv cxrw', // your email password
    },
});

const sendExpiryAlerts = async () => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    try {
        const medicines = await Medicine.find({
            expiryDate: { $gte: today, $lte: thirtyDaysFromNow },
            emailSent: false,
        });

        for (const medicine of medicines) {
            const mailOptions = {
                /*from: 'your_email@gmail.com',*/
                to: 'niharikasanthoshi2004@gmail.com', // recipient's email
                subject: 'Medicine Expiry Alert',
                text: `The medicine "${medicine.name}" is expiring on ${medicine.expiryDate.toDateString()}.`,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent for medicine: ${medicine.name}`);

            // Update the medicine to mark the alert as sent
            medicine.emailSent = true;
            await medicine.save();
        }
    } catch (error) {
        console.error('Error sending expiry alerts:', error);
    }
};

module.exports = sendExpiryAlerts;
