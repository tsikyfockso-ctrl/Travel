// Données des chambres de l'hôtel
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

// Fonction pour injecter les chambres dans la modale unique
function afficherChambresDansModal(liste, sousTitreTexte) {
    const container = document.getElementById('room-list');
    const subtitle = document.getElementById('modal-subtitle');
    container.innerHTML = '';
    subtitle.textContent = sousTitreTexte;

    if (liste.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#d9534f;">Aucune chambre ne correspond à vos critères de nombre d\'invités.</p>';
        return;
    }

    liste.forEach(room => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${room.image}" alt="${room.nom}">
            <div class="card-content">
                <h3>${room.nom}</h3>
                <p class="desc">${room.description}</p>
                <p class="price">${room.prix} € <span style="font-size:0.8rem; color:#666;">/ nuit</span></p>
                <button onclick="reserverChambre(${room.id})">Sélectionner</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Ouvrir la modale avec toutes les chambres par défaut
function ouvrirModal() {
    afficherChambresDansModal(rooms, "Voici l'ensemble de nos hébergements disponibles.");
    document.getElementById('modal-chambres').style.display = 'flex';
}

// Fermer la modale
function fermerModal() {
    document.getElementById('modal-chambres').style.display = 'none';
}

// Vérifier les dates/voyageurs saisis sur la page d'accueil et ouvrir la modale filtrée
function verifierEtOuvrirChambres() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = parseInt(document.getElementById('guests').value);

    if (!checkin || !checkout) {
        alert("Veuillez sélectionner vos dates d'arrivée et de départ.");
        return;
    }

    if (checkin >= checkout) {
        alert("La date de départ doit être ultérieure à la date d'arrivée.");
        return;
    }

    // Filtrer selon la capacité d'accueil
    const disponibles = rooms.filter(r => r.capacite >= guests);
    
    // Ouvrir la modale unique avec les résultats filtrés
    afficherChambresDansModal(disponibles, `Séjour du ${checkin} au ${checkout} pour ${guests} voyageur(s)`);
    document.getElementById('modal-chambres').style.display = 'flex';
}

// Simulation de réservation d'une chambre spécifique depuis la modale
function reserverChambre(id) {
    const room = rooms.find(r => r.id === id);
    const checkin = document.getElementById('checkin').value || "Dates libres";
    const checkout = document.getElementById('checkout').value || "Dates libres";
    
    const confirmation = confirm(`Confirmer la réservation :\n\n- Type : ${room.nom}\n- Période : ${checkin} au ${checkout}\n- Tarif : ${room.prix} € / nuit\n\nCliquez sur OK pour valider.`);
    
    if (confirmation) {
        alert("🎉 Félicitations ! Votre réservation dans notre hôtel a bien été enregistrée.");
        fermerModal();
    }
}
