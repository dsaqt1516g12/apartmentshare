package edu.upc.eetac.dsa.apartmentshare;


import edu.upc.eetac.dsa.apartmentshare.dao.*;
import edu.upc.eetac.dsa.apartmentshare.entity.AuthToken;
import edu.upc.eetac.dsa.apartmentshare.entity.Flat;
import edu.upc.eetac.dsa.apartmentshare.entity.FlatImg;
import edu.upc.eetac.dsa.apartmentshare.entity.FlatImgCollection;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;


import javax.imageio.ImageIO;
import javax.sql.DataSource;
import javax.validation.constraints.Null;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

/**
 * Created by Jordi on 28/12/2015.
 */

@Path("/flat/{id}/img")
public class FlatImageResource {

    @Context
    private Application app;
    @Context
    private SecurityContext securityContext;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadImage(@PathParam("id") String flatid,
                                 @FormDataParam("image") InputStream image,
                                 @FormDataParam("image") FormDataContentDisposition fileDisposition, @Context UriInfo uriInfo) throws URISyntaxException {

        UUID uuid = writeAndConvertImage(image);
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        Connection conn = null;
        FlatDAO flatDAO = new FlatDAOImpl();
        Flat flat =null;
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();

        try {
        flat = flatDAO.getFlatById(flatid);
        if (flat == null)
            throw new NotFoundException("Flat with id = " + flatid + " doesn't exist");
        if(!userid.equals(flat.getUserid()))
            throw new ForbiddenException("operation not allowed");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }

        try {
            conn = Database.getConnection();

            stmt = conn.prepareStatement(FlatDAOQuery.UUID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next())
                id = rs.getString(1);
            else
                throw new SQLException();


        } catch (SQLException e) {
            throw new ServerErrorException("Could not connect to the database",
                    Response.Status.SERVICE_UNAVAILABLE);
        }

        try {

            stmt = conn.prepareStatement(FlatDAOQuery.ADD_IMAGE_FLAT);
            stmt.setString(1, id);
            stmt.setString(2, flatid);
            stmt.setString(3, uuid.toString()+ ".png");
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new ServerErrorException(e.getMessage(),
                    Response.Status.INTERNAL_SERVER_ERROR);
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
                conn.close();
            } catch (SQLException e) {
            }
        }
        FlatImg flatImg = new FlatImg();
        flatImg.setFilename(uuid.toString() + ".png");
        flatImg.setId(id);
        flatImg.setFlatid(flatid);
        flatImg.setImageURL(app.getProperties().get("imgBaseURL") + flatImg.getFilename());

        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + flatImg.getId());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_FLAT_IMG).entity(flatImg).build();
    }


    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_FLAT_IMG_COLLECTION)
    public FlatImgCollection getImages(@PathParam("id") String flatid, @Context UriInfo uriInfo) throws URISyntaxException {
        FlatImgCollection images = new FlatImgCollection();

        FlatDAO flatDAO = new FlatDAOImpl();
        Flat flat =null;
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();

        try {
            flat = flatDAO.getFlatById(flatid);
            if (flat == null)
                throw new NotFoundException("Flat with id = " + flatid + " doesn't exist");
            if(!userid.equals(flat.getUserid()))
                throw new ForbiddenException("operation not allowed");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }

        Connection conn = null;
        try {
            conn = Database.getConnection();
        } catch (SQLException e) {
            throw new ServerErrorException("Could not connect to the database",
                    Response.Status.SERVICE_UNAVAILABLE);
        }

        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement(FlatDAOQuery.GET_IMAGES_FLAT_BY_FLATID);
            stmt.setString(1, flatid);
            stmt.executeQuery();

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                FlatImg image = new FlatImg();
                image.setFilename(rs.getString("filename"));
                image.setId(rs.getString("id"));
                image.setFlatid(rs.getString("flatid"));
                image.setImageURL(app.getProperties().get("imgBaseURL")
                        + image.getFilename());
                images.addImage(image);
            }
        } catch (SQLException e) {
            throw new ServerErrorException(e.getMessage(),
                    Response.Status.INTERNAL_SERVER_ERROR);
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
                conn.close();
            } catch (SQLException e) {
            }
        }

        return images;
    }
    @Path("/{imagenid}")
    @DELETE
    public void deleteRoom(@PathParam("id") String flatid,@PathParam("imagenid") String id) {
        FlatDAO flatDAO = new FlatDAOImpl();
        Flat flat =null;
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();

        try {
            flat = flatDAO.getFlatById(flatid);
            if (flat == null)
                throw new NotFoundException("Flat with id = " + flatid + " doesn't exist");
            if(!userid.equals(flat.getUserid()))
                throw new ForbiddenException("operation not allowed");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        Connection conn = null;
        try {
            conn = Database.getConnection();
        } catch (SQLException e) {
            throw new ServerErrorException("Could not connect to the database",
                    Response.Status.SERVICE_UNAVAILABLE);
        }

        PreparedStatement stmt = null;
        try {
            stmt = conn.prepareStatement(FlatDAOQuery.GET_IMAGE_FLAT_BY_ID);
            stmt.setString(1, id);

            ResultSet rs = stmt.executeQuery();

            if (!rs.next() ) {
                throw new NotFoundException("Image with id = " + id + " doesn't exist");
            }
            else
            {
                try{

                    File file = new File(app.getProperties().get("uploadFolder") + rs.getString("filename"));
                    if(file.delete()){
                        System.out.println(file.getName() + " is deleted!");
                    }else{
                        System.out.println("Delete operation is failed.");
                    }
                }catch(Exception e){
                    e.printStackTrace();
                }
                try {
                    stmt = conn.prepareStatement(FlatDAOQuery.DELETE_IMAGE_FLAT);
                    stmt.setString(1, id);
                    stmt.executeUpdate();
                } catch (SQLException e) {
                    throw new ServerErrorException(e.getMessage(),
                            Response.Status.INTERNAL_SERVER_ERROR);
                } finally {
                    try {
                        if (stmt != null)
                            stmt.close();
                        conn.close();
                    } catch (SQLException e) {
                    }
                }
            }
        } catch (SQLException e) {
            throw new ServerErrorException(e.getMessage(),
                    Response.Status.INTERNAL_SERVER_ERROR);
        } finally {
            try {
                if (stmt != null)
                    stmt.close();
                conn.close();
            } catch (SQLException e) {
            }
        }

    }



    private UUID writeAndConvertImage(InputStream file) {

        BufferedImage image = null;
        try {
            image = ImageIO.read(file);

        } catch (IOException e) {
            throw new InternalServerErrorException(
                    "Something has been wrong when reading the file.");
        }
        UUID uuid = UUID.randomUUID();
        String filename = uuid.toString() + ".png";
        try {
            ImageIO.write(
                    image,
                    "png",
                    new File(app.getProperties().get("uploadFolder") + filename));
        } catch (IOException e) {
            throw new InternalServerErrorException(
                    "Something has been wrong when converting the file.");
        }

        return uuid;
    }
}

