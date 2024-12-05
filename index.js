const express = require('express');
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/' , function(req, res){
    res.send("Remember Pain ");
})
app.get('/create', async function(req, res) {
    let newUser = await userModel.create({
        username: "Stammer",
        email: "stammer786@gmail.com",
        age: 22
    })
    res.send(newUser);
})

app.get('/post/create' , async function(req, res){
    let post = await postModel.create({
        postdata: "No One Remember Pain, EveryOne Forget Pain , Live in Pain",
        user: "675239bf24e137a28276e6fe"
    })

    let user = await userModel.findOne({_id :"675239bf24e137a28276e6fe"});
    user.posts.push(post._id);
     await user.save();
    res.send({post , user});
})


app.listen(3000)

