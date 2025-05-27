document.addEventListener('DOMContentLoaded', function() {
    // Elementos da interface
    const introSection = document.getElementById('intro');
    const quizContainer = document.getElementById('quiz-container');
    const resultsSection = document.getElementById('results');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionBtns = document.querySelectorAll('.option-btn');
    const progressBar = document.getElementById('progress');
    const currentQuestionSpan = document.getElementById('current');
    const totalQuestionsSpan = document.getElementById('total');
    
    // Variáveis do quiz
    let currentQuestion = 0;
    const scores = {
        sanguineo: 0,
        colerico: 0,
        melancolico: 0,
        fleumatico: 0
    };
    
    // Perguntas do quiz
    const questions = [
        // Sanguíneo
        { text: "Sou animado e entusiasmado.", type: "sanguineo" },
        { text: "Gosto de estar no centro das atenções.", type: "sanguineo" },
        { text: "Sou extrovertido e sociável.", type: "sanguineo" },
        { text: "Faço amigos com facilidade.", type: "sanguineo" },
        { text: "Sou otimista e alegre.", type: "sanguineo" },
        { text: "Gosto de contar histórias e fazer as pessoas rirem.", type: "sanguineo" },
        { text: "Sou espontâneo e expressivo.", type: "sanguineo" },
        { text: "Tenho energia para atividades sociais.", type: "sanguineo" },
        { text: "Prefiro falar a escutar.", type: "sanguineo" },
        { text: "Sou criativo e cheio de ideias.", type: "sanguineo" },
        
        // Colérico
        { text: "Sou determinado e decidido.", type: "colerico" },
        { text: "Gosto de liderar e tomar decisões.", type: "colerico" },
        { text: "Sou prático e orientado para resultados.", type: "colerico" },
        { text: "Tenho forte força de vontade.", type: "colerico" },
        { text: "Sou independente e autossuficiente.", type: "colerico" },
        { text: "Sou competitivo e gosto de desafios.", type: "colerico" },
        { text: "Sou direto e franco ao me expressar.", type: "colerico" },
        { text: "Tenho confiança nas minhas habilidades.", type: "colerico" },
        { text: "Sou produtivo e eficiente.", type: "colerico" },
        { text: "Tenho objetivos claros e trabalho para alcançá-los.", type: "colerico" },
        
        // Melancólico
        { text: "Sou perfeccionista e detalhista.", type: "melancolico" },
        { text: "Gosto de analisar situações profundamente.", type: "melancolico" },
        { text: "Sou sensível e emotivo.", type: "melancolico" },
        { text: "Valorizo a qualidade e a excelência.", type: "melancolico" },
        { text: "Sou organizado e metódico.", type: "melancolico" },
        { text: "Tenho tendência a ser autocrítico.", type: "melancolico" },
        { text: "Aprecio arte, música e beleza.", type: "melancolico" },
        { text: "Sou idealista e tenho altos padrões.", type: "melancolico" },
        { text: "Reflito bastante antes de tomar decisões.", type: "melancolico" },
        { text: "Sou leal e dedicado aos relacionamentos.", type: "melancolico" },
        
        // Fleumático
        { text: "Sou calmo e tranquilo.", type: "fleumatico" },
        { text: "Evito conflitos e busco harmonia.", type: "fleumatico" },
        { text: "Sou paciente e tolerante.", type: "fleumatico" },
        { text: "Mantenho-me estável em situações de estresse.", type: "fleumatico" },
        { text: "Sou bom ouvinte.", type: "fleumatico" },
        { text: "Prefiro rotina e consistência.", type: "fleumatico" },
        { text: "Sou discreto e reservado.", type: "fleumatico" },
        { text: "Tenho facilidade para me adaptar a diferentes situações.", type: "fleumatico" },
        { text: "Sou diplomático ao lidar com pessoas.", type: "fleumatico" },
        { text: "Penso bem antes de falar ou agir.", type: "fleumatico" }
    ];
    
    // Descrições dos temperamentos
    const temperamentDescriptions = {
        sanguineo: "O temperamento Sanguíneo é caracterizado por ser extrovertido, falante, entusiasmado e animado. Pessoas com este temperamento são sociáveis, otimistas e gostam de estar no centro das atenções. São criativas, expressivas e fazem amigos com facilidade. No entanto, podem ser impulsivas, desorganizadas e ter dificuldade em manter o foco em tarefas longas.",
        
        colerico: "O temperamento Colérico é caracterizado por ser determinado, decidido e orientado para objetivos. Pessoas com este temperamento são líderes naturais, práticas e eficientes. São independentes, confiantes e gostam de desafios. No entanto, podem ser impacientes, dominadoras e ter dificuldade em lidar com críticas.",
        
        melancolico: "O temperamento Melancólico é caracterizado por ser perfeccionista, detalhista e analítico. Pessoas com este temperamento são profundas, sensíveis e apreciam a beleza e a arte. São organizadas, leais e têm altos padrões. No entanto, podem ser autocríticas, pessimistas e ter dificuldade em lidar com mudanças.",
        
        fleumatico: "O temperamento Fleumático é caracterizado por ser calmo, pacífico e equilibrado. Pessoas com este temperamento são pacientes, diplomáticas e boas ouvintes. São adaptáveis, confiáveis e evitam conflitos. No entanto, podem ser passivas, indecisas e ter dificuldade em expressar emoções."
    };
    
    // Inicializar o quiz
    function initQuiz() {
        totalQuestionsSpan.textContent = questions.length;
        shuffleQuestions();
        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', restartQuiz);
        
        optionBtns.forEach(button => {
            button.addEventListener('click', () => {
                selectOption(button);
            });
        });
    }
    
    // Embaralhar as perguntas
    function shuffleQuestions() {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }
    
    // Iniciar o quiz
    function startQuiz() {
        introSection.classList.remove('active');
        quizContainer.classList.add('active');
        loadQuestion();
    }
    
    // Carregar uma pergunta
    function loadQuestion() {
        resetOptionButtons();
        
        if (currentQuestion < questions.length) {
            questionText.textContent = questions[currentQuestion].text;
            currentQuestionSpan.textContent = currentQuestion + 1;
            updateProgressBar();
        } else {
            showResults();
        }
    }
    
    // Resetar os botões de opção
    function resetOptionButtons() {
        optionBtns.forEach(button => {
            button.classList.remove('selected');
        });
    }
    
    // Selecionar uma opção
    function selectOption(button) {
        resetOptionButtons();
        button.classList.add('selected');
        
        // Registrar a pontuação
        const value = parseInt(button.getAttribute('data-value'));
        const questionType = questions[currentQuestion].type;
        scores[questionType] += value;
        
        // Avançar para a próxima pergunta após um breve delay
        setTimeout(() => {
            currentQuestion++;
            loadQuestion();
        }, 300);
    }
    
    // Atualizar a barra de progresso
    function updateProgressBar() {
        const progress = ((currentQuestion) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Mostrar os resultados
    function showResults() {
        quizContainer.classList.remove('active');
        resultsSection.classList.add('active');
        
        // Calcular as porcentagens
        const maxPossibleScore = 30; // 10 perguntas por temperamento, máximo 3 pontos cada
        const percentages = {
            sanguineo: Math.round((scores.sanguineo / maxPossibleScore) * 100),
            colerico: Math.round((scores.colerico / maxPossibleScore) * 100),
            melancolico: Math.round((scores.melancolico / maxPossibleScore) * 100),
            fleumatico: Math.round((scores.fleumatico / maxPossibleScore) * 100)
        };
        
        // Atualizar as barras de progresso e porcentagens
        document.getElementById('sanguineo-bar').style.width = `${percentages.sanguineo}%`;
        document.getElementById('colerico-bar').style.width = `${percentages.colerico}%`;
        document.getElementById('melancolico-bar').style.width = `${percentages.melancolico}%`;
        document.getElementById('fleumatico-bar').style.width = `${percentages.fleumatico}%`;
        
        document.getElementById('sanguineo-score').textContent = `${percentages.sanguineo}%`;
        document.getElementById('colerico-score').textContent = `${percentages.colerico}%`;
        document.getElementById('melancolico-score').textContent = `${percentages.melancolico}%`;
        document.getElementById('fleumatico-score').textContent = `${percentages.fleumatico}%`;
        
        // Determinar o temperamento dominante
        let dominantTemperament = 'sanguineo';
        let highestScore = percentages.sanguineo;
        
        if (percentages.colerico > highestScore) {
            dominantTemperament = 'colerico';
            highestScore = percentages.colerico;
        }
        if (percentages.melancolico > highestScore) {
            dominantTemperament = 'melancolico';
            highestScore = percentages.melancolico;
        }
        if (percentages.fleumatico > highestScore) {
            dominantTemperament = 'fleumatico';
            highestScore = percentages.fleumatico;
        }
        
        // Mostrar o temperamento dominante e sua descrição
        const temperamentNames = {
            sanguineo: "Sanguíneo",
            colerico: "Colérico",
            melancolico: "Melancólico",
            fleumatico: "Fleumático"
        };
        
        document.getElementById('dominant-temperament').textContent = 
            `Seu temperamento predominante é: ${temperamentNames[dominantTemperament]} (${highestScore}%)`;
        document.getElementById('temperament-description').textContent = 
            temperamentDescriptions[dominantTemperament];
    }
    
    // Reiniciar o quiz
    function restartQuiz() {
        currentQuestion = 0;
        scores.sanguineo = 0;
        scores.colerico = 0;
        scores.melancolico = 0;
        scores.fleumatico = 0;
        
        resultsSection.classList.remove('active');
        introSection.classList.add('active');
        
        shuffleQuestions();
    }
    
    // Inicializar o quiz quando a página carregar
    initQuiz();
});
