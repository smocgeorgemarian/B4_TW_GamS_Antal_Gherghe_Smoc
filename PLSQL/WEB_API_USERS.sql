CREATE OR REPLACE PACKAGE api_users AS
    FUNCTION owner_login(owner_name VARCHAR2, owner_password VARCHAR2) RETURN VARCHAR2;
    FUNCTION owner_logout(owner_name VARCHAR2) RETURN VARCHAR2;
    FUNCTION owner_register(owner_name VARCHAR2, owner_password VARCHAR2, owner_site_link VARCHAR2) RETURN VARCHAR2;
    FUNCTION owner_delete(owner_name VARCHAR2, owner_password VARCHAR2) RETURN VARCHAR2;
END api_users;

/

CREATE OR REPLACE PACKAGE BODY api_users AS
    
    FUNCTION owner_login(owner_name VARCHAR2, owner_password VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        good_login INTEGER;
        returner VARCHAR2(200);
    BEGIN       
        SELECT COUNT(*) INTO good_login FROM OWNERS WHERE oname = owner_name AND opassword = owner_password AND is_logged = 0;
        IF good_login = 0 THEN
            returner := '0';
            IF test_existence.test_owner(owner_name) = 0 THEN
                returner := '404';
            END IF;
        ELSE
            returner := '1';
            UPDATE OWNERS SET is_logged = 1 WHERE oname = owner_name;
        END IF;  
        commit;
        RETURN returner;       
    END owner_login;
    
    FUNCTION owner_logout(owner_name VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200);
    BEGIN
        IF test_existence.test_owner(owner_name) = 0 THEN
            returner := '404';
        ELSE
            returner := '1';
            UPDATE OWNERS SET is_logged = 0 WHERE oname = owner_name;
        END IF;
        commit;
        RETURN returner;
    END owner_logout;
    
    FUNCTION owner_register(owner_name VARCHAR2, owner_password VARCHAR2, owner_site_link VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200);
        hash_owner VARCHAR2(200);
    BEGIN
        IF test_existence.test_owner(owner_name) = 1 THEN
            returner := '0';
        ELSE
            INSERT INTO OWNERS(oname, opassword, site_link, is_logged) VALUES(owner_name, owner_password, owner_site_link, 0);
            SELECT hash_code INTO hash_owner FROM OWNERS WHERE oname = owner_name;
            returner :=  hash_owner;
        END IF;
        commit;
        RETURN returner;
    END owner_register;
    
    FUNCTION owner_delete(owner_name VARCHAR2, owner_password VARCHAR2)
    RETURN VARCHAR2 AS
        PRAGMA AUTONOMOUS_TRANSACTION;
        returner VARCHAR2(200);
        hashcode VARCHAR2(200);
        status INTEGER;
    BEGIN
        
        SELECT COUNT(*) INTO status FROM OWNERS WHERE oname = owner_name AND opassword = owner_password;
        IF status = 0 THEN
            returner := '404';
        ELSE
            returner := '1';
            SELECT hash_code INTO hashcode FROM OWNERS WHERE oname = owner_name AND opassword = owner_password;
            table_deletion.delete_owner_info(hashcode);
        END IF;
        commit;
        RETURN returner;
    END owner_delete;
    
END api_users;