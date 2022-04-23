const express = require( 'express' )
const DB = require( './DB/config' )
const User = require( './DB/UserSchema' )
const cors =require('cors')
const app = express()
const PORT = 5000;

const Jwt = require( 'jsonwebtoken' )
const jwtKey = 'e-comm'


app.use( express.json() )//to send data from postman in node..access the payload json
app.use( cors() );

app.post( "/register", async ( req, res ) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send("Something went wrong")  
        }
        res.send({result,auth:token})
    })
})

// app.get( "/", ( req, res ) => {
//     res.send("Server is working")
// })


app.post("/login",  async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send("Something went wrong")  
                }
                res.send({user,auth:token})
            })
        } else {
            res.send({ result: "No User found" })
        }
    } else {
        res.send({ result: "No User found" })
    }
} )

//middleware

function verifyToken ( req, res, next ) {
    let token = req.headers[ 'authorization' ]
    if ( token ) {
        token = token.split( ''[ 1 ] );
        Jwt.verify( token, jwtKey, ( err, valid ) => {
            if ( err ) {
                res.status(401).send({result: "please provide valid token"})
            }
            else {
                next()
            }
        })
    } else {
        res.status(403).send({result:"Please add token with header"})
    }
}

app.listen(PORT,()=>{
    console.log(`Server is working on the localhost:${PORT}`)
})