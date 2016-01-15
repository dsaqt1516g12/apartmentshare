package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.*;
import edu.upc.eetac.dsa.apartmentshare.entity.*;


import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Jordi on 09/01/2016.
 */
@Path("message")
public class Message {
    @Context
    private SecurityContext securityContext;

    @POST
    public Response createMsg(@FormParam("loginid") String loginid, @FormParam("text") String text, @Context UriInfo uriInfo) throws URISyntaxException {
        if(loginid==null || text == null)
            throw new BadRequestException("loginid and text are mandatory");
        UserDAO userDAO = new UserDAOImpl();
        AuthToken authenticationToken = null;
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        Connection conn = null;
        String userid = securityContext.getUserPrincipal().getName();
        String touser = null;
        Date date= new Date();
        User user =null;

        try {
            user = userDAO.getUserByLoginid(loginid);
            if (user==null)
                throw new NotFoundException("LoginID "+loginid+" doesn't exist");
            touser = userDAO.getUserByLoginid(loginid).getId();
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }

        try {
            conn = Database.getConnection();

            stmt = conn.prepareStatement(UserDAOQuery.UUID);
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

            stmt = conn.prepareStatement(UserDAOQuery.CREATE_MSG);
            stmt.setString(1, id);
            stmt.setString(2, userid);
            stmt.setString(3, touser);
            stmt.setString(4, text);
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
        Messages msg = new Messages();
        msg.setId(id);
        msg.setFromuser(userid);
        msg.setTouser(touser);
        msg.setText(text);
        msg.setCreationTimestamp(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Timestamp(date.getTime())));

        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + msg.getId());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_MESSAGE).entity(msg).build();
    }
    @GET
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_MESSAGE_COLLECTION)
    public MessagesCollection getMessages(@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) {
        MessagesCollection allmsg = new MessagesCollection();
        String userid = securityContext.getUserPrincipal().getName();
        Connection connection = null;
        PreparedStatement stmt = null;
        Connection conn = null;
        try {
            conn = Database.getConnection();
            stmt = conn.prepareStatement(UserDAOQuery.CHECK_MSGS);
            stmt.setString(1, userid);
            stmt.executeQuery();

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Messages msg = new Messages();
                msg.setFromuser(rs.getString("fromuser"));
                msg.setFromusername(rs.getString("fromusername"));
                msg.setNummsgs(rs.getInt("count"));
                msg.setCreationTimestamp(rs.getString("creation_timestamp"));
                allmsg.getMessages().add(msg);
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
        return allmsg;
    }
    @Path("/{id}")
    @GET
    @Consumes(ApartmentshareMediaType.APARTMENTSHARE_MESSAGE)
    @Produces(ApartmentshareMediaType.APARTMENTSHARE_MESSAGE)
    public MessagesCollection updateRoom(@PathParam("id") String fromuser, @Context Request request) {
        String userid = securityContext.getUserPrincipal().getName();
        MessagesCollection allmsg = new MessagesCollection();
        Connection connection = null;
        PreparedStatement stmt = null;
        Connection conn = null;
        UserDAO userDAO = new UserDAOImpl();
        User user =null;

        try {
            user = userDAO.getUserById(fromuser);
            if (user==null)
                throw new NotFoundException("User with ID "+fromuser+" doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }


        try {
            conn = Database.getConnection();
            stmt = conn.prepareStatement(UserDAOQuery.READ_MSGS);
            stmt.setString(1, userid);
            stmt.setString(2, fromuser);
            stmt.setString(3, fromuser);
            stmt.setString(4, userid);
            stmt.executeQuery();

            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Messages msg = new Messages();
                msg.setCreationTimestamp(rs.getString("creation_timestamp"));
                msg.setFromuser(rs.getString("fromuser"));
                msg.setFromusername(rs.getString("fromusername"));
                msg.setTouser(rs.getString("touser"));
                msg.setText(rs.getString("text"));
                allmsg.getMessages().add(msg);
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
        return allmsg;
    }

}
