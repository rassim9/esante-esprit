const express = require('express');
const bodyParser =require('body-parser');
const sgMail = require('@sendgrid/mail')


const db = require('./util/database');
const pesageRoutes=require('./routes/pesage');
const poidsRoutes=require('./routes/poids');
const pasRoutes=require('./routes/pas');
const operationRoutes=require('./routes/operation');


const patientRoutes=require('./routes/patient');
const userRoutes=require('./routes/user');
const rdvRoutes=require('./routes/rdv');
const msgRoutes=require('./routes/message');


const errorController =require ('./controllers/error') ;
const authRoutes=require('./routes/auth');
const etatsRoutes=require('./routes/etats'); 
const activeminRoutes=require('./routes/activemin');
const heartminRoutes=require('./routes/heartmin');
const heartbpmRoutes=require('./routes/heartbpm');
const caloriesRoutes=require('./routes/calories');
const medicamentRoutes=require('./routes/medicament');
const alimentationRoutes=require('./routes/alimentation');
const nutritionnisteRoutes=require('./routes/nutritionniste');
const cardiologueRoutes=require('./routes/cardiologue');
const psyRoutes=require('./routes/psy');

const { google } = require("googleapis");
const request =require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
const axios = require("axios");
const { response } = require('express');
const { patient } = require('./controllers/patient');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
var cache = require('memory-cache');



const ports = process.env.PORT || 3000;
//clientid
//422378604665-gvfnd9e6gm73nci5gpmpr0iih8ksut3n.apps.googleusercontent.com
//client secret
//N01M8x5054F0uv91u93ekCge

app.get("/getURLTing", (req, res) =>{
  const oauth2Client = new google.auth.OAuth2(
    //clientid
"422378604665-gvfnd9e6gm73nci5gpmpr0iih8ksut3n.apps.googleusercontent.com",
//client secret
"N01M8x5054F0uv91u93ekCge" ,
//link to redirect to 
"http://localhost:3000/steps"

)
//const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"];
const scopes = ["https://www.googleapis.com/auth/fitness.body.read  https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read  https://www.googleapis.com/auth/plus.me profile email openid"];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  state: JSON.stringify({
    callbackUrl: req.body.callbackUrl,
    userID: req.body.userid
  })
});

request(url, (err,response, body) => {
  console.log("error: ",err);
  console.log("statusCode: ", response && response.statusCode);
  res.send({ url });


});

});

app.get("/steps", async(req, res) =>  {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const id=cache.get('id');
  const secret=cache.get('secret');
  const email=cache.get('email');
const redirect="http://localhost:3000/steps";
  //console.log(code);
  var d1=Date.now();
  //console.log(d1);
  var d = new Date();
d.setUTCHours(0,0,0,0);
//console.log(+d);
var tt=d1-d;
//console.log(tt);
var w=d1-(tt+(86400000*6));
//console.log(w);
 

  const oauth2Client = new google.auth.OAuth2(
    //clientid
id,
//id,
//client secret
secret,
//secret,
//link to redirect to 
redirect

);

const tokens = await oauth2Client.getToken(code);
//console.log(tokens);


let stepArray = [];

try {
  const result = await axios({
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokens.tokens.access_token
    },
    "Content-Type": "application/json",
    url:"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
    data: {
      aggregateBy:[
        {
        dataTypeName: "com.google.weight.summary",
        dataSourceId: "derived:com.google.weight:com.google.android.gms:merge_weight",
      },
        
        {  
         dataTypeName: "com.google.step_count.delta",
        dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
  
          },
          {  dataTypeName: "com.google.calories.expended",
         
          },
          
         {  dataTypeName: "com.google.heart_minutes",
         dataSourceId: "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes",
        
          },
          {  dataTypeName: "com.google.heart_rate.bpm",
          
          },
          { dataTypeName: "com.google.active_minutes",
         
         },
         // { dataTypeName: "com.google.sleep.segment",
         
         // },
          
          
      ],

      bucketByTime: { durationMillis: 86400000},
      startTimeMillis: w,
      endTimeMillis: d1,
    },
  });
 // console.log(result);
 // res.send("steps.value");

  stepArray = result.data.bucket;
} catch (e){
  console.log(e);
}
try{
 
for (const dataSet of stepArray){ 
  //console.log(dataSet.dataset['dataSourceId']);
  //if (dataSet.dataset.dataSourceId==='derived:com.google.weight.summary:com.google.android.gms:aggregated'){
  //console.log(dataSet);
  for (const points of dataSet.dataset){
   
     for (const steps of points.point){
        // console.log(steps);
       if(steps.dataTypeName==='com.google.step_count.delta'){
       console.log(steps.dataTypeName)
      
             for (s of steps.value){
              
          console.log(s.intVal);
        db.execute('INSERT INTO pas (valeur,email) VALUES (?,?)',[s.intVal,email] );
      }
    }
    else if(steps.dataTypeName==='com.google.weight.summary'){
      console.log(steps.dataTypeName)
             for (s of steps.value){
              
          console.log(s.fpVal.toFixed(2));
        db.execute('INSERT INTO poids (valeur,email) VALUES (?,?)',[s.fpVal.toFixed(2),email] );
      }

    }
    else if(steps.dataTypeName==='com.google.calories.expended'){
      console.log(steps.dataTypeName)
             for (s of steps.value){
          console.log(s.fpVal.toFixed(2));
      db.execute('INSERT INTO calories (valeur,email) VALUES (?,?)',[s.fpVal.toFixed(2),email] );
      }
    }
    
    else if(steps.dataTypeName==='com.google.heart_minutes.summary'){
      console.log(steps.dataTypeName)
    
             for (s of steps.value){
          console.log(s.fpVal);
          if (typeof s.fpVal !== 'undefined') {
            db.execute('INSERT INTO heartmin (valeur) VALUES (?)',[s.fpVal] );        }

      }
    }
    else if(steps.dataTypeName==='com.google.heart_rate.summary'){
      console.log(steps.dataTypeName)
    
             for (s of steps.value){
          console.log(s.fpVal);
          
        db.execute('INSERT INTO heartbpm (valeur) VALUES (?)',[s.fpVal] );
      }
    }
    else if(steps.dataTypeName==='com.google.active_minutes'){
      console.log(steps.dataTypeName)
    
             for (s of steps.value){
          console.log(s.intVal);
          
        db.execute('INSERT INTO activemin (valeur) VALUES (?)',[s.intVal] );
      }
    }
    else if(steps.dataTypeName==='com.google.sleep.segment'){
      console.log(steps.dataTypeName)
    
             for (s of steps.value){
          console.log(s.intVal);
          
        //db.execute('INSERT INTO poids (valeur) VALUES (?)',[s.fpVal] );
      }
    }
    else {
      //console.log(steps.dataTypeName)
    
             for (s of steps.value){
          console.log(s.intVal);
          break;
        //db.execute('INSERT INTO poids (valeur) VALUES (?)',[s.fpVal] );
      }
    }
      }
      
    }
  }
  
}
       
          //console.log(s.intVal);
          
         //db.execute('INSERT INTO pas (valeur) VALUES (?)',[s.intVal] );
      //}
        
        
       //db.execute('INSERT INTO poids (pas) VALUES (?)',[s.fpVal] );
      //}
     
   
   //console.log(res.value);

  



catch (e){
  console.log(); 
}
return res.redirect('http://localhost:4200/#/dashboard2');

});


   
  


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });


app.use('/pesages', pesageRoutes);
app.use('/poids', poidsRoutes);
app.use('/pas', pasRoutes);
app.use('/auth', authRoutes);
app.use('/etats', etatsRoutes);
app.use('/rdv', rdvRoutes);
app.use('/message', msgRoutes);
app.use('/activemin', activeminRoutes);
app.use('/heartmin', heartminRoutes);
app.use('/heartbpm', heartbpmRoutes);
app.use('/calories', caloriesRoutes);
app.use('/user', userRoutes);
app.use('/patient', patientRoutes);
app.use('/medicament', medicamentRoutes);
app.use('/alimentation', alimentationRoutes);
app.use('/nutritionniste', nutritionnisteRoutes);
app.use('/cardiologue', cardiologueRoutes);
app.use('/psy', psyRoutes);
app.use('/operation', operationRoutes);


app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));