import express,{Express, Request, Response}  from 'express'

// instanciate the express module
const app : Express= express();
//  define the  port number
const port = 6200;


app.get("/", (req:Request, res:Response) => {
  res.send("testing route");
});

app.listen(port);
