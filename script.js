// Base de données simulée des hôtels
const hotels = [
    { id: 1, nom: "Hôtel Le Lagon Bleu", ville: "Paris", prix: 120, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=500&q=80" },
    { id: 2, nom: "Villa Sunshine", ville: "Nice", prix: 200, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" },
    { id: 3, nom: "Résidence Alpine", ville: "Chamonix", prix: 150, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=80" },
    { id: 4, nom: "Grand Palace", ville: "Paris", prix: 350, image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=500&q=80" }
];

// Fonction pour afficher les hôtels
function afficherHotels(liste) {
    const container = document.getElementById('hotel-list');
    container.innerHTML = '';

    if (liste.length === 0) {
        container.innerHTML = '<p>Aucun hébergement trouvé pour cette recherche.</p>';
        return;
    }

    liste.forEach(hotel => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.nom}">
            <div class="card-content">
                <h3>${hotel.nom}</h3>
                <p class="city">📍 ${hotel.ville}</p>
                <p class="price">${hotel.prix} € / nuit</p>
                <button onclick="reserver(${hotel.id})">Réserver</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Fonction de recherche interactive
function rechercherHotels() {
    const query = document.getElementById('destination').value.toLowerCase().trim();
    if (!query) {
        afficherHotels(hotels);
        return;
    }
    const resultat = hotels.filter(h => h.ville.toLowerCase().includes(query) || h.nom.toLowerCase().includes(query));
    afficherHotels(resultat);
}

// Fonction de simulation de réservation
function reserver(id) {
    const hotel = hotels.find(h => h.id === id);
    alert(`Félicitations ! Votre demande de réservation pour l'établissement "${hotel.nom}" a bien été enregistrée.`);
}

// Affichage initial au chargement de la page
window.onload = () => {
    afficherHotels(hotels);
};
