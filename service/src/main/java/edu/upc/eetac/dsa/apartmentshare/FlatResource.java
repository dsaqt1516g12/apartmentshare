package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.entity.AuthToken;
import edu.upc.eetac.dsa.apartmentshare.entity.Flat;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;

/**
 * Created by Jordi on 09/12/2015.
 */
@Path("flat")
public class FlatResource {
    @Context
    private SecurityContext securityContext;
    @POST
    public Response createSting(@FormParam("campusid") String campusid, @FormParam("address") String address,@FormParam("description") String description,@FormParam("numpartner") int numpartner,@FormParam("smoker") int smoker,@FormParam("pets") int pets,@FormParam("girlorboy") int girlorboy,@FormParam("sqm") int sqm,@FormParam("furnished") int furnished,@FormParam("numrooms") int numrooms,@FormParam("numbathrooms") int numbathrooms,@FormParam("elevator") int elevator,@FormParam("plantnum") int plantnum,@FormParam("internet") int internet,@FormParam("fianza") int fianza,@FormParam("estancia") int estancia, @Context UriInfo uriInfo) throws URISyntaxException {
        if(campusid==null || address == null)
            throw new BadRequestException("campusid and address are mandatory");
        FlatDAO flatDAO = new FlatDAOImpl();
        Flat flat = null;
        AuthToken authenticationToken = null;
        try {
            flat = flatDAO.createFlat(securityContext.getUserPrincipal().getName(), campusid, address,description, numpartner,  smoker,  pets,  girlorboy,  sqm,  furnished,  numrooms,  numbathrooms,  elevator,  plantnum,  internet,  fianza,  estancia);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + flat.getId());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_FLAT).entity(flat).build();
    }
}