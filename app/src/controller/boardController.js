const Board = require('../modles/Board');
// const Tresh = require('../modles/Tresh');

    const get = {
        list: async (req, res) =>{
            const results = await Board.list();
            return res.status(200).json(results);
        },

        detail: async (req, res) => {
            const id = req.query.id;
            console.log('id 값: '+ id);

            const results = await Board.detail(id);
            const updateView = await Board.updateView(id);
            
            return res.status(200).json(results);
        },

        update: async (req, res) => {
            const id = req.query.id;
            console.log('id 값: '+ id);

            const results = await Board.getUpdate(id);
            return res.status(200).json(results);
        }
    }

    const post = {
        create: async (req, res) => {
            console.log('controller :', req.body);
            const results = await Board.create(req.body);
            return res.status(200).send('OK.');
        }
    }

    const put = {
        update: async (req, res) => {
            console.log('controller :', req);
            const results = await Board.postUpdate(req);
            return res.status(200).send('OK.');
        }
    }

    const deleted = {
        delete: async (req, res) => {
            const id = req.query.id;
            const data = req.body;
            console.log('id = ' + id);
            console.log('data = ' + data);

            const results = await Board.delete(id);
            // const deleteInsert = Tresh.create(data);
            
            return res.status(200).send('OK.');
        }
    }

    module.exports = {get, post, put, deleted};