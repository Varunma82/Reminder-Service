const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');

// const { sendBasicEmail } = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');
const EmailService=require('./services/email-service')

const cron = require('node-cron');
const jobs = require('./utils/job');
const {subscribeMessage,createChannel}=require('./utils/messageQueue')
const {REMINDER_BINDING_KEY}=require('./config/serverConfig')

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // const channel=await createChannel();

    app.post('/api/v1/tickets', TicketController.create);

    const channel=await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);

        jobs();
        // sendBasicEmail(
        //     'support@admin.com',
        //     'varun82m@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // );
        // cron.schedule('*/2 * * * *', () => {
        //     console.log('running a task every two minutes');
        //   });          

    });
}

setupAndStartServer()