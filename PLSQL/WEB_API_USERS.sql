CREATE OR REPLACE PACKAGE api_users AS
    FUNCTION owner_register(owner_name VARCHAR2, owner_password VARCHAR2) RETURN VARCHAR2;
END api_users;

/

CREATE OR REPLACE PACKAGE BODY api_users AS
    
    FUNCTION owner_register(owner_name VARCHAR2, owner_password VARCHAR2)
    RETURN VARCHAR2 AS
        returner VARCHAR2(200);
        hash_owner VARCHAR2(200);
    BEGIN
        IF test_existence.test_owner(owner_name) = 1 THEN
            returner := '0';
        ELSE
            returner := '1' || ' ';
            INSERT INTO OWNERS(oname, opassword) VALUES(owner_name, owner_password);
            SELECT hash_code INTO hash_owner FROM OWNERS WHERE oname = owner_name;
            returner := returner || ' ' || hash_owner;
        END IF;
        RETURN returner;
    END owner_register;
    
END api_users;