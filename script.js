// Les différentes catégories de chambres/suites de VOTRE hôtel
const rooms = [
    { 
        id: 1, 
        nom: "Chambre Double Standard", 
        capacite: 2, 
        prix: 95, 
        description: "Lit queen-size, vue sur cour intérieure, salle de bain privative, Wi-Fi gratuit.", 
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 2, 
        nom: "Chambre Deluxe Vue Mer", 
        capacite: 2, 
        prix: 150, 
        description: "Lit king-size, balcon panoramique face à la mer, minibar et machine à espresso.", 
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 3, 
        nom: "Suite Royale Familiale", 
        capacite: 4, 
        prix: 260, 
        description: "Espace de 65m², salon séparé, deux grands lits, idéale pour un séjour en famille.", 
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=500&q=80" 
    }
];

// Afficher les chambres sur la page
function afficherChambres(liste) {
    const container = document.getElementById('room-list');
    container.innerHTML = '';

    liste.forEach(room => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${room.image}" alt="${room.nom}">
            <div class="card-content">
                <h3>${room.nom}</h3>
                <p class="desc">${room.description}</p>
                <p class="price">${room.prix} € <span style="font-size:0.8rem; color:#666;">/ nuit</span></p>
                <button onclick="reserverChambre(${room.id})">Réserver cette chambre</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Bouton de vérification de disponibilité (filtre par capacité d'invités)
function filtrerChambres() {
    const guests = parseInt(document.getElementById('guests').value);
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;

    if (!checkin || !checkout) {
        alert("Veuillez sélectionner vos dates d'arrivée et de départ.");
        return;
    }

    if (checkin >= checkout) {
        alert("La date de départ doit être ultérieure à la date d'arrivée.");
        return;
    }

    // Filtrer les chambres qui peuvent accueillir le nombre de personnes
    const disponibles = rooms.filter(r => r.capacite >= guests);
    afficherChambres(disponibles);
    
    // Scroll fluide vers la liste
    document.getElementById('chambres').scrollIntoView({ behavior: 'smooth' });
}

// Processus de réservation
function reserverChambre(id) {
    const room = rooms.find(r => r.id === id);
    const checkin = document.getElementById('checkin').value || "Non spécifiée";
    const checkout = document.getElementById('checkout').value || "Non spécifiée";
    
    const confirmation = confirm(`Confirmer la réservation pour :\n- Chambre : ${room.nom}\n- Du : ${checkin} au ${checkout}\n- Tarif : ${room.prix} €/nuit\n\nCliquez sur OK pour valider.`);
    
    if (confirmation) {
        alert("🎉 Merci ! Votre réservation est enregistrée. Un e-mail de confirmation vient de vous être simulé.");
    }
}

// Chargement initial de toutes les chambres
window.onload = () => {
    afficherChambres(rooms);
};
