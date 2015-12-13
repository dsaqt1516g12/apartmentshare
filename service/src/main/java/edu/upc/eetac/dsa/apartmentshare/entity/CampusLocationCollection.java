package edu.upc.eetac.dsa.apartmentshare.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.upc.eetac.dsa.apartmentshare.ApartmentshareRootAPIResource;
import edu.upc.eetac.dsa.apartmentshare.LoginResource;
import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by Jordi on 13/12/2015.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CampusLocationCollection {
    @InjectLinks({})
    private List<Link> links;
    private List<CampusLocation> campus = new ArrayList<>();

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }

    public List<CampusLocation> getCampus() {
        return campus;
    }

    public void setCampus(List<CampusLocation> campus) {
        this.campus = campus;
    }

}
