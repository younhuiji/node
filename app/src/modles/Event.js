const connection = require('../config/index');
const sql = require('../config/sql');
const fs = require('fs');
const path = require('path');
const table = 'event';
const column = 'E';
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async list() {
        return new Promise((resolve, reject) => {
            connection.query(sql.list(table), (err, result) => {
                if (err) {
                    reject('event 데이터 조회 실패');
                }
                    console.log('event 데이터 조회: ', result);
                    resolve(result);
            });
        });
    },

    async detail(id) {
        return await new Promise((resolve, reject) => {
            connection.query(sql.datail(table), [id], function (err, result) {
              if (err) {
                reject('event 데이터 조회 실패');
              }
              console.log('event 데이터 조회: ', result);
               resolve(result);
            });
          });

      },

      async updateView(id) {
        return await new Promise((resolve, reject) => {
            connection.query(sql.updateView(table, column), [id], function (err, updateResult) {
              if (err) {
                reject('event 조회수 업데이트 실패');
              } else {
                console.log('event 조회수 업데이트 성공', updateResult);
                resolve(updateResult);
              }
            });
          });
    },

    async getUpdate (id) {
        return new Promise((resolve, reject) => {
            connection.query(sql.datail(table), [id], function (err, result) {
                if(err) {
                    reject('event 데이터 조회 실패');
                }
                    console.log('event 데이터 조회: ', result);
                    resolve(result);
            });  
        });
    },

    async create(req) {
        console.log('req body:', req);

        async function saveImage({ name, data, directory }) {
            const imagePath = path.join(directory, name);
            fs.writeFileSync(imagePath, data);
            return imagePath;
        };

        // 게시물 디렉토리 생성
        const eventDirName = `inform_${uuidv4()}`;
        const boardDirPath = path.join(__dirname, '..', 'public', 'images', 'event', eventDirName);
        fs.mkdirSync(boardDirPath);

        // 프로필 이미지 저장
        const profileImagePath = await saveImage(
            {
              name: req.E_PROFILE_IMAGE.name,
              data: req.E_PROFILE_IMAGE.data,
              directory: boardDirPath,
            }
          );

        // 게시물 이미지 저장
        // const boardImagePaths = await Promise.all(
        //     req.E_IMAGE.map((image) =>
        //       saveImage(
        //         {
        //           name: image.name,
        //           data: image.data,
        //           directory: boardDirPath,
        //         }
        //       )
        //     )
        //   );

        
        await new Promise((resolve, reject) => {
        connection.query(sql.sql_event_create, [
                req.E_TITLE,
                profileImagePath,
                // JSON.stringify(boardImagePaths),
                req.E_CONTENT,
                req.E_WRITER,
                new Date(),
                new Date()
        ], (err, result, field) => {
                if(err) {
                    reject('event 데이터 생성 실패');
                }
                    console.log('create 성공: ', result);
                    resolve(result);
            });
        });
    },

    async postUpdate(req) {
        async function saveImage({ name, data, directory }) {
            const imagePath = path.join(directory, name);
            fs.writeFileSync(imagePath, data);
            return imagePath;
        };
      
        const eventId = req.query.id;
        const data = req.body;
        console.log('req data:', data);
        console.log('req eventId:', eventId);
      
        // 게시물 디렉토리 생성
        const eventDirName = `inform_${uuidv4()}`;
        const boardDirPath = path.join(__dirname, '..', 'public', 'images', 'event', eventDirName);
        fs.mkdirSync(boardDirPath);

      
        // 프로필 이미지 저장
        const profileImagePath = await saveImage({
          name: data.E_PROFILE_IMAGE.name,
          data: data.E_PROFILE_IMAGE.data,
          directory: boardDirPath,
        });
      
        // 게시물 이미지 저장
        // const newBoardImagePaths = await Promise.all(
        // data.E_IMAGE.map((image) =>
        //     saveImage({
        //       name: image.name,
        //       data: image.data,
        //       directory: boardDirPath,
        //     })
        //   )
        // );
      
        await new Promise((resolve, reject) => {
          connection.query(sql.sql_event_update, [
            data.E_TITLE,
            profileImagePath,
            // JSON.stringify(newBoardImagePaths),
            data.E_CONTENT,
            new Date(),
            eventId,
          ], (err, result, field) => {
            if (err) {
                reject('event 데이터 수정 실패');
            }
                console.log('update 성공: ', result);
                resolve(result);
          });
        });
      },

      async delete(id) {
        await new Promise((resolve, reject) => {
            connection.query(sql.deleted(table), [id], function (err, result) {
                if(err) {
                    reject('event 데이터 delte 실패');
                }
                    console.log('delete 성공: ', result);
                    resolve(result);
            });
        });
    }


}