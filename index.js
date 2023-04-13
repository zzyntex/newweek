const express = require('express')
const app = express()
const port = 3000
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

app.use(express.json())

app.post('/login', (req,res) =>{
    console.log(req.body)
    
    let result = login(req.body.username, req.body.password)
    
    let token = generateToken(result)
    res.send(token)
})

app.post('/register', (req,res) =>{
    console.log(req.body)
    let result = register(req.body.username, req.body.password,req.body.name,req.body.email)

res.send(result)
})

app.get('/bye', verifytoken, (req, res) => {
  res.send('Account created')
})

app.get('/logout', (req, res) => {
    res.send('GOODBYE')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
  {
      Username : "zaid",
      password : "12345",
      name : "zaid",
      email : "ayiero12@gmail.com"
  }
  ,
  {
      Username : "Ali",
      password : "1234",
      name : "ALi",
      email : "ali@gmail.com"
  }
  ,
  {
      Username : "abu",
      password : "12345",
      name : "Abut",
      email : "abu88@gmail.com"

}
]

function login(reqUsername,reqpassword)
{
  let matchuser= dbUsers.find(
      x => x.Username == reqUsername)

  if (!matchuser)return "User not found"
  if(matchuser.password==reqpassword)
{
  return matchuser
}
else
{
  return "invalid password"
}

}

function register(reqUsername, reqpassword, reqname,reqemail)
{
  dbUsers.push
  (
      {
      Username: reqUsername,
      password: reqpassword,
      name:   reqname,
      email : reqemail    
      }
  )
}

function generateToken(userData){
  const token = jwt.sign(
    userData,
    'Inipassword');
    return token
}

function verifytoken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'Inipassword', function(err, decoded){
    if(err) {
      res.send("Invalid Token")
    }
    req.user = decoded
    next()
  });
}