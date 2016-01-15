package edu.upc.eetac.dsa.apartmentshare.dao;

import edu.upc.eetac.dsa.apartmentshare.entity.CampusLocation;
import edu.upc.eetac.dsa.apartmentshare.entity.CampusLocationCollection;
import edu.upc.eetac.dsa.apartmentshare.entity.Flat;
import edu.upc.eetac.dsa.apartmentshare.entity.FlatCollection;

import java.sql.*;

/**
 * Created by Jordi on 13/12/2015.
 */
public class CampusDAOImpl implements CampusDAO{


    @Override
    public CampusLocation createCampus(String userid, String campusname, String address, float longitud, float latitud) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(CampusDAOQuery.UUID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next())
                id = rs.getString(1);
            else
                throw new SQLException();

            stmt = connection.prepareStatement(CampusDAOQuery.CREATE_CAMPUS);
            stmt.setString(1, id);
            stmt.setString(2, campusname);
            stmt.setString(3, address);
            stmt.setFloat(4, longitud);
            stmt.setFloat(5, latitud);

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
        return getCampusById(id);
    }

    @Override
    public CampusLocation getCampusById(String id) throws SQLException {
        CampusLocation campuslocation = null;

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(CampusDAOQuery.GET_CAMPUS_BY_ID);
            stmt.setString(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                campuslocation = new CampusLocation();
                campuslocation.setId(rs.getString("id"));
                campuslocation.setCampusname(rs.getString("campusname"));
                campuslocation.setAddress(rs.getString("address"));
                campuslocation.setLongitud(rs.getFloat("longitud"));
                campuslocation.setLatitud(rs.getFloat("latitud"));
                campuslocation.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                campuslocation.setLastModified(rs.getTimestamp("last_modified").getTime());
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return campuslocation;
    }

    @Override
    public CampusLocationCollection getCampus(long timestamp, boolean before) throws SQLException {
        CampusLocationCollection campusLocationCollection = new CampusLocationCollection();

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(CampusDAOQuery.GET_CAMPUS);

            ResultSet rs = stmt.executeQuery();
            boolean first = true;
            while (rs.next()) {
                CampusLocation campus = new CampusLocation();
                campus.setId(rs.getString("id"));
                campus.setCampusname(rs.getString("campusname"));
                campus.setAddress(rs.getString("address"));
                campus.setLongitud(rs.getFloat("longitud"));
                campus.setLatitud(rs.getFloat("latitud"));
                campus.setCreationTimestamp(rs.getTimestamp("creation_timestamp").getTime());
                campus.setLastModified(rs.getTimestamp("last_modified").getTime());

                if (first) {
                    campusLocationCollection.setNewestTimestamp(campus.getLastModified());
                    first = false;
                }
                campusLocationCollection.setOldestTimestamp(campus.getLastModified());
                campusLocationCollection.getCampus().add(campus);
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return campusLocationCollection;
    }

    @Override
    public CampusLocation updateCampus(String id,String campusname, String address,float longitud,float latitud) throws SQLException {
        CampusLocation campusLocation = null;

        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(CampusDAOQuery.UPDATE_CAMPUS);
            stmt.setString(1, campusname);
            stmt.setString(2, address);
            stmt.setFloat(3, longitud);
            stmt.setFloat(4, latitud);
            stmt.setString(5, id);

            int rows = stmt.executeUpdate();
            if (rows == 1)
                campusLocation = getCampusById(id);
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }

        return campusLocation;
    }





    @Override
    public boolean deleteCampus(String id) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(CampusDAOQuery.DELETE_CAMPUS);
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
}
