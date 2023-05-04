
    // const sql_tresh_create = `INSERT INTO h_tresh (H_NAME, H_LATITUE, H_LONGITUDE, H_ADDRESS, H_PROFILE_IMAGE, H_FRIST_LOCAL, H_SECOND_LOCAL, H_HASHTAG, H_NUMBER, H_INTRODUTION, 
    // H_LINK, H_KAKAO_LINK, H_NAVER_LINK, H_RESERVATION_LINK, H_CONTENT, H_BOARD_IMAGE, 
    // H_LUNCH_START_TIME, H_LUNCH_END_TIME, H_MON_START_TIME, H_MON_END_TIME, H_TUE_START_TIME, H_TUE_END_TIME, H_WED_START_TIME, H_WED_END_TIME, H_THU_START_TIME, H_THU_END_TIME, H_FRI_START_TIME, H_FRI_END_TIME, H_SAT_START_TIME, H_SAT_END_TIME, H_SUN_START_TIME, H_SUN_END_TIME,  H_CREATED_DATE, H_MODIFIED_DATE,  H_WRITER ) 
    // VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


    // hospital SQL
    const sql_hospital = `SELECT * FROM hospital WHERE (H_FRIST_LOCAL = ? and H_SECOND_LOCAL = ?) order by id`;
    
    const sql_hospital_local = ``;
     
    const sql_hospital_create = 
    `INSERT INTO hospital 
        (H_NAME,
         H_LATITUDE,
         H_LONGITUDE,
         H_ADDRESS,
         H_PROFILE_IMAGE,
         H_FRIST_LOCAL, 
         H_SECOND_LOCAL, 
         H_HASHTAG, 
         H_NUMBER, 
         H_INTRODUCTION, 
         H_LINK,
         H_KAKAO_LINK, 
         H_NAVER_LINK, 
         H_RESERVATION_LINK, 
         H_CONTENT, 
         H_BOARD_IMAGE, 
         H_LUNCH_START_TIME, 
         H_LUNCH_END_TIME, 
         H_MON_START_TIME, 
         H_MON_END_TIME, 
         H_TUE_START_TIME, 
         H_TUE_END_TIME, 
         H_WED_START_TIME, 
         H_WED_END_TIME, 
         H_THU_START_TIME, 
         H_THU_END_TIME, 
         H_FRI_START_TIME, 
         H_FRI_END_TIME, 
         H_SAT_START_TIME, 
         H_SAT_END_TIME, 
         H_SUN_START_TIME, 
         H_SUN_END_TIME, 
         H_CREATED_DATE, 
         H_MODIFIED_DATE,
         H_WRITER)
     VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
 
    const sql_hospital_update = 
    `UPDATE hospital SET 
        H_NAME = ?,
        H_LATITUDE = ?,
        H_LONGITUDE = ?,
        H_ADDRESS = ?,
        H_PROFILE_IMAGE = ?,
        H_FRIST_LOCAL = ?,
        H_SECOND_LOCAL = ?,
        H_HASHTAG = ?,
        H_NUMBER = ?,
        H_INTRODUCTION = ?,
        H_LINK = ?,
        H_KAKAO_LINK = ?,
        H_NAVER_LINK = ?,
        H_RESERVATION_LINK = ?,
        H_CONTENT = ?,
        H_BOARD_IMAGE = ?,
        H_LUNCH_START_TIME = ?,
        H_LUNCH_END_TIME = ?,
        H_MON_START_TIME = ?,
        H_MON_END_TIME = ?,
        H_TUE_START_TIME = ?,
        H_TUE_END_TIME = ?,
        H_WED_START_TIME = ?,
        H_WED_END_TIME = ?,
        H_THU_START_TIME = ?,
        H_THU_END_TIME = ?,
        H_FRI_START_TIME = ?,
        H_FRI_END_TIME = ?,
        H_SAT_START_TIME = ?,
        H_SAT_END_TIME = ?,
        H_SUN_START_TIME = ?,
        H_SUN_END_TIME = ?,
        H_MODIFIED_DATE = ?
    WHERE ID = ?`;
    

     // board SQL
     const sql_board_update = 
     `UPDATE board SET 
        B_TITLE=?, 
        B_PROFILE_IMAGE=?, 
        B_IMAGE=?, 
        B_CONTENT=?, 
        B_MODIFIED_DATE=?
     WHERE id=?`;
 
     const sql_board_create = 
     `INSERT INTO board 
        (B_TITLE, 
        B_PROFILE_IMAGE, 
        B_IMAGE, 
        B_CONTENT, 
        B_WRITER, 
        B_CREATED_DATE, 
        B_MODIFIED_DATE) 
     VALUES 
        (?, ?, ?, ?, ?, ?, ?)`;

     // event SQL
     const sql_event_create = 
     `INSERT INTO event 
        (E_TITLE, 
        E_PROFILE_IMAGE, 
        E_IMAGE, 
        E_CONTENT, 
        E_WRITER, 
        E_CREATED_DATE, 
        E_MODIFIED_DATE)
     VALUES 
        (?, ?, ?, ?, ?, ?, ?)`;

     const sql_event_update = 
     `UPDATE event SET 
        E_TITLE = ?, 
        E_PROFILE_IMAGE = ?,
        E_IMAGE = ?,
        E_CONTENT = ?,
        E_MODIFIED_DATE = ?
     WHERE ID = ?;`;

    // inform SQL
     const sql_inform_create = 
     `INSERT INTO inform 
        (I_TITLE,
        I_PROFILE_IMAGE, 
        I_IMAGE, 
        I_CONTENT, 
        I_WRITER, 
        I_CREATED_DATE, 
        I_MODIFIED_DATE)
     VALUES 
        (?, ?, ?, ?, ?, ?, ?)`;

     const sql_inform_update = 
     `UPDATE inform SET 
        I_TITLE = ?, 
        I_PROFILE_IMAGE = ?,
        I_IMAGE = ?,
        I_CONTENT = ?,
        I_MODIFIED_DATE = ?
     WHERE ID = ?;`;

    module.exports = {
        list (table) {
            const list = `SELECT * FROM ${table} order by id`;
            return list;
        },

        datail (table) {
            const detail = `SELECT * FROM ${table} WHERE id=?`;
            return detail;
        },

        updateView (table, column) {
            const updateView = `UPDATE ${table} SET ${column}_VIEWS=${column}_VIEWS+1 WHERE ID=?`;
            return updateView;
        },

        deleted (table) {
            const deleted = `DELETE FROM ${table} WHERE id=?`;
            return deleted;
        },

        sql_hospital,
        sql_hospital_local,
        sql_hospital_update,
        sql_hospital_create,

        sql_board_update,
        sql_board_create,

        sql_event_create,
        sql_event_update,

        sql_inform_create,
        sql_inform_update
    };

   