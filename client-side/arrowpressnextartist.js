let currentArtist = 0;
let artists = []; 

const RightArrow = document.getElementById('right-footer-arrow');
const LeftArrow = document.getElementById('left-footer-arrow');

RightArrow.addEventListener('click', async function (event) {
    try {
        const response = await fetch('http://127.0.0.1:8080/artists'); 
        if (!response.ok) {
            throw new Error('Response Status is' + response.status);
        }
        artists = await response.json();

        currentArtist = currentArtist + 1;
        if (currentArtist >= artists.length) {
            currentArtist = 0;
        }

        actualArtist = artists[currentArtist].ArtistName;
        const response2 = await fetch(`http://127.0.0.1:8080/artist?temp=${actualArtist}`);
        const body = await response2.json(); 
        const { ArtistName, Quote, CoverImage, SpotifyUrl, Card3A, Card4, Card1, Card2 } = body;
        document.getElementById('Card1-front').querySelector('h1').innerHTML = `Who is ${ArtistName}?`;
        document.getElementById('Card1-back').innerHTML = '<p class="scrollbar">' + Card1 + '</p>';
        document.getElementById('Card2-back').innerHTML = '<p class="scrollbar">' + Card2 + '</p>';
        document.getElementById('Card1-back').style.padding = '10px';
        document.getElementById('Card2-back').style.padding = '10px';
        document.getElementById('Card3-back').querySelector('ul').innerHTML = makeList(Card3A);
        document.getElementById('Card4-back').querySelector('ul').innerHTML = makeList(Card4);
        document.getElementById('ArtistNameHeader').innerHTML = ArtistName;
        document.getElementById('artistImage').src = CoverImage;
        document.getElementById('Quote').innerHTML = Quote;
        document.getElementById('SpotifyPlaylist').src = SpotifyUrl;
        makeComment(ArtistName);

    } catch (error) {
        alert(error);
    }
});

LeftArrow.addEventListener('click', async function (event) {
    try {
        const response = await fetch('http://127.0.0.1:8080/artists'); 
        if (!response.ok) {
            throw new Error('Response Status is' + response.status);
        }
        artists = await response.json();

        if (currentArtist == 0) {
            currentArtist = artists.length - 1;
        } else {
            currentArtist = currentArtist - 1;
        }

        actualArtist = artists[currentArtist].ArtistName;
        let response2 = await fetch(`http://127.0.0.1:8080/artist?temp=${actualArtist}`);
        let body = await response2.json(); 
        const { ArtistName, Quote, CoverImage, SpotifyUrl, Card3A, Card4, Card1, Card2 } = body;
        document.getElementById('Card1-front').querySelector('h1').innerHTML = `Who is ${ArtistName}?`;
        document.getElementById('Card1-back').innerHTML = '<p class="scrollbar">' + Card1 + '</p>';
        document.getElementById('Card2-back').innerHTML = '<p class="scrollbar">' + Card2 + '</p>';
        document.getElementById('Card1-back').style.padding = '10px';
        document.getElementById('Card2-back').style.padding = '10px';
        document.getElementById('Card3-back').querySelector('ul').innerHTML = makeList(Card3A);
        document.getElementById('Card4-back').querySelector('ul').innerHTML = makeList(Card4);
        document.getElementById('ArtistNameHeader').innerHTML = ArtistName;
        document.getElementById('artistImage').src = CoverImage;
        document.getElementById('Quote').innerHTML = Quote;
        document.getElementById('SpotifyPlaylist').src = SpotifyUrl;
        makeComment(ArtistName);

    } catch (error) {
        alert(error);
    }
});

async function makeComment (artistName) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/comments?artist=${artistName}`);
        const comments = await response.json();

        let commentcontent = '';
        
        comments.forEach(comment => {
            commentcontent += `<p>${comment}</p>`;
        });
        document.getElementById('commentbox').innerHTML = commentcontent;
        document.getElementById('commentbox').style.padding = '10px';

    } catch (error) {
        alert(error);
    }
};

function makeList (givenlist) {
    let listcontent = '';
    for (let album of givenlist) {
        listcontent += `<li>${album}</li>`;
    }
    return listcontent;
}
