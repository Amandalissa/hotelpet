import nodeMailer from "nodemailer";

class EmailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.MAIL_SMTP,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_SOURCE,
                pass: process.env.MAIL_KEY
            }
        })
    }

    async send(recipient,  subject, text) {
        let emailData = {
            from: process.env.MAIL_SOURCE,
            to: recipient,
            subject: subject,
            text: text
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(emailData, (error, data) => {
                if(error) {
                    reject(error);
                    return;
                }

                resolve(data);
            });
        });
    }
}

export default EmailService;