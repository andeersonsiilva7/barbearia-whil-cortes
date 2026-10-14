/* =========================================================
   WHIL CORTES — CONFIGURAÇÕES GERAIS
   Edite o telefone, mensagem e endereço somente aqui.
   As imagens e textos ficam no index.html.
========================================================= */
const CONFIG = {
  whatsapp: '5511930839012', // DDI 55 + DDD 11 + número, sem espaços
  mensagem: 'Olá! Vim pelo site da Barbearia Whil Cortes e gostaria de agendar um horário.',
  endereco: 'R. Rangel Pestana, 19, Jardim Patrícia, Itaquaquecetuba, SP, 08584-000',
  nomeGoogle: 'Barbearia Whil Cortes Itaquaquecetuba'
};

// Botões de WhatsApp: todos usam o mesmo número e mensagem.
const whatsappUrl = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;
document.querySelectorAll('.js-whatsapp').forEach(link => {
  link.href = whatsappUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

// Google Maps: link para traçar rota e mapa incorporado sem chave de API.
const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.endereco)}`;
document.querySelectorAll('.js-map').forEach(link => { link.href = mapaUrl; });
const mapa = document.getElementById('map-box');
if (mapa) {
  const iframe = document.createElement('iframe');
  iframe.title = 'Mapa da Barbearia Whil Cortes';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.endereco)}&output=embed`;
  mapa.replaceChildren(iframe);
}

// Avaliações: abre a busca do estabelecimento no Google Maps.
// Se tiver o link direto do perfil, substitua aqui para maior precisão.
const reviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.nomeGoogle)}`;
document.querySelectorAll('.js-reviews').forEach(link => { link.href = reviewsUrl; });

// Menu responsivo: abre/fecha no celular.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav');
menuButton?.addEventListener('click', () => {
  const aberto = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(aberto));
});
menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// Galeria horizontal: setas deslizam a lista de fotos.
const trilho = document.getElementById('gallery-track');
const deslocar = direcao => trilho?.scrollBy({ left: direcao * Math.max(240, trilho.clientWidth * 0.7), behavior: 'smooth' });
document.getElementById('prev-gallery')?.addEventListener('click', () => deslocar(-1));
document.getElementById('next-gallery')?.addEventListener('click', () => deslocar(1));

// Clique em uma foto abre a imagem maior. Escape ou clique fora fecha.
const lightbox = document.getElementById('lightbox');
const imagemAmpliada = document.getElementById('lightbox-image');
document.querySelectorAll('.gallery-item').forEach(botao => {
  botao.addEventListener('click', () => {
    const foto = botao.querySelector('img');
    if (!foto || !foto.complete || !foto.naturalWidth) return;
    imagemAmpliada.src = foto.currentSrc || foto.src;
    imagemAmpliada.alt = foto.alt;
    lightbox.showModal();
  });
});
document.getElementById('close-lightbox')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', evento => { if (evento.target === lightbox) lightbox.close(); });

// Caso a foto ainda não exista, mostra um bloco de orientação em seu lugar.
document.querySelectorAll('.photo-frame img').forEach(img => {
  img.addEventListener('error', () => img.classList.add('is-missing'));
  img.addEventListener('load', () => img.classList.remove('is-missing'));
  if (img.complete && !img.naturalWidth) img.classList.add('is-missing');
});

// Ano automático no rodapé.
document.getElementById('year').textContent = new Date().getFullYear();

// Botão Início: volta imediatamente ao topo da página
document.querySelectorAll('a[href="#inicio"]').forEach(botao => {
  botao.addEventListener('click', function(event) {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  });
});