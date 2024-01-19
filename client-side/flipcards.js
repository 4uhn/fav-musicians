const cards = document.querySelectorAll('.flip-card');

// Card flips when clicked
cards.forEach((card) => {
    card.addEventListener('click', () => {
	card.classList.toggle('flipped');
	});
});
