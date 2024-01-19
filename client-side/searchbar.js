function makeList (givenlist) {
    let listcontent = '';
    for (let album of givenlist) {
        listcontent += `<li>${album}</li>`;
    }
    return listcontent;
}

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

const form = document.getElementById('searchform');

// Search Bar Event Listener
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        let artist = document.getElementById('artisttofind').value;
        let response = await fetch(`http://127.0.0.1:8080/artist?temp=${artist}`);
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
