import email from 'nodemailer';
let sendingMail = email.createTransport({
    service : 'gmail',
    auth : {
        user : "sb360879@gmail.com",
        pass : "mkqzbzqlqpdrpakv"
    }
});

export default sendingMail;