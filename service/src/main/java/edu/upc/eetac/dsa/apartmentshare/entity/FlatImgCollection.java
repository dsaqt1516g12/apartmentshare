package edu.upc.eetac.dsa.apartmentshare.entity;


import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Jordi on 27/12/2015.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlatImgCollection {
    private List<FlatImg> images = new ArrayList<>();

    public List<FlatImg> getImages() {
        return images;
    }

    public void setImages(List<FlatImg> images) {
        this.images = images;
    }

    public void addImage(FlatImg image) {
        images.add(image);
    }

}
