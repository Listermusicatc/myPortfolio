const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')




const app = express()
const port = 3000


//middleware



app.use(express.static('public'))


app.get('/',function(req,res){

res.sendFile(__dirname + '/index.html')


})
app.get('/resume.html',function(req,res){
     
         

res.render('resume')


})







app.listen(port, () => console.log(`Example app listening on port ${port}!`))