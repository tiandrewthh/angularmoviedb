import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;

  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = "";
  aYear: number = 0;
  movieId: string = "";
  actorMovie: any[] = [];

  constructor(private dbService: DatabaseService) { }

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.aYear = 0;
    this.movieId = "";
    this.actorMovie = [];
  }

  onSaveMovie() {
    let obj = { title: this.title, year: this.aYear, actors: this.actorMovie };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie before chosen year
  onDeleteMoviebyYear() {
    for (let i = 0; i < this.moviesDB.length; i++) {
      if (this.moviesDB[i].year < this.aYear) {
        this.onDeleteMovie(this.moviesDB[i]);
      }
    }
  }
  onSelectMovie(item) {
    this.title = item.title;
    this.aYear = item.year;
    this.movieId = item._id;
    this.actorMovie = item.actors;
  }

  addActortoMovie() {
    this.actorMovie.push(this.actorId);
    let obj = { title: this.title, year: this.aYear, actors: this.actorMovie };
    this.dbService.addActortoMovie(this.movieId, this.actorId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

}