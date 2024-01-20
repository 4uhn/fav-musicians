const cards = document.querySelectorAll('.flip-card');
const RightArrow = document.getElementById('right-footer-arrow');
const LeftArrow = document.getElementById('left-footer-arrow');
const form = document.getElementById('searchform');

function makeList (givenlist) {
    let listcontent = '';
    for (let album of givenlist) {
        listcontent += `<li>${album}</li>`;
    }
    return listcontent;
}

// Comment Getter Function
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
        document.getElementById('commentbox').style.overflow = 'auto';

    } catch (error) {
        alert(error);
    }
};

// Checks whether or not the server is running and alerts when it is down 
async function checkServerStatus () {
    try {
        const response = await fetch('http://127.0.0.1:8080/');

        if (!response.ok) {
            alert('The server is disconnected. Please refresh the page or restart the server.');
        }
    } catch (error) {
        alert('The server is disconnected. Please refresh the page or restart the server');
    }
}
// Checks the server status every second
setInterval(checkServerStatus, 1000);

async function UpdateUIWithArtistInfo (artistName) {
    try {
        let response = await fetch(`http://127.0.0.1:8080/artist?temp=${artistName}`);
        let body = await response.json(); 
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
};

window.addEventListener('load', async () => {
    try {
        const response = await fetch('http://127.0.0.1:8080/artists'); 
        if (!response.ok) {
            throw new Error('Response Status is' + response.status);
        }
        const artists = await response.json();
        makeComment('Tory Lanez');

        for (let artist of artists) {
            const newartistDiv = document.createElement('div');
            newartistDiv.classList.add('artist');

            const newartistButton = document.createElement('button');
            newartistButton.classList.add('Artist-Button');
            newartistButton.id = artist.ArtistName;

            const newartistImage = document.createElement('img');
            newartistImage.src = artist.CoverImage;
            newartistImage.alt = artist.ArtistName;

            const newartistheading = document.createElement('h1');
            newartistheading.innerText = artist.ArtistName;

            newartistButton.appendChild(newartistImage);
            newartistDiv.appendChild(newartistButton);
            newartistDiv.appendChild(newartistheading);

            const artistSec = document.getElementById('artistsSec');
            artistSec.appendChild(newartistDiv);

            newartistButton.addEventListener('click', async function (event) {
                event.preventDefault();
                const artistName = this.getAttribute('id');
                UpdateUIWithArtistInfo(artistName);
            });
        }

    } catch (error) {
        alert(error);
    }
});

// Home Button Event Listener
document.querySelector('.navbar-brand').addEventListener('click', async function (event) {
    event.preventDefault();
    UpdateUIWithArtistInfo('Tory Lanez');
});

// Card flips when clicked
cards.forEach((card) => {
    card.addEventListener('click', () => {
	card.classList.toggle('flipped');
	});
});

let currentArtist = 0;
let artists = []; 

// When arrows are pressed on low width displays to move to next artists 
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

// Search Bar Event Listener
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        let artistName = document.getElementById('artisttofind').value;
        let response = await fetch(`http://127.0.0.1:8080/artist?temp=${artistName}`);

        if (!response.ok) {
            throw new Error('Artist not found');
        }

        let body = await response.json();
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
