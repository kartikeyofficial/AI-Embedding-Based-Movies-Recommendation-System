package com.moviesRecommendation.controller;

import com.moviesRecommendation.entity.MovieMatch;
import com.moviesRecommendation.service.MovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;



    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }
    @GetMapping("/search")
    public List<MovieMatch> search(@RequestParam String query){
        return movieService.search(query);
    }
    @GetMapping("/{title}/similar")
    public List<MovieMatch> similarMovies(@PathVariable String title) {
        return movieService.similarMovies(title);
    }
}
