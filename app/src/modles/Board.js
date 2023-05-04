const connection = require('../config/index');
const sql = require('../config/sql');
const fs = require('fs');
const path = require('path');
// const rimraf = require('rimraf');
const table = 'board';
const column = 'B';
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async list() {
        return new Promise((resolve, reject) => {
            connection.query(sql.list(table), (err, result) => {
                console.log('table name: ',table);
                if (err) {
                    reject('board 데이터 조회 실패');
                }
                    console.log('board 데이터 조회: ', result);
                    resolve(result);
            });
        });
    },

    async detail(id) {
        return await new Promise((resolve, reject) => {
            connection.query(sql.datail(table), [id], function (err, result) {
              if (err) {
                reject('board 데이터 조회 실패');
              }
              console.log('board 데이터 조회: ', result);
               resolve(result);
            });
          });

      },
      
    async updateView(id) {
        return await new Promise((resolve, reject) => {
            connection.query(sql.updateView(table, column), [id], function (err, updateResult) {
              if (err) {
                reject('board 조회수 업데이트 실패');
              } else {
                console.log('board 조회수 업데이트 성공', updateResult);
                resolve(updateResult);
              }
            });
          });
    },

    async getUpdate (id) {
        return new Promise((resolve, reject) => {
            connection.query(sql.datail(table), [id], function (err, result) {
                if(err) {
                    reject('board 데이터 조회 실패');
                }
                    console.log('board 데이터 조회: ', result);
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
        const boardDirName = `board_${uuidv4()}`;
        const boardDirPath = path.join(__dirname,'..', 'public', 'images', 'board', boardDirName);
        fs.mkdirSync(boardDirPath);

        // 프로필 이미지 저장
        const profileImagePath = await saveImage(
            {
              name: req.B_PROFILE_IMAGE.name,
              data: req.B_PROFILE_IMAGE.data,
              directory: boardDirPath,
            }
          );

        // 게시물 이미지 저장
        const boardImagePaths = await Promise.all(
            req.B_IMAGE.map((image) =>
              saveImage(
                {
                  name: image.name,
                  data: image.data,
                  directory: boardDirPath,
                }
              )
            )
          );

        
        await new Promise((resolve, reject) => {
        connection.query(sql.sql_board_create, [
                req.B_TITLE,
                profileImagePath,
                JSON.stringify(boardImagePaths),
                req.B_CONTENT,
                req.B_WRITER,
                new Date(),
                new Date()
        ], (err, result, field) => {
                if(err) {
                    reject('board 데이터 생성 실패');
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
      
        const boardId = req.query.id;
        const data = req.body;
        console.log('req data:', data);
        console.log('req boardId:', boardId);
      
        // 게시물 디렉토리 생성
        const boardDirName = `board_${new Date().getTime()}`;
        const boardDirPath = path.join('../src', 'public', 'images', 'board', boardDirName);
        fs.mkdirSync(boardDirPath);

        // 이전 이미지 디렉토리 삭제
        // const oldBoard = await new Promise((resolve, reject) => {
        //     connection.query(sql.sql_board_detail, [boardId], (err, result, field) => {
        //         if (err) {
        //             reject('이전 이미지 디렉토리 삭제 실패');
        //         }
        //             console.log('디렉토리 삭제 성공: ', result);
        //             resolve(result);
        //       });
        //     });
    
        // const oldBoardDirPath = oldBoard;
        // rimraf.sync(oldBoardDirPath);

        // 새로운 이미지 디렉토리 생성
        // fs.mkdirSync(boardDirPath);

      
        // 프로필 이미지 저장
        const profileImagePath = await saveImage({
          name: data.B_PROFILE_IMAGE.name,
          data: data.B_PROFILE_IMAGE.data,
          directory: boardDirPath,
        });
      
        // 게시물 이미지 저장
        const newBoardImagePaths = await Promise.all(
        data.B_IMAGE.map((image) =>
            saveImage({
              name: image.name,
              data: image.data,
              directory: boardDirPath,
            })
          )
        );
      
        await new Promise((resolve, reject) => {
          connection.query(sql.sql_board_update, [
            data.B_TITLE,
            profileImagePath,
            JSON.stringify(newBoardImagePaths),
            data.B_CONTENT,
            new Date(),
            boardId,
          ], (err, result, field) => {
            if (err) {
                reject('board 데이터 수정 실패');
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
                    reject('board 데이터 delte 실패');
                }
                    console.log('delete 성공: ', result);
                    resolve(result);
            });
        });
    }

}