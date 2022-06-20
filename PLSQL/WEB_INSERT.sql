CREATE OR REPLACE PACKAGE table_insertor AS
    PROCEDURE insert_event(hash_code IN VARCHAR2, ename IN VARCHAR2, etype IN VARCHAR2, evalue IN FLOAT, xp IN FLOAT);
    PROCEDURE insert_reward(hash_code IN VARCHAR2, rname IN VARCHAR2, condition IN VARCHAR2, reward IN VARCHAR2);
    PROCEDURE insert_level(hash_code IN VARCHAR2, lname IN VARCHAR2, lvalue IN FLOAT, ldescription IN VARCHAR2);
    PROCEDURE insert_event_user(ename IN VARCHAR2, hash_code IN VARCHAR2, euser IN VARCHAR2);
    PROCEDURE insert_reward_user(ename IN VARCHAR2, hash_code IN VARCHAR2, euser IN VARCHAR2);
    PROCEDURE insert_level_user(hash_code IN VARCHAR2, luser IN VARCHAR2);
    PROCEDURE insert_update(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2, value_update IN FLOAT DEFAULT 1);
    PROCEDURE insert_xp(hash_code IN VARCHAR2, user_name IN VARCHAR2, xp_update IN FLOAT);
END table_insertor;

/

CREATE OR REPLACE PACKAGE BODY table_insertor AS
    
    PROCEDURE insert_event(hash_code IN VARCHAR2, ename IN VARCHAR2, etype IN VARCHAR2, evalue IN FLOAT, xp IN FLOAT) AS
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'INSERT INTO EVENT_' || hash_code || ' VALUES (:1, :2, :3, :4)';
        EXECUTE IMMEDIATE v_command USING ename, etype, evalue, xp;
        table_creator.create_event_users(ename, hash_code);
    END insert_event;
    
    PROCEDURE insert_reward(hash_code IN VARCHAR2, rname IN VARCHAR2, condition IN VARCHAR2, reward IN VARCHAR2) AS
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'INSERT INTO REWARD_' || hash_code || ' VALUES (:1, :2, :3)';
        EXECUTE IMMEDIATE v_command USING rname, condition, reward;
        table_creator.create_reward_users(rname, hash_code);
    END insert_reward;
    
    PROCEDURE insert_level(hash_code IN VARCHAR2, lname IN VARCHAR2, lvalue IN FLOAT, ldescription IN VARCHAR2) AS
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'INSERT INTO LEVEL_' || hash_code || ' VALUES (:1, :2, :3)';
        EXECUTE IMMEDIATE v_command USING lname, lvalue, ldescription;
    END insert_level;
    
    PROCEDURE insert_event_user(ename IN VARCHAR2, hash_code IN VARCHAR2, euser IN VARCHAR2) AS
        v_command VARCHAR2(500);
        v_date DATE;
        v_table_name VARCHAR2(200);
    BEGIN
        v_table_name := ename || '_' || hash_code;
        IF test_existence.test_table(ename, hash_code) = 1 AND test_existence.test_event_user(ename, hash_code, euser) = 0
        THEN
            v_command := 'INSERT INTO ' || v_table_name || ' VALUES (:1, :2, :3)';
            SELECT SYSDATE INTO v_date FROM DUAL;
            EXECUTE IMMEDIATE v_command USING euser, 0, v_date;
        END IF;
    END insert_event_user;
    
    PROCEDURE insert_reward_user(ename IN VARCHAR2, hash_code IN VARCHAR2, euser IN VARCHAR2) AS
        v_command VARCHAR2(500);
        v_date DATE;
        v_table_name VARCHAR2(200);
    BEGIN
        v_table_name :='REWARD_' || ename || '_' || hash_code;
        IF test_existence.test_table_reward(ename, hash_code) = 1 AND test_existence.test_reward_user(ename, hash_code, euser) = 0
        THEN
            v_command := 'INSERT INTO ' || v_table_name || ' VALUES (:1)';
            SELECT SYSDATE INTO v_date FROM DUAL;
            EXECUTE IMMEDIATE v_command USING euser;
        END IF;
    END insert_reward_user;
    
    PROCEDURE insert_level_user(hash_code IN VARCHAR2, luser IN VARCHAR2) AS
        v_command VARCHAR2(500);
    BEGIN
        IF test_existence.test_level_user(hash_code, luser) = 0 THEN
            v_command := 'INSERT INTO PLAYER_' || hash_code || ' VALUES(:1, :2, :3)';
            EXECUTE IMMEDIATE v_command USING luser, 0, rewards.get_level(hash_code, 0);
        END IF;
    END insert_level_user;
    
    PROCEDURE insert_update(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2, value_update IN FLOAT DEFAULT 1) AS
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        v_cursor_id INTEGER;
        v_ok INTEGER;
    BEGIN
        insert_event_user(event_name, hash_code, user_name);
        v_table_name := event_name || '_' || hash_code;
        IF test_existence.test_table(event_name, hash_code) = 0 THEN
            RETURN;
        END IF;
        v_command := 'UPDATE ' || v_table_name || ' SET current_value = current_value + ' || value_update || ' WHERE user_name = ''' || user_name || '''';
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
    END insert_update;
    
    PROCEDURE insert_xp(hash_code IN VARCHAR2, user_name IN VARCHAR2, xp_update IN FLOAT) AS
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_xp FLOAT;
    BEGIN
        insert_level_user(hash_code, user_name);
        v_table_name := 'PLAYER_' || hash_code;
        v_command := 'UPDATE ' || v_table_name || ' SET xp = xp + ' || xp_update || ' WHERE user_name = ''' || user_name || '''';
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        v_command := 'SELECT xp FROM ' || v_table_name || ' WHERE user_name = ''' || user_name || '''';
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, v_xp);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, v_xp); 
            rewards.update_level(hash_code, user_name, rewards.get_level(hash_code, v_xp));
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
    END insert_xp;
    
END table_insertor;