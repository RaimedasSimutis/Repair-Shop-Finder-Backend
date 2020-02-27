const User = require('./userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const register = (req, res) => {
    let data = req.body;
    let user = new User();
    user.username = data.username;
    user.password = data.password;

    user.save()
    .then((createdUser) => {
        res.json(createdUser)
    })
    .catch((error) => {
        res.status(400).json(error)
    })

}

const getAll = (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.status(400).json(error)
    })

    // try {
    //     let users = await User.find()
    //     res.json(users)
    // } catch (error) {
    //     res.status(400).json(error)
    // }
}

const getSingleUser = (req, res) => {
    let id = req.params.id;

    User.findById(id)
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).json('no such user');
            return
        }
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (response) {
                let access = 'auth';
                let token = jwt.sign({
                    _id: user._id.toHexString(),
                    access:access
                }, config.password).toString()
                user.tokens.push({
                    token,
                    access
                })
                user.save()
                .then(() => {
                    res.header('x-auth', token).json(user)
                })
                

                
            } else {
                res.status(401).json('wrong pass')
            }
        })
    }
    catch(e) {
        res.status(400).json(e)
    }
    
}

// const logout = async (req, res) => {
//     let id = req.params.id;
//     //console.log(id);

//     User.findOne({_id:id} , function(err, user) {
//         //console.log('sitas consolas', toDo)
//         user.tokens = [];
//         user.save();
//     })
//     .then(listItems => {
//         res.json(listItems)
//     })
//     .catch(error => {
//         res.status(400).json(error)
//     })
// }

let logout = (req, res) => {
    let token = req.token
    let user = req.user
    user.update({
      $pull: {
        tokens: {
          token
        }
      }
    }).then(() => {
      res.json("logged out")
    }).catch(e => res.status(400).json(e))
  }


module.exports = {
    register, 
    getAll, 
    getSingleUser, 
    login,
    logout
}