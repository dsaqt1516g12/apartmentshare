package edu.upc.eetac.dsa.apartmentshare.dao;

import edu.upc.eetac.dsa.apartmentshare.entity.Flat;
import edu.upc.eetac.dsa.apartmentshare.entity.FlatCollection;
import edu.upc.eetac.dsa.apartmentshare.entity.FlatImg;
import edu.upc.eetac.dsa.apartmentshare.entity.FlatImgCollection;

import java.sql.SQLException;

/**
 * Created by Jordi on 09/12/2015.
 */
public interface FlatDAO {

        public Flat createFlat(String userid, String campusid, String address,String description,int numpartner, int smoker, int pets, int girlorboy, int sqm, int furnished, int numrooms, int numbathrooms, int elevator, int plantnum, int internet, int fianza, int estancia) throws SQLException;
        public Flat getFlatById(String id) throws SQLException;
        public FlatCollection getFlats(String userid,long timestamp, boolean before,String URL) throws SQLException;
        public Flat updateFlat(String id, String campusid, String address,String description,int numpartner, int smoker, int pets, int girlorboy, int sqm, int furnished, int numrooms, int numbathrooms, int elevator, int plantnum, int internet, int fianza, int estancia) throws SQLException;
        public boolean deleteFlat(String id) throws SQLException;

}
