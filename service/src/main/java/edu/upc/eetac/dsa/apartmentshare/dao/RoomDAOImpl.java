package edu.upc.eetac.dsa.apartmentshare.dao;

import edu.upc.eetac.dsa.apartmentshare.entity.*;
import java.sql.*;

/**
 * Created by Jordi on 21/12/2015.
 */
public class RoomDAOImpl implements RoomDAO {
    private String searchquery;
    private int searchqueryorder;
    @Override
    public Room createRoom(String userid, String flatid, String description,int girlorboy, int sqm, int furnished, int status, int price) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(RoomDAOQuery.UUID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next())
                id = rs.getString(1);
            else
                throw new SQLException();

            stmt = connection.prepareStatement(RoomDAOQuery.CREATE_ROOM);
            stmt.setString(1, id);
            stmt.setString(2, userid);
            stmt.setString(3, flatid);
            stmt.setString(4, description);
            stmt.setInt(5,girlorboy);
            stmt.setInt(6,sqm);
            stmt.setInt(7,furnished);
            stmt.setInt(8,status);
            stmt.setInt(9, price);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
        return getRoomById(id);
    }

    @Override
    public Room getRoomById(String id) throws SQLException {
        Room room = null;

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(RoomDAOQuery.GET_ROOM_BY_ID);
            stmt.setString(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                room = new Room();
                room.setId(rs.getString("id"));
                room.setUserid(rs.getString("userid"));
                room.setFlatid(rs.getString("flatid"));
                room.setDescription(rs.getString("description"));
                room.setGirlorboy(rs.getInt("girlorboy"));
                room.setSqm(rs.getInt("sqm"));
                room.setFurnished(rs.getInt("furnished"));
                room.setStatus(rs.getInt("status"));
                room.setPrice(rs.getInt("price"));
                room.setFilename(rs.getString("filename"));
                room.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                room.setLastModified(rs.getTimestamp("last_modified").getTime());
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return room;
    }

    @Override
    public RoomCollection getRooms(String flatid, String userid,long timestamp, boolean before,String URL) throws SQLException {
        RoomCollection flatCollection = new RoomCollection();

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            if(before)
                stmt = connection.prepareStatement(RoomDAOQuery.GET_ROOMS);
            else
                stmt = connection.prepareStatement(RoomDAOQuery.GET_ROOMS_AFTER);
            stmt.setTimestamp(1, new Timestamp(timestamp));
            stmt.setString(2, userid);
            stmt.setString(3, flatid);

            ResultSet rs = stmt.executeQuery();
            boolean first = true;
            while (rs.next()) {
                Room room = new Room();
                room.setId(rs.getString("id"));
                room.setUserid(rs.getString("userid"));
                room.setFlatid(rs.getString("flatid"));
                room.setDescription(rs.getString("description"));
                room.setGirlorboy(rs.getInt("girlorboy"));
                room.setSqm(rs.getInt("sqm"));
                room.setFurnished(rs.getInt("furnished"));
                room.setStatus(rs.getInt("status"));
                room.setPrice(rs.getInt("price"));
                room.setFilename(rs.getString("filename"));
                room.setImageURL(URL+rs.getString("filename"));
                room.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                room.setLastModified(rs.getTimestamp("last_modified").getTime());
                if (first) {
                    flatCollection.setNewestTimestamp(room.getLastModified());
                    first = false;
                }
                flatCollection.setOldestTimestamp(room.getLastModified());
                flatCollection.getRooms().add(room);
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return flatCollection;
    }

    @Override
    public RoomCollection getRoomsByFlatId(String flatid) throws SQLException {
        return null;
    }

    @Override
    public Room updateRoom(String id, String flatid,String description,int girlorboy, int sqm, int furnished, int status, int price) throws SQLException {
        Room room = null;

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(RoomDAOQuery.UPDATE_ROOM);
            stmt.setString(1, flatid);
            stmt.setString(2, description);
            stmt.setInt(3,girlorboy);
            stmt.setInt(4,sqm);
            stmt.setInt(5,furnished);
            stmt.setInt(6, status);
            stmt.setInt(7, price);
            stmt.setString(8, id);

            int rows = stmt.executeUpdate();
            if (rows == 1)
                room = getRoomById(id);
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }

        return room;
    }

    @Override
    public boolean deleteRoom(String id) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(RoomDAOQuery.DELETE_ROOM);
            stmt.setString(1, id);

            int rows = stmt.executeUpdate();
            return (rows == 1);
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
    }
    @Override
    public Room getListRoomById(String id) throws SQLException {
        Room room = null;

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(RoomDAOQuery.GET_LIST_ROOM_BY_ID);
            stmt.setString(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                room = new Room();
                room.setCampusname(rs.getString("campusname"));
                room.setLatitud(rs.getFloat("latitud"));
                room.setLongitud(rs.getFloat("longitud"));
                room.setAddress(rs.getString("flataddress"));
                room.setCampusaddress(rs.getString("campusaddress"));
                room.setflatDescription(rs.getString("flatdescription"));
                room.setNumpartner(rs.getInt("numpartner"));
                room.setSmoker(rs.getInt("smoker"));
                room.setPets(rs.getInt("pets"));
                room.setflatGirlorboy(rs.getInt("flatgirlorboy"));
                room.setflatSqm(rs.getInt("flatsqm"));
                room.setflatFurnished(rs.getInt("flatfurnished"));
                room.setNumrooms(rs.getInt("numrooms"));
                room.setNumbathrooms(rs.getInt("numbathrooms"));
                room.setElevator(rs.getInt("elevator"));
                room.setPlantnum(rs.getInt("plantnum"));
                room.setInternet(rs.getInt("internet"));
                room.setFianza(rs.getInt("fianza"));
                room.setEstancia(rs.getInt("estancia"));
                room.setId(rs.getString("roomid"));
                room.setUserid(rs.getString("userid"));
                room.setFlatid(rs.getString("flatid"));
                room.setDescription(rs.getString("roomdescription"));
                room.setGirlorboy(rs.getInt("roomgirlorboy"));
                room.setSqm(rs.getInt("roomsqm"));
                room.setFurnished(rs.getInt("roomfurnished"));
                room.setStatus(rs.getInt("status"));
                room.setPrice(rs.getInt("price"));
                room.setLoginid(rs.getString("loginid"));
                room.setFullname(rs.getString("fullname"));
                room.setPhone(rs.getString("phone"));
                room.setEmail(rs.getString("email"));
                room.setFilename(rs.getString("filename"));
                room.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                room.setLastModified(rs.getTimestamp("last_modified").getTime());
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }

        return room;
    }

    @Override
    public RoomCollection getListRooms(long timestamp, boolean before,String URL) throws SQLException {
        RoomCollection flatCollection = new RoomCollection();

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            if(before)
                stmt = connection.prepareStatement(RoomDAOQuery.GET_LIST_ROOMS);
            else
                stmt = connection.prepareStatement(RoomDAOQuery.GET_LIST_ROOMS_AFTER);
            stmt.setTimestamp(1, new Timestamp(timestamp));

            ResultSet rs = stmt.executeQuery();
            boolean first = true;
            while (rs.next()) {
                Room room = new Room();
                room.setCampusname(rs.getString("campusname"));
                room.setLatitud(rs.getFloat("latitud"));
                room.setLongitud(rs.getFloat("longitud"));
                room.setAddress(rs.getString("flataddress"));
                room.setCampusaddress(rs.getString("campusaddress"));
                room.setflatDescription(rs.getString("flatdescription"));
                room.setNumpartner(rs.getInt("numpartner"));
                room.setSmoker(rs.getInt("smoker"));
                room.setPets(rs.getInt("pets"));
                room.setflatGirlorboy(rs.getInt("flatgirlorboy"));
                room.setflatSqm(rs.getInt("flatsqm"));
                room.setflatFurnished(rs.getInt("flatfurnished"));
                room.setNumrooms(rs.getInt("numrooms"));
                room.setNumbathrooms(rs.getInt("numbathrooms"));
                room.setElevator(rs.getInt("elevator"));
                room.setPlantnum(rs.getInt("plantnum"));
                room.setInternet(rs.getInt("internet"));
                room.setFianza(rs.getInt("fianza"));
                room.setEstancia(rs.getInt("estancia"));
                room.setId(rs.getString("roomid"));
                room.setUserid(rs.getString("userid"));
                room.setFlatid(rs.getString("flatid"));
                room.setDescription(rs.getString("roomdescription"));
                room.setGirlorboy(rs.getInt("roomgirlorboy"));
                room.setSqm(rs.getInt("roomsqm"));
                room.setFurnished(rs.getInt("roomfurnished"));
                room.setStatus(rs.getInt("status"));
                room.setPrice(rs.getInt("price"));
                room.setFullname(rs.getString("fullname"));
                room.setPhone(rs.getString("phone"));
                room.setEmail(rs.getString("email"));
                room.setFilename(rs.getString("filename"));
                room.setImageURL(URL+rs.getString("filename"));
                room.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                room.setLastModified(rs.getTimestamp("last_modified").getTime());
                if (first) {
                    flatCollection.setNewestTimestamp(room.getLastModified());
                    first = false;
                }
                flatCollection.setOldestTimestamp(room.getLastModified());
                flatCollection.getRooms().add(room);
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return flatCollection;
    }

    @Override
    public RoomCollection getListFilterRooms(String campusname,Float latitud,Float longitud,String flataddress,String campusaddress,String flatdescription,int numpartner,int smoker,int pets,int flatgirlorboy,int flatsqm,int flatfurnished,int numrooms,int numbathrooms,int elevator,int plantnum,int internet,int fianza,int estancia,String roomid,String userid,String flatid,String roomdescription,int roomgirlorboy,int roomsqm,int roomfurnished,int status,int minprice,int maxprice,String fullname,String phone,String email,long creation_timestamp,long last_modified, long timestamp, boolean before) throws SQLException {
        RoomCollection flatCollection = new RoomCollection();
        searchquery = "";
        searchqueryorder=1;
        if(minprice!=0 || maxprice!=0)
            searchquery=searchquery+" and r.price>=? and r.price<=? " ;
        if(smoker!=0)
            searchquery=searchquery+" and f.smoker=? " ;
        if(pets!=0)
            searchquery=searchquery+" and f.pets=? " ;
        if(numpartner!=0 && numpartner!=5)
            searchquery=searchquery+" and f.numpartner=? " ;
        if(numpartner==5)
            searchquery=searchquery+" and f.numpartner>=? " ;
        if(roomgirlorboy!=0)
            searchquery=searchquery+" and r.girlorboy=? " ;
        if(campusname!=null)
            searchquery=searchquery+" and c.id=unhex(?) " ;

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            if(before)
                stmt = connection.prepareStatement(RoomDAOQuery.GET_LIST_FILTER_ROOMS + searchquery + RoomDAOQuery.GET_LIST_FILTER_ROOMS_END);
           else
                stmt = connection.prepareStatement(RoomDAOQuery.GET_LIST_FILTER_ROOMS_AFTER + searchquery + RoomDAOQuery.GET_LIST_FILTER_ROOMS_END);
            stmt.setTimestamp(1, new Timestamp(timestamp));
            if(minprice!=0 || maxprice!=0) {
                searchqueryorder = searchqueryorder + 1;
                stmt.setInt(searchqueryorder, minprice);
                searchqueryorder = searchqueryorder + 1;
                stmt.setInt(searchqueryorder, maxprice);
            }
            if(smoker!=0) {
                searchqueryorder = searchqueryorder + 1;
                stmt.setInt(searchqueryorder, smoker);
            }
            if(pets!=0) {
                searchqueryorder = searchqueryorder + 1;
                stmt.setInt(searchqueryorder, pets);
            }
            if(numpartner!=0) {
                searchqueryorder = searchqueryorder + 1;
                stmt.setInt(searchqueryorder, numpartner);
            }
            if(roomgirlorboy!=0) {
                searchqueryorder = searchqueryorder + 1;
                stmt.setInt(searchqueryorder, roomgirlorboy);
            }
            if(campusname!=null) {
                searchqueryorder = searchqueryorder + 1;
                stmt.setString(searchqueryorder, campusname);
            }

            ResultSet rs = stmt.executeQuery();

            boolean first = true;
            while (rs.next()) {
                Room room = new Room();
                room.setCampusname(rs.getString("campusname"));
                room.setLatitud(rs.getFloat("latitud"));
                room.setLongitud(rs.getFloat("longitud"));
                room.setAddress(rs.getString("flataddress"));
                room.setCampusaddress(rs.getString("campusaddress"));
                room.setflatDescription(rs.getString("flatdescription"));
                room.setNumpartner(rs.getInt("numpartner"));
                room.setSmoker(rs.getInt("smoker"));
                room.setPets(rs.getInt("pets"));
                room.setflatGirlorboy(rs.getInt("flatgirlorboy"));
                room.setflatSqm(rs.getInt("flatsqm"));
                room.setflatFurnished(rs.getInt("flatfurnished"));
                room.setNumrooms(rs.getInt("numrooms"));
                room.setNumbathrooms(rs.getInt("numbathrooms"));
                room.setElevator(rs.getInt("elevator"));
                room.setPlantnum(rs.getInt("plantnum"));
                room.setInternet(rs.getInt("internet"));
                room.setFianza(rs.getInt("fianza"));
                room.setEstancia(rs.getInt("estancia"));
                room.setId(rs.getString("roomid"));
                room.setUserid(rs.getString("userid"));
                room.setFlatid(rs.getString("flatid"));
                room.setDescription(rs.getString("roomdescription"));
                room.setGirlorboy(rs.getInt("roomgirlorboy"));
                room.setSqm(rs.getInt("roomsqm"));
                room.setFurnished(rs.getInt("roomfurnished"));
                room.setStatus(rs.getInt("status"));
                room.setPrice(rs.getInt("price"));
                room.setFullname(rs.getString("fullname"));
                room.setPhone(rs.getString("phone"));
                room.setEmail(rs.getString("email"));
                room.setFilename(rs.getString("filename"));
                room.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                room.setLastModified(rs.getTimestamp("last_modified").getTime());
                if (first) {
                    flatCollection.setNewestTimestamp(room.getLastModified());
                    first = false;
                }
                flatCollection.setOldestTimestamp(room.getLastModified());
                flatCollection.getRooms().add(room);
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return flatCollection;
    }
}
