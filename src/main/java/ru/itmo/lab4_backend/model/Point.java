package ru.itmo.lab4_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "points")
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Double x;
    private Double y;
    private Double r;
    private boolean result;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User owner;


    public Point(){}

    public Point(Double x, Double y, Double r, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.owner = user;
    }

    public String getOwnerName(){
        return owner.getUsername();
    }

    ////GETTERS AND SETTERS


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
