let language = "fr"; // Langue par défaut

const translations = {
    "fr": {
        "menuTitle": "Menu Principal",
        "playButton": "Jouer",
        "rulesButton": "Règles",
        "chooseTheme": "Choisissez un thème",
        "scoreText": "Score :"
    },
    "en": {
        "menuTitle": "Main Menu",
        "playButton": "Play",
        "rulesButton": "Rules",
        "chooseTheme": "Choose a theme",
        "scoreText": "Score:"
    }
};
function applyTranslations(lang) {
    document.getElementById("menuTitle").textContent = translations[lang].menuTitle;
    document.getElementById("playButton").textContent = translations[lang].playButton;
    document.getElementById("rulesButton").textContent = translations[lang].rulesButton;
}

function setLanguage(lang) {
    if (!translations[lang]) {
        console.error("❌ Langue non supportée :", lang);
        return;
    }

    console.log("✅ Changement de langue :", lang);
    language = lang;

    // ✅ Appliquer les traductions
    applyTranslations(lang);

    // ✅ Masquer l'écran de sélection de langue
    document.getElementById("languageScreen").style.display = "none";

    // ✅ Afficher le menu principal
    document.getElementById("menuScreen").style.display = "block";
}


let incorrectStreak = 0;

const socket = io("https://27c466ad-98e4-43e8-92c1-ff703bdbe010-00-il4r7ck1d6h2.janeway.replit.dev/"); // 🔥 Mets ton URL ici


const questionsByTheme = {
    history: [
        { question: "Qui a été le premier président de la France ?", choices: ["Napoléon", "De Gaulle", "Louis XIV", "Macron"], answer: "De Gaulle" },
        { question: "En quelle année la Révolution française a-t-elle eu lieu ?", choices: ["1492", "1789", "1815", "1914"], answer: "1789" },
        { question: "Qui a découvert l'Amérique ?", choices: ["Christophe Colomb", "Marco Polo", "Vasco de Gama", "Magellan"], answer: "Christophe Colomb" },
        { question: "Quel pharaon a construit la grande pyramide ?", choices: ["Toutankhamon", "Ramsès II", "Khéops", "Akhenaton"], answer: "Khéops" },
        { question: "En quelle année a commencé la Seconde Guerre mondiale ?", choices: ["1914", "1939", "1945", "1789"], answer: "1939" },
        { question: "Qui était Cléopâtre ?", choices: ["Une reine d'Égypte", "Une impératrice romaine", "Une philosophe grecque", "Une exploratrice"], answer: "Une reine d'Égypte" },
        { question: "Quel pays a déclenché la Première Guerre mondiale ?", choices: ["France", "Allemagne", "Autriche-Hongrie", "Russie"], answer: "Autriche-Hongrie" },
        { question: "Quel traité a mis fin à la Première Guerre mondiale ?", choices: ["Traité de Versailles", "Traité de Rome", "Traité de Tordesillas", "Traité de Maastricht"], answer: "Traité de Versailles" },
        { question: "Qui était le roi de France pendant la Révolution française ?", choices: ["Louis XIV", "Louis XV", "Louis XVI", "Louis XVII"], answer: "Louis XVI" },
        { question: "Quel mur est tombé en 1989 ?", choices: ["Mur de Berlin", "Mur de Chine", "Mur d'Hadrien", "Mur de Jérusalem"], answer: "Mur de Berlin" },
        { question: "Quel pays a construit la Grande Muraille ?", choices: ["Inde", "Japon", "Chine", "Corée"], answer: "Chine" },
        { question: "Quel empereur français a été exilé sur l'île d'Elbe ?", choices: ["Napoléon Bonaparte", "Louis XVI", "Charles X", "Henri IV"], answer: "Napoléon Bonaparte" },
        { question: "Quelle bataille a mis fin au règne de Napoléon ?", choices: ["Bataille de Leipzig", "Bataille de Marignan", "Bataille de Waterloo", "Bataille de Verdun"], answer: "Bataille de Waterloo" },
        { question: "Quel événement a marqué le début du Moyen Âge ?", choices: ["Chute de l'Empire romain", "Révolution industrielle", "Guerre de Cent Ans", "Découverte de l'Amérique"], answer: "Chute de l'Empire romain" },
        { question: "Qui était Jeanne d’Arc ?", choices: ["Une reine", "Une guerrière", "Une artiste", "Une déesse"], answer: "Une guerrière" },
        { question: "Quel roi de France a été surnommé le Roi Soleil ?", choices: ["Louis XIV", "Louis XV", "Louis XVI", "François Ier"], answer: "Louis XIV" },
        { question: "En quelle année a eu lieu le débarquement de Normandie ?", choices: ["1939", "1942", "1944", "1945"], answer: "1944" },
        { question: "Qui a été le premier homme à marcher sur la Lune ?", choices: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarine", "John Glenn"], answer: "Neil Armstrong" },
        { question: "Qui a écrit 'Le Prince' ?", choices: ["Machiavel", "Platon", "Aristote", "Rousseau"], answer: "Machiavel" },
        { question: "Quel empereur romain a adopté le christianisme ?", choices: ["Néron", "Constantin", "Jules César", "Augustus"], answer: "Constantin" },
        { question: "Quelle ville a été détruite par l’éruption du Vésuve en 79 après J.-C. ?", choices: ["Rome", "Pompéi", "Athènes", "Carthage"], answer: "Pompéi" },
        { question: "Quel général a mené les Gaulois contre Rome ?", choices: ["Vercingétorix", "Jules César", "Attila", "Hannibal"], answer: "Vercingétorix" },
        { question: "Qui a inventé l’imprimerie ?", choices: ["Gutenberg", "Léonard de Vinci", "Newton", "Tesla"], answer: "Gutenberg" },
        { question: "Quelle guerre a duré 100 ans ?", choices: ["Guerre de 100 ans", "Guerre de 30 ans", "Guerre de Sécession", "Première Guerre mondiale"], answer: "Guerre de 100 ans" },
        { question: "Quel événement marque la fin du Moyen Âge ?", choices: ["Chute de Constantinople", "Révolution française", "Première Guerre mondiale", "Guerre de 30 ans"], answer: "Chute de Constantinople" },
        { question: "Quel pays a inventé la démocratie ?", choices: ["Rome", "Grèce", "France", "Égypte"], answer: "Grèce" },
        { question: "En quelle année est tombé l’Empire romain d’Occident ?", choices: ["476", "1492", "1789", "1066"], answer: "476" },
        { question: "Quel pays a envahi la France en mai 1940 ?", choices: ["Royaume-Uni", "Allemagne", "Italie", "Russie"], answer: "Allemagne" },
        { question: "Quel traité a mis fin à la guerre de Cent Ans ?", choices: ["Traité de Verdun", "Traité de Troyes", "Traité de Versailles", "Traité de Tordesillas"], answer: "Traité de Troyes" },
        { question: "Qui était le premier empereur de France ?", choices: ["Napoléon Ier", "Louis XIV", "Charlemagne", "Henri IV"], answer: "Napoléon Ier" },
        { question: "Quel pays a colonisé l’Inde ?", choices: ["Portugal", "France", "Royaume-Uni", "Espagne"], answer: "Royaume-Uni" },
        { question: "Qui a unifié l'Allemagne en 1871 ?", choices: ["Napoléon III", "Bismarck", "Hitler", "Frédéric II"], answer: "Bismarck" },
        { question: "Quelle est la plus vieille civilisation connue ?", choices: ["Égyptienne", "Sumérienne", "Romaine", "Grecque"], answer: "Sumérienne" },
        { question: "Quel pays a construit le Taj Mahal ?", choices: ["Pakistan", "Iran", "Inde", "Arabie Saoudite"], answer: "Inde" },
        { question: "Qui était Spartacus ?", choices: ["Un empereur", "Un esclave rebelle", "Un philosophe", "Un dieu"], answer: "Un esclave rebelle" },
        { question: "Qui a peint la Joconde ?", choices: ["Van Gogh", "Michel-Ange", "Léonard de Vinci", "Raphaël"], answer: "Léonard de Vinci" }
    ],

sports: [
    { question: "Combien de joueurs composent une équipe de football ?", choices: ["9", "10", "11", "12"], answer: "11" },
    { question: "Qui détient le record du 100m ?", choices: ["Usain Bolt", "Carl Lewis", "Jesse Owens", "Michael Johnson"], answer: "Usain Bolt" },
    { question: "Quel pays a remporté la Coupe du Monde 2018 ?", choices: ["Brésil", "France", "Allemagne", "Espagne"], answer: "France" },
    { question: "Combien de points vaut un panier à 3 points en basket ?", choices: ["1", "2", "3", "4"], answer: "3" },
    { question: "Quelle est la surface principale du tournoi de Roland-Garros ?", choices: ["Gazon", "Béton", "Terre battue", "Synthétique"], answer: "Terre battue" },
    { question: "Quel est le sport national du Japon ?", choices: ["Sumo", "Judo", "Karate", "Kendo"], answer: "Sumo" },
    { question: "Dans quel sport utilise-t-on un 'birdie' ?", choices: ["Badminton", "Golf", "Tennis", "Pétanque"], answer: "Golf" },
    { question: "Quelle est la distance d’un marathon ?", choices: ["32,195 km", "42,195 km", "52,195 km", "21,195 km"], answer: "42,195 km" },
    { question: "Quelle nation a gagné le plus de Coupes du Monde de football ?", choices: ["Allemagne", "Argentine", "Brésil", "Italie"], answer: "Brésil" },
    { question: "Combien de sets doit-on gagner pour remporter un match de tennis en Grand Chelem (Homme) ?", choices: ["2", "3", "4", "5"], answer: "3" },
    { question: "Quel joueur de football est surnommé 'La Pulga' ?", choices: ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Zlatan Ibrahimović"], answer: "Lionel Messi" },
    { question: "En quelle année a eu lieu la première Coupe du Monde de football ?", choices: ["1928", "1930", "1934", "1938"], answer: "1930" },
    { question: "Quelle équipe de NBA a remporté le plus de titres ?", choices: ["Chicago Bulls", "Los Angeles Lakers", "Boston Celtics", "Golden State Warriors"], answer: "Boston Celtics" },
    { question: "Quel pilote détient le plus de titres de champion du monde en Formule 1 ?", choices: ["Michael Schumacher", "Lewis Hamilton", "Ayrton Senna", "Sebastian Vettel"], answer: "Michael Schumacher" },
    { question: "Quel pays accueille les Jeux Olympiques de 2024 ?", choices: ["USA", "Japon", "France", "Allemagne"], answer: "France" },
    { question: "Quel joueur de tennis a remporté le plus de titres du Grand Chelem ?", choices: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"], answer: "Novak Djokovic" },
    { question: "Quelle est la longueur d'une piscine olympique ?", choices: ["25m", "50m", "100m", "75m"], answer: "50m" },
    { question: "Dans quel sport trouve-t-on un 'home run' ?", choices: ["Cricket", "Baseball", "Softball", "Rugby"], answer: "Baseball" },
    { question: "Combien de trous y a-t-il dans un parcours de golf standard ?", choices: ["9", "12", "15", "18"], answer: "18" },
    { question: "Dans quel pays le rugby est-il le plus populaire ?", choices: ["France", "Nouvelle-Zélande", "Argentine", "Afrique du Sud"], answer: "Nouvelle-Zélande" },
    { question: "Quel joueur de football a marqué plus de 800 buts en carrière ?", choices: ["Cristiano Ronaldo", "Pelé", "Diego Maradona", "Ronaldinho"], answer: "Cristiano Ronaldo" },
    { question: "Quelle discipline est connue sous le nom de 'la petite reine' ?", choices: ["Athlétisme", "Cyclisme", "Gymnastique", "Natation"], answer: "Cyclisme" },
    { question: "Quel est le sport de combat où l'on utilise uniquement les pieds et les poings ?", choices: ["Judo", "Karaté", "Boxe anglaise", "Taekwondo"], answer: "Boxe anglaise" },
    { question: "Quel est le record du monde du saut en hauteur ?", choices: ["2,34m", "2,45m", "2,50m", "2,30m"], answer: "2,45m" },
    { question: "Combien de manches un match de baseball peut-il avoir ?", choices: ["6", "7", "9", "10"], answer: "9" },
    { question: "Quel club de football est surnommé 'Les Reds' ?", choices: ["Manchester United", "Liverpool", "Arsenal", "Chelsea"], answer: "Liverpool" },
    { question: "Quel est le seul pays à avoir remporté trois Coupes du Monde consécutives en rugby ?", choices: ["Nouvelle-Zélande", "Afrique du Sud", "Australie", "Angleterre"], answer: "Nouvelle-Zélande" },
    { question: "Quel joueur de NBA est surnommé 'King' ?", choices: ["Kobe Bryant", "Michael Jordan", "LeBron James", "Shaquille O’Neal"], answer: "LeBron James" },
    { question: "Quelle équipe a remporté la Ligue des Champions 2022 ?", choices: ["Liverpool", "Manchester City", "Real Madrid", "Bayern Munich"], answer: "Real Madrid" },
    { question: "Dans quel pays a eu lieu la Coupe du Monde 2010 ?", choices: ["France", "Brésil", "Afrique du Sud", "Allemagne"], answer: "Afrique du Sud" },
    { question: "Quel est le sport national du Canada ?", choices: ["Hockey sur glace", "Lacrosse", "Basketball", "Football américain"], answer: "Hockey sur glace" },
    { question: "Quelle est la distance d’un sprint de 200m ?", choices: ["100m", "150m", "200m", "250m"], answer: "200m" },
    { question: "Quel club a été sacré champion de Premier League en 2016 contre toute attente ?", choices: ["Manchester United", "Liverpool", "Leicester City", "Chelsea"], answer: "Leicester City" },
    { question: "Quel est le surnom de l'équipe nationale brésilienne de football ?", choices: ["Les Bleus", "La Roja", "Les Canarinhos", "Les Azzurri"], answer: "Les Canarinhos" },
    { question: "Quel boxeur est surnommé 'Iron Mike' ?", choices: ["Evander Holyfield", "Mike Tyson", "Muhammad Ali", "Floyd Mayweather"], answer: "Mike Tyson" },
    { question: "Quel joueur de tennis est surnommé 'Rafa' ?", choices: ["Roger Federer", "Novak Djokovic", "Rafael Nadal", "Andy Murray"], answer: "Rafael Nadal" },
    { question: "Quelle équipe de Formule 1 porte le logo du taureau rouge ?", choices: ["Ferrari", "Red Bull", "Mercedes", "McLaren"], answer: "Red Bull" },
    { question: "Quelle est la durée d’un match de football ?", choices: ["90 minutes", "120 minutes", "80 minutes", "70 minutes"], answer: "90 minutes" }
  ],

math: [
    { question: "Combien font 7 x 8 ?", choices: ["54", "56", "64", "49"], answer: "56" },
    { question: "Quel est le résultat de 9² ?", choices: ["18", "81", "99", "72"], answer: "81" },
    { question: "Quelle est la racine carrée de 144 ?", choices: ["10", "12", "14", "16"], answer: "12" },
    { question: "Quel est le nombre premier suivant 7 ?", choices: ["8", "9", "11", "13"], answer: "11" },
    { question: "Combien font 1/2 + 1/4 ?", choices: ["1", "3/4", "1/2", "1/4"], answer: "3/4" },
    { question: "Quelle est la valeur de π (approximative) ?", choices: ["3.14", "3.41", "2.14", "3.21"], answer: "3.14" },
    { question: "Combien de côtés a un hexagone ?", choices: ["4", "5", "6", "7"], answer: "6" },
    { question: "Combien font 15 × 4 ?", choices: ["45", "50", "60", "70"], answer: "60" },
    { question: "Si x + 5 = 12, quelle est la valeur de x ?", choices: ["5", "6", "7", "8"], answer: "7" },
    { question: "Quel est le théorème qui relie les côtés d’un triangle rectangle ?", choices: ["Théorème de Thalès", "Théorème de Pythagore", "Théorème de Fermat", "Théorème d’Euclide"], answer: "Théorème de Pythagore" },
    { question: "Combien font 3³ ?", choices: ["6", "9", "27", "12"], answer: "27" },
    { question: "Quel est le pourcentage de 50 sur 200 ?", choices: ["10%", "20%", "25%", "30%"], answer: "25%" },
    { question: "Combien de faces a un cube ?", choices: ["4", "5", "6", "7"], answer: "6" },
    { question: "Combien font 2⁵ ?", choices: ["10", "16", "32", "64"], answer: "32" },
    { question: "Quel est l’angle d’un triangle équilatéral ?", choices: ["30°", "45°", "60°", "90°"], answer: "60°" },
    { question: "Quel est le plus grand nombre premier inférieur à 100 ?", choices: ["89", "97", "99", "91"], answer: "97" },
    { question: "Si un carré a un côté de 5 cm, quelle est son aire ?", choices: ["10 cm²", "20 cm²", "25 cm²", "30 cm²"], answer: "25 cm²" },
    { question: "Si un triangle a une base de 10 cm et une hauteur de 5 cm, quelle est son aire ?", choices: ["15 cm²", "20 cm²", "25 cm²", "30 cm²"], answer: "25 cm²" },
    { question: "Combien font 1000 ÷ 4 ?", choices: ["200", "250", "300", "400"], answer: "250" },
    { question: "Quel est le résultat de 2 + 2 × 2 ?", choices: ["4", "6", "8", "10"], answer: "6" },
    { question: "Quelle est la formule de l'aire d'un cercle ?", choices: ["π × r²", "2π × r", "π × d²", "π × r"], answer: "π × r²" },
    { question: "Quel est le nombre d'or (approximatif) ?", choices: ["1.414", "1.618", "3.141", "2.718"], answer: "1.618" },
    { question: "Quel est le résultat de 5! (5 factoriel) ?", choices: ["20", "60", "100", "120"], answer: "120" },
    { question: "Quel est le périmètre d'un carré de côté 6 cm ?", choices: ["18 cm", "24 cm", "30 cm", "36 cm"], answer: "24 cm" },
    { question: "Quel est le produit de 25 × 4 ?", choices: ["50", "75", "100", "125"], answer: "100" },
    { question: "Quelle est la somme des angles d'un triangle ?", choices: ["90°", "180°", "270°", "360°"], answer: "180°" },
    { question: "Combien de faces a un dodécaèdre ?", choices: ["6", "8", "10", "12"], answer: "12" },
    { question: "Combien de diagonales a un hexagone ?", choices: ["6", "9", "12", "15"], answer: "9" },
    { question: "Quel est le plus grand nombre entier inférieur à 3,14 ?", choices: ["2", "3", "4", "5"], answer: "3" },
    { question: "Quel est le résultat de 2⁴ ?", choices: ["4", "8", "16", "32"], answer: "16" },
    { question: "Quel est le carré de 13 ?", choices: ["121", "144", "169", "196"], answer: "169" },
    { question: "Quelle est la racine carrée de 81 ?", choices: ["7", "8", "9", "10"], answer: "9" },
    { question: "Si un rectangle a une largeur de 4 cm et une longueur de 10 cm, quelle est son aire ?", choices: ["14 cm²", "20 cm²", "40 cm²", "50 cm²"], answer: "40 cm²" },
    { question: "Quelle est la forme d’un cercle ?", choices: ["Carrée", "Ovale", "Sphérique", "Ronde"], answer: "Ronde" },
    { question: "Quel est le résultat de 7 × 9 ?", choices: ["54", "56", "63", "72"], answer: "63" },
    { question: "Combien de faces a un tétraèdre ?", choices: ["3", "4", "5", "6"], answer: "4" },
    { question: "Combien de secondes y a-t-il dans une heure ?", choices: ["60", "600", "3600", "86400"], answer: "3600" },
    { question: "Quel est le seul nombre premier pair ?", choices: ["1", "2", "3", "5"], answer: "2" },
    { question: "Si un train roule à 60 km/h, combien de kilomètres parcourt-il en 3 heures ?", choices: ["120 km", "150 km", "180 km", "200 km"], answer: "180 km" },
    { question: "Quelle est l'inverse de 1/3 ?", choices: ["1/3", "2/3", "3", "3/1"], answer: "3" },
    { question: "Quel est le volume d’un cube de 5 cm d’arête ?", choices: ["25 cm³", "50 cm³", "75 cm³", "125 cm³"], answer: "125 cm³" },
    { question: "Quel est le plus petit nombre premier ?", choices: ["0", "1", "2", "3"], answer: "2" },
    { question: "Quel est le chiffre des unités de 4⁵ ?", choices: ["2", "4", "6", "8"], answer: "4" },
 ]
};


function loadLanguageFile(lang) {
    const script = document.createElement("script");
    script.src = `languages/${lang}.js`;  // Charge le fichier de langue
    script.onload = () => {
        applyTranslations(translations);
    };
    script.onerror = () => console.error("❌ Erreur de chargement du fichier de langue :", lang);
    document.head.appendChild(script);
}

console.log("✅ setLanguage est bien définie :", typeof window.setLanguage !== "undefined");


function startGame() {
    console.log("▶️ Lancement du jeu...");

    if (!selectedTheme) {
        console.warn("⚠️ Aucun thème sélectionné, affichage de l'écran des thèmes.");
        document.getElementById("menuScreen").style.display = "none";
        document.getElementById("themeScreen").style.display = "block";
        return;
    }

    console.log(`🎮 Démarrage avec le thème : ${selectedTheme}`);
    selectTheme(selectedTheme);

    console.log(`🔎 Vérification : Thème sélectionné -> ${selectedTheme}`);

    let allQuestions = [];

    if (language === "en" && window.translationsEn) {
        allQuestions = window.translationsEn.questionsByTheme[selectedTheme] || [];
    } else {
        allQuestions = questionsByTheme[selectedTheme] || [];
    }

    if (!allQuestions || allQuestions.length < 1) {
        console.error(`❌ Erreur : Pas assez de questions pour le thème "${selectedTheme}".`);
        return;  // ✅ Maintenant, ce return est bien dans une fonction !
    }

    questions = shuffleArray([...allQuestions]).slice(0, 10);
    console.log("✅ Questions sélectionnées pour le quiz :", questions);

    document.getElementById("themeScreen").style.display = "none";
    document.querySelector(".container").style.display = "block";

    startQuiz();
}  // ✅ Maintenant, la fonction est bien fermée !


function selectTheme(theme) {
    selectedTheme = theme;
    console.log(`🔎 Thème sélectionné : ${theme}`);

    if (!questionsByTheme[theme] || questionsByTheme[theme].length === 0) {
        console.error(`❌ Erreur : Pas de questions disponibles pour le thème "${theme}"`);
        alert("⚠️ Ce thème n'a pas encore de questions !");
        return;
    }

    // Mélanger les questions et en prendre 10 maximum
    questions = shuffleArray([...questionsByTheme[theme]]).slice(0, 10);
    
    if (questions.length === 0) {
        console.error("❌ Problème : Aucun jeu de questions disponible après sélection.");
        alert("⚠️ Une erreur est survenue lors du chargement des questions.");
        return;
    }

    console.log("✅ Questions sélectionnées :", questions);

    document.getElementById("themeScreen").style.display = "none";
    document.querySelector(".container").style.display = "block";

    startQuiz();
}

function shuffleArray(array) {
    let shuffled = array.slice(); // Copie l'array pour éviter d'écraser l'original
console.log("🎯 Questions finales :", questions);
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    console.log("🔄 Après mélange :", shuffled);
    return shuffled;
}


// Fonction pour afficher les règles
function showRules() {
    alert(language === "fr" ? "Les règles du jeu sont simples : Répondez aux questions !" : "The rules of the game are simple: Answer the questions!");
}
const endGameMessages = [
    { minScore: 900, message: "👑 Incroyable ! T’es un maître du quiz !" },
    { minScore: 700, message: "🎓 Pas mal ! Tu pourrais presque animer ce jeu !" },
    { minScore: 500, message: "👍 Correct ! Mais y’a encore du boulot..." },
    { minScore: 300, message: "😅 Ça passe... de justesse !" },
    { minScore: 100, message: "😂 Bon, on va dire que tu pas t’es entraîné..." },
    { minScore: 0, message: "💀 Catastrophe... On t’inscrit à des cours de rattrapage ?" }
]

const timeoutMessages = [
    "⏳ Oups, trop tard ! T'es en train de dormir ou quoi ? 😴",
    "🚦 Plus lent que ma grand-mère en trottinette !",
    "📞 On t'appelle le philosophe du quiz ? Trop de réflexion, pas d'action !",
    "🐌 Même un escargot aurait eu le temps de répondre...",
    "💤 Besoin d'un café ? Ça devient critique là !",
    "🏆 Prix du joueur le plus indécis décerné à... TOI !",
    "🛑 Il faut cliquer un jour, hein... c'est pas un film interactif !",
    "🎭 Ah, la technique du silence... stratégie audacieuse !",
    "🤷 T'avais une chance sur 4... même le hasard fait mieux que toi !",
    "⌛ Ding dong ! Trop tard, on passe à autre chose... 🙃",
    "🕰️ Tu joues en mode replay là...",
    "📦 Le silence, ça cache une réflexion intense... ou pas !",
    "🛌 Pas le moment de faire une sieste !",
    "🐢 L’escargot te dépasse en vitesse de réponse !",
    "🤨 Tu réfléchis... ou t’as ragequit en silence ?",
    "🎬 C’est un quiz, pas un suspense de Spielberg !",
    "📡 Connexion perdue avec la réalité !",
    "🧘‍♂️ Trop zen, faut se réveiller !",
    "🎭 Trop tard, rideau !",
    "🎵 Musique d'attente activée..."
]

// Si le joueur enchaîne plusieurs non-réponses, on le troll encore plus !
const superTimeoutMessages = [
    "📉 Record battu : le joueur le plus passif du monde !",
    "💀 T’es en pause ou t’as ragequit sans nous prévenir ?",
    "🕰️ Tu joues en mode *slow motion* ou quoi ?",
    "📵 Problème de connexion ou d’intelligence ? 😂",
    "🔥 Quelqu’un a vu un joueur ici ? Ah non, c’était une illusion...",
    "🎤 On dirait que t’es parti chercher une encyclopédie avant de répondre...",
    "🛎️ Service express : 0 réponse en 0 secondes !",
    "🥶 T’es plus figé que la Reine des Neiges !",
    "📢 Attention, record de non-réponses en cours...",
    "🤡 Même un bot aléatoire aurait mieux joué que toi !"
]

const compliments = [
    "💡 T'es un génie !",
    "🎉 Bravo, t'as révisé avant de venir ?",
    "🧠 Ton cerveau est en feu !",
    "🔥 Tu vas trop vite, tu lis dans mes pensées ?",
    "💪 C'est trop facile pour toi, avoue !",
    "👑 Tu devrais animer ce quiz à ma place !",
    "🚀 On t'appelle le Buzz des quiz !",
    "🎯 Magnifique ! Encore un point pour toi !",
    "😂 Même moi je savais pas que c'était la bonne réponse !",
    "📚 T’as bouffé un dictionnaire ou quoi ?!",
    "🎓 Tu devrais donner des cours !",
    "⚡ Réflexes de ninja, bien joué !",
    "🎯 Encore un tir en plein dans le mille !",
    "🏆 Champion en puissance !",
    "🤓 T'es l'encyclopédie vivante de ce quiz !",
    "💪 Même Google ne fait pas mieux !",
    "🔥 Tu chauffes, bientôt le 100% !",
    "🔮 Tu as un sixième sens, c’est sûr !",
    "📈 Si ça continue, tu vas exploser les records !",
    "💥 BOOM ! Une bonne réponse de plus !",
    "🥇 Premier de la classe !",
    "🎭 Tu joues en mode expert là !",
    "🤯 Ton cerveau carbure à 200% !",
    "⚖️ C'était serré, mais tu as fait le bon choix !",
    "💎 Une réponse aussi brillante que toi !",
    "🕵️ Sherlock Holmes n'aurait pas fait mieux !",
    "🎶 Une mélodie de bonnes réponses !",
    "🔝 Encore un point, c'est trop facile pour toi !",
    "🏆 Qui peut te stopper à ce niveau ?",
    "📢 Applaudissements virtuels pour toi ! 👏"
]

const moqueries = [
    "❌ Ah bah non... Essaye encore, champion !",
    "🤡 T’étais pas obligé de répondre si vite... pour ça 😆.",
    "🐌 Tu vas plus vite que ta logique apparemment...",
    "😵 C’est une blague ? Rassure-moi...",
    "🤔 T’es sûr de toi ? Parce que moi... pas du tout !",
    "📉 Ça sent la descente aux enfers ce score...",
    "💀 RIP ton score, frère...",
    "😆 On va appeler ça de l'art abstrait du quiz.",
    "🔥 C'est pas grave, c'était une question piège... Ah non ?",
    "😬 Ok... faut vraiment qu’on révise ensemble après ça !",
    "🤯 Je suis choqué... dans le mauvais sens.",
    "🎭 C'était osé... mais non, toujours pas.",
    "📺 C'est une rediffusion d'erreur ou quoi ?",
    "🎲 T'as tenté le hasard et... t'as perdu !",
    "🦆 Une réponse au pif... et c'est raté !",
    "🚨 Mauvaise réponse détectée, appel aux secours !",
    "🛑 Stop, il faut lire la question !",
    "🤷‍♂️ Une chance sur quatre, et t’as perdu...",
    "🗿 J'ai rarement vu une erreur aussi belle !",
    "🧐 C'était pas loin... mais c'était pas ça !",
    "📡 Mauvaise réception du cerveau ?",
    "🔄 Tu veux tenter un replay sur celle-là ?",
    "🎃 Ça sent Halloween... parce que c’était effrayant !",
    "🌪️ Tourbillon de mauvaises réponses en cours...",
    "🎳 Strike... dans la colonne des erreurs !",
    "🏗️ Il faut reconstruire ton raisonnement, là...",
    "💭 Tu pensais à autre chose, non ?",
    "🚑 Urgence intellectuelle, on perd le patient !",
    "🎯 Tu visais bien... mais c’était à côté !",
    "📵 Connexion perdue avec la bonne réponse !"
]

// Si le joueur enchaîne plusieurs erreurs, on monte d’un cran !
const superMoqueries = [
    "🚨 Allô, la NASA ? On a un crash intellectuel ici ! 🚀💥",
    "🤖 Je crois que même un robot random ferait mieux...",
    "📺 Et voici le champion du monde du ZÉRO pointé !",
    "💩 Là, tu fais du speedrun de mauvaises réponses...",
    "🛑 Stop, stop, stop… tu veux un mode facile ou quoi ?",
    "🎭 Franchement, t’as du talent… mais pas pour ce jeu !",
    "🚑 Code rouge, appelez un prof, c’est urgent !",
    "💀 On vient d'inventer un nouveau niveau : le mode 'catastrophe'.",
    "🥶 Ton score est aussi bas que les températures en Antarctique !",
    "📢 Quelqu'un a dit *buzzer sans réfléchir* ?!",
    "📉 Il va falloir remonter la pente là...",
    "🚧 Ton score est en construction… enfin, en démolition.",
    "🌪️ Niveau tornade d’erreurs : catégorie 5 !",
    "🎭 T’es sûr que c’est un quiz et pas une sitcom ?",
    "💥 Une explosion de mauvaises réponses !",
    "🛏️ T’as pas oublié de te réveiller ce matin ?",
    "📅 Un jour, peut-être... mais pas aujourd’hui !",
    "🌵 Ton score est plus désertique que le Sahara.",
    "🎳 Encore un strike... dans la mauvaise colonne.",
    "🎻 Cette performance mérite un slow triste.",
    "🤕 On va mettre un casque, c'est dangereux là !",
    "📵 On dirait que t’as perdu la connexion avec ton cerveau.",
    "🛑 Alerte rouge, on frôle le ridicule !",
    "🎭 Nouvelle technique : répondre faux à tout prix !",
    "🚽 Bon... ton score part aux toilettes là...",
    "🕳️ Tu creuses, mais ce n'est pas un jeu de mineur !",
    "🤯 T’as trouvé un bug du jeu ? Ah non, c’est toi.",
    "🦖 Même un dinosaure aurait mieux répondu !",
    "📺 En direct du naufrage intellectuel...",
    "💀 Score fantôme... invisible à l'œil nu !"
];


let selectedTheme = ""; // Stocke le thème choisi
let questions = []; // Liste des questions sélectionnées

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("scoreValue");
const timerElement = document.getElementById("time");
const nextButton = document.getElementById("nextBtn");

function startQuiz() {
    if (!questions || questions.length === 0) {
        console.error("❌ Erreur critique : Aucun jeu de questions chargé !");
        alert("⚠️ Erreur de chargement des questions !");
        returnToMenu();
        return;
    }

    score = 0;
    currentQuestionIndex = 0;
    document.getElementById("scoreValue").textContent = score;

    showQuestion();
}


function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const questionData = questions[currentQuestionIndex];

    if (!questionData) {
        console.error("❌ Erreur : Question introuvable !");
        return;
    }

    console.log("📌 Affichage de la question :", questionData.question);
    
    document.getElementById("question").textContent = questionData.question;
    document.getElementById("choices").innerHTML = "";

    questionData.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        document.getElementById("choices").appendChild(button);
    });

    startTimer();
}



function checkAnswer(choice) {
    // Désactiver tous les boutons après un choix
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(button => button.disabled = true);

    let message = "";
    let correctAnswer = questions[currentQuestionIndex].answer; // ✅ Bonne réponse

    if (choice === correctAnswer) {
        score += 100; // ✅ Ajoute 100 points
        scoreElement.textContent = score;
        message = compliments[Math.floor(Math.random() * compliments.length)]; // Compliment aléatoire
    } else {
        incorrectStreak++; // Compte comme une mauvaise réponse
        message = incorrectStreak >= 3 
            ? superMoqueries[Math.floor(Math.random() * superMoqueries.length)] // 🔥 Moquerie plus forte
            : moqueries[Math.floor(Math.random() * moqueries.length)]; // 😂 Moquerie normale
    }

    // ✅ Appliquer les couleurs aux boutons
    buttons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "green"; // Bonne réponse en vert ✅
            button.style.color = "white";
        }
        if (button.textContent === choice && choice !== correctAnswer) {
            button.style.backgroundColor = "red"; // Mauvaise réponse en rouge ❌
            button.style.color = "white";
        }
    });

    questionElement.textContent = choice === correctAnswer 
        ? `✅ Bonne réponse ! ${message}` 
        : `❌ Mauvaise réponse ! ${message}`;

    // Arrêter le chronomètre
    clearInterval(timer);

    // Attendre 5 secondes avant la prochaine question
    setTimeout(() => {
        nextQuestion();
    }, 5000);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        incorrectStreak = 0; // ✅ Remet à zéro si une bonne réponse est donnée
        showQuestion();
    } else {
        // 🔥 Trouver le bon message selon le score du joueur
        let finalMessage = endGameMessages.find(m => score >= m.minScore).message;

        // 🎉 Afficher le message et le score final
        questionElement.textContent = `🎯 Quiz terminé ! Score final : ${score} points.\n${finalMessage}`;
        choicesElement.innerHTML = ""; // Supprimer les boutons de réponse
        document.getElementById("timer").style.display = "none";

        // ✅ Afficher le bouton "Retour au menu"
        document.getElementById("menuBtn").style.display = "block";
    }
}

function returnToMenu() {
    // Cacher le quiz
    document.querySelector(".container").style.display = "none";
    
    // Afficher le menu principal
    document.getElementById("menuScreen").style.display = "block";

    // Réinitialiser le quiz
    resetQuiz();
}
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = "0";
    document.getElementById("timer").style.display = "block";
    document.getElementById("menuBtn").style.display = "none";
}

function startTimer() {
    let timeLeft = 10; // Temps limite en secondes
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout(); // ✅ Appelle la fonction qui gère l'absence de réponse
        }
    }, 1000);
}

function handleTimeout() {
    incorrectStreak++; // Compte comme une mauvaise réponse
    let message = incorrectStreak >= 3 
        ? superTimeoutMessages[Math.floor(Math.random() * superTimeoutMessages.length)] // 🔥 Moquerie encore plus forte
        : timeoutMessages[Math.floor(Math.random() * timeoutMessages.length)]; // 😂 Moquerie normale

    questionElement.textContent = `⏳ Trop tard ! ${message}`;

    // Désactiver les boutons de réponse et mettre la bonne réponse en vert
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === questions[currentQuestionIndex].answer) {
            button.style.backgroundColor = "green"; // ✅ Bonne réponse en vert
            button.style.color = "white";
        }
    });

    // Attendre 5 secondes avant la prochaine question
    setTimeout(() => {
        nextQuestion();
    }, 5000);
}

// 🌍 Afficher le menu Multijoueur
function showMultiplayerMenu() {
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("multiplayerMenu").style.display = "block";
}

// 📜 Afficher les règles du jeu
function showRules() {
    alert("📜 Règles du jeu :\n- Répondez aux questions avant la fin du chrono !\n- Chaque bonne réponse vaut 100 points.\n- Essayez de battre votre record !");
}

// 🚪 Quitter la partie (retour au menu)
function quitGame() {
    let confirmQuit = confirm("🚪 Voulez-vous vraiment quitter la partie ?");
    if (confirmQuit) {
        returnToMenu();
    }
}

// 🔙 Retour au menu principal
function returnToMenu() {
    document.getElementById("menuScreen").style.display = "block";
    document.getElementById("multiplayerMenu").style.display = "none";
    document.getElementById("themeScreen").style.display = "none";
    document.querySelector(".container").style.display = "none";
}

let playerName = "";
let roomCode = "";
let playersInRoom = [];
let countdownTimer = null;

// 🔹 Demander le prénom avant d'accéder au multijoueur
function showMultiplayerMenu() {
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("nameScreen").style.display = "block";
}

function savePlayerName() {
    const nameInput = document.getElementById("playerNameInput").value.trim();
    if (nameInput === "") {
        alert("❌ Veuillez entrer un prénom !");
        return;
    }
    playerName = nameInput;
    document.getElementById("nameScreen").style.display = "none";
    document.getElementById("multiplayerMenu").style.display = "block";
}

// 🔹 Création d'une salle
function createRoom() {
    roomCode = generateRoomCode();
    socket.emit("createRoom", { roomCode, playerName });

    document.getElementById("multiplayerMenu").style.display = "none";
    document.getElementById("roomScreen").style.display = "block";
    document.getElementById("roomCodeDisplay").innerText = roomCode;
}

// 🔹 Rejoindre une salle existante
function joinRoom() {
    const inputCode = document.getElementById("roomCodeInput").value.trim();
    if (!inputCode) {
        alert("❌ Veuillez entrer un code de salle valide !");
        return;
    }
    roomCode = inputCode;
   socket.emit("joinRoom", { roomCode, playerName });


    document.getElementById("multiplayerMenu").style.display = "none";
    document.getElementById("roomScreen").style.display = "block";
    document.getElementById("roomCodeDisplay").innerText = roomCode;
}

// 🔹 Générer un code unique pour la salle
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// 🔹 Étape 5 : Mettre à jour la liste des joueurs en temps réel
socket.on("roomUpdated", (room) => {
    console.log("📢 Mise à jour de la salle :", room); // 🔎 Debug : Vérifier la salle reçue
    playersInRoom = room.players;
    updatePlayerList();
    console.log("👥 Joueurs dans la salle :", playersInRoom); // 🔎 Debug : Voir les joueurs
});

    if (playersInRoom.length >= 2) {
        startCountdown(); // Lancer le compte à rebours dès 2 joueurs
    }

// 🔹 Étape 6 : Mise à jour de l'affichage des joueurs
function updatePlayerList() {
    let playerListElement = document.getElementById("playerList");
    playerListElement.innerHTML = "<h2>👥 Joueurs connectés :</h2>";

    if (!playersInRoom || playersInRoom.length === 0) {
        playerListElement.innerHTML += "<p>🕐 En attente de joueurs...</p>";
        return;
    }

    playersInRoom.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `🔹 ${player.name || player}`; // 🔥 Vérifie si `player` est un objet ou une simple chaîne
        playerListElement.appendChild(li);
    });
}

// 🔹 Étape 7 : Démarrer le compte à rebours dès 2 joueurs
function startCountdown() {
    let countdown = 30;

    if (countdownTimer) {
        clearInterval(countdownTimer);
    }

    countdownTimer = setInterval(() => {
        countdown--;

        // Mettre à jour le texte avec la liste des joueurs et le chrono
        document.getElementById("countdownText").innerText = `⏳ La partie commence dans ${countdown} secondes...\n\nJoueurs connectés :`;
        updatePlayerList(); // Afficher les joueurs pendant le compte à rebours

        if (countdown <= 0) {
            clearInterval(countdownTimer);
            socket.emit("startGame", roomCode);
        }
    }, 1000);
}

// 🔹 Étape 8 : Lancer la partie
socket.on("gameStarted", () => {
    document.getElementById("roomScreen").style.display = "none";
    document.querySelector(".container").style.display = "block";
    startQuiz();
});

// 🚀 Initialisation
document.addEventListener("DOMContentLoaded", function () {
    window.setLanguage = setLanguage;
});