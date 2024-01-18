const buttonclicked = document.getElementById('addArtist');
const item1 = document.getElementById('item1-default');
const item2 = document.getElementById('item2-default');
const item3 = document.getElementById('item3-default');
const item6 = document.getElementById('item6-default');
const artist = document.getElementsByClassName('artist');
const artistsSec = document.getElementById('artistsSec');
const toggleUPDOWNButton = document.getElementById('toggleUPDOWN');
const arrowfooter = document.getElementById('arrowfooter');

buttonclicked.addEventListener('click', () => {
    if (!artistsSec.classList.contains('artist-hidden')) {
        toggleUPDOWNButton.click();
    }
    const formcontainer = document.getElementById('form-container');
    const formcontainer2 = document.getElementById('form-container2');
    formcontainer2.classList.toggle('block');
    formcontainer.classList.toggle('block');
    item1.classList.toggle('hidden');
    item2.classList.toggle('hidden');
    item3.classList.toggle('hidden');
    item6.classList.toggle('hidden');
    arrowfooter.classList.toggle('hidden');
    toggleUPDOWNButton.classList.toggle('hidden');

    for (let i = 0; i < artist.length; i++) {
        artist[i].classList.toggle('hidden');
    }
});

const formbutton = document.getElementById('form-button');
const homebutton = document.getElementById('Home-Button');

formbutton.addEventListener('click', () => {
    const formcontainer = document.getElementById('form-container');
    const formcontainer2 = document.getElementById('form-container2');
    formcontainer.classList.toggle('block');
    formcontainer2.classList.toggle('block');
    item1.classList.toggle('hidden');
    item2.classList.toggle('hidden');
    item3.classList.toggle('hidden');
    item6.classList.toggle('hidden');
    arrowfooter.classList.toggle('hidden');
    toggleUPDOWNButton.classList.toggle('hidden');

    for (let i = 0; i < artist.length; i++) {
        artist[i].classList.remove('hidden');
    }
});

homebutton.addEventListener('click', () => {
    const formcontainer = document.getElementById('form-container');
    const formcontainer2 = document.getElementById('form-container2');
    if (!formcontainer.classList.contains('block')) {
        return;
    };
    formcontainer.classList.toggle('block');
    formcontainer2.classList.toggle('block');
    item1.classList.toggle('hidden');
    item2.classList.toggle('hidden');
    item3.classList.toggle('hidden');
    item6.classList.toggle('hidden');
    arrowfooter.classList.toggle('hidden');
    toggleUPDOWNButton.classList.toggle('hidden');
    
    for (let i = 0; i < artist.length; i++) {
        artist[i].classList.remove('hidden');
    }
});
