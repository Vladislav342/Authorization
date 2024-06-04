const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'The activation of account ' + process.env.API_URL,
            text: '',
            html: 
            `
                <div>
                    <h1>Hit the link for activation</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService();