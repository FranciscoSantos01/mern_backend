const jwt = require('jsonwebtoken')

const generateJWT = (uid, name)=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid,name}
        jwt.sign(payload, process.env.SECRET_SEED, { expiresIn: '2hr'},
        (err, token)=>{
            if(err){
                console.log(err)
                reject('token failed production')
            }

            resolve(token)
        }
        )
    })
}


module.exports={
    generateJWT
}