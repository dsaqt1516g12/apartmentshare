use apartmentsharedb;
DROP TABLE imagenroom;
CREATE TABLE imagenroom (

    id BINARY(16) NOT NULL,

    roomid BINARY(16) NOT NULL,
	
	filename VARCHAR(100) NOT NULL,
	
	FOREIGN KEY (roomid) REFERENCES room(id) on delete cascade,

    PRIMARY KEY (id)

);