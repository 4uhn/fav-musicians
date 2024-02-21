'use strict';

const request = require('supertest');
const app = require('./app');

describe('Jest test code', () => {
    test('GET /artist Tory Lanez succeeds', () => {
        return request(app)
	    .get('/artist')
        .query({ temp: 'Tory Lanez' })
	    .expect(200);
    });

    test('GET /artist Don Toliver succeeds', () => {
        return request(app)
	    .get('/artist')
        .query({ temp: 'Don Toliver' })
	    .expect(200);
    });

    test('GET /artist Post Malone succeeds', () => {
        return request(app)
	    .get('/artist')
        .query({ temp: 'Post Malone' })
	    .expect(200);
    });

    test('GET /artist Baby Keem succeeds', () => {
        return request(app)
	    .get('/artist')
        .query({ temp: 'Baby Keem' })
	    .expect(200);
    });

    test('GET /artist The Weeknd succeeds', () => {
        return request(app)
	    .get('/artist')
        .query({ temp: 'The Weeknd' })
	    .expect(200);
    });

    test('GET one /artist returns JSON', () => {
        return request(app)
	    .get('/artist')
        .query({ temp: 'Tory Lanez' })
	    .expect('Content-type', /json/);
    });

    test('GET /artist returns 404 for invalid artist', () => {
        return request(app)
        .get('/artist')
        .query({ temp: 'invalid' })
        .expect(404);
    });

    test('GET /artists succeeds', () => {
        return request(app)
        .get('/artists')
        .expect(200);
    });

    test('GET /artists returns JSON', () => {
        return request(app)
        .get('/artists')
        .expect('Content-type', /json/);
    });

    test('GET /comments succeeds', () => {
        return request(app)
        .get('/comments')
        .expect(200);
    });

    test('GET /comments returns JSON', () => {
        return request(app)
        .get('/comments')
        .expect('Content-type', /json/);
    });

    test('GET /comments for a specific artist', () => {
        return request(app)
        .get('/comments')
        .query({ temp: 'Tory Lanez' })
        .expect(200);
    });

    test('GET /* for invalid path', () => {
        return request(app)
        .get('/randomurl')
        .expect(200);
    });

    test('POST /add-comments succeeds and returns JSON', () => {
        return request(app)
        .post('/add-comments')
        .send({ ArtistName: 'Tory Lanez', Comment: 'Love his songs' })
        .expect(200)
        .expect('Content-Type', /json/);
    });
    
    test('POST /add-artist succeeds and returns JSON', () => { 
        return request(app)
        .post('/add-artist')
        .send({ ArtistName: '21 Savage', Quote: 'Glock in my Lap', CoverImage: 'https://i.scdn.co/image/ab67616100005174a5e754a9c1fc7ad7ee01798b', SpotifyUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO152G0U?utm_source=generator', Card3A: 'Test Content', Card4: 'Test Content', Card1: 'Test Content', Card2: 'Test Content' })
        .expect(200)
        .expect('Content-Type', /json/);
    });

    test('POST /add-artist returns 400 when artist is already present in file', () => { 
        return request(app)
        .post('/add-artist')
        .send({ ArtistName: 'Tory Lanez', Quote: '', CoverImage: '', SpotifyUrl: '', Card3A: '', Card4: '', Card1: '', Card2: '' })
        .expect(400);
    });
});
