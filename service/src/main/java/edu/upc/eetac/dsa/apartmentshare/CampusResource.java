package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.CampusDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.CampusDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.FlatDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.entity.AuthToken;
import edu.upc.eetac.dsa.apartmentshare.entity.CampusLocation;
import edu.upc.eetac.dsa.apartmentshare.entity.CampusLocationCollection;
import edu.upc.eetac.dsa.apartmentshare.entity.Flat;


import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;

/**
 * Created by Jordi on 13/12/2015.
 */
@Path("campus")
public class CampusResource {
    @Context
    private SecurityContext securityContext;
    @POST
    @RolesAllowed("administrator")
    public Response createCampus(@FormParam("campusname") String campusname, @FormParam("address") String address,@FormParam("longitud") float longitud,@FormParam("latitud") float latitud, @Context UriInfo uriInfo) throws URISyntaxException {
        if(campusname==null || address == null)
            throw new BadRequestException("campusname and address are mandatory");
        CampusDAO campusDAO = new CampusDAOImpl();
        CampusLocation campuslocation = null;
        AuthToken authenticationToken = null;
        try {
            campuslocation = campusDAO.createCampus(securityContext.getUserPrincipal().getName(),campusname, address,longitud, latitud);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + campuslocation.getId());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_CAMPUS).entity(campuslocation).build();
    }

    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_CAMPUS_COLLECTION)
    public CampusLocationCollection getCampus(@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) {

        CampusLocationCollection campusLocationCollection = null;
        CampusDAO campusDAO = new CampusDAOImpl();
        try {
            if (before && timestamp == 0) timestamp = System.currentTimeMillis();
            campusLocationCollection = campusDAO.getCampus(timestamp, before);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return campusLocationCollection;
    }

    @Path("/{id}")
    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_CAMPUS)
    public Response getCampusId(@PathParam("id") String id, @Context Request request) {

        CacheControl cacheControl = new CacheControl();
        CampusLocation campusLocation = null;
        CampusDAO campusDAO = new CampusDAOImpl();


        try {
            campusLocation = campusDAO.getCampusById(id);
            if (campusLocation == null)
                throw new NotFoundException("Campus with id = " + id + " doesn't exist");

            // Calculate the ETag on last modified date of user resource
            EntityTag eTag = new EntityTag(Long.toString(campusLocation.getLastModified()));

            // Verify if it matched with etag available in http request
            Response.ResponseBuilder rb = request.evaluatePreconditions();

            // If ETag matches the rb will be non-null;
            // Use the rb to return the response without any further processing
           if (rb != null) {
                return rb.cacheControl(cacheControl).tag(eTag).build();
            }

            // If rb is null then either it is first time request; or resource is
            // modified
            // Get the updated representation and return with Etag attached to it
            rb = Response.ok(campusLocation).cacheControl(cacheControl);
            return rb.build();
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
    }
    @Path("/{id}")
    @PUT
    @RolesAllowed("administrator")
    @Consumes(ApartmentshareMediaType.APARTMENTSHARE_CAMPUS)
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_CAMPUS)
    public CampusLocation updateCampusLocation(@PathParam("id") String id, CampusLocation campusLocation) {
        if(campusLocation == null)
            throw new BadRequestException("entity is null");
        if(!id.equals(campusLocation.getId()))
            throw new BadRequestException("path parameter id and entity parameter id doesn't match");

        String userid = securityContext.getUserPrincipal().getName();

        CampusDAO campusDAO = new CampusDAOImpl();
        try {
            campusLocation = campusDAO.updateCampus(id, campusLocation.getCampusname(), campusLocation.getAddress(), campusLocation.getLongitud(), campusLocation.getLatitud());
            if(campusLocation == null)
                throw new NotFoundException("Campus with id = "+id+" doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return campusLocation;
    }

    @Path("/{id}")
    @DELETE
    @RolesAllowed("administrator")
    public void deleteCampus(@PathParam("id") String id) {
        String userid = securityContext.getUserPrincipal().getName();
        CampusDAO campusDAO = new CampusDAOImpl();
        try {
            if(!campusDAO.deleteCampus(id))
                throw new NotFoundException("Campus with id = "+id+" doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
    }
}
