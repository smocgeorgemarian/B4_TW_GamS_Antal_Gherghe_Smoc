CREATE OR REPLACE PACKAGE table_creator AS
    PROCEDURE create_event(hash_code IN VARCHAR2);
    PROCEDURE create_reward(hash_code IN VARCHAR2);
    PROCEDURE create_event_users(ename IN VARCHAR2, hash_code IN VARCHAR2);
    PROCEDURE create_reward_users(rname IN VARCHAR2, hash_code IN VARCHAR2);
END table_creator;

/

CREATE OR REPLACE PACKAGE BODY table_creator AS

    PROCEDURE create_event(hash_code IN VARCHAR2) AS
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'CREATE TABLE EVENT_' || hash_code || ' (ename VARCHAR2(20) PRIMARY KEY, etype VARCHAR2(200), evalue FLOAT)';
        EXECUTE IMMEDIATE v_command;
    END create_event;
    
    PROCEDURE create_reward(hash_code IN VARCHAR2) AS
        v_command VARCHAR2(500);
    BEGIN
        v_command := 'CREATE TABLE REWARD_' || hash_code || ' (rname VARCHAR(20) PRIMARY KEY, condition VARCHAR2(500), reward VARCHAR2(2000), is_repeatable NUMBER(1, 0) DEFAULT 0)';
        EXECUTE IMMEDIATE v_command;
    END create_reward;
    
    PROCEDURE create_event_users(ename IN VARCHAR2, hash_code IN VARCHAR2) AS
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
    BEGIN
        v_table_name := ename || '_' || hash_code;
        v_command := 'CREATE TABLE ' || v_table_name || ' (user_name VARCHAR2(200) PRIMARY KEY, current_value FLOAT, start_date DATE)';
        EXECUTE IMMEDIATE v_command;
    END create_event_users;
    
    PROCEDURE create_reward_users(rname IN VARCHAR2, hash_code IN VARCHAR2) AS
        v_command VARCHAR2(500);
        v_table_name VARCHAR2(200);
    BEGIN
        v_table_name := 'REWARD_' || rname || '_' || hash_code;
        v_command := 'CREATE TABLE ' || v_table_name || ' (user_name VARCHAR2(200) PRIMARY KEY)';
        EXECUTE IMMEDIATE v_command;
    END create_reward_users;

END table_creator;