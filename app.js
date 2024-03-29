const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('client-side'));
app.use(express.json());

let data = require('./data.json');

// get method for individual artist
// Git-hub copilot helped with takening into account whitespaces as well (Regex)
app.get('/artist', function (req, resp) {
    const key = req.query.temp.replace(/\s/g, '').toLowerCase();
    let found = false;
    for (let artist of data.artists) {
        if (artist.ArtistName.replace(/\s/g, '').toLowerCase() == key) {
            resp.send(artist);
            found = true;
            break;
        }
    }

    if (!found) {
        resp.status(404).json({ error: 'Artist not found' });
    }
});

// get method for all artists
app.get('/artists', function (req, resp) {
	resp.send(data.artists);
});

// get method for comments
app.get('/comments', function (req, resp) {
	const artist = req.query.artist;

	let comments = [];

	for (let comment of data.comments) {
		if (comment.ArtistName == artist) {
			comments.push(comment.Comment);
		}
	}

	resp.send(comments);
});

// post method for comments 
app.post('/add-comments', function (req, resp) {
	const file = fs.readFileSync('./data.json', 'utf8');
	const Comment = req.body.Comment;
	const ArtistName = req.body.ArtistName;
	const artistToFind = data.artists.find((artist) => artist.ArtistName == ArtistName);

	let temp = JSON.parse(file);

	if (!artistToFind) {
		resp.status(404).json({ error: 'Artist not found' });
	} else {
		temp.comments.push({ ArtistName, Comment });
		data = temp;
		fs.writeFileSync('./data.json', JSON.stringify(temp, null, 2));
		console.log(req.body);
		resp.send(req.body);
	}
});

// post method for new artist
app.post('/add-artist', function (req, resp) {
	const file = fs.readFileSync('./data.json', 'utf8');
    data = JSON.parse(file);

	// Git-hub copilot helped with takening into account whitespaces as well (Regex)
    const artistName = req.body.ArtistName.trim();
    const existingArtist = data.artists.find(artist => artist.ArtistName.replace(/\s/g, '').toLowerCase() === artistName.replace(/\s/g, '').toLowerCase());

    if (existingArtist) {
        return resp.status(400).json({ error: 'Artist already in file' });
    }

    const newArtist = {
        ArtistName: artistName,
        Quote: req.body.Quote.trim(),
        CoverImage: req.body.CoverImage.trim(),
        SpotifyUrl: req.body.SpotifyUrl,
        Card3A: req.body.Card3A.split(',').map((s) => s.trim()),
        Card4: req.body.Card4.split(',').map((s) => s.trim()),
        Card1: req.body.Card1.trim(),
        Card2: req.body.Card2.trim()
	};

    data.artists.push(newArtist);
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
    resp.send(newArtist);
});

// unexpected random requests will always lead back to the home page 
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client-side', 'index.html'));
});

module.exports = app;
