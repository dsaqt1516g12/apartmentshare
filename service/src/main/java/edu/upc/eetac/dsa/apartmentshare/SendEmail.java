package edu.upc.eetac.dsa.apartmentshare;


import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.RoomDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.dao.UserDAO;
import edu.upc.eetac.dsa.apartmentshare.dao.UserDAOImpl;
import edu.upc.eetac.dsa.apartmentshare.entity.Messages;
import edu.upc.eetac.dsa.apartmentshare.entity.Room;
import edu.upc.eetac.dsa.apartmentshare.entity.User;


import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.*;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.*;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

/**
 * Created by Jordi on 08/01/2016.
 */


@Path("rooms/{roomid}/email")
public class SendEmail {
    @Context
    private SecurityContext securityContext;

    @Context
    private Application app;

    static Properties mailServerProperties;
    static Session getMailSession;
    static MimeMessage generateMailMessage;

    @POST
    public Response createEmail(@PathParam("roomid") String roomid,@FormParam("text") String bodytext, @Context UriInfo uriInfo) throws AddressException, MessagingException,URISyntaxException {
        Messages email = new Messages();
        String userid=securityContext.getUserPrincipal().getName();
        Room room = null;
        RoomDAO roomDAO = new RoomDAOImpl();
        User touser = null;
        UserDAO userDAO = new UserDAOImpl();
        User fromuser = null;

        try {
            room = roomDAO.getRoomById(roomid);
            if (room == null)
                throw new NotFoundException("Room with id = " + roomid + " doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }

        try {
            touser = userDAO.getUserById(room.getUserid());
            if (touser == null)
                throw new NotFoundException("User with id = " + room.getUserid() + " doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }

        try {
            fromuser = userDAO.getUserById(userid);
            if (fromuser == null)
                throw new NotFoundException("User with id = " + userid + " doesn't exist");
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }

        mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");
        mailServerProperties.put("mail.smtp.starttls.required", "true");
        mailServerProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        getMailSession = Session.getDefaultInstance(mailServerProperties, null);
        generateMailMessage = new MimeMessage(getMailSession);
        generateMailMessage.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(touser.getEmail().toString()));
        generateMailMessage.addRecipient(javax.mail.Message.RecipientType.BCC, new InternetAddress("j0rd1984@hotmail.com"));
        generateMailMessage.addRecipient(javax.mail.Message.RecipientType.BCC, new InternetAddress("ruben.molina.daza@gmail.com"));
        generateMailMessage.addRecipient(javax.mail.Message.RecipientType.BCC, new InternetAddress("marcelus.adolfo.zeron@estudiant.upc.edu"));
        generateMailMessage.addRecipient(javax.mail.Message.RecipientType.CC, new InternetAddress(fromuser.getEmail().toString()));
        generateMailMessage.setSubject("ApartmentShare Messages - No Reply");
        String emailBody = "Hola "+ touser.getFullname()+"," + "<br><br>" + fromuser.getFullname() + " esta interesado/a en la habitación <a href="+app.getProperties().get("apartmentshare.context").toString()+"/rooms/"+roomid+">Clicar aquí</a> y te acaba de enviar un mensaje:<br><br><i>"+bodytext+"</i><br><br>Atentamente ApartmentShare Staff";
        generateMailMessage.setContent(emailBody, "text/html");

        Transport transport = getMailSession.getTransport("smtp");
        transport.connect("smtp.gmail.com", "apartmentsharenoreply@gmail.com", "Dsa12345");
        transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
        transport.close();

        email.setText(bodytext);
        email.setFromuser(fromuser.getEmail().toString());
        email.setTouser(touser.getEmail().toString());

        URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + email.getTouser());
        return Response.created(uri).type(ApartmentshareMediaType.APARTMENTSHARE_SEND_EMAIL).entity(email).build();
   }


}
