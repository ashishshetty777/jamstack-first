require('dotenv').config();

exports.handler = (event, _context, callback) => {
    // const mailgun = require('mailgun-js');
    // const mg = mailgun({
    //     apiKey: process.env.MAILGUN_API_KEY,
    //     domain: process.env.MAILGUN_DOMAIN,
    // });

    const data = JSON.parse(event.body);
    const email = {
        from : 'Ashish Shetty <ashishshetty777@gmail.com>',
        to: `${data.name} <${data.email}>`,
        subject: data.subject,
        text: data.body,
        apiKey: process.env.MAILGUN_API_KEY,
        apiDomain: process.env.MAILGUN_DOMAIN
    }

    // mg.messages().send(email, (error, response)=>{
    //     callback(error, {
    //         statusCode: 200,
    //         body: JSON.stringify(response)
    //     })

    // })

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(email)
    })
}