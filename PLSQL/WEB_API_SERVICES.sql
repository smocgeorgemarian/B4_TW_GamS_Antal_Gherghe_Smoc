CREATE OR REPLACE PACKAGE api_services AS

    FUNCTION add_event(hash_code VARCHAR2, event_name VARCHAR2, event_type VARCHAR2, event_value FLOAT) RETURN VARCHAR2;
    FUNCTION add_reward(hash_code IN VARCHAR2, reward_name IN VARCHAR2, condition IN VARCHAR2, reward IN VARCHAR2, is_repeatable IN NUMBER) RETURN VARCHAR2;
    FUNCTION delete_event(event_name VARCHAR2, owner_name VARCHAR2, owner_password VARCHAR2) RETURN VARCHAR2;
    FUNCTION delete_reward(reward_name VARCHAR2, owner_name VARCHAR2, owner_password VARCHAR2) RETURN VARCHAR2;
    FUNCTION update_reward(reward_name VARCHAR2, hash_code VARCHAR2, new_reward VARCHAR2) RETURN VARCHAR2;

END api_services;

/

CREATE OR REPLACE PACKAGE BODY api_services AS

    FUNCTION add_event(hash_code VARCHAR2, event_name VARCHAR2, event_type VARCHAR2, event_value FLOAT)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200);
    BEGIN
        IF test_existence.test_table(event_name, hash_code) = 1 THEN
            returner := '0';
        ELSE
            returner := '1';
            table_insertor.insert_event(hash_code, event_name, event_type, event_value);
        END IF;
        commit;
        RETURN returner;
    END add_event;
    
    FUNCTION add_reward(hash_code IN VARCHAR2, reward_name IN VARCHAR2, condition IN VARCHAR2, reward IN VARCHAR2, is_repeatable IN NUMBER)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200);
        ander VARCHAR2(500);
        all_good INTEGER := 1;
    BEGIN
        IF test_existence.test_table_reward(reward_name, hash_code) = 1 THEN
            returner := '0';
        ELSE
            returner := '1';
            <<outer_loop>>
            FOR i IN (SELECT REGEXP_SUBSTR(condition, '\([^\|]+\)', 1, level) AS parts FROM dual
                        CONNECT BY REGEXP_SUBSTR(condition, '\([^\|]+\)', 1, level) IS NOT NULL) LOOP
                ander := i.parts;
                FOR j IN (SELECT REGEXP_SUBSTR(ander, '[^\$ \(\)]+', 1, level) AS eve FROM dual
                        CONNECT BY REGEXP_SUBSTR(ander, '[^\$ \(\)]+', 1, level) IS NOT NULL) LOOP
                    IF test_existence.test_table(j.eve, hash_code) = 0 THEN
                        returner := '404';
                        all_good := 0;
                        EXIT outer_loop;
                    END IF;
                END LOOP;
            END LOOP;
            IF all_good = 1 THEN
                table_insertor.insert_reward(hash_code, reward_name, condition, reward, is_repeatable);
            END IF;
        END IF;
        commit;
        RETURN returner;
    END add_reward;

    FUNCTION delete_event(event_name VARCHAR2, owner_name VARCHAR2, owner_password VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
    
        returner VARCHAR2(200);
        hashcode VARCHAR2(200);
        status INTEGER;
    BEGIN
        SELECT COUNT(*) INTO status FROM OWNERS WHERE oname = owner_name AND opassword = owner_password;
        IF status = 0 THEN
            returner := '0';
        ELSE
            SELECT hash_code INTO hashcode FROM OWNERS WHERE oname = owner_name AND opassword = owner_password;
            IF test_existence.test_table(event_name, hashcode) = 0 THEN
                returner := '404';
            ELSE
                returner := '1';
                
                v_table_name := 'EVENT_' || hashcode;
                v_command := 'DELETE ' || v_table_name || ' WHERE ename = :xname';
                v_cursor_id := DBMS_SQL.OPEN_CURSOR;
                DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
                DBMS_SQL.BIND_VARIABLE(v_cursor_id, ':xname', event_name);
                v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
                DBMS_SQL.CLOSE_CURSOR(v_cursor_id);

                v_table_name := event_name || '_' || hashcode;
                table_deletion.drop_table(v_table_name);
            END IF;
        END IF;
        commit;
        RETURN returner;
    END delete_event;

    FUNCTION delete_reward(reward_name VARCHAR2, owner_name VARCHAR2, owner_password VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
    
        returner VARCHAR2(200);
        hashcode VARCHAR2(200);
        status INTEGER;
    BEGIN
        SELECT COUNT(*) INTO status FROM OWNERS WHERE oname = owner_name AND opassword = owner_password;
        IF status = 0 THEN
            returner := '0';
        ELSE
            SELECT hash_code INTO hashcode FROM OWNERS WHERE oname = owner_name AND opassword = owner_password;
            IF test_existence.test_table_reward(reward_name, hashcode) = 0 THEN
                returner := '404';
            ELSE
                returner := '1';
                
                v_table_name := 'REWARD_' || hashcode;
                v_command := 'DELETE ' || v_table_name || ' WHERE rname = :xname';
                v_cursor_id := DBMS_SQL.OPEN_CURSOR;
                DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
                DBMS_SQL.BIND_VARIABLE(v_cursor_id, ':xname', reward_name);
                v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
                DBMS_SQL.CLOSE_CURSOR(v_cursor_id);

                v_table_name := 'REWARD_' || reward_name || '_' || hashcode;
                table_deletion.drop_table(v_table_name);
            END IF;
        END IF;
        commit;
        RETURN returner;
    END delete_reward;

    FUNCTION update_reward(reward_name VARCHAR2, hash_code VARCHAR2, new_reward VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        v_cursor_id INTEGER;
        v_ok INTEGER;
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
        returner VARCHAR2(200);
    BEGIN
    
        IF test_existence.test_table_reward(reward_name, hash_code) = 0 THEN
            returner := '0';
        ELSE
            returner := '1';
            v_table_name := 'REWARD_' || hash_code;
            v_command := 'UPDATE ' || v_table_name || ' SET reward = :xreward WHERE rname = :xname';
            v_cursor_id := DBMS_SQL.OPEN_CURSOR;
            DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
            DBMS_SQL.BIND_VARIABLE(v_cursor_id, ':xreward', new_reward);
            DBMS_SQL.BIND_VARIABLE(v_cursor_id, ':xname', reward_name);
            v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
            DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        END IF;
        commit;
        RETURN returner;
    END;

END api_services;