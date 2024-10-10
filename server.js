const express = require("express");
const app = express();

const port = 3000;

app.set('view engine', 'pug')



// Custom middleware to display time of request 
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();

  console.log(`[${currentTime}]\t ${req.method} request to ${req.url}`);

  next();
});


// Close app outside of working hours
app.use((req,res,next) =>{
  const now = new Date() //now
  let day = now.getDay() //day
  let hour = now.getHours() //hour
  if(day>=1 && day <=5 && hour>=9 && hour<=17){
      next()
  }else {
      res.send("we're not working right now, come back later!")
  }
})

// Routes
app.get("/", (req, res) => {
  res.render("index", {title: 'Home'});
});

app.get("/services", (req, res) => {
  res.render("services", {title: 'Our Services'});
});

app.get("/contact", (req, res) => {
  res.render("contact", {title: 'Contact Us'});
});


// Server start at defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
