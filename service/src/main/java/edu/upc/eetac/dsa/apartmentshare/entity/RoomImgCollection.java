package edu.upc.eetac.dsa.apartmentshare.entity;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jordi on 27/12/2015.
 */
public class RoomImgCollection {
    private List<RoomImg> images = new ArrayList<>();

    public List<RoomImg> getImages() {
        return images;
    }

    public void setImages(List<RoomImg> images) {
        this.images = images;
    }

    public void addImage(RoomImg image) {
        images.add(image);
    }

}
