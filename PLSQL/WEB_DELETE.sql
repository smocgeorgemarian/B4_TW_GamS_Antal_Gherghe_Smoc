CREATE OR REPLACE PACKAGE table_deletion AS

    PROCEDURE drop_table(table_name VARCHAR2);
    PROCEDURE delete_owner_info(hashcode VARCHAR2);
    PROCEDURE delete_user(hash_code VARCHAR2, user_name VARCHAR2);

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
    
    PROCEDURE delete_table(table_name VARCHAR2, user_name VARCHAR2) AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'DELETE ' || table_name || ' WHERE user_name = :xname';
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.BIND_VARIABLE(v_cursor_id, ':xname', user_name);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
    END delete_table;

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
        drop_table('LEVEL_' || hashcode);
        drop_table('PLAYER_' || hashcode);
        
    END delete_owner_info;
    
    PROCEDURE delete_event_user(hash_code VARCHAR2, user_name VARCHAR2) AS
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
                IF test_existence.test_event_user(event_name, hash_code, user_name) = 1 THEN
                    v_table_name := event_name || '_' || hash_code;
                    delete_table(v_table_name, user_name);
                END IF;
            ELSE
                EXIT; 
            END IF; 
        END LOOP;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
    END delete_event_user;
    
    PROCEDURE delete_reward_user(hash_code VARCHAR2, user_name VARCHAR2) AS
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
                IF test_existence.test_reward_user(reward_name, hash_code, user_name) = 1 THEN
                    v_table_name := 'REWARD_' || reward_name || '_' || hash_code;
                    delete_table(v_table_name, user_name);
                END IF;
            ELSE
                EXIT; 
            END IF; 
        END LOOP;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
    END delete_reward_user;
    
    PROCEDURE delete_user(hash_code VARCHAR2, user_name VARCHAR2) AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
    BEGIN
        
        delete_event_user(hash_code, user_name);
        delete_reward_user(hash_code, user_name);
        IF test_existence.test_level_user(hash_code, user_name) = 1 THEN
            v_table_name := 'PLAYER_' || hash_code;
            v_command := 'DELETE ' || v_table_name || ' WHERE user_name = ''' || user_name || '''';
            v_cursor_id := DBMS_SQL.OPEN_CURSOR;
            DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
            v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
            DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        END IF;
        
    END delete_user;

END table_deletion;