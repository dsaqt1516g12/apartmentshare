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
    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_COLLECTION)
    public RoomCollection getListRooms(@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) {

        RoomCollection roomCollection = null;
        RoomDAO roomDAO = new RoomDAOImpl();
        try {
            if (before && timestamp == 0) timestamp = System.currentTimeMillis();
            roomCollection = roomDAO.getListRooms(timestamp, before);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return roomCollection;
    }


    @Path("/{roomid}")
    @GET
    @Consumes(ApartmentshareMediaType.APARTMENTSHARE_ROOM)
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM)
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
