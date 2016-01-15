package edu.upc.eetac.dsa.apartmentshare;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.linking.DeclarativeLinkingFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

import java.util.Enumeration;
import java.util.ResourceBundle;

/**
 * Created by mazp on 28/11/15.
 */
public class ApartmentshareResourceConfig extends ResourceConfig {

    public ApartmentshareResourceConfig() {
        register(JacksonFeature.class);
        register(RolesAllowedDynamicFeature.class);
        register(DeclarativeLinkingFeature.class);
        packages("edu.upc.eetac.dsa.apartmentshare");
        packages("edu.upc.eetac.dsa.apartmentshare.auth");
        packages("edu.upc.eetac.dsa.apartmentshare.cors");


        register(MultiPartFeature.class);
        ResourceBundle bundle = ResourceBundle.getBundle("apartmentshare");

        Enumeration<String> keys = bundle.getKeys();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            property(key, bundle.getObject(key));
        }
    }
}
