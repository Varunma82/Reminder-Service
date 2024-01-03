const { response } = require('express')
const sender=require('../config/emailConfg')

const sendBasicEmail=async (mailFrom,mailTo,mailSubject,mailBody)=>{
    try {
        sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody        
        })
        console.log(response)   
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    sendBasicEmail
}