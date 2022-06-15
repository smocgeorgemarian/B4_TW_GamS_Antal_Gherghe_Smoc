DROP TABLE OWNERS;
CREATE TABLE OWNERS(
    oname VARCHAR2(200) PRIMARY KEY,
    opassword VARCHAR2(200),
    site_link VARCHAR2(500),
    is_logged NUMBER(1, 0),
    hash_code VARCHAR(200) UNIQUE
);

--TRIGGER OWNER INSERT
CREATE OR REPLACE TRIGGER owner_code
BEFORE INSERT ON OWNERS
FOR EACH ROW
DECLARE
    code VARCHAR2(10);
PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
    code := DBMS_RANDOM.STRING ('A', 10);
    :NEW.hash_code := code;
    table_creator.create_event(code);
    table_creator.create_reward(code);
END;

DELETE FROM OWNERS;
INSERT INTO OWNERS(oname, opassword) VALUES ('GiGi', 'OiOi');
SELECT * FROM OWNERS;

--DEMO API_USERS
set serveroutput on;
BEGIN
    --dbms_output.put_line(api_users.owner_register('Tudor','pass','www.pornhub.com'));
    --dbms_output.put_line(api_users.owner_login('Tudor','pass'));
    --dbms_output.put_line(api_users.owner_logout('Tudor'));
    --dbms_output.put_line(api_users.owner_delete('Tudor','pass'));
END;

SELECT * FROM OWNERS;

set serveroutput on;
BEGIN
    --table_insertor.insert_event('TWIwZSFkty', 'testnou', 'sum', 69);
    --table_insertor.insert_reward('TWIwZSFkty', 'numenou', 'conditie', 'reward', 1);
    --DBMS_OUTPUT.put_line(test_existence.test_table('nume','TWIwZSFkty'));
    --table_insertor.insert_event_user('numenou', 'TWIwZSFkty', 'user1');
    --table_insertor.insert_update('testnou', 'TWIwZSFkty', 'user1', 69);
    --dbms_output.put_line(rewards.event('testnou', 'TWIwZSFkty', 'user1'));
    --dbms_output.put_line(rewards.get_rewards('TWIwZSFkty', 'user1'));
    --dbms_output.put_line(api_users.owner_register('test','pass'));
END;



