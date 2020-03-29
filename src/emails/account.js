const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async (email,name) => {
    await sgMail.send({
        to: email,
        from: 'fabianonetto@gmail.com',
        subject: 'Welcome to Task Manager App',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendFarewellEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'fabianonetto@gmail.com',
        subject: `We're sorry to see you leaving`,
        text: `Dear ${name}, we are sorry to see you leaving. Please send us any feedback`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendFarewellEmail
}
