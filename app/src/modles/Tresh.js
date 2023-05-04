const connection = require('../config/index');
const sql = require('../config/sql');


module.exports = {
    create : function (req) {
        console.log('req :' + req);
        const data = req.body;

        connection.query(sql.sql_tresh_create, [data.H_NAME,
                data.H_LATITUE,
                data.H_LONGITUDE,
                data.H_ADDRESS,
                data.H_PROFILE_IMAGE,
                data.H_FRIST_LOCAL,
                data.H_SECOND_LOCAL,
                data.H_HASHTAG,
                data.H_NUMBER,
                data.H_INTRODUTION,
                data.H_LINK,
                data.H_KAKAO_LINK,
                data.H_NAVER_LINK,
                data.H_RESERVATION_LINK,
                data.H_CONTENT,
                data.H_BOARD_IMAGE,
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
                new Date(),
                data.H_WRITER], function(err, result, field) {
                    if(err) {
                        return res.status(500).send('hospital 데이터 조회 실패');
                    }
                    console.log('create 성공: ', result);
                    return result;
        })
    }
}