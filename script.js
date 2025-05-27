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
    
    // 30 perguntas equilibradas
    const questions = [
        // Sanguíneo
        { text: "Gosto de conversar com pessoas novas em qualquer ambiente.", type: "sanguineo" },
        { text: "Sinto-me energizado em festas ou eventos sociais.", type: "sanguineo" },
        { text: "Costumo ser otimista mesmo diante de dificuldades.", type: "sanguineo" },
        { text: "Gosto de contar histórias e fazer as pessoas rirem.", type: "sanguineo" },
        { text: "Sou espontâneo e expressivo.", type: "sanguineo" },
        { text: "Prefiro falar a escutar.", type: "sanguineo" },
        { text: "Tenho facilidade para fazer amigos.", type: "sanguineo" },
        { text: "Gosto de experimentar coisas novas.", type: "sanguineo" },

        // Colérico
        { text: "Tomo a frente em situações de crise.", type: "colerico" },
        { text: "Gosto de liderar projetos e equipes.", type: "colerico" },
        { text: "Sinto-me motivado por desafios e metas ousadas.", type: "colerico" },
        { text: "Sou direto e franco ao me expressar.", type: "colerico" },
        { text: "Tenho facilidade em tomar decisões rápidas.", type: "colerico" },
        { text: "Gosto de competir e vencer.", type: "colerico" },
        { text: "Consigo manter o foco em objetivos mesmo sob pressão.", type: "colerico" },
        { text: "Prefiro agir a esperar.", type: "colerico" },

        // Melancólico
        { text: "Analiso profundamente antes de tomar decisões importantes.", type: "melancolico" },
        { text: "Tenho medo de falhar e decepcionar os outros.", type: "melancolico" },
        { text: "Busco perfeição em tudo que faço.", type: "melancolico" },
        { text: "Sou sensível às críticas.", type: "melancolico" },
        { text: "Gosto de planejar e organizar minhas tarefas.", type: "melancolico" },
        { text: "Reflito bastante sobre minhas ações.", type: "melancolico" },
        { text: "Tenho dificuldade em lidar com mudanças inesperadas.", type: "melancolico" },
        { text: "Aprecio arte, música e beleza.", type: "melancolico" },

        // Fleumático
        { text: "Prefiro evitar conflitos, mesmo que precise ceder.", type: "fleumatico" },
        { text: "Sinto-me confortável em rotinas e ambientes estáveis.", type: "fleumatico" },
        { text: "Tenho dificuldade em expressar emoções negativas.", type: "fleumatico" },
        { text: "Sou paciente e tolerante com os outros.", type: "fleumatico" },
        { text: "Adapto-me facilmente a diferentes situações.", type: "fleumatico" },
        { text: "Costumo ser um bom ouvinte.", type: "fleumatico" },
        { text: "Evito tomar decisões precipitadas.", type: "fleumatico" },
        { text: "Procuro manter a harmonia nos relacionamentos.", type: "fleumatico" }
    ];
    
    // Relatórios detalhados
    const temperamentReports = {
        sanguineo: {
            description: "Você é comunicativo, otimista e adora estar com pessoas.",
            beliefs: "Acredita que ser aceito é fundamental para ser feliz.",
            fears: "Tem medo de rejeição e de ficar sozinho.",
            desires: "Busca reconhecimento, diversão e conexões sociais.",
            blocks: "Pode se dispersar facilmente e evitar tarefas monótonas.",
            tips: [
                "Pratique ouvir mais e falar menos.",
                "Crie listas de tarefas para manter o foco.",
                "Reserve momentos para reflexão pessoal.",
                "Busque equilibrar lazer e responsabilidade."
            ]
        },
        colerico: {
            description: "Você é determinado, prático e gosta de liderar.",
            beliefs: "Acredita que o sucesso depende da sua força de vontade.",
            fears: "Tem medo de perder o controle ou ser visto como fraco.",
            desires: "Busca desafios, conquistas e reconhecimento por resultados.",
            blocks: "Pode ser impaciente, dominador e ter dificuldade em lidar com críticas.",
            tips: [
                "Exercite a empatia ouvindo opiniões diferentes.",
                "Pratique a paciência em situações fora do seu controle.",
                "Delegue tarefas e confie mais nos outros.",
                "Valorize o processo, não só o resultado."
            ]
        },
        melancolico: {
            description: "Você é analítico, sensível e busca excelência.",
            beliefs: "Acredita que precisa ser perfeito para ser valorizado.",
            fears: "Tem medo de errar, ser criticado ou não corresponder às expectativas.",
            desires: "Busca segurança, reconhecimento pela qualidade e harmonia interior.",
            blocks: "Pode ser autocrítico, pessimista e ter dificuldade em lidar com mudanças.",
            tips: [
                "Aceite que o erro faz parte do aprendizado.",
                "Experimente novas atividades sem buscar perfeição.",
                "Compartilhe sentimentos com pessoas de confiança.",
                "Celebre pequenas conquistas diárias."
            ]
        },
        fleumatico: {
            description: "Você é calmo, paciente e busca harmonia.",
            beliefs: "Acredita que evitar conflitos é sempre o melhor caminho.",
            fears: "Tem medo de desagradar ou causar desconforto aos outros.",
            desires: "Busca estabilidade, paz e relacionamentos harmoniosos.",
            blocks: "Pode ser passivo, indeciso e ter dificuldade em expressar emoções.",
            tips: [
                "Treine a assertividade, aprendendo a dizer 'não' quando necessário.",
                "Busque sair da zona de conforto em pequenas situações.",
                "Defina metas pessoais e acompanhe seu progresso.",
                "Pratique expressar suas opiniões de forma gentil."
            ]
        }
    };
    
    // Inicializar o quiz
    function initQuiz() {
        totalQuestionsSpan.textContent = questions.length;
        startBtn.addEventListener('click', startQuiz);
        restartBtn.addEventListener('click', restartQuiz);
        
        optionBtns.forEach(button => {
            button.addEventListener('click', () => {
                selectOption(button);
            });
        });
    }
    
    // Iniciar o quiz
    function startQuiz() {
        introSection.classList.remove('active');
        quizContainer.classList.add('active');
        currentQuestion = 0;
        Object.keys(scores).forEach(key => scores[key] = 0);
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
        const maxPossibleScore = 24; // 8 perguntas por temperamento, máximo 3 pontos cada
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
        
        // Mostrar o temperamento dominante e relatório detalhado
        const temperamentNames = {
            sanguineo: "Sanguíneo",
            colerico: "Colérico",
            melancolico: "Melancólico",
            fleumatico: "Fleumático"
        };
        
        document.getElementById('dominant-temperament').textContent = 
            `Seu temperamento predominante é: ${temperamentNames[dominantTemperament]} (${highestScore}%)`;
        
        const report = temperamentReports[dominantTemperament];
        document.getElementById('temperament-report').innerHTML = `
            <h4>Descrição:</h4>
            <p>${report.description}</p>
            <h4>Crenças:</h4>
            <p>${report.beliefs}</p>
            <h4>Medos:</h4>
            <p>${report.fears}</p>
            <h4>Anseios:</h4>
            <p>${report.desires}</p>
            <h4>Possíveis bloqueios:</h4>
            <p>${report.blocks}</p>
            <h4>Dicas para melhorar sua performance:</h4>
            <ul>${report.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
        `;
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
    }
    
    // Inicializar o quiz quando a página carregar
    initQuiz();
});
