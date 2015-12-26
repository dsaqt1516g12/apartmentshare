package edu.upc.eetac.dsa.apartmentshare.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;

/**
 * Created by mazp on 28/11/15.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Room {
    @InjectLinks({})

    private List<Link> links;
    private String  id;
    private String flatid;
    private String userid;
    private int girlorboy;
    private int sqm;
    private int furnished;
    private  int status;
    private int price;
    private String description;
    private long creationTimestamp;
    private long lastModified;

    private int numpartner;
    private int smoker;
    private int pets;
    private int flatgirlorboy;
    private int flatsqm;
    private int flatfurnished;
    private int numrooms;
    private int numbathrooms;
    private int  elevator;
    private int plantnum;
    private int internet;
    private int fianza;
    private int estancia ;

    private String campusaddress;
    private String flatdescription;
    private String campusname;
    private String address;
    private float longitud;
    private float latitud;

    private String email;
    private String fullname;
    private String phone;

    public List<Link> getLinks() {
        return links;
    }
    public void setLinks(List<Link> links) {
        this.links = links;
    }
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
    public String getUserid() {
        return userid;
    }
    public void setUserid(String userid) {
        this.userid = userid;
    }
    public int getGirlorboy() {
        return girlorboy;
    }
    public void setGirlorboy(int girlorboy) {
        this.girlorboy = girlorboy;
    }
    public int getSqm() {
        return sqm;
    }
    public void setSqm(int sqm) {
        this.sqm = sqm;
    }
    public int getFurnished() {
        return furnished;
    }
    public void setFurnished(int furnished) {
        this.furnished = furnished;
    }
    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public long getCreationTimestamp() {
        return creationTimestamp;
    }
    public void setCreationTimestamp(long creationTimestamp) {
        this.creationTimestamp = creationTimestamp;
    }
    public long getLastModified() {
        return lastModified;
    }
    public void setLastModified(long lastModified) {
        this.lastModified = lastModified;
    }

    public int getNumpartner() {
        return numpartner;
    }
    public void setNumpartner(int numpartner) {
        this.numpartner = numpartner;
    }
    public int getSmoker() {
        return smoker;
    }
    public void setSmoker(int smoker) {
        this.smoker = smoker;
    }
    public int getPets() {
        return pets;
    }
    public void setPets(int pets) {
        this.pets = pets;
    }
    public int getflatGirlorboy() {
        return flatgirlorboy;
    }
    public void setflatGirlorboy(int flatgirlorboy) {
        this.flatgirlorboy = flatgirlorboy;
    }
    public int getflatSqm() {
        return flatsqm;
    }
    public void setflatSqm(int flatsqm) {
        this.flatsqm = flatsqm;
    }
    public int getflatFurnished() {
        return flatfurnished;
    }
    public void setflatFurnished(int flatfurnished) {
        this.flatfurnished = flatfurnished;
    }
    public int getNumrooms() {
        return numrooms;
    }
    public void setNumrooms(int numrooms) {
        this.numrooms = numrooms;
    }
    public int getNumbathrooms() {
        return numbathrooms;
    }
    public void setNumbathrooms(int numbathrooms) {this.numbathrooms = numbathrooms;}
    public int getElevator() {
        return elevator;
    }
    public void setElevator(int elevator) {
        this.elevator = elevator;
    }
    public int getPlantnum() {
        return plantnum;
    }
    public void setPlantnum(int plantnum) {
        this.plantnum = plantnum;
    }
    public int getInternet() {
        return internet;
    }
    public void setInternet(int internet) {
        this.internet = internet;
    }
    public int getFianza() {
        return fianza;
    }
    public void setFianza(int fianza) {
        this.fianza = fianza;
    }
    public int getEstancia() {return estancia;    }
    public void setEstancia(int estancia) {
        this.estancia = estancia;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getflatDescription() {
        return flatdescription;
    }
    public void setflatDescription(String flatdescription) {
        this.flatdescription = flatdescription;
    }

    public String getCampusname() {
        return campusname;
    }
    public void setCampusname(String campusname) {
        this.campusname = campusname;
    }
    public String getCampusaddress() {
        return campusaddress;
    }
    public void setCampusaddress(String campusaddress) {
        this.campusaddress = campusaddress;
    }
    public float getLongitud() {
        return longitud;
    }
    public void setLongitud(float longitud) {
        this.longitud = longitud;
    }
    public float getLatitud() {
        return latitud;
    }
    public void setLatitud(float latitud) {
        this.latitud = latitud;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
}
