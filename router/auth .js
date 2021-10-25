const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    res.send(`Hello world successful from router`);
});


//                   Using Promises

// router.post('/resister', (req, res) => {

//     const { name, email, phone, profession, password } = req.body;

//     if (!name || !email || !phone || !profession || !password) {
//         return res.status(422).json({
//             error: "plz filed the properly "
//         })
//     }
//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "email alrady exist" });
//             }

//             const user = new User({ name, email, phone, profession, password})
//             user.save().then(()=>{
//                 res.status(201).json({massage:"user resistered successfuly"});
//             }).catch((err)=>res.status(500).json({error:"Failed to resister"}));
//         }).catch((err)=>{console.log(err); });


// });



//    Async Await

router.post('/signup', async (req, res) => {

    const { name, email, phone, profession, password } = req.body;

    if (!name || !email || !phone || !profession || !password) {
        return res.status(422).json({
            error: "plz filed the properly "
        });
    }


    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({
                error: "email alrady exist"
            });
        }
        const user = new User({ name, email, phone, profession, password })
        await user.save();

        res.status(201).json({
            massage: "user resistered successfuly"
        });

    } catch (err) {
        console.log(err);
    }
});



router.post('/login', async (req, res) => {
    // console.log(req.body);
    // res.json({massage:"awesom"});
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "plz filled the data"
            })
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);
        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            res.status(400).json({ error: "user Error" });
        } else {
            res.json({
                massage: "User Login successfully"
            });
        }


    } catch (err) {
        console.log(err);
    }
})


module.exports = router;