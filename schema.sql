INSERT INTO topic
    (topic_name)
VALUES
    ("HISTORY"),
    ("JAVASCRIPT"),
    ("NODE.JS")
    ;
    
    INSERT INTO role
    (role_desc)
VALUES
    ("ADMIN"),
    ("TEACHER"),
    ("STUDENT")
    ;
    
    INSERT INTO user
    (email,username,password,first_name,last_name,role_id)
VALUES
    ("m_blythe@yahoo.com","m_blythe","Merlin01","Marilyn","Blythe",2),
    ("carolinah@yahoo.com","caro9999","mustardseed33","Carolina","Ramirez",2),
    ("mohameed@yahoo.com","HameedMo","Faster999","Mohammed","Hameed",1),
    ("keely@yahoo.com","keely","keely1234","Keely","Brennan",3)
    ;