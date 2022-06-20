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
    table_creator.create_level(code);
END;

SELECT * FROM OWNERS;

SELECT * FROM EVENT_uTBgRMduBB
SELECT * FROM REWARD_uTBgRMduBB

SELECT api_users.owner_register('select_user', 'select_pass', 'select_site') FROM DUAL;

--DEMO API_USERS
set serveroutput on;
BEGIN
    --dbms_output.put_line(api_users.owner_register('Tudor','pass','www.sainthub.com'));
    --dbms_output.put_line(api_users.owner_login('Tudor','pass'));
    --dbms_output.put_line(api_users.owner_logout('Tudor'));
    --dbms_output.put_line(api_users.owner_delete('Tudor','pass'));
END;
SELECT COUNT(*) FROM REWARD_uTBgRMduBB WHERE rname = 'r1'
--DEMO API_SERVICES
set serveroutput on;
DECLARE
    hash_code VARCHAR2(200) := 'PjoTmfkpHw';
BEGIN
    --dbms_output.put_line(api_services.add_event(hash_code, 'first_event', 'count', 5));
    --dbms_output.put_line(api_services.add_event(hash_code, 'secound_event', 'time', 50));
    --dbms_output.put_line(api_services.add_event(hash_code, 'third_event', 'sum', 10));
    --dbms_output.put_line(api_services.add_reward(hash_code, 'first_reward', '(first_event)', 'reward1', 0));
    --dbms_output.put_line(api_services.add_reward(hash_code, 'all_reward', '(first_event $ secound_event) | (third_event $ secound_event)', 'reward22', 1));
    --dbms_output.put_line(api_services.delete_event('e3', 'uTBgRMduBB'));
    --dbms_output.put_line(api_services.delete_reward('r1', 'uTBgRMduBB'));
    --dbms_output.put_line(api_services.update_reward('first_reward', hash_code, 'new_reward'));
END;

--DEMO API_SERVICES_USERNAME
set serveroutput on;
DECLARE
    hash_code VARCHAR2(200) := 'PjoTmfkpHw';
BEGIN
    --dbms_output.put_line(api_services_username.get_rewards(hash_code, 'user1'));
    --dbms_output.put_line(api_services_username.update_event('first_event', hash_code, 'user1'));
    --dbms_output.put_line(api_services_username.add_user_to_event('first_event', hash_code, 'empty_user'));
    --dbms_output.put_line(api_services_username.remove_user(hash_code, 'user1'));
END;

SELECT * FROM event_oBUtmTWkQL;
SELECT * FROM reward_oBUtmTWkQL;

SELECT * FROM POST_EVENT_2_OBUTMTWKQL

set serveroutput on;
BEGIN
    --table_insertor.insert_event('TWIwZSFkty', 'testnou', 'sum', 69);
    --table_insertor.insert_reward('TWIwZSFkty', 'numenou', 'conditie', 'reward', 1);
    --DBMS_OUTPUT.put_line(test_existence.test_table('first_event','PjoTmfkpHw'));
    --table_insertor.insert_event_user('numenou', 'TWIwZSFkty', 'user1');
    --table_insertor.insert_update('testnou', 'TWIwZSFkty', 'user1', 69);
    --dbms_output.put_line(rewards.event('testnou', 'TWIwZSFkty', 'user1'));
    --dbms_output.put_line(rewards.get_rewards('TWIwZSFkty', 'user1'));
    --dbms_output.put_line(api_users.owner_register('test','pass'));
END;

SELECT * FROM OWNERS;

SELECT * FROM EVENT_LoXKHnaGee;
SELECT * FROM REWARD_LoXKHnaGee;
SELECT * FROM LEVEL_LoXKHnaGee;
SELECT * FROM PLAYER_aViRBBjacJ;

set serveroutput on;
DECLARE
    hash_code VARCHAR2(200) := 'LzcQasNkua';
BEGIN
--    dbms_output.put_line(api_users.owner_register('tudor', 'tudor', 'tudor.com'));
--    dbms_output.put_line(api_users.owner_delete('tudor', 'tudor'));
    
--    dbms_output.put_line(api_services.add_event(hash_code, 'e1', 'sum', 50, 100));
--    dbms_output.put_line(api_services.add_event(hash_code, 'e2', 'time', 50, 1000));
--    dbms_output.put_line(api_services.add_event(hash_code, 'e3', 'count', 5, 150));
--    dbms_output.put_line(api_services.add_event(hash_code, 'test', 'count', 5, 150));
--    dbms_output.put_line(api_services.delete_event('test', hash_code));
    
--    dbms_output.put_line(api_services.add_reward(hash_code, 'r1', '(e1 $ e2) | (e3)', 'reward1'));
--    dbms_output.put_line(api_services.add_reward(hash_code, 'test', '(e3)', 'testreward1'));
--    dbms_output.put_line(api_services.delete_reward('test', hash_code));

--    dbms_output.put_line(api_services.add_level(hash_code, 'rookie', 0, 'l1'));
--    dbms_output.put_line(api_services.add_level(hash_code, 'iron', 200, 'l2'));
--    dbms_output.put_line(api_services.add_level(hash_code, 'silver', 999, 'l3'));
--    dbms_output.put_line(api_services.add_level(hash_code, 'test', 0, 'test'));
--    dbms_output.put_line(api_services.delete_level('test', hash_code));

--    dbms_output.put_line(api_services_username.update_event('e1', hash_code, 'user1', 200));
--    dbms_output.put_line(api_services_username.update_event('e3', hash_code, 'user1'));
--    dbms_output.put_line(api_services_username.get_rewards(hash_code, 'user1'));
--    dbms_output.put_line(api_services_username.get_all_rewards(hash_code, 'user1'));
--    dbms_output.put_line(api_services_username.remove_user(hash_code, 'user1'));
--    dbms_output.put_line(api_services_username.add_user_to_level(hash_code, 'user1'));
--    dbms_output.put_line(api_services_username.get_level(hash_code, 'user1'));
--    dbms_output.put_line(api_services_username.get_xp(hash_code, 'user1'));
END;




SELECT * FROM OWNERS;
SELECT * FROM TimeRegister_aViRBBjacJ;

SELECT * FROM EVENT_aViRBBjacJ;

update event_aViRBBjacJ set evalue = -1 where ename = 'TimeRegister';

set serveroutput on;
begin
    dbms_output.put_line(api_services_username.get_all_rewards('aViRBBjacJ', 'demoUser1'));
end;
