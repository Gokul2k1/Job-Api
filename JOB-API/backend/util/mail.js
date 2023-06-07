const nodeMailer = require('nodemailer')

const MAIL_HOST="smtp.gmail.com"
const MAIL_ID="janbep2022@gmail.com"
const MAIL_PASSWORD="gqxbjmjgnaxzklwm"
const MAIL_PORT=465
const MAIL_SERVICE="gmail"

const sendMail = async (to,subject,content) => {
    try {
        const transporter = await nodeMailer.createTransport({
            service: process.env.MAIL_SERVICE || MAIL_SERVICE,
            host: process.env.MAIL_HOST || MAIL_HOST,
            port: process.env.MAIL_PORT || MAIL_PORT,
            auth: {
                user: process.env.MAIL_ID || MAIL_ID,
                pass: process.env.MAIL_PASSWORD || MAIL_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_ID,
            to,
            subject,
            html: `<div> ${content} </div>`
        })

        return info
        
    } catch (err) {
        return err.message
    }
}

module.exports = sendMail