const { faker, tr } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOveride = require("method-override");

app.use(methodOveride("_method"));
app.use(express.urlencoded({ extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "/views"));
// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DELTA_APP',
    password: 'Omkar@23',
});

let getRandomUser = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};




//home routeeeeeeeee
app.get("/", (req, res) => {
    let q = 'SELECT count(*) FROM temp';
    try{
  connection.query(q,(err,result) => {
        if(err) throw err;
        let count = result[0]["count(*)"]
        res.render("home.ejs", {count});
   });

} catch (err){
    console.log(err);
    res.send("some error in the code");
}

//connection.end() automatically ho jata ///
});

//Show routeeeeeeeeeeeeeeeeeeeee
app.get("/user", (req, res) => {
    let q = 'SELECT * FROM temp';
    try{
        connection.query(q,(err,users) => {
              if(err) throw err;
              //console.log(result);
              //res.send(result);
              res.render("showusers.ejs",{users});
              
         });
      
      } catch (err){
          console.log(err);
          res.send("some error in the code");
      }
});

//edit routeeeeeeeeeee
app.get("/user/:id/edit", (req , res) =>{
    let { id } = req.params;
    let q = `SELECT * FROM temp WHERE id= '${id}'`;
    try{
        connection.query(q,(err,result ) => {
              if(err) throw err;
              let user = result[0];
              //res.send(result);
              res.render("edit.ejs",{user});
              
         });
      
      } catch (err){
          console.log(err);
          res.send("some error in the code");
      }
    
});


//update the route in db
app.patch("/user/:id" , (req,res) => {
    let { id } = req.params;
    let {password: formPass, username : newUsername} = req.body;
    let q = `SELECT * FROM temp WHERE id= '${id}'`;

    try{
        connection.query(q,(err,result ) => {
              if(err) throw err;
              let user = result[0];
              if(formPass != user.password){
                res.send("Wrongggg Passsworddd"); 
              }else{
                let q2 = `UPDATE temp SET username = '${newUsername}' WHERE id='${id}'`;
                connection.query(q2,(err , result) =>{
                    if(err) throw err;
                    res.redirect("/user");
                });
              }              
         });
      
      } catch (err){
          console.log(err);
          res.send("some error in the code");
      }
    
})

app.listen("8080" , () => {
    console.log("Server is listening to projectSs");
});





