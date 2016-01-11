package edu.upc.eetac.dsa.apartmentshare.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
import java.util.ArrayList;

/**
 * Created by Jordi on 27/12/2015.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlatImg {
    private String filename;
    private String imageURL;
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


    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }


}
