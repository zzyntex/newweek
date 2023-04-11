const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req,res) =>{
    console.log(req.body)
    
    let result = login(req.body.username, req.body.password)

    res.send(result)
})

app.post('/register', (req,res) =>{
    console.log(req.body)
    let result = register(req.body.username, req.body.password,req.body.name,req.body.email)

res.send(result)
})

app.get('/', (req, res) => {
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
      Username : "Zaid",
      password : "zaid1342",
      name : "Zaid",
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