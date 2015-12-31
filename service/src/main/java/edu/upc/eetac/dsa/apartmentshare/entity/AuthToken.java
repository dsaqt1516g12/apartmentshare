package edu.upc.eetac.dsa.apartmentshare.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.upc.eetac.dsa.apartmentshare.*;
import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;

/**
 * Created by mazp on 28/11/15.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthToken {

    @InjectLinks({
            @InjectLink(resource = ApartmentshareRootAPIResource.class, style = InjectLink.Style.ABSOLUTE, rel = "self bookmark home", title = "Apartmentsahre Root API"),
            @InjectLink(resource = LoginResource.class, style = InjectLink.Style.ABSOLUTE, rel = "login", title = "Login", type = ApartmentshareMediaType.APARTMENTSHARE_AUTH_TOKEN),
            @InjectLink(resource = LoginResource.class, style = InjectLink.Style.ABSOLUTE, rel = "logout", title = "Logout"),
            @InjectLink(resource = UserResource.class, method = "getUser", style = InjectLink.Style.ABSOLUTE, rel = "user-profile", title = "User profile", type= ApartmentshareMediaType.APARTMENTSHARE_USER, bindings = @Binding(name = "id", value = "${instance.userid}")),
            @InjectLink(resource = FlatResource.class, style = InjectLink.Style.ABSOLUTE, rel = "create-flat", title = "Create flat", type=ApartmentshareMediaType.APARTMENTSHARE_FLAT),
            @InjectLink(resource = FlatResource.class, style = InjectLink.Style.ABSOLUTE, rel = "current-flat", title = "Current flat", type= ApartmentshareMediaType.APARTMENTSHARE_FLAT_COLLECTION),
            @InjectLink(resource = CampusResource.class, style = InjectLink.Style.ABSOLUTE, rel = "create-campus", title = "Create campus", type=ApartmentshareMediaType.APARTMENTSHARE_CAMPUS),
            @InjectLink(resource = CampusResource.class, style = InjectLink.Style.ABSOLUTE, rel = "current-campus", title = "Current campus", type= ApartmentshareMediaType.APARTMENTSHARE_CAMPUS_COLLECTION),
            @InjectLink(resource = RoomResource.class, style = InjectLink.Style.ABSOLUTE, rel = "create-room", title = "Create room", type=ApartmentshareMediaType.APARTMENTSHARE_ROOM),
            @InjectLink(resource = RoomResource.class, style = InjectLink.Style.ABSOLUTE, rel = "current-room", title = "Current room", type= ApartmentshareMediaType.APARTMENTSHARE_ROOM_COLLECTION),
            @InjectLink(resource = ListRoomResource.class, style = InjectLink.Style.ABSOLUTE, rel = "current-room-list", title = "Current room list", type= ApartmentshareMediaType.APARTMENTSHARE_ROOM_COLLECTION),
    })

    private List<Link> links;

    private String userid;
    private String token;
    private  String flatid;


    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }

    public String getFlatid() {
        return flatid;
    }

    public void setFlatid(String flatid) {
        this.flatid = flatid;
    }
}
