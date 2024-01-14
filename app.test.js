"use strict";

const request = require("supertest");
const app = require("./app");

describe("Test artist service", () => {
    test("GET /artist Tory Lanez succeeds", () => {
        return request(app)
	    .get("/artist")
        .query({ temp: "Tory Lanez" })
	    .expect(200);
    });

    test("GET /artist Don Toliver succeeds", () => {
        return request(app)
	    .get("/artist")
        .query({ temp: "Don Toliver" })
	    .expect(200);
    });

    test("GET /artist Post Malone succeeds", () => {
        return request(app)
	    .get("/artist")
        .query({ temp: "Post Malone" })
	    .expect(200);
    });

    test("GET /artist Baby Keem succeeds", () => {
        return request(app)
	    .get("/artist")
        .query({ temp: "Baby Keem" })
	    .expect(200);
    });

    test("GET /artist The Weeknd succeeds", () => {
        return request(app)
	    .get("/artist")
        .query({ temp: "The Weeknd" })
	    .expect(200);
    });

    test("GET one /artist returns JSON", () => {
        return request(app)
	    .get("/artist")
        .query({ temp: "Tory Lanez" })
	    .expect("Content-type", /json/);
    });

    test("GET /artist returns 404 for invalid artist", () => {
        return request(app)
        .get("/artist")
        .query({ temp: "invalid" })
        .expect(404);
    });

    test("GET /artist-info.json succeeds", () => {
        return request(app)
        .get("/artist-info.json")
        .expect(200);
    });

    test("GET /artist-info.json returns JSON", () => {
        return request(app)
        .get("/artist-info.json")
        .expect("Content-type", /json/);
    });

    test("POST /add-comments succeeds", () => {
        return request(app)
        .post("/add-comments")
        .send({ ArtistName: "Tory Lanez", Comment: "bangers" })
        .expect(200);
    });
    
    //  Make it so that it doesnt actually add the artist to the json file 
    test("POST /add-artist succeeds", () => { 
        return request(app)
        .post("/add-artist")
        .send({ ArtistName: "", Quote: "", CoverImage: "", SpotifyUrl: "", Card3A: "", Card4: "", Card1: "", Card2: "" })
        .expect(200);
    });
});
