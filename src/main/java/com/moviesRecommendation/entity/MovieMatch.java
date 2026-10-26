package com.moviesRecommendation.entity;


public class MovieMatch {
    private String title;
    private String description;
    private double match;

    public MovieMatch(String title, String description, double match) {
        this.title = title;
        this.description = description;
        this.match = match;
    }

    public MovieMatch() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getMatch() {
        return match;
    }

    public void setMatch(double match) {
        this.match = match;
    }
}
