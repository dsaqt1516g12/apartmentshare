package edu.upc.eetac.dsa.apartmentshare.entity;

/**
 * Created by Jordi on 27/12/2015.
 */

public class FlatImg {
    private String title;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
