package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.entity.Room;
import edu.upc.eetac.dsa.apartmentshare.entity.RoomCollection;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.sql.SQLException;


/**
 * Created by Jordi on 22/12/2015.
 */
@Path("rooms")
public class ListRoomResource {
    @Context
    private Application app;

    @POST
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_FILTER_COLLECTION)
    public RoomCollection getListFilterRoom(@FormParam("campusname") String campusname,@FormParam("latitud") float latitud,@FormParam("longitud") float longitud,@FormParam("flataddress") String flataddress,@FormParam("campusaddress") String campusaddress,@FormParam("flatdescription") String flatdescription,@FormParam("numpartner") int numpartner,@FormParam("smoker") int smoker,@FormParam("pets") int pets,@FormParam("flatgirlorboy") int flatgirlorboy,@FormParam("flatsqm") int flatsqm,@FormParam("flatfurnished") int flatfurnished,@FormParam("numrooms") int numrooms,@FormParam("numbathrooms") int numbathrooms,@FormParam("elevator") int elevator,@FormParam("plantnum") int plantnum,@FormParam("internet") int internet,@FormParam("fianza") int fianza,@FormParam("estancia") int estancia,@FormParam("roomid") String roomid,@FormParam("userid") String userid,@FormParam("flatid") String flatid,@FormParam("roomdescription") String roomdescription,@FormParam("roomgirlorboy") int roomgirlorboy,@FormParam("roomsqm") int roomsqm,@FormParam("roomfurnished") int roomfurnished,@FormParam("status") int status,@FormParam("minprice") int minprice,@FormParam("maxprice") int maxprice,@FormParam("fullname") String fullname,@FormParam("phone") String phone,@FormParam("email") String email,@FormParam("creation_timestamp") long creation_timestamp,@FormParam("last_modified") long last_modified,@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) {
        RoomCollection roomCollection = null;
        RoomDAO roomDAO = new RoomDAOImpl();
        try {
            if (before && timestamp == 0) timestamp = System.currentTimeMillis();
            roomCollection = roomDAO.getListFilterRooms(campusname,latitud,longitud,flataddress,campusaddress,flatdescription,numpartner,smoker,pets,flatgirlorboy,flatsqm,flatfurnished,numrooms,numbathrooms,elevator,plantnum,internet,fianza,estancia,roomid,userid,flatid,roomdescription,roomgirlorboy,roomsqm,roomfurnished,status,minprice,maxprice,fullname,phone,email,creation_timestamp,last_modified,timestamp, before);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return roomCollection;
    }

    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_FILTER_COLLECTION)
    public RoomCollection getListRooms(@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) {
        String URL = String.valueOf(app.getProperties().get("imgBaseURL")).toString();
        RoomCollection roomCollection = null;
        RoomDAO roomDAO = new RoomDAOImpl();
        try {
            if (before && timestamp == 0) timestamp = System.currentTimeMillis();
            roomCollection = roomDAO.getListRooms(timestamp, before,URL);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return roomCollection;
    }


    @Path("/{roomid}")
    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_FILTER)
    public Response GetListRoom(@PathParam("roomid") String id, @Context Request request) {
        // Create cache-control

        CacheControl cacheControl = new CacheControl();

        FlatDAO flatDAO = new FlatDAOImpl();
        Room room =null;
        RoomDAO roomDAO = new RoomDAOImpl();

        try {
            room = roomDAO.getListRoomById(id);
            if (room == null)
                throw new NotFoundException("Room with id = " + id + " doesn't exist");

            // Calculate the ETag on last modified date of user resource
            EntityTag eTag = new EntityTag(Long.toString(room.getLastModified()));

            // Verify if it matched with etag available in http request
            Response.ResponseBuilder rb = request.evaluatePreconditions(eTag);

            // If ETag matches the rb will be non-null;
            // Use the rb to return the response without any further processing
            if (rb != null) {
                return rb.cacheControl(cacheControl).tag(eTag).build();
            }

            // If rb is null then either it is first time request; or resource is
            // modified
            // Get the updated representation and return with Etag attached to it
            rb = Response.ok(room).cacheControl(cacheControl).tag(eTag);
            return rb.build();
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
    }

}
