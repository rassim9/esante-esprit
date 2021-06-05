const express = require('express');
const bodyParser =require('body-parser');
const db = require('./util/database');
const pesageRoutes=require('./routes/pesage');
const poidsRoutes=require('./routes/poids');
const pasRoutes=require('./routes/pas');

const patientRoutes=require('./routes/patient');
const userRoutes=require('./routes/user');
const rdvRoutes=require('./routes/rdv');

const errorController =require ('./controllers/error') ;
const authRoutes=require('./routes/auth');
const etatsRoutes=require('./routes/etats'); 

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
const scopes = ["https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/plus.me profile email openid"];
//https://www.googleapis.com/auth/fitness.activity.read
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
  //const id= req.query.id;
  //const secret = req.query.secret;
  console.log(code);
 

  const oauth2Client = new google.auth.OAuth2(
    //clientid
"422378604665-gvfnd9e6gm73nci5gpmpr0iih8ksut3n.apps.googleusercontent.com",
//id,
//client secret
"N01M8x5054F0uv91u93ekCge" ,
//secret,
//link to redirect to 
"http://localhost:3000/steps"

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
       // dataTypeName: "com.google.step_count.delta",
        dataTypeName: "com.google.weight.summary",
     // dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        dataSourceId: "derived:com.google.weight:com.google.android.gms:merge_weight",

        
        },
        
        {  dataTypeName: "com.google.step_count.delta",
          //dataTypeName: "com.google.weight.summary",
         dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
          //dataSourceId: "derived:com.google.weight:com.google.android.gms:merge_weight",
  
          
          },
         // {  dataTypeName: "com.google.height.summary",
          //dataTypeName: "com.google.weight.summary",
         //dataSourceId: "derived:com.google.height:com.google.android.gms:merge_height",
          //dataSourceId: "derived:com.google.weight:com.google.android.gms:merge_weight",
  
          
          //},
          
      ],
      bucketByTime: { durationMillis: 86400000},
      startTimeMillis: 1621465200000,
      endTimeMillis: 1621551600000,
    },
  });
  //console.log(result);
 // res.send("steps.value");

  stepArray = result.data.bucket;
} catch (e){
  console.log(e);
}
try{
for (const dataSet of stepArray){
 // console.log(dataSet);
 //console.log(stepArray.length);
  for (const points of dataSet.dataset){
     //console.log(points);
     for (const steps of points.point){
       
       //console.log(steps.value);
      for (s of steps.value){
        
        if (s.fpVal){console.log(s.fpVal);
        //db.execute('INSERT INTO poids (valeur) VALUES (?)',[s.fpVal] );
      }
        else {console.log(s.intVal);
         //db.execute('INSERT INTO pas (valeur) VALUES (?)',[s.intVal] );
      }
        
        
       //db.execute('INSERT INTO poids (pas) VALUES (?)',[s.fpVal] );
      }
     }
   }
   //console.log(res.value);

  
}

}
catch (e){
  console.log();
}
return res.redirect('http://localhost:4200/#/tables');

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
app.use('/etat', etatsRoutes);
app.use('/rdv', rdvRoutes);

app.use('/user', userRoutes);
app.use('/patient', patientRoutes);


app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));