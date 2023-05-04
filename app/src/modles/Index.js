const connection = require("../config/index");
const sql = require('../config/sql');
const tb_hospital = 'hospital';
const tb_event = 'event';

module.exports = {
    
    async index () {
        try {
          const results_hospital = await new Promise((resolve, reject) => {
            connection.query(sql.list(tb_hospital), (error, results) => {
              if (error) {
                reject('hospital 데이터 조회 실패');
              } else {
                resolve(results);
              }
            });
          });
      
          const results_event = await new Promise((resolve, reject) => {
            connection.query(sql.list(tb_event), (error, results) => {
              if (error) {
                reject('event 데이터 조회 실패');
              } else {
                resolve(results);
              }
            });
          });
      
          const results = {
            hospital: results_hospital,
            event: results_event
          };
      
            console.log('응답 데이터:', results);
            return JSON.stringify(results);
      
        } catch (error) {
            console.error(error);
            return error;
        }
      }
      
}
    
