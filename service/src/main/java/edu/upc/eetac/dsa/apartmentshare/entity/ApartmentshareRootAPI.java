package edu.upc.eetac.dsa.apartmentshare.entity;

import edu.upc.eetac.dsa.apartmentshare.ApartmentshareMediaType;
import edu.upc.eetac.dsa.apartmentshare.LoginResource;
import edu.upc.eetac.dsa.apartmentshare.UserResource;
import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;

/**
 * Created by mazp on 1/12/15.
 */
public class ApartmentshareRootAPI {

    @InjectLinks({
            @InjectLink(resource = ApartmentshareRootAPI.class, style = InjectLink.Style.ABSOLUTE, rel = "self bookmark home", title = "Apartmentsahre Root API"),
            @InjectLink(resource = LoginResource.class, style = InjectLink.Style.ABSOLUTE, rel = "login", title = "Login", type = ApartmentshareMediaType.APARTMENTSHARE_AUTH_TOKEN),
//            @InjectLink(resource = StingResource.class, style = InjectLink.Style.ABSOLUTE, rel = "current-stings", title = "Current stings", type = ApartmentshareMediaType.PARTMENTSHARE_FLAT_COLLECTION),
            @InjectLink(resource = UserResource.class, style = InjectLink.Style.ABSOLUTE, rel = "create-user", title = "Register", type = ApartmentshareMediaType.APARTMENTSHARE_AUTH_TOKEN),
            @InjectLink(resource = LoginResource.class, style = InjectLink.Style.ABSOLUTE, rel = "logout", title = "Logout", condition = "${!empty resource.userid}"),
//            @InjectLink(resource = StingResource.class, style = InjectLink.Style.ABSOLUTE, rel = "create-sting", title = "Create sting", condition="${!empty resource.userid}", type=BeeterMediaType.BEETER_STING),
            @InjectLink(resource = UserResource.class, method = "getUser", style = InjectLink.Style.ABSOLUTE, rel = "user-profile", title = "User profile", condition = "${!empty resource.userid}", type = ApartmentshareMediaType.PARTMENTSHARE_USER, bindings = @Binding(name = "id", value = "${resource.userid}"))
    })


    private List<Link> links;

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }
}
