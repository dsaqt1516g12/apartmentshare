package edu.upc.eetac.dsa.apartmentshare;


import edu.upc.eetac.dsa.apartmentshare.dao.*;
import edu.upc.eetac.dsa.apartmentshare.entity.*;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.imageio.ImageIO;
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

@Path("/flat/{id}/room/{roomid}/img")
public class RoomImageResource {

    @Context
    private Application app;
    @Context
    private SecurityContext securityContext;

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadImage(@PathParam("id") String flatid,@PathParam("roomid") String roomid,
                                 @FormDataParam("image") InputStream image,
                                 @FormDataParam("image") FormDataContentDisposition fileDisposition, @Context UriInfo uriInfo) throws URISyntaxException {

        UUID uuid = writeAndConvertImage(image);
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        Connection conn = null;
        FlatDAO flatDAO = new FlatDAOImpl();
        Room room = null;
        Flat flat =null;
        RoomDAO roomDAO = new RoomDAOImpl();
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();

        try {
            room = roomDAO.getRoomById(roomid);
            if (room == null)
                throw new NotFoundException("Room with id = " + roomid + " doesn't exist");
            if(!userid.equals(room.getUserid()))
                throw new ForbiddenException("operation not allowed");
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

            stmt = conn.prepareStatement(RoomDAOQuery.UUID);
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

            stmt = conn.prepareStatement(RoomDAOQuery.ADD_IMAGE_ROOM);
            stmt.setString(1, id);
            stmt.setString(2, roomid);
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
        RoomImg roomImg = new RoomImg();
        roomImg.setFilename(uuid.toString() + ".png");
        roomImg.setId(id);
        roomImg.setRoomid(roomid);
        roomImg.setImageURL(app.getProperties().get("imgBaseURL") + roomImg.getFilename());

        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + roomImg.getId());
        return Response.created(uri ).type(ApartmentshareMediaType.APARTMENTSHARE_ROOM_IMG).entity(roomImg).build();
    }


    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_IMG_COLLECTION)
    public RoomImgCollection getImages(@PathParam("id") String flatid,@PathParam("roomid") String roomid, @Context UriInfo uriInfo) throws URISyntaxException {
        RoomImgCollection images = new RoomImgCollection();

        FlatDAO flatDAO = new FlatDAOImpl();
        Room room = null;
        Flat flat =null;
        RoomDAO roomDAO = new RoomDAOImpl();
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();

        try {
            room = roomDAO.getRoomById(roomid);
            if (room == null)
                throw new NotFoundException("Room with id = " + roomid + " doesn't exist");
            if(!userid.equals(room.getUserid()))
                throw new ForbiddenException("operation not allowed");
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
            stmt = conn.prepareStatement(RoomDAOQuery.GET_IMAGES_ROOM_BY_ROOMID);
            stmt.setString(1, roomid);
            stmt.executeQuery();

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                RoomImg image = new RoomImg();
                image.setFilename(rs.getString("filename"));
                image.setId(rs.getString("id"));
                image.setRoomid(rs.getString("roomid"));
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
    public void deleteRoom(@PathParam("id") String flatid,@PathParam("roomid") String roomid,@PathParam("imagenid") String id) {
        FlatDAO flatDAO = new FlatDAOImpl();
        Room room = null;
        Flat flat =null;
        RoomDAO roomDAO = new RoomDAOImpl();
        AuthToken authenticationToken = null;
        String userid = securityContext.getUserPrincipal().getName();

        try {
            room = roomDAO.getRoomById(roomid);
            if (room == null)
                throw new NotFoundException("Room with id = " + roomid + " doesn't exist");
            if(!userid.equals(room.getUserid()))
                throw new ForbiddenException("operation not allowed");
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
            stmt = conn.prepareStatement(RoomDAOQuery.GET_IMAGE_ROOM_BY_ID);
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
                    stmt = conn.prepareStatement(RoomDAOQuery.DELETE_IMAGE_ROOM);
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
