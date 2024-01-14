const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("client-side"));
app.use(express.json());

const artistinfo = require("./artist-info.json");

app.get("/artist", function (req, resp) { 
    const key = req.query.temp.toLowerCase(); 
    let found = false;
    for (let artist of artistinfo) {
        if (artist.ArtistName.toLowerCase() == key) {
            resp.send(artist);
            found = true; 
            break;
        }
    }

    if (!found) {
        resp.status(404).json({ error: "Artist not found" });
    }

});

app.get("/artist-info.json", function (req, resp) {
    resp.send(artistinfo);
});

app.post("/add-comments", function (req, resp) {
    const Comment = req.body.Comment;
    const ArtistName = req.body.ArtistName;
    const artisttofind = artistinfo.find(artist => artist.ArtistName == ArtistName);

    if (!artisttofind) {
        resp.status(404).json({ error: "Artist not found" });
    } else {
        artisttofind.Comments.push(Comment);
        fs.writeFileSync("./artist-info.json", JSON.stringify(artistinfo));
        console.log(req.body);
        resp.send(req.body);
    }
});

app.post("/add-artist", function (req, resp) {
    const newArtist = {
        ArtistName: req.body.ArtistName.trim(),
        Quote: req.body.Quote.trim(),
        CoverImage: req.body.CoverImage.trim(),
        SpotifyUrl: req.body.SpotifyUrl,
        Card3A: req.body.Card3A.split(",").map(s => s.trim()),
        Card4: req.body.Card4.split(",").map(s => s.trim()),
        Card1: req.body.Card1.trim(),
        Card2: req.body.Card2.trim(),
        Comments: []
    };

    artistinfo.push(newArtist);
    fs.writeFileSync("./artist-info.json", JSON.stringify(artistinfo));
    resp.send(newArtist);
});

module.exports = app;
