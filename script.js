// Variável global para rastrear o perfil atual
let perfilAtual = null;
let modoAplicativo = localStorage.getItem('portfolio-aplicativo') || 'netflix';

function atualizarInterfaceAplicativo() {
    const profileTitle = document.getElementById('app-profile-title');
    const headerTitle = document.getElementById('app-header-title');
    const isDisney = modoAplicativo === 'disney';
    document.body.classList.toggle('theme-disney', isDisney);
    if (profileTitle) profileTitle.textContent = isDisney ? 'DISNEY' : 'PORTFÓLIO';
    if (headerTitle) headerTitle.textContent = isDisney ? 'Disney | João Eduardo' : 'João Eduardo | 2º Ano';

    const heroImage = document.querySelector('.hero-image');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroDescription = document.querySelector('.hero-content p');
    if (isDisney) {
        if (heroImage) heroImage.style.backgroundImage = "url('Sobre mim-Disney.jpg')";
        if (heroTitle) heroTitle.textContent = 'Sobre Mim';
        if (heroDescription) heroDescription.textContent = 'Meu portfólio no universo Disney: projetos, aprendizagens e experiências do ano letivo.';
    } else {
        if (heroImage) heroImage.style.backgroundImage = "url('Ninjago.jpg')";
        if (heroTitle) heroTitle.textContent = 'Sobre Mim';
        if (heroDescription) heroDescription.textContent = 'Em Ninjago: A Ascensão dos Dragões, novos e antigos ninjas se unem para enfrentar ameaças misteriosas enquanto os dragões retornam, desafiando a ordem do mundo e colocando toda Ninjago em risco.';
    }
}

function abrirAplicativo(nomeAplicativo) {
    modoAplicativo = nomeAplicativo;
    localStorage.setItem('portfolio-aplicativo', nomeAplicativo);
    atualizarInterfaceAplicativo();

    if (nomeAplicativo === 'disney') {
        const animationScreen = document.getElementById('animation-screen');
        const profileScreen = document.getElementById('profile-screen');
        const overlay = document.getElementById('play-overlay');
        const video = document.getElementById('local-video');
        if (profileScreen) profileScreen.style.display = 'none';
        if (animationScreen) animationScreen.style.display = 'flex';
        if (overlay) overlay.style.display = 'none';
        if (video) {
            video.src = 'Abertura Disney.mp4';
            video.muted = false;
            video.currentTime = 0;
            video.onended = mostrarTelaPerfs;
            video.play().catch(() => {
                video.muted = true;
                video.play().catch(mostrarTelaPerfs);
            });
        } else {
            mostrarTelaPerfs();
        }
        return;
    }

    mostrarTelaPerfs();
}

// Mostrar tela de perfis
function mostrarTelaPerfs() {
    const animationScreen = document.getElementById('animation-screen');
    const profileScreen = document.getElementById('profile-screen');

    if (animationScreen) animationScreen.style.display = 'none';
    if (profileScreen) {
        profileScreen.style.display = 'flex';
        profileScreen.style.animation = 'fadeIn 0.5s ease-in';
    }
}

// Selecionar perfil
function selecionarPerfil(nomePerfil) {
    console.log('Perfil selecionado:', nomePerfil);
    perfilAtual = nomePerfil;
    localStorage.setItem('portfolio-semestre', nomePerfil === '2° semestre' ? '2' : '1');
    atualizarIconePerfil();
    atualizarDropdownPerfil();
    atualizarInterfaceAplicativo();
    const profileScreen = document.getElementById('profile-screen');
    const mainContent = document.getElementById('main-content');
    if (profileScreen) profileScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    renderContinueAssistindo();
}

// Atualizar ícone de perfil no header
function atualizarIconePerfil() {
    const profileToggle = document.getElementById('profile-toggle');
    if (profileToggle) {
        if (perfilAtual === '1° semestre') {
            profileToggle.textContent = '📚';
        } else if (perfilAtual === '2° semestre') {
            profileToggle.textContent = '📖';
        } else {
            profileToggle.textContent = '👤';
        }
    }
}

// Atualizar o dropdown para mostrar apenas o perfil atual
function atualizarDropdownPerfil() {
    const profileIcon = document.getElementById('current-profile-icon');
    const profileText = document.getElementById('current-profile-text');
    
    if (perfilAtual === '1° semestre') {
        if (profileIcon) profileIcon.textContent = '📚';
        if (profileText) profileText.textContent = '1° semestre';
    } else if (perfilAtual === '2° semestre') {
        if (profileIcon) profileIcon.textContent = '📖';
        if (profileText) profileText.textContent = '2° semestre';
    }
}

// Função para trocar de perfil via dropdown
function trocarPerfil(nomePerfil) {
    console.log('Trocando para perfil:', nomePerfil);
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileDropdown) profileDropdown.style.display = 'none';
    selecionarPerfil(nomePerfil);
}

// Função para voltar à tela de seleção de perfis
function voltarTelaPerfs() {
    const mainContent = document.getElementById('main-content');
    const profileScreen = document.getElementById('profile-screen');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileDropdown) profileDropdown.style.display = 'none';
    
    if (mainContent) {
        mainContent.classList.add('fade-out');
        setTimeout(() => {
            mainContent.style.display = 'none';
            mainContent.classList.remove('fade-out');
            perfilAtual = null;
            localStorage.removeItem('portfolio-semestre');
            atualizarIconePerfil();
            if (profileScreen) profileScreen.style.display = 'flex';
        }, 400);
    } else {
        perfilAtual = null;
        localStorage.removeItem('portfolio-semestre');
        atualizarIconePerfil();
        if (profileScreen) profileScreen.style.display = 'flex';
    }
}

// Sair do aplicativo e voltar à tela da TV
function sairAplicativo() {
    const animationScreen = document.getElementById('animation-screen');
    const profileScreen = document.getElementById('profile-screen');
    const mainContent = document.getElementById('main-content');
    const profileDropdown = document.getElementById('profile-dropdown');
    const overlay = document.getElementById('play-overlay');
    const video = document.getElementById('local-video');
    const logo = document.getElementById('netflix-logo');
    const appDisney = document.getElementById('app-disney');
    const appCrunchyroll = document.getElementById('app-crunchyroll');

    const restaurarTelaInicial = () => {
        videoStarted = false;
        modoAplicativo = 'netflix';
        localStorage.setItem('portfolio-aplicativo', 'netflix');
        atualizarInterfaceAplicativo();

        if (profileScreen) profileScreen.style.display = 'none';
        if (animationScreen) animationScreen.style.display = 'flex';
        if (overlay) overlay.style.display = 'flex';

        if (logo) {
            logo.style.animation = 'pulse 1.5s ease-in-out infinite';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }

        if (appDisney) appDisney.style.visibility = 'visible';
        if (appCrunchyroll) appCrunchyroll.style.visibility = 'visible';

        if (video) {
            video.pause();
            video.currentTime = 0;
            video.muted = true;
        }
    };

    if (profileDropdown) profileDropdown.style.display = 'none';
    if (mainContent) {
        mainContent.classList.add('fade-out');
        setTimeout(() => {
            mainContent.style.display = 'none';
            mainContent.classList.remove('fade-out');
            restaurarTelaInicial();
        }, 400);
    } else {
        restaurarTelaInicial();
    }
}

// Navegar para página dedicada
function abrirPaginaSerie(id) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = `serie.html?id=${id}`;
        }, 400);
    } else {
        window.location.href = `serie.html?id=${id}`;
    }
}

// Mostrar mais informações da série hero
function mostrarMaisInformacoes() {
    const conteudo = `
        <h2>Sobre Mim</h2>
        <p>Em Ninjago: A Ascensão dos Dragões, novos e antigos ninjas se unem para enfrentar ameaças misteriosas enquanto os dragões retornam, desafiando a ordem do mundo e colocando toda Ninjago em risco.</p>
        <br>
        <p><strong>Gênero:</strong> Ação, Aventura</p>
        <p><strong>Duração:</strong> 23 episódios</p>
        <p><strong>Classificação:</strong> Livre</p>
    `;
    abrirModal(conteudo);
}

// Adicionar/remover série da lista
function toggleAdicionar(btn, index) {
    const isAdded = btn.classList.toggle('added');
    if (isAdded) {
        btn.innerHTML = '✓';
        btn.style.backgroundColor = '#46d369';
    } else {
        btn.innerHTML = '＋';
        btn.style.backgroundColor = '';
    }
}

// Marcar/desmarcar gostei
function toggleGostei(btn) {
    const isLiked = btn.classList.toggle('liked');
    if (isLiked) {
        btn.innerHTML = '❤';
        btn.style.backgroundColor = '#e50914';
    } else {
        btn.innerHTML = '👍';
        btn.style.backgroundColor = '';
    }
}

// Inicializar modal quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-info');
    if (modal) {
        modal.style.display = 'none';
        
        // Fechar modal ao clicar fora da caixa
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }
});

// Abrir modal com conteúdo customizado
function abrirModal(conteudo) {
    const modal = document.getElementById('modal-info');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal) {
        return;
    }
    
    if (!modalContent) {
        return;
    }
    
    modalContent.innerHTML = conteudo;
    modal.style.setProperty('display', 'flex', 'important');
    modal.style.setProperty('position', 'fixed', 'important');
    modal.style.setProperty('inset', '0', 'important');
    modal.style.setProperty('justify-content', 'center', 'important');
    modal.style.setProperty('align-items', 'center', 'important');
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('modal-info');
    if (modal) {
        modal.style.setProperty('display', 'none', 'important');
    }
}

// Carrossel
function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    if (carousel) {
        const scrollAmount = 250;
        carousel.scrollLeft += (direction === 1 ? scrollAmount : -scrollAmount);
    }
}

// Dados mockados para a seção "Continuar assistindo"
const continueAssistindo = [
    {
        title: 'Ciências Humanas',
        badge: 'Novo módulo',
        cta: 'Acessar',
        episode: 'Carmen Sandiego - Ep. 7: A Joia Roubada',
        time: '20 de 23min',
        progress: 88,
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        image: 'carmensandiego.webp'
    },
    {
        title: 'Ciências Da Natureza',
        badge: 'Retome',
        cta: 'Continuar',
        episode: 'Demon Slayer - Ep. 15: Respiração Infinita',
        time: '12 de 22min',
        progress: 55,
        background: 'linear-gradient(135deg, #90f7ec 0%, #32ccbc 100%)',
        image: 'demonslayer.webp'
    },
    {
        title: 'Linguagens e Suas Tecnologias',
        badge: 'Novo módulo',
        cta: 'Assistir',
        episode: 'Harriet - O Caminho para a Liberdade',
        time: '05 de 24min',
        progress: 20,
        background: 'linear-gradient(135deg, #f83600 0%, #fe8c00 100%)',
        image: 'harriet.jpg'
    },
    {
        title: 'Matemática e Suas Tecnologias',
        badge: 'Em destaque',
        cta: 'Assistir já',
        episode: 'Homem-Aranha: Sem Volta para Casa',
        time: '18 de 26min',
        progress: 70,
        background: 'linear-gradient(135deg, #0cebeb 0%, #20e3b2 50%, #29ffc6 100%)',
        image: 'Matemática e suas tecnologias.jpg'
    },
    {
        title: 'Automação Industrial',
        badge: 'Nova trilha',
        cta: 'Assistir já',
        episode: 'One Piece - Cap. 450: O Novo Mundo',
        time: '10 de 23min',
        progress: 45,
        background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        image: 'onepiece.webp'
    }
    ,
    {
        title: 'Projeto De Vida',
        badge: 'Novo',
        cta: 'Ver',
        episode: 'Projeto De Vida - Introdução',
        time: '0 de 10min',
        progress: 0,
        background: 'linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)',
        image: 'comotreinarseudragao.jpg'
    }
];

function itensDoAplicativo() {
    if (modoAplicativo !== 'disney') return continueAssistindo;

    const imagensDisney = {
        'Ciências Humanas': 'Ciencias Humanas-Disney.jpg',
        'Ciências Da Natureza': 'Ciencias da Natureza- Disney.png',
        'Linguagens e Suas Tecnologias': 'Linguagens- Disney.webp',
        'Matemática e Suas Tecnologias': 'Matemática-Disney.jpg',
        'Projeto De Vida': 'Projeto de Vida-Disney.jpeg',
        'Módulo da Indústria': 'Módulo da Industria-Disney.webp'
    };

    const nomesDisney = {
        'Ciências Humanas': 'Capitão América: Guerra Civil',
        'Ciências Da Natureza': 'Homem de Ferro 2',
        'Linguagens e Suas Tecnologias': 'WandaVision',
        'Matemática e Suas Tecnologias': 'Homem-Aranha: Sem Volta para Casa',
        'Projeto De Vida': 'Eu Sou Groot'
    };

    const itens = continueAssistindo
        .map((item, index) => ({ ...item, appIndex: index }))
        .filter(item => item.title !== 'Automação Industrial')
        .map(item => ({
            ...item,
            episode: nomesDisney[item.title] || item.episode,
            image: imagensDisney[item.title] || item.image
        }));

    if (perfilAtual === '2° semestre') {
        itens.push({
            ...continueAssistindo.find(item => item.title === 'Automação Industrial'),
            title: 'Módulo da Indústria',
            episode: 'Vingadores: Era Ultron',
            appIndex: 4,
            image: imagensDisney['Módulo da Indústria']
        });
    }
    return itens;
}

function renderContinueAssistindo() {
    const container = document.getElementById('carousel');
    if (!container) return;

    container.innerHTML = itensDoAplicativo().map((item, index) => {
        console.log('Renderizando card:', item.title, 'Imagem:', item.image);
        return `
        <div class="continue-card" data-title="${item.title}" data-index="${item.appIndex ?? index}">
            <div class="card-thumb" style="background: ${item.background}; background-size: cover; background-position: center; min-height: 160px; position: relative;">
                ${item.image ? `<img src="${item.image}" alt="${item.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; ${item.filter ? `filter: ${item.filter};` : ''}">` : ''}
                <span class="card-badge" style="position: relative; z-index: 10;">${item.badge}</span>
                <div class="thumb-hover" style="position: relative; z-index: 5;">
                    <div class="hover-actions">
                        <div class="action-left">
                            <button class="icon-btn play" data-action="play" onclick="abrirPaginaSerie(${index}); event.stopPropagation();">▶</button>
                            <button class="icon-btn" data-action="add" onclick="toggleAdicionar(this, ${index}); event.stopPropagation();">＋</button>
                            <button class="icon-btn" data-action="like" onclick="toggleGostei(this); event.stopPropagation();">👍</button>
                        </div>
                        <button class="icon-btn" data-action="more">⌄</button>
                    </div>
                    <div class="hover-info">
                        <div class="hover-title">${item.episode}</div>
                        <div class="hover-sub">${item.time}</div>
                        <div class="progress"><span style="width:${item.progress}%"></span></div>
                    </div>
                </div>
            </div>
            <div class="card-info">
                <div class="info-top">
                    <h3>${item.title}</h3>
                    ${item.cta ? `<span class="pill">${item.cta}</span>` : ''}
                </div>
                <div class="episode">${item.episode}</div>
                <div class="mini-progress">
                    <div class="progress"><span style="width:${item.progress}%"></span></div>
                    <div class="time-row"><span>${item.time}</span></div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    const cards = container.querySelectorAll('.continue-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const idx = card.getAttribute('data-index');
            abrirPaginaSerie(idx);
        });
    });
}

// Estado: evita clique duplo no play
let videoStarted = false;

// Injetar keyframes necessários para as animações usadas
(function ensureAnimations(){
    const id = 'injected-animations';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = `
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.9; }
    }
    @keyframes zoomIn {
        from { transform: scale(1); opacity: 1; }
        to { transform: scale(150); opacity: 0; }
    }
    `;
    document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => {
    atualizarInterfaceAplicativo();
    renderContinueAssistindo();

    const semestreSalvo = localStorage.getItem('portfolio-semestre');
    if (semestreSalvo === '2') {
        perfilAtual = '2° semestre';
    } else if (semestreSalvo === '1') {
        perfilAtual = '1° semestre';
    }
    atualizarIconePerfil();
    atualizarDropdownPerfil();
    atualizarInterfaceAplicativo();
    renderContinueAssistindo();

    // Se veio com hash para continuar-section, pula animação e perfis
    if (window.location.hash === '#continuar-section') {
        const animationScreen = document.getElementById('animation-screen');
        const profileScreen = document.getElementById('profile-screen');
        const mainContent = document.getElementById('main-content');
        if (animationScreen) animationScreen.style.display = 'none';
        if (profileScreen) profileScreen.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        setTimeout(() => {
            document.getElementById('continuar-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Profile dropdown toggle
    const profileToggle = document.getElementById('profile-toggle');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
        });
        
        document.addEventListener('click', () => {
            profileDropdown.style.display = 'none';
        });
    }

    const video = document.getElementById('local-video');
    const logo = document.getElementById('netflix-logo');
    const overlay = document.getElementById('play-overlay');
    const appDisney = document.getElementById('app-disney');
    const appCrunchyroll = document.getElementById('app-crunchyroll');

    const handlePlay = async () => {
        if (videoStarted) return;
        videoStarted = true;
        modoAplicativo = 'netflix';
        localStorage.setItem('portfolio-aplicativo', 'netflix');
        atualizarInterfaceAplicativo();

        if (video) {
            video.src = 'tudum.mp4';
        }

        if (appDisney) appDisney.style.visibility = 'hidden';
        if (appCrunchyroll) appCrunchyroll.style.visibility = 'hidden';

        if (logo) logo.style.animation = 'zoomIn 0.6s ease-in forwards';

            // após o zoom (600ms), esconder overlay e iniciar o vídeo
            setTimeout(async () => {
                if (overlay) overlay.style.display = 'none';

                if (video) {
                    try {
                        // tenta com áudio habilitado
                        video.muted = false;
                        await video.play();
                        console.log('Vídeo iniciando com áudio');
                    } catch (err1) {
                        try {
                            // fallback: iniciar mudo se falhar
                            console.log('Play falhou com áudio, tentando mudo...');
                            video.muted = true;
                            await video.play();
                            console.log('Vídeo iniciando mudo');
                        } catch (err2) {
                            console.log('Falha ao tocar vídeo, seguindo para perfis:', err2);
                            mostrarTelaPerfs();
                        }
                    }
                } else {
                    mostrarTelaPerfs();
                }
            }, 600);
    };

    // Vincula clique apenas ao logo Netflix e ao overlay
    if (logo) logo.addEventListener('click', handlePlay);
    if (overlay) overlay.addEventListener('click', handlePlay);
    
    // Prevenir clique nos apps de disparar a animação
    if (appDisney) appDisney.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirAplicativo('disney');
    });
    if (appCrunchyroll) appCrunchyroll.addEventListener('click', (e) => e.stopPropagation());

    if (video) {
        video.addEventListener('playing', () => console.log('✓ Vídeo tocando'));
        video.addEventListener('ended', () => {
            console.log('✓ Vídeo terminou - mostrando perfis');
            mostrarTelaPerfs();
        });
        video.addEventListener('error', () => {
            console.log('✗ ERRO ao carregar vídeo:', video.error?.code, video.error?.message);
        });
        video.addEventListener('stalled', () => {
            console.log('⚠ Vídeo travou - sem dados');
        });
    }

});
