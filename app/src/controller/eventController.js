const Event = require('../modles/Event');

const get = {
    list: async(req, res) => {
        const results = await Event.list();
        return res.status(200).json(results);
    },

    detail: async (req, res) => {
        const id = req.query.id;
        console.log('id 값: '+ id);

        const results = await Event.detail(id);
        const updateView = await Event.updateView(id);

        return res.status(200).json(results);
    },

    update: async (req, res) => {
        const id = req.query.id;
        console.log('id 값: '+ id);

        const results = await Event.getUpdate(id);
        return res.status(200).json(results);
    }
}

const post = {
    create: async (req, res) => {
        const results = await Event.create(req.body);
        return res.status(200).send('OK.');
    }
}

const put = {
    update: async (req, res) => {
        console.log('controller :', req);
        const results = await Event.postUpdate(req);
        return res.status(200).send('OK.');
    }
}

const deleted = {
    delete: async (req, res) => {
        const id = req.query.id;
        const data = req.body;
        console.log('id = ' + id);
        console.log('data = ' + data);

        const results = await Event.delete(id);
        // const deleteInsert = Tresh.create(data);
        
        return res.status(200).send('OK.');
    }
}

module.exports = {get, post, put, deleted};