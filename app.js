let nomJoueurBleu = null
let nomJoueurRouge = null
let numeroTour = 1
let gagnant = null
let cases = [null, null, null, null, null, null, null, null, null]
let scoreJoueurBleu = 0
let scoreJoueurRouge = 0

/**
 * CASES
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */

// Récupération des zones HTML.
const $boutonJouer = document.getElementById('jouer')
const $boutonRecommencer = document.getElementById('recommencer')
const $nomJoueurBleu = document.getElementById('nom-joueur-bleu')
const $nomJoueurRouge = document.getElementById('nom-joueur-rouge')
const $zoneSelectionJoueurs = document.getElementById('selection-joueurs')
const $zoneJeu = document.getElementById('jeu')
const $nomJoueur = document.getElementById('nom-joueur')
const $tourJoueur = document.getElementById('tour-joueur')
const $tableau = document.getElementById('tableau')
const $resultat = document.getElementById('resultat')
const $casesTableau = document.querySelectorAll('#tableau td')
const $page = document.querySelector('body')
const $nomScoreJoueurBleuJoueur = document.getElementById('nom-score-joueur-bleu')
const $valeurScoreJoueurBleuJoueur = document.getElementById('valeur-score-joueur-bleu')
const $nomScoreJoueurRougeJoueur = document.getElementById('nom-score-joueur-rouge')
const $valeurScoreJoueurRougeJoueur = document.getElementById('valeur-score-joueur-rouge')

$boutonRecommencer.hidden = true
$zoneJeu.hidden = true
$resultat.hidden = true
$valeurScoreJoueurBleuJoueur.hidden = true
$valeurScoreJoueurRougeJoueur.hidden = true

// Lorsqu'on clique sur le bouton JOUER.
$boutonJouer.onclick = () => {
    nomJoueurBleu = $nomJoueurBleu.value
    nomJoueurRouge = $nomJoueurRouge.value

    if (nomJoueurBleu.length < 3 || nomJoueurBleu.length < 3) {
        alert('Les noms sont invalides')

        nomJoueurBleu = null
        nomJoueurBleu = null
    } else {
        $nomScoreJoueurBleuJoueur.innerHTML = nomJoueurBleu
        $nomScoreJoueurRougeJoueur.innerHTML = nomJoueurRouge
        $valeurScoreJoueurBleuJoueur.hidden = false
        $valeurScoreJoueurRougeJoueur.hidden = false
        $zoneSelectionJoueurs.hidden = true
        $zoneJeu.hidden = false
        $nomJoueur.innerHTML = nomJoueurBleu
        $nomJoueur.className = 'bleu'
        $page.className = 'bleu'
    }
}

// Parcours toutes les cellules du tableau pour ajouter les évènements
$casesTableau.forEach(($caseTableau, index) => {
    // Lorsqu'on clique sur la cellule du tableau.
    $caseTableau.onclick = () => {
        selectionnerCase(index)
    }
})

const selectionnerCase = (index) => {
    if (cases[index] == null && gagnant == null) {
        const $caseTableau = $casesTableau[index]
        let nomImage
        if (numeroTour % 2 == 1) {
            nomImage = 'rond'
            cases[index] = 1
        } else {
            nomImage = 'croix'
            cases[index] = 2
        }
        $caseTableau.innerHTML = '<img src="images/' + nomImage + '.png">'

        gagnant = verifierVictoire()

        if (gagnant) {
            let nomGagnant
            let couleurGagnant
            if (gagnant == 1) {
                nomGagnant = nomJoueurBleu
                couleurGagnant = 'bleu'
                scoreJoueurBleu++
                $valeurScoreJoueurBleuJoueur.innerHTML = scoreJoueurBleu
            } else {
                nomGagnant = nomJoueurRouge
                couleurGagnant = 'rouge'
                scoreJoueurRouge++
                $valeurScoreJoueurRougeJoueur.innerHTML = scoreJoueurRouge
            }
            $resultat.innerHTML = 'Victoire de <span class="' + couleurGagnant + '">' + nomGagnant + '</span> !'
            $tourJoueur.hidden = true
            $resultat.hidden = false
            $boutonRecommencer.hidden = false
        } else {
            if (numeroTour == 9) {
                partieTerminee()
            } else {
                tourSuivant()
            }
        }
    }
}

const tourSuivant = () => {
    numeroTour++

    if (numeroTour % 2 == 1) {
        $nomJoueur.innerHTML = nomJoueurBleu
        $nomJoueur.className = 'bleu-fonce'
        $page.className = 'bleu'
    } else {
        $nomJoueur.innerHTML = nomJoueurRouge
        $nomJoueur.className = 'rouge-fonce'
        $page.className = 'rouge'
    }
}

// Lorsque la partie est terminée.
const partieTerminee = () => {
    $resultat.innerHTML = 'Match nul !'
    $page.className = ''
    $tourJoueur.hidden = true
    $resultat.hidden = false
    $boutonRecommencer.hidden = false
}

// Vérification si un joueur a gagné.
const verifierVictoire = () => {
    // Lignes.
    const victoireSurLigne = verifierCases(0, 1, 2) || verifierCases(3, 4, 5) || verifierCases(6, 7, 8)
    
    if (victoireSurLigne) {
        return victoireSurLigne
    } else {
        // Colones.
        const victoireSurColonne = verifierCases(0, 3, 6) || verifierCases(1, 4, 7) || verifierCases(2, 5, 8)
        
        if (victoireSurColonne) {
            return victoireSurColonne
        } else {
            // Diagonales.
            const victoireSurDiagonale = verifierCases(0, 4, 8) || verifierCases(2, 4, 6)

            if (victoireSurDiagonale) {
                return victoireSurDiagonale
            }
        }
    }

    return null
}

// Vérification si 3 cases ont le même signe.
const verifierCases = (a, b, c) => {
    const victoire = cases[a] != null && cases[a] == cases[b] && cases[a] == cases[c]

    if (victoire) {
        return cases[a]
    }
    return null
}

// Lorsqu'on clique sur le bouton RECOMMENCER.
$boutonRecommencer.onclick = () => {
    numeroTour = 1
    gagnant = null
    cases = [null, null, null, null, null, null, null, null, null]
    $resultat.innerHTML = ''
    $page.className = 'bleu'
    $tourJoueur.hidden = false
    $resultat.hidden = true
    $boutonRecommencer.hidden = true
    
    $casesTableau.forEach(($caseTableau) => {
        $caseTableau.innerHTML = ''
    })
}

window.onkeydown = (e) => {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e.key))) {
        const valeurs = {
            1: 6,
            2: 7,
            3: 8,
            4: 3,
            5: 4,
            6: 5,
            7: 0,
            8: 1,
            9: 2
        }
        const index = valeurs[e.key]
        
        selectionnerCase(index)
    }
}
