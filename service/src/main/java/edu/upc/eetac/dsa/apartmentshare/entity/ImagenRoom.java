package edu.upc.eetac.dsa.apartmentshare.entity;

import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;

/**
 * Created by mazp on 28/11/15.
 */
public class ImagenRoom {

    @InjectLinks({})
    private List<Link> links;

   private String id;

    private String flatid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFlatid() {
        return flatid;
    }

    public void setFlatid(String flatid) {
        this.flatid = flatid;
    }

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }
}
