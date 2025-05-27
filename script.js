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
    const temperamentGraphDiv = document.getElementById('temperament-graph');

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

    // Descrições completas dos temperamentos
    const temperamentDescriptions = {
        sanguineo: `
            <strong>Sanguíneo</strong><br>
            <b>Crenças:</b> "A vida é feita para ser vivida com alegria e intensidade." <br>
            <b>Pontos positivos:</b> Comunicativo, entusiasmado, otimista, espontâneo, faz amigos com facilidade, contagia o ambiente com energia.<br>
            <b>Pontos negativos:</b> Pode ser impulsivo, disperso, superficial, ter dificuldade em cumprir rotinas e compromissos.<br>
            <b>Descrição:</b> O sanguíneo é movido por emoções e pelo contato social. Gosta de novidades, de conversar, de estar rodeado de pessoas e de ser o centro das atenções. Tem facilidade para se adaptar a ambientes novos e para motivar quem está ao redor. No entanto, pode perder o interesse rapidamente, procrastinar tarefas monótonas e ter dificuldade em lidar com críticas.<br>
            <b>Dicas para melhor performance:</b>
            <ul>
                <li>Busque criar rotinas e listas para manter o foco em suas tarefas.</li>
                <li>Pratique ouvir mais e falar menos em situações importantes.</li>
                <li>Trabalhe a disciplina para concluir o que começa.</li>
                <li>Valorize momentos de introspecção e autoconhecimento.</li>
            </ul>
        `,
        colerico: `
            <strong>Colérico</strong><br>
            <b>Crenças:</b> "Se eu não fizer, ninguém faz direito." <br>
            <b>Pontos positivos:</b> Líder nato, determinado, objetivo, prático, rápido para tomar decisões, resiliente.<br>
            <b>Pontos negativos:</b> Pode ser impaciente, autoritário, intolerante com erros, ter dificuldade em delegar.<br>
            <b>Descrição:</b> O colérico é orientado para resultados e desafios. Gosta de liderar, resolver problemas e tomar decisões. Tem energia para iniciar projetos e motivar equipes, mas pode ser visto como controlador ou insensível. Costuma ser competitivo e não gosta de perder tempo.<br>
            <b>Dicas para melhor performance:</b>
            <ul>
                <li>Pratique a empatia e a escuta ativa com colegas e familiares.</li>
                <li>Aprenda a delegar e confiar no trabalho dos outros.</li>
                <li>Gerencie o estresse com atividades físicas e momentos de lazer.</li>
                <li>Valorize o processo, não só o resultado.</li>
            </ul>
        `,
        melancolico: `
            <strong>Melancólico</strong><br>
            <b>Crenças:</b> "Tudo pode ser melhorado, inclusive eu." <br>
            <b>Pontos positivos:</b> Analítico, detalhista, sensível, leal, responsável, busca a excelência.<br>
            <b>Pontos negativos:</b> Pode ser autocrítico, pessimista, perfeccionista, ter dificuldade em lidar com mudanças.<br>
            <b>Descrição:</b> O melancólico é movido pela busca da perfeição e do significado. Observa detalhes, planeja antes de agir e valoriza a profundidade nas relações. Tem grande senso de responsabilidade e ética, mas pode se cobrar demais e se frustrar com falhas. Prefere ambientes organizados e previsíveis.<br>
            <b>Dicas para melhor performance:</b>
            <ul>
                <li>Pratique o autocuidado e celebre pequenas conquistas.</li>
                <li>Permita-se errar e aprender com os erros.</li>
                <li>Busque flexibilidade diante de mudanças inesperadas.</li>
                <li>Compartilhe sentimentos e preocupações com pessoas de confiança.</li>
            </ul>
        `,
        fleumatico: `
            <strong>Fleumático</strong><br>
            <b>Crenças:</b> "Prefiro a paz do que a razão." <br>
            <b>Pontos positivos:</b> Calmo, paciente, equilibrado, confiável, bom ouvinte, evita conflitos.<br>
            <b>Pontos negativos:</b> Pode ser acomodado, procrastinador, ter dificuldade em tomar decisões e evitar mudanças.<br>
            <b>Descrição:</b> O fleumático valoriza a harmonia e a estabilidade. É discreto, ponderado e transmite segurança. Tem facilidade para ouvir e mediar conflitos, mas pode evitar confrontos necessários e se acomodar em situações desconfortáveis. Prefere rotinas e ambientes tranquilos.<br>
            <b>Dicas para melhor performance:</b>
            <ul>
                <li>Desafie-se a sair da zona de conforto e buscar novas experiências.</li>
                <li>Pratique a assertividade para expressar suas opiniões.</li>
                <li>Estabeleça metas e prazos para evitar procrastinação.</li>
                <li>Valorize sua capacidade de mediar e unir pessoas.</li>
            </ul>
        `
    };

    let currentQuestion = 0;
    let answers = [];

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

        // Porcentagens
        const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
        const perc = {};
        for (let t in scores) {
            perc[t] = Math.round((scores[t] / total) * 100);
        }

        mainTemperamentDiv.textContent = `Seu temperamento predominante: ${capitalize(main)}`;
        temperamentDescDiv.innerHTML = temperamentDescriptions[main];

        // Gráfico de barras
        temperamentGraphDiv.innerHTML = `
            <div class="bar-label">Sanguíneo: ${perc.sanguineo}%</div>
            <div class="bar-container"><div class="bar bar-sanguineo" style="width:${perc.sanguineo}%">${perc.sanguineo > 10 ? perc.sanguineo + '%' : ''}</div></div>
            <div class="bar-label">Colérico: ${perc.colerico}%</div>
            <div class="bar-container"><div class="bar bar-colerico" style="width:${perc.colerico}%">${perc.colerico > 10 ? perc.colerico + '%' : ''}</div></div>
            <div class="bar-label">Melancólico: ${perc.melancolico}%</div>
            <div class="bar-container"><div class="bar bar-melancolico" style="width:${perc.melancolico}%">${perc.melancolico > 10 ? perc.melancolico + '%' : ''}</div></div>
            <div class="bar-label">Fleumático: ${perc.fleumatico}%</div>
            <div class="bar-container"><div class="bar bar-fleumatico" style="width:${perc.fleumatico}%">${perc.fleumatico > 10 ? perc.fleumatico + '%' : ''}</div></div>
        `;
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
