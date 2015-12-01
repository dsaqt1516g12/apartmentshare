package edu.upc.eetac.dsa.apartmentshare;

import org.glassfish.jersey.server.ResourceConfig;

/**
 * Created by mazp on 28/11/15.
 */
public class ApartmentshareResourceConfig extends ResourceConfig {

    public ApartmentshareResourceConfig() {

        packages("edu.upc.eetac.dsa.apartmentshare");
        packages("edu.upc.eetac.dsa.beeter.auth");
    }
}
