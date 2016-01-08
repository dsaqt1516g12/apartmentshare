package edu.upc.eetac.dsa.apartmentshare.dao;

/**
 * Created by Jordi on 09/12/2015.
 */
public interface FlatDAOQuery {
    public final static String UUID = "select REPLACE(UUID(),'-','')";
    public final static String CREATE_FLAT = "insert into flat (id, userid,  campusid,  address, description, numpartner,  smoker,  pets,  girlorboy,  sqm,  furnished,  numrooms,  numbathrooms,  elevator,  plantnum,  internet,  fianza, estancia) values (UNHEX(?), unhex(?), unhex(?), ?, ?,?,?,?, ?, ?,?,?,?, ?, ?,?,?,?)";
    public final static String GET_FLAT_BY_ID = "select hex(s.id) as id, hex(s.userid) as userid, hex(s.campusid) as campusid, s.address, s.description, s.numpartner,  s.smoker,  s.pets,  s.girlorboy,  s.sqm,  s.furnished,  s.numrooms,  s.numbathrooms,  s.elevator,  s.plantnum,  s.internet,  s.fianza, s.estancia, img.filename, s.creation_timestamp, s.last_modified, u.fullname, u.phone from flat s LEFT JOIN imagenflat img ON img.flatid=(select imagenflat.flatid from imagenflat where s.id=imagenflat.flatid limit 1), users u where s.id=unhex(?) and u.id=s.userid";
    //TODOS!! public final static String GET_FLATS = "select hex(s.id) as id, hex(s.userid) as userid, s.subject, s.creation_timestamp, s.last_modified, u.fullname from stings s, users u where u.id=s.userid";
    // 5 en 5 public final static String GET_FLATS = "select hex(id) as id, hex(userid) as userid, subject, creation_timestamp, last_modified from stings order by creation_timestamp desc limit 5";
    public final static String GET_FLATS = "select hex(flat.id) as id, hex(userid) as userid, hex(campusid) as campusid, address, description, numpartner,  smoker,  pets,  girlorboy,  sqm,  furnished,  numrooms,  numbathrooms,  elevator,  plantnum,  internet,  fianza, estancia, img.filename, creation_timestamp, last_modified from flat LEFT JOIN imagenflat img ON img.flatid=(select imagenflat.flatid from imagenflat where flat.id=imagenflat.flatid limit 1) where creation_timestamp < ? and userid=unhex(?) order by creation_timestamp desc limit 5 ";
    public final static String GET_FLATS_AFTER = "select hex(flat.id) as id, hex(userid) as userid, hex(campusid) as campusid, address, description, numpartner,  smoker,  pets,  girlorboy,  sqm,  furnished,  numrooms,  numbathrooms,  elevator,  plantnum,  internet,  fianza, estancia, img.filename,creation_timestamp, last_modified from flat LEFT JOIN imagenflat img ON img.flatid=(select imagenflat.flatid from imagenflat where flat.id=imagenflat.flatid limit 1) where creation_timestamp > ? and userid=unhex(?) order by creation_timestamp desc limit 5 ";
    public final static String UPDATE_FLAT = "update flat set campusid=unhex(?),  address=?, description=?, numpartner=?,  smoker=?,  pets=?,  girlorboy=?,  sqm=?,  furnished=?,  numrooms=?,  numbathrooms=?,  elevator=?,  plantnum=?,  internet=?,  fianza=?, estancia=? where id=unhex(?) ";
    public final static String DELETE_FLAT = "delete from flat where id=unhex(?)";
    public final static String ADD_IMAGE_FLAT = "insert into imagenflat (id,flatid,filename) values (unhex(?),unhex(?),?)";
    public final static String DELETE_IMAGE_FLAT = "delete from imagenflat where id=unhex(?)";
    public final static String GET_IMAGES_FLAT_BY_FLATID ="select filename,hex(id) as id,hex(flatid) as flatid from imagenflat where flatid=unhex(?)";
    public final static String GET_IMAGE_FLAT_BY_ID="select filename from imagenflat where id=unhex(?)";
    //public final static String GET_IMAGES_FLAT ="select hex(id) from imagenflat where flatid=unhex(?)";

}
