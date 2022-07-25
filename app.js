const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();




const app = express()
const port = process.env.port || 3000


//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });


  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  app.post("/send", (req, res) => {
    //1.
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
      console.log(fields);
      Object.keys(fields).forEach(function (property) {
        data[property] = fields[property].toString();
      });
  
      //2. You can configure the object however you want
      const mail = {
        from: data.firstname,
        to: process.env.EMAIL,
        subject: data.Subject,
        text: `${data.firstname} <${data.email}> \n${data.Message}`,
        
      };
  
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).sendFile(__dirname + '/public/failed.html')
        } else {
          res.status(200).sendFile(__dirname + '/public/send.html')
        }
      });
    });
  });


app.get('/',function(req,res){

res.sendFile(__dirname + '/index.html')


})






app.listen(port, () => console.log(`Example app listening on port ${port}!`))