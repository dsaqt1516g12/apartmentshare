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

@Path("/rooms/{id}/img")
public class ListRoomImageResource {

    @Context
    private Application app;

    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_ROOM_IMG_COLLECTION)
    public RoomImgCollection getImages(@PathParam("id") String roomid, @Context UriInfo uriInfo) throws URISyntaxException {
        RoomImgCollection images = new RoomImgCollection();
        RoomDAO roomDAO = new RoomDAOImpl();
        Room room =null;
        AuthToken authenticationToken = null;

        try {
            room = roomDAO.getRoomById(roomid);
            if (room == null)
                throw new NotFoundException("Room with id = " + roomid + " doesn't exist");
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
            stmt = conn.prepareStatement(RoomDAOQuery.GET_ALL_IMAGES_FROM_ROOMID);
            stmt.setString(1, roomid);
            stmt.setString(2, roomid);
            stmt.executeQuery();

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                RoomImg image = new RoomImg();
                image.setFilename(rs.getString("filename"));
                image.setId(rs.getString("id"));
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

