const nodemailer = require('nodemailer');
const configMail = require('./config');

const participants = [
  //Fill it with your participants
  {name: '', mail: ''},
  {name: '', mail: ''},
  {name: '', mail: ''}
]
let taken = []

for ( let i = 0; i < participants.length; i++) {
  const participant = participants[i];
  const random = randomFriend();
  matchParticipants(participant,random);
}
function randomFriend() {
  const randomNumber = Math.floor(Math.random() * participants.length);
  const randomParticipant = participants[randomNumber];
  return randomParticipant;
}
function  matchParticipants(participant, randomParticipant) {
  if (participant !== randomParticipant && !taken.includes(randomParticipant)) {
    taken.push(randomParticipant);
    sendMail(participant, randomParticipant);
    /* console.log(participant , randomParticipant); */
    return
  }
  return  matchParticipants(participant, randomFriend())
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: configMail.user,
         pass: configMail.pass
     }
 });
function sendMail(participant, partner) {
  mailOptions = {
    from: configMail.user , // sender address
    to: participant.mail, // receiver
    subject: 'Sorteo Amigo Secreto', // Subject line
    html: `<p> Hola ${participant.name} tu pareja es ${partner.name}</p>`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

