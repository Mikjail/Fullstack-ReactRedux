const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const RecipientSchema = require('../models/Recipient');

module.exports = app =>{
    
    app.delete('/api/surveys',requireLogin,async (req, res)=>{
        try{
            const mongoResult = await Survey.findByIdAndRemove(req.query[0]).exec();
            res.send(mongoResult);
        }catch(error){
            res.send({
                status: 409,
                message: 'Request could not be completed. Check the id',
                data: ''
            })
        }
        
    })

    app.get('/api/surveys',requireLogin, async (req,res) =>{
        const surveys = await Survey.find({ _user: req.user.id })
        .select({ recipients: false});
        res.send(surveys);
    })

    app.get('/api/surveys/:surveyId/:choice', (req,res)=>{
        res.send('Thanks for voting!');
    })

    app.post('/api/surveys', requireLogin, requireCredits,async (req, res)=> {
        const { title, subject, body, recipients } = req.body;
        const email = recipients.split(',').map(email => ({email:email.trim()}));
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: email,
            _user: req.user.id,
            dateSent: Date.now()
        });

        // console.log(recipients.split(',').map(email => ({email:email.trim()})))
        //Place to send the email
        const mailer = new Mailer(survey, surveyTemplate(survey));
           try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
           } catch (error) {
               res.status(422).send(error);
           }
           res.send(req.user);
    })


    app.post('/api/surveys/webhooks', (req, res) =>{
        const p = new Path('/api/surveys/:surveyId/:choice');
       
        _.chain(req.body)
            .map(({email, url})=> {
                //extract path from url
                const match = p.test(new URL(url).pathname)
                if(match){
                    return { 
                        email: email, 
                        surveyId: match.surveyId, 
                        choice: match.choice
                    };
                }
            })
             //delete undefined values
            // const compactEvents =  _.compact(events);
            .compact()
             // creates a new objesct with the two properties I selected.
             // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
             .uniqBy( 'email', 'surveyId')
             .each(({surveyId, email, choice}) =>{
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false}
                    }
                }, {
                    $inc: { [choice]: 1},
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

            res.send({});
    })
}