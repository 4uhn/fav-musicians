const artistsSection = document.getElementById('artistsSec');
const toggleButton = document.getElementById('toggleUPDOWN');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
	artistsSection.classList.toggle('artist-hidden');
	toggleButton.classList.toggle('arrow-change');
	adjustMainSectionHeight();
});

function adjustMainSectionHeight () {
	const navbarHeight = document.querySelector('nav').offsetHeight;
	const artistHeight = artistsSection.offsetHeight;
	const windowHeight = window.innerHeight;
	
	let availableHeight = windowHeight - navbarHeight;
  
	if (!artistsSection.classList.contains('artist-hidden')) {
	  availableHeight -= artistHeight;
	}
  
	content.style.height = `${availableHeight}px`;
  }
  
window.addEventListener('load', adjustMainSectionHeight);
window.addEventListener('resize', adjustMainSectionHeight);
