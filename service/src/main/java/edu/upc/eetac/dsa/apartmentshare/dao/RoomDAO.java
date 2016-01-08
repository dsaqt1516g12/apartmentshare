package edu.upc.eetac.dsa.apartmentshare.dao;

import edu.upc.eetac.dsa.apartmentshare.entity.Room;
import edu.upc.eetac.dsa.apartmentshare.entity.RoomCollection;

import java.sql.SQLException;

/**
 * Created by Jordi on 21/12/2015.
 */
public interface RoomDAO {

    public Room createRoom(String userid, String flatid, String description, int girlorboy, int sqm, int furnished, int status, int price) throws SQLException;
    public Room getRoomById(String id) throws SQLException;
    public Room getListRoomById(String id) throws SQLException;
    public RoomCollection getListRooms(long timestamp, boolean before,String URL) throws SQLException;
    public RoomCollection getListFilterRooms(String campusname,Float latitud,Float longitud,String flataddress,String campusaddress,String flatdescription,int numpartner,int smoker,int pets,int flatgirlorboy,int flatsqm,int flatfurnished,int numrooms,int numbathrooms,int elevator,int plantnum,int internet,int fianza,int estancia,String roomid,String userid,String flatid,String roomdescription,int roomgirlorboy,int roomsqm,int roomfurnished,int status,int minprice,int maxprice,String fullname,String phone,String email,long creation_timestamp,long last_modified, long timestamp, boolean before) throws SQLException;
    public RoomCollection getRooms(String flatid,String userid,long timestamp, boolean before,String URL) throws SQLException;
    public RoomCollection getRoomsByFlatId(String flatid) throws SQLException;
    public Room updateRoom(String id,  String flatid, String description, int girlorboy, int sqm, int furnished, int status, int price) throws SQLException;
    public boolean deleteRoom(String id) throws SQLException;

}
