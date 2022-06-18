CREATE OR REPLACE PACKAGE api_services_username AS

    FUNCTION get_rewards(hash_code VARCHAR2, user_name VARCHAR2) RETURN VARCHAR2;
    FUNCTION get_all_rewards(hash_code VARCHAR2, user_name VARCHAR2) RETURN VARCHAR2;
    FUNCTION update_event(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2, value_update IN FLOAT DEFAULT 1) RETURN VARCHAR2;
    FUNCTION add_user_to_event(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2) RETURN VARCHAR2;
    FUNCTION remove_user(hash_code IN VARCHAR2, user_name IN VARCHAR2) RETURN VARCHAR2;

END api_services_username;

/

CREATE OR REPLACE PACKAGE BODY api_services_username AS

    FUNCTION get_rewards(hash_code VARCHAR2, user_name VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(2000);
    BEGIN
        IF test_existence.test_hash(hash_code) = 0 THEN
            returner := '404';
        ELSE
            returner := rewards.get_rewards(hash_code, user_name);
        END IF;
        commit;
        RETURN returner;
    END get_rewards;
    
    FUNCTION get_all_rewards(hash_code VARCHAR2, user_name VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(2000);
    BEGIN
        IF test_existence.test_hash(hash_code) = 0 THEN
            returner := '404';
        ELSE
            returner := rewards.get_all_rewards(hash_code, user_name);
        END IF;
        commit;
        RETURN returner;
    END get_all_rewards;
    
    FUNCTION update_event(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2, value_update IN FLOAT DEFAULT 1)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        v_updated_value FLOAT;
        returner VARCHAR2(200);
    BEGIN
        returner := 'error';
        table_insertor.insert_update(event_name, hash_code, user_name, value_update);
        v_table_name := event_name || '_' || hash_code;
        IF test_existence.test_table(event_name, hash_code) = 0 THEN
            returner := '404';
        ELSE
            v_command := 'SELECT current_value FROM ' || v_table_name || ' WHERE user_name = :xname';
            v_cursor_id := DBMS_SQL.OPEN_CURSOR;
            DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
            DBMS_SQL.BIND_VARIABLE(v_cursor_id, ':xname', user_name);
            DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, v_updated_value); 
            v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
            LOOP 
                IF DBMS_SQL.FETCH_ROWS(v_cursor_id)>0 THEN 
                    DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, v_updated_value); 
                    returner := v_updated_value;
                ELSE
                    EXIT; 
                END IF; 
            END LOOP;
        END IF;
        commit;
        RETURN returner;
    END update_event;
    
    FUNCTION add_user_to_event(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200);
    BEGIN
        IF test_existence.test_table(event_name, hash_code) = 0 THEN
            returner := '404';
        ELSE
            IF test_existence.test_event_user(event_name, hash_code, user_name) = 1 THEN
                returner := '0';
            ELSE
                returner := '1';
                table_insertor.insert_event_user(event_name, hash_code, user_name);
            END IF;
        END IF;
        commit;
        RETURN returner;
    END add_user_to_event;
    
    FUNCTION remove_user(hash_code IN VARCHAR2, user_name IN VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200) := '1';
    BEGIN
        table_deletion.delete_user(hash_code, user_name);
        commit;
        RETURN returner;
    END remove_user;

END api_services_username;