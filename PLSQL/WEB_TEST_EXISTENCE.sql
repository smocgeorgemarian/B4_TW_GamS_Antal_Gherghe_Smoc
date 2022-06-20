CREATE OR REPLACE PACKAGE test_existence AS
    FUNCTION test_hash(hashcode IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_owner(owner_name IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_table(event_name IN VARCHAR2, hash_code IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_table_reward(reward_name IN VARCHAR2, hash_code IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_table_level(lname IN VARCHAR2, hash_code IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_event_user(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_reward_user(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2) RETURN INTEGER;
    FUNCTION test_level_user(hash_code IN VARCHAR2, user_name IN VARCHAR2) RETURN INTEGER;
END test_existence;

/

CREATE OR REPLACE PACKAGE BODY test_existence AS

    FUNCTION test_hash(hashcode IN VARCHAR2)
    RETURN INTEGER AS
        found INTEGER;
    BEGIN
        SELECT COUNT(*) INTO found FROM OWNERS WHERE hash_code = hashcode;
        IF found > 0 THEN
            RETURN 1;
        ELSE
            RETURN 0;
        END IF;
    END test_hash;

    --TEST OWNER EXISTENCE
    FUNCTION test_owner(owner_name IN VARCHAR2)
    RETURN INTEGER AS
        owner_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
    BEGIN
        v_command := 'SELECT COUNT(*) FROM OWNERS WHERE oname = ''' || owner_name || ''''; 
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, owner_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, owner_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF ( owner_checker = 0 ) THEN
            return 0;
        END IF;
        
        return 1;
    END test_owner;

    --TEST TABLE EXISTENCE
    FUNCTION test_table(event_name IN VARCHAR2, hash_code IN VARCHAR2)
    RETURN INTEGER AS
        table_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
    BEGIN
        IF test_hash(hash_code) = 0 THEN
            RETURN 0;
        END IF;
        v_command := 'SELECT COUNT(*) FROM EVENT_' || hash_code || ' WHERE ename = ''' || event_name || ''''; 
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, table_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, table_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF ( table_checker = 0 ) THEN
            RETURN 0;
        END IF;
        
        return 1;
    END test_table;
    
    --TEST TABLE REWARD EXISTENCE
    FUNCTION test_table_reward(reward_name IN VARCHAR2, hash_code IN VARCHAR2)
    RETURN INTEGER AS
        table_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
    BEGIN
        IF test_hash(hash_code) = 0 THEN
            RETURN 0;
        END IF;
        v_command := 'SELECT COUNT(*) FROM REWARD_' || hash_code || ' WHERE rname = ''' || reward_name || '''';
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, table_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, table_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF ( table_checker = 0 ) THEN
            RETURN 0;
        END IF;
        
        return 1;
    END test_table_reward;

    --TEST TABLE LEVEL EXISTENCE
    FUNCTION test_table_level(lname IN VARCHAR2, hash_code IN VARCHAR2)
    RETURN INTEGER AS
        table_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
    BEGIN
        IF test_hash(hash_code) = 0 THEN
            RETURN 0;
        END IF;
        v_command := 'SELECT COUNT(*) FROM LEVEL_' || hash_code || ' WHERE lname = ''' || lname || '''';
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, table_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, table_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF ( table_checker = 0 ) THEN
            RETURN 0;
        END IF;
        
        return 1;
    END test_table_level;
    
    --TEST USER EVENT EXISTENCE
    FUNCTION test_event_user(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2)
    RETURN INTEGER AS
        user_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
        v_table_name VARCHAR2(200);
    BEGIN
        
        IF ( test_table(event_name, hash_code) = 0 ) THEN
            return 0;
        END IF;
        
        v_table_name := event_name || '_' || hash_code;
        v_command := 'SELECT COUNT(*) FROM ' || v_table_name || ' WHERE user_name = ''' || user_name || ''''; 
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, user_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, user_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF( user_checker = 0 ) THEN
            RETURN 0;
        END IF;
        RETURN 1;
        
    END test_event_user;
    
    --TEST USER REWARD EXISTENCE
    FUNCTION test_reward_user(event_name IN VARCHAR2, hash_code IN VARCHAR2, user_name IN VARCHAR2)
    RETURN INTEGER AS
        user_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
        v_table_name VARCHAR2(200);
    BEGIN
        
        IF ( test_table_reward(event_name, hash_code) = 0 ) THEN
            return 0;
        END IF;
    
        v_table_name :='REWARD_' || event_name || '_' || hash_code;
        v_command := 'SELECT COUNT(*) FROM ' || v_table_name || ' WHERE user_name = ''' || user_name || ''''; 
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, user_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, user_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF( user_checker = 0 ) THEN
            return 0;
        END IF;
        return 1;
        
    END test_reward_user;
    
    FUNCTION test_level_user(hash_code IN VARCHAR2, user_name IN VARCHAR2)
    RETURN INTEGER AS
        user_checker INTEGER := 0;
        v_cursor_id INTEGER;
        v_command VARCHAR2(200);
        v_ok INTEGER;
        v_table_name VARCHAR2(200);
    BEGIN
        
        v_table_name :='PLAYER_' || hash_code;
        v_command := 'SELECT COUNT(*) FROM ' || v_table_name || ' WHERE user_name = ''' || user_name || ''''; 
        v_cursor_id := DBMS_SQL.OPEN_CURSOR;
        DBMS_SQL.PARSE(v_cursor_id, v_command, DBMS_SQL.NATIVE);
        DBMS_SQL.DEFINE_COLUMN(v_cursor_id, 1, user_checker);
        v_ok := DBMS_SQL.EXECUTE(v_cursor_id);
        IF( DBMS_SQL.FETCH_ROWS(v_cursor_id) > 0 ) THEN
            DBMS_SQL.COLUMN_VALUE(v_cursor_id, 1, user_checker);
        END IF;
        DBMS_SQL.CLOSE_CURSOR(v_cursor_id);
        
        IF( user_checker = 0 ) THEN
            return 0;
        END IF;
        return 1;
        
    END test_level_user;

END test_existence;