package edu.upc.eetac.dsa.apartmentshare.entity;

import com.sun.scenario.effect.ImageData;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jordi on 27/12/2015.
 */
public class FlatImgCollection {
    private List<ImageData> images = new ArrayList<>();

    public List<ImageData> getImages() {
        return images;
    }

    public void setImages(List<ImageData> images) {
        this.images = images;
    }

    public void addImage(ImageData image) {
        images.add(image);
    }
}
