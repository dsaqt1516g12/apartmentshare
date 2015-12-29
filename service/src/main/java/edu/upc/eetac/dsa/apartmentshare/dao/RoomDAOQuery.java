package edu.upc.eetac.dsa.apartmentshare.dao;

/**
 * Created by Jordi on 21/12/2015.
 */
public interface RoomDAOQuery {

    public final static String UUID = "select REPLACE(UUID(),'-','')";
    public final static String CREATE_ROOM = "insert into room (id, userid,  flatid,  description, girlorboy,  sqm,  furnished,  status,  price) values (UNHEX(?), unhex(?), unhex(?), ?, ?,?,?,?,?)";
    public final static String GET_ROOM_BY_ID = "select hex(s.id) as id, hex(s.userid) as userid, hex(s.flatid) as flatid, s.description, s.girlorboy,  s.sqm,  s.furnished,  s.status,  s.price,  s.creation_timestamp, s.last_modified, u.fullname, u.phone from room s, users u where s.id=unhex(?) and u.id=s.userid";
    //TODOS!! public final static String GET_ROOMS = "select hex(s.id) as id, hex(s.userid) as userid, s.subject, s.creation_timestamp, s.last_modified, u.fullname from stings s, users u where u.id=s.userid";
    // 5 en 5 public final static String GET_ROOMS = "select hex(id) as id, hex(userid) as userid, subject, creation_timestamp, last_modified from stings order by creation_timestamp desc limit 5";
    public final static String GET_ROOMS = "select hex(id) as id, hex(userid) as userid, hex(flatid) as flatid, description, girlorboy,  sqm, furnished,status, price, creation_timestamp, last_modified from room where creation_timestamp < ? and userid=unhex(?) and flatid=unhex(?) order by creation_timestamp desc limit 5";
    public final static String GET_ROOMS_AFTER = "select hex(id) as id, hex(userid) as userid, hex(flatid) as flatid, description, girlorboy,  sqm, furnished, creation_timestamp, last_modified from room where creation_timestamp > ? and userid=unhex(?) and flatid=unhex(?) order by creation_timestamp desc limit 5";
    public final static String UPDATE_ROOM = "update room set flatid=unhex(?), description=?,girlorboy=?,  sqm=?,  furnished=?,  status=?,  price=? where id=unhex(?) ";
    public final static String DELETE_ROOM = "delete from room where id=unhex(?)";
    public final static String GET_LIST_ROOM_BY_ID = "select c.campusname, c.latitud,c.longitud, c.address as campusaddress, f.address as flataddress, f.description as flatdescription, f.numpartner,  f.smoker,  f.pets,  f.girlorboy as flatgirlorboy,  f.sqm as flatsqm,  f.furnished as flatfurnished,  f.numrooms,  f.numbathrooms,  f.elevator,  f.plantnum,  f.internet,  f.fianza, f.estancia,hex(r.id) as roomid, hex(r.userid) as userid, hex(r.flatid) as flatid, r.description as roomdescription, r.girlorboy as roomgirlorboy,  r.sqm as roomsqm,  r.furnished as roomfurnished,  r.status,  r.price,  r.creation_timestamp, r.last_modified, u.fullname, u.phone,u.email from room r LEFT JOIN users u ON r.userid=u.id LEFT JOIN flat f ON r.flatid=f.id LEFT JOIN campus_upc c ON f.campusid=c.id where r.id=unhex(?)";
    public final static String GET_LIST_ROOMS = "select c.campusname, c.latitud,c.longitud, c.address as campusaddress, f.address as flataddress, f.description as flatdescription, f.numpartner,  f.smoker,  f.pets,  f.girlorboy as flatgirlorboy,  f.sqm as flatsqm,  f.furnished as flatfurnished,  f.numrooms,  f.numbathrooms,  f.elevator,  f.plantnum,  f.internet,  f.fianza, f.estancia,hex(r.id) as roomid, hex(r.userid) as userid, hex(r.flatid) as flatid, r.description as roomdescription, r.girlorboy as roomgirlorboy,  r.sqm as roomsqm,  r.furnished as roomfurnished,  r.status,  r.price,  r.creation_timestamp, r.last_modified, u.fullname, u.phone,u.email from room r LEFT JOIN users u ON r.userid=u.id LEFT JOIN flat f ON r.flatid=f.id LEFT JOIN campus_upc c ON f.campusid=c.id where r.creation_timestamp < ? order by r.creation_timestamp desc limit 5";
    public final static String GET_LIST_ROOMS_AFTER = "select c.campusname, c.latitud,c.longitud, c.address as campusaddress, f.address as flataddress, f.description as flatdescription, f.numpartner,  f.smoker,  f.pets,  f.girlorboy as flatgirlorboy,  f.sqm as flatsqm,  f.furnished as flatfurnished,  f.numrooms,  f.numbathrooms,  f.elevator,  f.plantnum,  f.internet,  f.fianza, f.estancia,hex(r.id) as roomid, hex(r.userid) as userid, hex(r.flatid) as flatid, r.description as roomdescription, r.girlorboy as roomgirlorboy,  r.sqm as roomsqm,  r.furnished as roomfurnished,  r.status,  r.price,  r.creation_timestamp, r.last_modified, u.fullname, u.phone,u.email from room r LEFT JOIN users u ON r.userid=u.id LEFT JOIN flat f ON r.flatid=f.id LEFT JOIN campus_upc c ON f.campusid=c.id where r.creation_timestamp > ? order by r.creation_timestamp desc limit 5";
    public final static String GET_LIST_FILTER_ROOMS = "select c.campusname, c.latitud,c.longitud, c.address as campusaddress, f.address as flataddress, f.description as flatdescription, f.numpartner,  f.smoker,  f.pets,  f.girlorboy as flatgirlorboy,  f.sqm as flatsqm,  f.furnished as flatfurnished,  f.numrooms,  f.numbathrooms,  f.elevator,  f.plantnum,  f.internet,  f.fianza, f.estancia,hex(r.id) as roomid, hex(r.userid) as userid, hex(r.flatid) as flatid, r.description as roomdescription, r.girlorboy as roomgirlorboy,  r.sqm as roomsqm,  r.furnished as roomfurnished,  r.status,  r.price,  r.creation_timestamp, r.last_modified, u.fullname, u.phone,u.email from room r LEFT JOIN users u ON r.userid=u.id LEFT JOIN flat f ON r.flatid=f.id LEFT JOIN campus_upc c ON f.campusid=c.id where r.creation_timestamp < ? ";
    public final static String GET_LIST_FILTER_ROOMS_AFTER = "select c.campusname, c.latitud,c.longitud, c.address as campusaddress, f.address as flataddress, f.description as flatdescription, f.numpartner,  f.smoker,  f.pets,  f.girlorboy as flatgirlorboy,  f.sqm as flatsqm,  f.furnished as flatfurnished,  f.numrooms,  f.numbathrooms,  f.elevator,  f.plantnum,  f.internet,  f.fianza, f.estancia,hex(r.id) as roomid, hex(r.userid) as userid, hex(r.flatid) as flatid, r.description as roomdescription, r.girlorboy as roomgirlorboy,  r.sqm as roomsqm,  r.furnished as roomfurnished,  r.status,  r.price,  r.creation_timestamp, r.last_modified, u.fullname, u.phone,u.email from room r LEFT JOIN users u ON r.userid=u.id LEFT JOIN flat f ON r.flatid=f.id LEFT JOIN campus_upc c ON f.campusid=c.id where r.creation_timestamp > ? ";
    public final static String GET_LIST_FILTER_ROOMS_END = " order by r.creation_timestamp desc limit 5";

}
