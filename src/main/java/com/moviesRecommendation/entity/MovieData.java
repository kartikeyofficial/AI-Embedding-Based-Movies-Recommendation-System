package com.moviesRecommendation.entity;


public class MovieData {
    private String title;
    private String description;

    public MovieData(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public MovieData() {
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
}
