package edu.upc.eetac.dsa.apartmentshare.entity;

/**
 * Created by Jordi on 08/01/2016.
 */
public class Email {

    private String body;
    private String subject;
    private String To;

    public void setBody(String body) {
        this.body = body;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setTo(String to) {
        To = to;
    }

    public String getBody() {
        return body;
    }

    public String getSubject() {
        return subject;
    }

    public String getTo() {
        return To;
    }
}
