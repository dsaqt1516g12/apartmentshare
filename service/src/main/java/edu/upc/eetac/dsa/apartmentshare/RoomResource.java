package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.entity.AuthToken;
import edu.upc.eetac.dsa.apartmentshare.entity.Flat;
import edu.upc.eetac.dsa.apartmentshare.entity.Room;

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
        try {
            flat = flatDAO.getFlatById(flatid);
            if (flat == null)
                throw new NotFoundException("Flat with id = " + flatid + " doesn't exist");
            room = roomDAO.createRoom(securityContext.getUserPrincipal().getName(), flatid, description, girlorboy, sqm, furnished, status,  price);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + room.getId());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_ROOM).entity(room).build();
    }
}
