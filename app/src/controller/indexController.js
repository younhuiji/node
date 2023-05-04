const index = require("../modles/Index");
const User = require("../modles/User");


const get = {
    index: async (req, res) => {
        const results =  await index.index();
        console.log('conntroller : ' + results);
        return res.send(results);
    }   
};

// TODO: user 부분은 나중에 하기
const post = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },

    signup: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    }
};

module.exports = {get, post};
