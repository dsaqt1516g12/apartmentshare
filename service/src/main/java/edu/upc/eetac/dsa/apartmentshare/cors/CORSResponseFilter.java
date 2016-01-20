package edu.upc.eetac.dsa.apartmentshare.cors;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import java.io.IOException;

/**
 * Created by mazp on 12/12/15.
 */
@Provider
public class CORSResponseFilter implements ContainerResponseFilter {
    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        String reqHead = requestContext.getHeaderString("Access-Control-Request-Headers");

        if (null != reqHead && !reqHead.equals("")) {
            responseContext.getHeaders().add("Access-Control-Allow-Headers", reqHead);
        }

        responseContext.getHeaders().add("Access-Control-Expose-Headers", "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Location");
    }
    }

