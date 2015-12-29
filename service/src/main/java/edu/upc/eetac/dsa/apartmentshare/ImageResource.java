//package edu.upc.eetac.dsa.apartmentshare;
//
//import com.sun.scenario.effect.ImageData;
//import edu.upc.eetac.dsa.apartmentshare.dao.Database;
//import edu.upc.eetac.dsa.apartmentshare.entity.FlatImg;
//import edu.upc.eetac.dsa.apartmentshare.entity.FlatImgCollection;
//import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
//import org.glassfish.jersey.media.multipart.FormDataParam;
//
//
//import javax.imageio.ImageIO;
//import javax.sql.DataSource;
//import javax.ws.rs.*;
//import javax.ws.rs.core.Application;
//import javax.ws.rs.core.Context;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.IOException;
//import java.io.InputStream;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.UUID;
//
///**
// * Created by Jordi on 28/12/2015.
// */
//
//@Path("/images")
//public class ImageResource {
//
//    @Context
//    private Application app;
//
//    @POST
//    @Consumes(MediaType.MULTIPART_FORM_DATA)
//    public FlatImg uploadImage(@FormDataParam("title") String title,
//                                 @FormDataParam("image") InputStream image,
//                                 @FormDataParam("image") FormDataContentDisposition fileDisposition) {
//        UUID uuid = writeAndConvertImage(image);
//
//        Connection conn = null;
//        try {
//            conn = Database.getConnection();
//        } catch (SQLException e) {
//            throw new ServerErrorException("Could not connect to the database",
//                    Response.Status.SERVICE_UNAVAILABLE);
//        }
//        PreparedStatement stmt = null;
//        try {
//            stmt = conn.prepareStatement("insert into imagenflat (id,title) values (?,?)");
//            stmt.setString(1, uuid.toString());
//            stmt.setString(2, title);
//            stmt.executeUpdate();
//        } catch (SQLException e) {
//            throw new ServerErrorException(e.getMessage(),
//                    Response.Status.INTERNAL_SERVER_ERROR);
//        } finally {
//            try {
//                if (stmt != null)
//                    stmt.close();
//                conn.close();
//            } catch (SQLException e) {
//            }
//        }
//        FlatImg flatImg = new FlatImg();
//        flatImg.setFilename(uuid.toString() + ".png");
//        flatImg.setTitle(title);
//        flatImg.setImageURL(app.getProperties().get("imgBaseURL")
//                + flatImg.getFilename());
//
//        return flatImg;
//    }
//
//    @GET
//    public FlatImgCollection getImages() {
//        FlatImgCollection images = new FlatImgCollection();
//
//        Connection conn = null;
//        try {
//            conn = Database.getConnection();
//        } catch (SQLException e) {
//            throw new ServerErrorException("Could not connect to the database",
//                    Response.Status.SERVICE_UNAVAILABLE);
//        }
//
//        PreparedStatement stmt = null;
//        try {
//            stmt = conn.prepareStatement("select * from imagenflat");
//            stmt.executeQuery();
//
//            ResultSet rs = stmt.executeQuery();
//            while (rs.next()) {
//                FlatImg image = new FlatImg();
//                image.setFilename(rs.getString("imageid") + ".png");
//                image.setTitle(rs.getString("title"));
//                image.setImageURL(app.getProperties().get("imgBaseURL")
//                        + image.getFilename());
//                images.addImage(image);
//            }
//        } catch (SQLException e) {
//            throw new ServerErrorException(e.getMessage(),
//                    Response.Status.INTERNAL_SERVER_ERROR);
//        } finally {
//            try {
//                if (stmt != null)
//                    stmt.close();
//                conn.close();
//            } catch (SQLException e) {
//            }
//        }
//
//        return images;
//    }
//
//    private UUID writeAndConvertImage(InputStream file) {
//
//        BufferedImage image = null;
//        try {
//            image = ImageIO.read(file);
//
//        } catch (IOException e) {
//            throw new InternalServerErrorException(
//                    "Something has been wrong when reading the file.");
//        }
//        UUID uuid = UUID.randomUUID();
//        String filename = uuid.toString() + ".png";
//        try {
//            ImageIO.write(
//                    image,
//                    "png",
//                    new File(app.getProperties().get("uploadFolder") + filename));
//        } catch (IOException e) {
//            throw new InternalServerErrorException(
//                    "Something has been wrong when converting the file.");
//        }
//
//        return uuid;
//    }
//}
//
