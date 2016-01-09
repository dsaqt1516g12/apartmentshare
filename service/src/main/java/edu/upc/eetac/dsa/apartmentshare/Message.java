package edu.upc.eetac.dsa.apartmentshare;

import edu.upc.eetac.dsa.apartmentshare.dao.*;
import edu.upc.eetac.dsa.apartmentshare.entity.AuthToken;
import edu.upc.eetac.dsa.apartmentshare.entity.Messages;


import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;
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

        try {
            touser = userDAO.getUserByLoginid(loginid).getId();
            if (touser==null)
                throw new NotFoundException("LoginID "+loginid+" doesn't exist");
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

}
