        // Configuration du jeu
        const listeMots = ["Cachalot", "Pétunia", "Serviette", "Ordinateur", "Clavier", "Développeur", "JavaScript", "Programmation", "Internet", "Application"];
        const listePhrases = [
            "Pas de panique !",
            "La vie, l'univers et le reste",
            "Merci pour le poisson",
            "Apprendre à coder est amusant",
            "La pratique rend parfait"
        ];

        // Variables du jeu
        let listeActive = listeMots;
        let indexActuel = 0;
        let score = 0;
        let jeuEnCours = false;

        // Récupération des éléments
        const inputEcriture = document.getElementById("inputEcriture");
        const btnValiderMot = document.getElementById("btnValiderMot");
        const zoneProposition = document.getElementById("zoneProposition");
        const spanScore = document.getElementById("score");
        const spanTotal = document.getElementById("total");
        const progressDiv = document.getElementById("progress");
        const feedbackDiv = document.getElementById("feedback");
        const listeBtnRadio = document.querySelectorAll(".optionSource input");

        // Fonction pour afficher la proposition actuelle
        function afficherProposition() {
            if (indexActuel < listeActive.length) {
                zoneProposition.textContent = listeActive[indexActuel];
                inputEcriture.value = "";
                inputEcriture.focus();
            } else {
                terminerJeu();
            }
        }

        // Fonction pour valider la saisie
        function validerMot() {
            if (!jeuEnCours) {
                // Démarrer le jeu
                commencerJeu();
                return;
            }

            const motSaisi = inputEcriture.value.trim();
            const motAttendu = listeActive[indexActuel];

            // Retirer les animations précédentes
            zoneProposition.classList.remove("correct", "incorrect");
            feedbackDiv.classList.remove("show", "correct", "incorrect");

            if (motSaisi === motAttendu) {
                score++;
                spanScore.textContent = score;
                
                // Animation et feedback positif
                setTimeout(() => {
                    zoneProposition.classList.add("correct");
                    feedbackDiv.textContent = "✓ Excellent !";
                    feedbackDiv.classList.add("show", "correct");
                }, 10);
            } else {
                // Animation et feedback négatif
                setTimeout(() => {
                    zoneProposition.classList.add("incorrect");
                    feedbackDiv.textContent = "✗ Essayez encore !";
                    feedbackDiv.classList.add("show", "incorrect");
                }, 10);
            }

            // Masquer le feedback après 1 seconde
            setTimeout(() => {
                feedbackDiv.classList.remove("show");
            }, 1000);

            indexActuel++;
            updateProgress();

            setTimeout(() => {
                afficherProposition();
            }, 500);
        }

        // Fonction pour mettre à jour la progression
        function updateProgress() {
            const pourcentage = Math.round((indexActuel / listeActive.length) * 100);
            progressDiv.textContent = `Progression : ${pourcentage}%`;
        }

        // Fonction pour commencer le jeu
        function commencerJeu() {
            jeuEnCours = true;
            indexActuel = 0;
            score = 0;
            
            spanScore.textContent = score;
            spanTotal.textContent = listeActive.length;
            
            inputEcriture.disabled = false;
            btnValiderMot.textContent = "Valider";
            
            // Désactiver les boutons radio pendant le jeu
            listeBtnRadio.forEach(radio => radio.disabled = true);
            
            feedbackDiv.classList.remove("show");
            updateProgress();
            afficherProposition();
        }

        // Fonction pour terminer le jeu
        function terminerJeu() {
            jeuEnCours = false;
            inputEcriture.disabled = true;
            
            const pourcentageReussite = Math.round((score / listeActive.length) * 100);
            
            let message = "";
            if (pourcentageReussite === 100) {
                message = "🎉 Parfait ! Score maximum !";
            } else if (pourcentageReussite >= 80) {
                message = "🌟 Excellent travail !";
            } else if (pourcentageReussite >= 60) {
                message = "👍 Bien joué !";
            } else {
                message = "💪 Continuez à vous entraîner !";
            }
            
            zoneProposition.textContent = message;
            
            btnValiderMot.textContent = "Recommencer";
            
            // Réactiver les boutons radio
            listeBtnRadio.forEach(radio => radio.disabled = false);
            
            feedbackDiv.textContent = `Vous avez obtenu ${score} sur ${listeActive.length} (${pourcentageReussite}%)`;
            feedbackDiv.classList.add("show", score === listeActive.length ? "correct" : "incorrect");
        }

        // Gestion du changement de liste (mots/phrases)
        listeBtnRadio.forEach(radio => {
            radio.addEventListener("change", (e) => {
                if (e.target.value === "mots") {
                    listeActive = listeMots;
                } else {
                    listeActive = listePhrases;
                }
                
                if (!jeuEnCours) {
                    zoneProposition.textContent = "Cliquez sur 'Commencer' pour débuter !";
                }
            });
        });

        // Événement sur le bouton
        btnValiderMot.addEventListener("click", validerMot);

        // Validation avec la touche Entrée
        inputEcriture.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                validerMot();
            }
        });

        // Initialisation
        spanTotal.textContent = listeActive.length;