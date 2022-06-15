CREATE OR REPLACE PACKAGE table_deletion AS

    PROCEDURE delete_owner_info(hashcode VARCHAR2);

END table_deletion;

/

CREATE OR REPLACE PACKAGE BODY table_deletion AS

    PROCEDURE drop_table(table_name VARCHAR2) AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'DROP TABLE ' || table_name;
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);     
    END drop_table;

    PROCEDURE delete_event_info(hash_code VARCHAR2) AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        event_name VARCHAR2(200);
    BEGIN
        v_table_name := 'EVENT_' || hash_code;
        v_command := 'SELECT ename FROM ' || v_table_name;
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, event_name, 200); 
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        LOOP 
            IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, event_name); 
                drop_table(event_name || '_' || hash_code);
            ELSE
                EXIT; 
            END IF; 
        END LOOP;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        drop_table(v_table_name);
    END delete_event_info;

    PROCEDURE delete_reward_info(hash_code VARCHAR2) AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        reward_name VARCHAR2(200);
    BEGIN
        v_table_name := 'REWARD_' || hash_code;
        v_command := 'SELECT rname FROM ' || v_table_name;
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, reward_name, 200); 
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        LOOP 
            IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, reward_name); 
                drop_table('REWARD_' || reward_name || '_' || hash_code);
            ELSE
                EXIT; 
            END IF; 
        END LOOP;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        drop_table(v_table_name);
    END delete_reward_info;

    PROCEDURE delete_owner_info(hashcode VARCHAR2) AS
    BEGIN
        
        DELETE OWNERS WHERE hash_code = hashcode;
        delete_event_info(hashcode);
        delete_reward_info(hashcode);
        
    END delete_owner_info;

END table_deletion;