package edu.upc.eetac.dsa.apartmentshare.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by Jordi on 27/12/2015.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomImg {
    private String filename;
    private String imageURL;
    private String id;
    private String roomid;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoomid() {
        return roomid;
    }
    public void setRoomid(String roomid) {
        this.roomid = roomid;
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
