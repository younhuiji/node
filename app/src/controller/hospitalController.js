const Hospital = require('../modles/Hospital');
// const Tresh = require('../modles/Tresh');

    const get = {
        list: async (req, res) => {
            const { frist_local, second_local } = req.query;
            console.log('req 값: ' + frist_local);
            console.log('req2 값: ' + second_local);
          
            if (!frist_local) {
                const results = await Hospital.allList();
                return res.status(200).send(results);
            } else {
                const results = await Hospital.list(frist_local, second_local);
                return res.status(200).send(results);
            }
        },

        localList: async (req, res) => {
            const {latitude, longitude} = req.body;
            console.log('req 값: '+ latitude + ', ' + longitude);

            const results = await Hospital.localList(latitude, longitude);
            console.log('results: '+ results);

            return res.status(200).send(results);
        },
    
        detail: async (req, res) => {
            const id = req.query.id;
            console.log('id 값: '+ id);

            const results = await Hospital.detail(id);
            // 병원 조회수는 추후
            // const updateView = await Hospital.updateView(id);

            return res.status(200).json(results);
        },

        update: async (req, res) => {
            const id = req.query.id;
            console.log('id 값: '+ id);

            const results = await Hospital.getUpdate(id);
            return res.status(200).send(results);
        }
    }

    const post = {
        create: async (req, res) => {
            const results =  await Hospital.create(req.body);
            return res.status(200).send('OK.');
        }
    }

    const put = {
        update: async (req, res) => {
            const results = await Hospital.update(req);
            return res.status(200).send('OK.');
        }
    }

    const deleted = {
        delete: async (req, res) => {
            const id = req.query.id;
            const data = req.body;
            console.log('id = ' + id);
            console.log('data = ' + data);

            const results = await Hospital.delete(id);
            // const deleteInsert = await Tresh.create(data);
            
            return res.status(200).send('OK');
        }
    }

    module.exports = {get, post, put, deleted};