document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.getElementById('intro');
    const quizContainer = document.getElementById('quiz-container');
    const resultsSection = document.getElementById('results');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionsDiv = document.getElementById('options');
    const progressBar = document.getElementById('progress');
    const currentQuestionSpan = document.getElementById('current');
    const totalQuestionsSpan = document.getElementById('total');
    const mainTemperamentDiv = document.getElementById('main-temperament');
    const temperamentDescDiv = document.getElementById('temperament-desc');

    // Perguntas situacionais (4 para cada temperamento, total 16)
    const questions = [
        // Sanguíneo
        { text: "Você chega em uma festa onde não conhece quase ninguém. O que faz?", type: "sanguineo" },
        { text: "Em uma reunião de trabalho, surge um momento de silêncio constrangedor. Como você reage?", type: "sanguineo" },
        { text: "Ao encontrar um grupo de pessoas conversando animadamente, qual sua atitude?", type: "sanguineo" },
        { text: "Quando recebe um convite inesperado para um evento social, como costuma agir?", type: "sanguineo" },

        // Colérico
        { text: "Diante de um problema urgente no trabalho, qual sua primeira reação?", type: "colerico" },
        { text: "Se um projeto está atrasado, o que você faz?", type: "colerico" },
        { text: "Quando está em um grupo indeciso, como age?", type: "colerico" },
        { text: "Se alguém discorda fortemente de você, como reage?", type: "colerico" },

        // Melancólico
        { text: "Ao receber uma crítica sobre seu trabalho, como reage?", type: "melancolico" },
        { text: "Se precisa entregar um projeto importante, como se organiza?", type: "melancolico" },
        { text: "Quando percebe um erro em algo que fez, o que faz?", type: "melancolico" },
        { text: "Se precisa escolher entre várias opções, como decide?", type: "melancolico" },

        // Fleumático
        { text: "Se há um conflito entre amigos, como você age?", type: "fleumatico" },
        { text: "Quando precisa esperar por muito tempo, como lida?", type: "fleumatico" },
        { text: "Se alguém pede para você mudar seus planos, como reage?", type: "fleumatico" },
        { text: "Ao ser pressionado a tomar uma decisão, o que faz?", type: "fleumatico" }
    ];

    // Opções de resposta
    const options = [
        { text: "Sempre ajo assim", value: 3 },
        { text: "Frequentemente ajo assim", value: 2 },
        { text: "Às vezes ajo assim", value: 1 },
        { text: "Nunca ajo assim", value: 0 }
    ];

    // Descrições dos temperamentos
    const temperamentDescriptions = {
        sanguineo: `
            <strong>Sanguíneo:</strong> Você é comunicativo, espontâneo, otimista e adora estar entre pessoas. Tem facilidade para fazer amigos, é entusiasmado e contagia o ambiente com sua energia. Atenção: pode ser impulsivo e disperso, então busque equilíbrio para manter o foco em seus objetivos.
        `,
        colerico: `
            <strong>Colérico:</strong> Você é determinado, prático, objetivo e gosta de liderar. Tem facilidade para tomar decisões e resolver problemas rapidamente. Atenção: pode ser impaciente ou autoritário, então lembre-se de ouvir os outros e praticar a empatia.
        `,
        melancolico: `
            <strong>Melancólico:</strong> Você é analítico, detalhista, sensível e busca sempre a perfeição. Tem grande senso de responsabilidade e é muito leal. Atenção: pode ser autocrítico e se preocupar excessivamente, então valorize suas conquistas e pratique o autocuidado.
        `,
        fleumatico: `
            <strong>Fleumático:</strong> Você é calmo, paciente, equilibrado e evita conflitos. Tem facilidade para ouvir, é confiável e transmite segurança. Atenção: pode ser acomodado ou evitar mudanças, então desafie-se a sair da zona de conforto quando necessário.
        `
    };

    let currentQuestion = 0;
    let answers = [];

    // Inicializar o quiz
    function initQuiz() {
        totalQuestionsSpan.textContent = questions.length;
        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', restartQuiz);
    }

    function startQuiz() {
        introSection.classList.remove('active');
        quizContainer.classList.add('active');
        currentQuestion = 0;
        answers = [];
        loadQuestion();
    }

    function loadQuestion() {
        optionsDiv.innerHTML = "";
        if (currentQuestion < questions.length) {
            questionText.textContent = questions[currentQuestion].text;
            currentQuestionSpan.textContent = currentQuestion + 1;

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "option-btn";
                btn.textContent = opt.text;
                btn.setAttribute('data-value', opt.value);
                btn.addEventListener('click', () => selectOption(btn));
                optionsDiv.appendChild(btn);
            });

            updateProgressBar();
        } else {
            showResults();
        }
    }

    function selectOption(button) {
        const value = parseInt(button.getAttribute('data-value'));
        answers.push({ type: questions[currentQuestion].type, value });
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 200);
    }

    function updateProgressBar() {
        const progress = ((currentQuestion) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showResults() {
        quizContainer.classList.remove('active');
        resultsSection.classList.add('active');

        // Soma por temperamento
        const scores = { sanguineo: 0, colerico: 0, melancolico: 0, fleumatico: 0 };
        answers.forEach(ans => {
            scores[ans.type] += ans.value;
        });

        // Descobre o temperamento principal
        let main = "sanguineo";
        let max = scores.sanguineo;
        for (let t in scores) {
            if (scores[t] > max) {
                main = t;
                max = scores[t];
            }
        }

        mainTemperamentDiv.textContent = `Seu temperamento predominante: ${capitalize(main)}`;
        temperamentDescDiv.innerHTML = temperamentDescriptions[main];
    }

    function restartQuiz() {
        currentQuestion = 0;
        answers = [];
        resultsSection.classList.remove('active');
        introSection.classList.add('active');
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    initQuiz();
});
