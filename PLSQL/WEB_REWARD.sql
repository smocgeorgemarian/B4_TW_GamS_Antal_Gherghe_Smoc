CREATE OR REPLACE PACKAGE rewards AS
    FUNCTION event(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2) RETURN INTEGER;
    FUNCTION verify_condition(condition VARCHAR2, hash_code VARCHAR2, user_name VARCHAR2) RETURN INTEGER;
    FUNCTION get_rewards(hash_code VARCHAR2, user_name VARCHAR2) RETURN VARCHAR2;
    FUNCTION get_all_rewards(hash_code VARCHAR2, user_name VARCHAR2) RETURN VARCHAR2;
END rewards;

/

CREATE OR REPLACE PACKAGE BODY rewards AS

    VTIME VARCHAR2(200) := 'time';
    VCOUNT VARCHAR2(200) := 'count';
    VSUM VARCHAR2(200) := 'sum';

    --VERIFY IF EVENT WAS ACHIEVED BY USER
    FUNCTION event(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2)
    RETURN INTEGER AS
        event_type VARCHAR2(200);
        event_value FLOAT;
        v_table_name VARCHAR2(200) := 'NULL';
        ecurrent_value FLOAT;
        estart_date DATE;
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(200);
    BEGIN
        IF test_existence.test_table(event_name, hash_code) = 1 THEN
            table_insertor.insert_event_user(event_name, hash_code, user_name);
            
            v_table_name := 'EVENT_' || hash_code;
            v_command := 'SELECT etype, evalue FROM ' || v_table_name || ' WHERE ename = ''' || event_name || '''';
            v_cursor_id := DBMS_SQL.OPEN_CURSOR;
            DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
            DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, event_type, 200);
            DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 2, event_value);
            v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
            IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, event_type);
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 2, event_value);
            ELSE
                DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
                RETURN 0;
            END IF;
            DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
            
            v_table_name := event_name || '_' || hash_code;
            v_command := 'SELECT current_value, start_date FROM ' || v_table_name || ' WHERE user_name = ''' || user_name || '''';
            v_cursor_id := DBMS_SQL.OPEN_CURSOR;
            DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
            DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, ecurrent_value);
            DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 2, estart_date);
            v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
            IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, ecurrent_value);
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 2, estart_date);
            ELSE
                DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
                RETURN 0;
            END IF;
            DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
            
            IF event_type = VTIME THEN
                IF estart_date + event_value <= SYSDATE THEN
                    RETURN 1;
                END IF;
            ELSIF event_type = VSUM OR event_type = VCOUNT THEN
                IF ecurrent_value >= event_value THEN
                    RETURN 1;
                END IF;
            ELSE
                RETURN 0;
            END IF;
        END IF;
        RETURN 0;
    END event;
    
    --VERIFY IF REWARD CONDITION IS TRUE
    FUNCTION verify_condition(condition VARCHAR2, hash_code VARCHAR2, user_name VARCHAR2)
    RETURN INTEGER AS
        ander VARCHAR2(500);
        rewarded INTEGER;
    BEGIN
        FOR i IN (SELECT REGEXP_SUBSTR(condition, '\([^\|]+\)', 1, level) AS parts FROM dual
                    CONNECT BY REGEXP_SUBSTR(condition, '\([^\|]+\)', 1, level) IS NOT NULL) LOOP
            ander := i.parts;
            rewarded := 1;
            FOR j IN (SELECT REGEXP_SUBSTR(ander, '[^\$ \(\)]+', 1, level) AS eve FROM dual
                    CONNECT BY REGEXP_SUBSTR(ander, '[^\$ \(\)]+', 1, level) IS NOT NULL) LOOP
                IF event(j.eve, hash_code, user_name) = 0 THEN
                    rewarded := 0;
                    EXIT;
                END IF;
            END LOOP;
            IF rewarded = 1 THEN
                RETURN 1;
            END IF;
        END LOOP;
        RETURN 0;        
    END verify_condition;
    
    --GET REWARDS FOR A USER
    FUNCTION get_rewards(hash_code VARCHAR2, user_name VARCHAR2)
    RETURN VARCHAR2 AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        
        reward_name VARCHAR2(200);
        condition VARCHAR2(500);
        reward VARCHAR2(500);
        is_repeatable NUMBER(1, 0);
        
        reward_string VARCHAR2(2000);
    BEGIN
        v_table_name := 'REWARD_' || hash_code;
        v_command := 'SELECT * FROM ' || v_table_name;
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, reward_name, 200); 
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 2, condition, 500); 
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 3, reward, 500);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 4, is_repeatable); 
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        LOOP 
            IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, reward_name); 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 2, condition); 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 3, reward);
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 4, is_repeatable);
                
                v_table_name := 'REWARD_' || 'reward_name' || '_' || hash_code;
                
                IF verify_condition(condition, hash_code, user_name) = 1 AND (is_repeatable = 1 OR test_existence.test_reward_user(reward_name, hash_code,user_name) = 0) THEN
                    IF reward_string IS NULL THEN
                        reward_string := '[{ "reward" : "' || reward || '"}';
                    ELSE
                        reward_string := reward_string || ',{ "reward" : "' || reward || '"}';
                    END IF;
                    table_insertor.insert_reward_user(reward_name, hash_code,user_name);
                END IF;
            ELSE 
                EXIT; 
            END IF; 
        END LOOP;   
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF reward_string IS NULL THEN
            RETURN 'NULL';
        ELSE
            reward_string := reward_string || ']';
            RETURN reward_string;
        END IF;
    END get_rewards;
    
    FUNCTION get_all_rewards(hash_code VARCHAR2, user_name VARCHAR2)
    RETURN VARCHAR2 AS
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        
        reward_name VARCHAR2(200);
        condition VARCHAR2(500);
        reward VARCHAR2(500);
        is_repeatable NUMBER(1, 0);
        
        reward_string VARCHAR2(2000);
    BEGIN
        v_table_name := 'REWARD_' || hash_code;
        v_command := 'SELECT * FROM ' || v_table_name;
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, reward_name, 200); 
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 2, condition, 500); 
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 3, reward, 500);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 4, is_repeatable); 
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        LOOP 
            IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, reward_name); 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 2, condition); 
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 3, reward);
                DBMS_SQL.COLUMN_VALUE(v_cursor_id, 4, is_repeatable);
                
                v_table_name := 'REWARD_' || 'reward_name' || '_' || hash_code;
                
                IF verify_condition(condition, hash_code, user_name) = 1 THEN
                    IF reward_string IS NULL THEN
                        reward_string := '[{ "reward" : "' || reward || '"}';
                    ELSE
                        reward_string := reward_string || ',{ "reward" : "' || reward || '"}';
                    END IF;
                    table_insertor.insert_reward_user(reward_name, hash_code,user_name);
                END IF;
            ELSE 
                EXIT; 
            END IF; 
        END LOOP;   
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF reward_string IS NULL THEN
            RETURN 'NULL';
        ELSE
            reward_string := reward_string || ']';
            RETURN reward_string;
        END IF;
    END get_all_rewards;

END rewards;