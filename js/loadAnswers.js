const questions = [
  {
    question: "Quel mot est synonyme de 'joyeux'?",
    answers: [
      { text: "Triste", correct: false },
      { text: "Heureux", correct: true },
      { text: "Mécontent", correct: false },
      { text: "Sombre", correct: false },
      { text: "Colérique", correct: false },
      { text: "Déçu", correct: false },
      { text: "Désespéré", correct: false },
      { text: "Ennuyeux", correct: false },
      { text: "Affamé", correct: false },
      { text: "Pauvre", correct: false },
      { text: "Fatigué", correct: false },
      { text: "Perdu", correct: false }
    ]
  },
  {
    question: "Quel mot est l'antonyme de 'facile'?",
    answers: [
      { text: "Difficile", correct: true },
      { text: "Simple", correct: false },
      { text: "Rapide", correct: false },
      { text: "Sérieux", correct: false },
      { text: "Amusant", correct: false },
      { text: "Court", correct: false },
      { text: "Intéressant", correct: false },
      { text: "Sombre", correct: false },
      { text: "Profond", correct: false },
      { text: "Durable", correct: false },
      { text: "Étonnant", correct: false },
      { text: "Énergique", correct: false }
    ]
  },
  {
    question: "Quel est le féminin de 'acteur'?",
    answers: [
      { text: "Acteur", correct: false },
      { text: "Actrice", correct: true },
      { text: "Auteur", correct: false },
      { text: "Auteure", correct: false },
      { text: "Acture", correct: false },
      { text: "Comédienne", correct: false },
      { text: "Directrice", correct: false },
      { text: "Enseignante", correct: false },
      { text: "Chanteuse", correct: false },
      { text: "Joueuse", correct: false },
      { text: "Danseuse", correct: false },
      { text: "Animatrice", correct: false }
    ]
  },
  {
    question: "Quel mot complète correctement cette phrase : 'Je vais ____ Paris demain.'?",
    answers: [
      { text: "en", correct: true },
      { text: "à", correct: false },
      { text: "dans", correct: false },
      { text: "sur", correct: false },
      { text: "chez", correct: false },
      { text: "par", correct: false },
      { text: "sous", correct: false },
      { text: "entre", correct: false },
      { text: "vers", correct: false },
      { text: "avec", correct: false },
      { text: "de", correct: false },
      { text: "contre", correct: false }
    ]
  },
  {
    question: "Quel pronom remplace 'les enfants' dans la phrase 'Je vois les enfants'?",
    answers: [
      { text: "Le", correct: false },
      { text: "Les", correct: true },
      { text: "La", correct: false },
      { text: "L'", correct: false },
      { text: "En", correct: false },
      { text: "Y", correct: false },
      { text: "On", correct: false },
      { text: "Vous", correct: false },
      { text: "Nous", correct: false },
      { text: "Il", correct: false },
      { text: "Elle", correct: false },
      { text: "Ceux", correct: false }
    ]
  },
  {
    question: "Comment dit-on 'I am going to eat' en français?",
    answers: [
      { text: "Je vais manger", correct: true },
      { text: "Je vais mangé", correct: false },
      { text: "J'ai mangé", correct: false },
      { text: "Je suis mangé", correct: false },
      { text: "Je mange", correct: false },
      { text: "Je mangerai", correct: false },
      { text: "Je mangeais", correct: false },
      { text: "Je vais mangée", correct: false },
      { text: "Je serai mangé", correct: false },
      { text: "J'allais manger", correct: false },
      { text: "J'aurais mangé", correct: false },
      { text: "Je vais mangés", correct: false }
    ]
  },
  {
    question: "Quel mot est un adverbe?",
    answers: [
      { text: "Rapidement", correct: true },
      { text: "Vite", correct: false },
      { text: "Belle", correct: false },
      { text: "Intéressant", correct: false },
      { text: "Long", correct: false },
      { text: "Heureux", correct: false },
      { text: "Petit", correct: false },
      { text: "Lentement", correct: false },
      { text: "Rouge", correct: false },
      { text: "Grand", correct: false },
      { text: "Bien", correct: false },
      { text: "Fort", correct: false }
    ]
  },
  {
    question: "Quel est le participe passé de 'prendre'?",
    answers: [
      { text: "Pris", correct: true },
      { text: "Prené", correct: false },
      { text: "Prendé", correct: false },
      { text: "Prendit", correct: false },
      { text: "Prendre", correct: false },
      { text: "Prisant", correct: false },
      { text: "Prisait", correct: false },
      { text: "Prenant", correct: false },
      { text: "Prendrait", correct: false },
      { text: "Prendrait", correct: false },
      { text: "Prende", correct: false },
      { text: "Prind", correct: false }
    ]
  },
  {
    question: "Comment appelle-t-on une personne qui vend des produits dans un magasin?",
    answers: [
      { text: "Vendeur", correct: true },
      { text: "Acheteur", correct: false },
      { text: "Cuisinier", correct: false },
      { text: "Chauffeur", correct: false },
      { text: "Artisan", correct: false },
      { text: "Professeur", correct: false },
      { text: "Avocat", correct: false },
      { text: "Boulanger", correct: false },
      { text: "Dentiste", correct: false },
      { text: "Pilote", correct: false },
      { text: "Auteur", correct: false },
      { text: "Scientifique", correct: false }
    ]
  },
  {
    question: "Quel mot est un adjectif?",
    answers: [
      { text: "Beau", correct: true },
      { text: "Vite", correct: false },
      { text: "Rapidement", correct: false },
      { text: "Sagement", correct: false },
      { text: "Tranquille", correct: false },
      { text: "Vivement", correct: false },
      { text: "Avec", correct: false },
      { text: "Plus", correct: false },
      { text: "Malgré", correct: false },
      { text: "Tout", correct: false },
      { text: "Hier", correct: false },
      { text: "Bon", correct: false }
    ]
  },
  {
    question: "Quel mot est le contraire de 'haut'?",
    answers: [
      { text: "Bas", correct: true },
      { text: "Large", correct: false },
      { text: "Petit", correct: false },
      { text: "Épais", correct: false },
      { text: "Court", correct: false },
      { text: "Fin", correct: false },
      { text: "Long", correct: false },
      { text: "Grand", correct: false },
      { text: "Étroit", correct: false },
      { text: "Profond", correct: false },
      { text: "Largeur", correct: false },
      { text: "Brillant", correct: false }
    ]
  }

];



