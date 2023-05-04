const connection = require('../config/index');
const sql = require('../config/sql');
const fs = require('fs');
const path = require('path');
const table = 'hospital';
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async allList () {
        return new Promise((resolve, reject) => {
            connection.query(sql.list(table), (err, result) => {
                if (err) {
                    reject('hospital 데이터 조회 실패');
                }
                    console.log('hospotal 데이터 조회: ', result);
                    resolve(result);
            });
        });
    },

    async list (frist_local, second_local) {
        console.log('models 의 데이터 : ' + frist_local + ", " + second_local);

        return new Promise((resolve, reject) => {
            connection.query(sql.sql_hospital, [frist_local, second_local], (err, result) => {
                if (err) {
                    reject('hospital 데이터 조회 실패');
                }
                    console.log('hospotal 데이터 조회: ', result);
                    resolve(result);
            });
        });
    },

    // TODO: 가까운 거리 병원 list 
    async localList (latitude, longitude) {
        console.log('models 데이터 :' + latitude + ', ' + longitude);
        
    },   

    async create(req) {
        try{
            console.log('req body:', req);

                async function saveImage({ name, data, directory }) {
                    const imagePath = path.join(directory, name);
                    fs.writeFileSync(imagePath, data);
                    return imagePath;
                }

                // 게시물 디렉토리 생성
                const hospitalDirName = `hospital_${uuidv4()}`;
                const hospitalDirPath = path.join(__dirname, '..', 'public', 'images', 'hospital', hospitalDirName);
                fs.mkdirSync(hospitalDirPath);
            
                // 프로필 이미지 저장
                const profileImagePath = await saveImage(
                {
                    name: req.H_PROFILE_IMAGE.name,
                    data: req.H_PROFILE_IMAGE.data,
                    directory: hospitalDirPath,
                }
                );
            
                // 게시물 이미지 저장
                const hospitalImagePaths = await Promise.all(
                req.H_BOARD_IMAGE.map((image) =>
                    saveImage(
                        {
                            name: image.name,
                            data: image.data,
                            directory: hospitalDirPath,
                        }
                    )
                )
            );

            await new Promise((resolve, reject) => {
                connection.query(sql.sql_hospital_create,[
                    req.H_NAME,
                    req.H_LATITUDE,
                    req.H_LONGITUDE,
                    req.H_ADDRESS,
                    profileImagePath,
                    req.H_FRIST_LOCAL,
                    req.H_SECOND_LOCAL,
                    JSON.stringify(req.H_HASHTAG), // 배열을 문자열로 변환하여 저장
                    req.H_NUMBER,
                    req.H_INTRODUCTION,
                    req.H_LINK,
                    req.H_KAKAO_LINK,
                    req.H_NAVER_LINK,
                    req.H_RESERVATION_LINK,
                    req.H_CONTENT,
                    JSON.stringify(hospitalImagePaths), // 배열을 문자열로 변환하여 저장
                    req.H_LUNCH_START_TIME,
                    req.H_LUNCH_END_TIME,
                    req.H_MON_START_TIME,
                    req.H_MON_END_TIME,
                    req.H_TUE_START_TIME,
                    req.H_TUE_END_TIME,
                    req.H_WED_START_TIME,
                    req.H_WED_END_TIME,
                    req.H_THU_START_TIME,
                    req.H_THU_END_TIME,
                    req.H_FRI_START_TIME,
                    req.H_FRI_END_TIME,
                    req.H_SAT_START_TIME,
                    req.H_SAT_END_TIME,
                    req.H_SUN_START_TIME,
                    req.H_SUN_END_TIME,
                    new Date(),
                    new Date(),
                    req.H_WRITER,
                  ],
                  (error, result, fields) => {
                        if (error) {
                            reject('hospital 데이터 생성 실패');
                        } 
                            console.log('create 성공:', result);
                            resolve(result);
                  });
              });
        } catch (error) {
                // 예외가 발생했을 때 실행할 코드
                console.error(error);
                res.status(500).send('Error creating hospital directory');
        }       
    },
    
    async detail (id) {
        return new Promise((resolve, reject) => {
            connection.query(sql.datail(table), [id], function (err, result) {
                if (err) {
                    reject('hospital 데이터 조회 실패');
                }
                resolve(result);
            });
        });
    },

    // async updateView(id) {
    //     return await new Promise((resolve, reject) => {
    //         connection.query(sql.updateView(table, column), [id], function (err, updateResult) {
    //           if (err) {
    //             reject('hospital 조회수 업데이트 실패');
    //           } else {
    //             console.log('hospital 조회수 업데이트 성공', updateResult);
    //             resolve(updateResult);
    //           }
    //         });
    //       });
    // },


    async getUpdate (id) {
        return new Promise((resolve, reject) => {
            connection.query(sql.datail(table), [id], function (err, result) {
                if(err) {
                    reject('hospital 데이터 조회 실패');
                }
                resolve(result);
            }) ;
        });
    },

    async update (req) {
        try {
            async function saveImage({ name, data, directory }) {
                const imagePath = path.join(directory, name);
                fs.writeFileSync(imagePath, data);
                return imagePath;
            };

            const data = req.body;
            const id = req.query.id;

            console.log('data : ' + id);

            // 게시물 디렉토리 생성
            const hospitalDirName = `hospital_${new Date().getTime()}`;
            const hospitalDirPath = path.join(__dirname, '..', 'public', 'images', 'hospital', hospitalDirName);
            fs.mkdirSync(boardDirPath);

            // 프로필 이미지 저장
            const profileImagePath = await saveImage({
                name: data.H_PROFILE_IMAGE.name,
                data: data.H_PROFILE_IMAGE.data,
                directory: hospitalDirPath,
            });
            
            // 게시물 이미지 저장
            const newBoardImagePaths = await Promise.all(
            data.H_BOARD_IMAGE.map((image) =>
                    saveImage({
                        name: image.name,
                        data: image.data,
                        directory: hospitalDirPath,
                    })
                )
            );

            await new Promise((resolve, reject) => {
                connection.query(sql.sql_hospital_update, [
                    data.H_NAME,
                    data.H_LATITUDE,
                    data.H_LONGITUDE,
                    data.H_ADDRESS,
                    profileImagePath,
                    data.H_FRIST_LOCAL,
                    data.H_SECOND_LOCAL,
                    JSON.stringify(data.H_HASHTAG),
                    data.H_NUMBER,
                    data.H_INTRODUCTION,
                    data.H_LINK,
                    data.H_KAKAO_LINK,
                    data.H_NAVER_LINK,
                    data.H_RESERVATION_LINK,
                    data.H_CONTENT,
                    JSON.stringify(newBoardImagePaths),
                    data.H_LUNCH_START_TIME,
                    data.H_LUNCH_END_TIME,
                    data.H_MON_START_TIME,
                    data.H_MON_END_TIME,
                    data.H_TUE_START_TIME,
                    data.H_TUE_END_TIME,
                    data.H_WED_START_TIME,
                    data.H_WED_END_TIME,
                    data.H_THU_START_TIME,
                    data.H_THU_END_TIME,
                    data.H_FRI_START_TIME,
                    data.H_FRI_END_TIME,
                    data.H_SAT_START_TIME,
                    data.H_SAT_END_TIME,
                    data.H_SUN_START_TIME,
                    data.H_SUN_END_TIME,
                    new Date(),
                    id
                ]
                , function(err, result, field) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            res.status(200).send('creating hospital directory')
        } catch(error){
            // 예외가 발생했을 때 실행할 코드
            console.error(error);
            res.status(500).send('Error creating hospital directory')
        }
    },

    async delete (id) {
        return new Promise((resolve, reject) => {
        connection.query(sql.deleted(table), [id], function (err, result) {
            if(err) {
                return reject('hospital 데이터 조회 실패');
            }
            return resolve(result);
            })
        })
    }
}