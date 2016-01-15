use apartmentsharedb;
ALTER TABLE campus_upc ADD creation_timestamp DATETIME not null default current_timestamp;
ALTER TABLE campus_upc ADD last_modified TIMESTAMP NOT NULL;
update campus_upc set creation_timestamp='2016-01-15 20:20:00';
update campus_upc set last_modified='2016-01-15 20:20:01';
