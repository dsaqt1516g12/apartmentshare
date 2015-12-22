package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.entity.AuthToken;
import edu.upc.eetac.dsa.apartmentshare.entity.Flat;
import edu.upc.eetac.dsa.apartmentshare.entity.Room;
import edu.upc.eetac.dsa.apartmentshare.entity.RoomCollection;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;

/**
 * Created by Jordi on 21/12/2015.
 */

@Path("flat/{flatid}/room")
public class RoomResource {
    @Context
    private SecurityContext securityContext;
    @POST
    public Response createRoom(@PathParam("flatid") String flatid,@FormParam("description") String description,@FormParam("girlorboy") int girlorboy,@FormParam("sqm") int sqm,@FormParam("furnished") int furnished,@FormParam("status") int status,@FormParam("price") int price,@Context UriInfo uriInfo) throws URISyntaxException {
        if(flatid==null )
            throw new BadRequestException("flatid is mandatory");
        RoomDAO roomDAO = new RoomDAOImpl();
        FlatDAO flatDAO = new FlatDAOImpl();
        Room room = null;
        Flat flat =null;
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();
        try {
            flat = flatDAO.getFlatById(flatid);
            if (flat == null)
                throw new NotFoundException("Flat with id = " + flatid + " doesn't exist");
            if(!userid.equals(flat.getUserid()))
                throw new ForbiddenException("operation not allowed");

            room = roomDAO.createRoom(securityContext.getUserPrincipal().getName(), flatid, description, girlorboy, sqm, furnished, status,  price);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + room.getId());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_ROOM).entity(room).build();
    }
    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_COLLECTION)
    public RoomCollection getRooms(@PathParam("flatid") String flatid,@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) {

        RoomCollection roomCollection = null;
        RoomDAO roomDAO = new RoomDAOImpl();
        try {
            if (before && timestamp == 0) timestamp = System.currentTimeMillis();
            roomCollection = roomDAO.getRooms(flatid,securityContext.getUserPrincipal().getName(),timestamp, before);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return roomCollection;
    }





    @Path("/{roomid}")
    @PUT
    @Consumes(ApartmentshareMediaType.APARTMENTSHARE_ROOM)
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM)
    public Room updateRoom(@PathParam("roomid") String id, Room room) {
        FlatDAO flatDAO = new FlatDAOImpl();
        Flat flat =null;
        if(room == null)
            throw new BadRequestException("entity is null");
        if(!id.equals(room.getId()))
            throw new BadRequestException("path parameter id and entity parameter id doesn't match");

        String userid = securityContext.getUserPrincipal().getName();
        if(!userid.equals(room.getUserid()))
            throw new ForbiddenException("operation not allowed");

        RoomDAO roomDAO = new RoomDAOImpl();
        try {

            flat = flatDAO.getFlatById(room.getFlatid());
            if (flat == null)
                throw new NotFoundException("Flat with id = " + room.getFlatid() + " doesn't exist");
            if(!userid.equals(flat.getUserid()))
                throw new ForbiddenException("operation not allowed");

            room = roomDAO.updateRoom(id, room.getFlatid(),room.getDescription(),room.getGirlorboy(),room.getSqm(),room.getFurnished(),room.getStatus(),room.getPrice());
            if(room == null)
                throw new NotFoundException("Room with id = "+id+" doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return room;
    }
    @Path("/{roomid}")
    @DELETE
    public void deleteRoom(@PathParam("roomid") String id) {
        String userid = securityContext.getUserPrincipal().getName();
        RoomDAO roomDAO = new RoomDAOImpl();
        try {
            String ownerid = roomDAO.getRoomById(id).getUserid();
            if(!userid.equals(ownerid))
                throw new ForbiddenException("operation not allowed");
            if(!roomDAO.deleteRoom(id))
                throw new NotFoundException("Room with id = "+id+" doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
    }

}
