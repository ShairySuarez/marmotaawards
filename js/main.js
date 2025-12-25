//------------------------------------------------------
// FIX — SISTEMA DE VOTACIÓN QUE ROMPÍA EL CÓDIGO
//------------------------------------------------------
document.addEventListener("click", e => {
  if(!e.target.classList.contains("vote-btn")) return;

  const card = e.target.closest(".nominee-card");
  if(!card) return; // 🔥 evita el error, deja que los modales abran

  card.querySelectorAll(".vote-btn").forEach(b => {
    b.classList.remove("voted");
    b.textContent = "Votar";
  });

  e.target.classList.add("voted");
  e.target.textContent = "Votado";
});


//------------------------------------------------------
// REPRODUCTOR DE AUDIO AVANZADO
//------------------------------------------------------

const bgMusic   = document.getElementById("bgMusic");
const musicBtn  = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const slider    = document.getElementById("volSlider");
const songTitle = document.getElementById("songTitle");

// lista de canciones
const songs = [
  "assets/TOTY.mp3",          // SIEMPRE PRIMERA
  "assets/artic.mp3",
  "assets/generation.mp3",
  "assets/surfin.mp3",
  "assets/phone.mp3",
  "assets/assumptions.mp3"
];

// nombres visibles
const songNames = [
  "Team Of The Year",
  "Arctic Child",
  "Generation Love",
  "Surfin",
  "Meduza Phone",
  "Assumptions"
];

// índice fijo de TOTY
const TOTY = 0;

// índices secundarios (todas menos TOTY)
const secondaries = songs.map((x, i) => i).filter(i => i !== TOTY);

// ciclo dinámico de secundarias
let cycle = [...secondaries];

// flags
let firstSongPlayed = false;
let currentSong = 0;

// volumen por defecto
bgMusic.volume = slider.value;
bgMusic.muted  = false;


//-----------------------------
// CAMBIO DE VOLUMEN REAL
//-----------------------------
slider.addEventListener("input", () => {
  bgMusic.volume = slider.value;
});


//-----------------------------
// SETEAR CANCIÓN ACTUAL
//-----------------------------
function setSong(index) {
  currentSong = index;
  bgMusic.src = songs[currentSong];
  songTitle.textContent = songNames[currentSong];
}


//-----------------------------
// PRIMERA CANCIÓN (TOTY)
//-----------------------------
function playFirstSong() {
  setSong(TOTY);            // TOTY
  bgMusic.play();
  firstSongPlayed = true;
  cycle = [...secondaries]; // reinicio lista secundarias para el ciclo
  musicIcon.src = "assets/play.png"; // como a ti te gusta
}


//-----------------------------
// SIGUIENTE CANCIÓN SEGÚN SISTEMA
//-----------------------------
function nextSong() {

  // si solo hay 1 secundaria (caso 2 canciones: TOTY + Arctic)
  if (secondaries.length === 1) {
    // alternar entre TOTY y Arctic
    if (currentSong === TOTY) {
      setSong(secondaries[0]);   // Arctic
    } else {
      setSong(TOTY);             // de vuelta a TOTY
    }
    bgMusic.play();
    return;
  }

  // si se quedaron sin secundarias → nuevo ciclo: empieza TOTY
  if (cycle.length === 0) {
    cycle = [...secondaries];
    setSong(TOTY);
    bgMusic.play();
    return;
  }

  // elegir random desde las secundarias que quedan en este ciclo
  const r = Math.floor(Math.random() * cycle.length);
  const next = cycle[r];

  // quitarla del ciclo para no repetir
  cycle.splice(r, 1);

  setSong(next);
  bgMusic.play();
}


//-----------------------------
// CUANDO TERMINA UNA CANCIÓN
//-----------------------------
bgMusic.addEventListener("ended", () => {
  if (firstSongPlayed) {
    nextSong();
  }
});


//-----------------------------
// BOTÓN PLAY / PAUSE
//-----------------------------
musicBtn.addEventListener("click", () => {

  // si aún no se ha iniciado, arrancamos con TOTY
  if (!firstSongPlayed) {
    playFirstSong();
    return;  // IMPORTANTE: no sigas a la lógica de toggle en el primer click
  }

  if (bgMusic.paused) {
    bgMusic.play();
    musicIcon.src = "assets/play.png";   // tu estilo: icono "play" cuando suena
  } else {
    bgMusic.pause();
    musicIcon.src = "assets/pause.png";  // icono "pause" cuando está detenido
  }
});

//------------------------------------------------------
// MODAL UNIVERSAL DINÁMICO
//------------------------------------------------------

const modalUni = document.getElementById("categoryModal");
const modalTitle = document.getElementById("modalTitle");
const modalNominees = document.getElementById("modalNominees");
const closeModalUni = document.getElementById("closeCategoryModal");
const btnLink = document.getElementById("link-form");

// base de datos de nominados
const nominees = {
  revelacion: [
    {name:"Alan B.", img:"alan.jpg"},
    {name:"Josué S.", img:"josue.jpg"},
    {name:"Victoria B.", img:"victoria.jpg"},
    {name:"Inda F.", img:"jose.jpg"},
    {name:"Jefferson A.", img:"jefferson.jpg"}
  ],
  juego: [
    {name:"Fortnite", img:"Fortnite.jpg"},
    {name:"GTA V", img:"GTA_V.jpg"},
    {name:"Overcooked! 2", img:"OC.jpg"},
    {name:"Phasmophobia", img:"Phasmophobia.jpg"},
    {name:"Rocket League", img:"Rocket.jpg"}
  ],
  activo: [
    {name:"Alan", img:"alan.jpg"},
    {name:"Josué", img:"josue.jpg"},
    {name:"Victoria", img:"victoria.jpg"},
    {name:"José", img:"jose.jpg"},
    {name:"Jefferson", img:"jefferson.jpg"}
  ],
  adaptacion: [
    {name:"M. 8-BITS", img:"8bits.jpg"},
    {name:"M. Halloween", img:"HW.jpg"},
    {name:"M. Navidad", img:"MCH.jpg"},
    {name:"M. San Valentin", img:"SV.jpg"},
    {name:"M. Zack Snyder", img:"mzs.jpg"}
  ],
  audio: [
    { name: "Atan – grito", file:"Atan.mp4", type:"audio" },
    { name: "AAA JA JA", file:"AJAJA.mp4", type:"audio" },
    { name: "Llego la Diversion!", file:"diversion.mp4", type:"audio" },
    { name: "Ñoño Bailando", file:"Tiananmen.mp4", type:"audio" },
    { name: "Ya mi amor", file:"yamiamor.mp4", type:"audio" }
  ],
  integracion: [
    {name:"Anthonella C.", img:"a.jpg"},
    {name:"Inda F.", img:"i.jpg"},
    {name:"Victoria B.", img:"v.jpg"}
  ],
  meme: [
    { name: "Silksong Pendejo", img: "ga.jpg", type: "image" },
    { name: "Misil", img: "misil.jpg", type: "image" },
    { name: "Mi Muñaño Favorito", img: "mmf.jpg", type: "image" },

    { name: "Abel", img: "abel.mp4", type: "video" },
    { name: "Beso", img: "beso.mp4", type: "video" },
    { name: "Crystals Edit", img: "crystals.mp4", type: "video" }
  ],
  independiente: [
    { name: "Atan",  img: "Atan.mp4", type: "video" },
    { name: "CJ Tiene ",    img: "Cj.mp4", type: "video" },
    { name: "Homero si baila", img: "Homero.mp4", type: "video" },
    { name: "Sonic TTS", img: "sonic.mp4", type: "video" },
    { name: "Ñoño Bailando",  img: "ñoño.mp4", type: "video" }
  ],
  sticker: [
    {name:"Largate del Grupo", img:"cierralatrompa.jpg"},
    {name:"Naranja 4K", img:"dejemeempaz.jpg"},
    {name:"JIGSAW Joven", img:"jig.jpg"},
    {name:"Perrito Mimido", img:"mimidouwu.jpg"},
    {name:"Monitas Noches", img:"monitas.jpg"}
  ]
};

// escuchar tarjetas
document.querySelectorAll(".category-card").forEach(card=>{
  card.addEventListener("click", ()=>{
    const folder = card.dataset.folder;
    const title = card.dataset.title;
    openCategory(folder,title);
  });
});

function openCategory(folder,title){
  modalTitle.textContent = title;
  modalNominees.innerHTML = "";

  
  nominees[folder]?.forEach(item => {

    // 🎧 AUDIO (círculo con ♫ + play)
    if(item.type === "audio"){
      modalNominees.innerHTML += `
        <div class="nominee-card audio-card">
          <div class="disc">
            <span class="note">♫</span>
          </div>
          <span>${item.name}</span>
          <button class="audio-btn" data-file="${item.file}">▶ Reproducir</button>
        </div>`;
      return;
    }

    // 🎥 VIDEO
    if(item.type === "video"){
      modalNominees.innerHTML += `
        <div class="nominee-card">
          <video class="nominee-media"
                src="assets/categorias/${folder}/${item.img}"
                muted
                loop
                autoplay
                playsinline>
          </video>
          <span>${item.name}</span>
          <button class="vote-btn">Votar</button>
        </div>`;
      return;
    }

    // 🖼️ IMAGEN
    modalNominees.innerHTML += `
      <div class="nominee-card">
        <img class="nominee-media" src="assets/categorias/${folder}/${item.img}">
        <span>${item.name}</span>
        
      </div>`;
  });

  modalUni.classList.add("show");
  document.body.classList.add("modal-open");
}

let currentAudio = null;

document.addEventListener("click", e=>{
  if(e.target.classList.contains("audio-btn")){
    const file = e.target.dataset.file;
    const audio = new Audio(`assets/categorias/audio/${file}`);

    if(currentAudio){
      currentAudio.pause();
      currentAudio = null;
      e.target.textContent = "▶ Reproducir";
      return;
    }

    currentAudio = audio;
    audio.play();
    e.target.textContent = "⏸ Pausar";

    audio.onended = ()=>{
      e.target.textContent = "▶ Reproducir";
      currentAudio=null;
    }
  }
});

closeModalUni.addEventListener("click", ()=>closeCategory());
modalUni.addEventListener("click", e => {
  if(e.target===modalUni){ closeCategory(); }
});

function closeCategory(){
  modalUni.classList.remove("show");
  document.body.classList.remove("modal-open");
}


btnLink.addEventListener("click", ()=>retornaLink());

function retornaLink(){
  let titulo = document.getElementById("modalTitle");

  switch(titulo.textContent){

    case 'Mejor Adaptación':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfHTD3-n0373Nj9R8R5HryYpV4mADgfmrXt51EmbmmptBwZNw/viewform?usp=publish-editor');
        break;
    case 'Mejor Sticker':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSc2_BvU2aQcXmdNCy5w4A9LSqYAxVbL-bE5loxatTM2rMBbjw/viewform?usp=publish-editor');
        break;
    case 'Juego Favorito':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdSYxAWn-G7VJDaUhAO1xihUI7QVC4AgNNqvinAFVWCFaUFZA/viewform?usp=publish-editor');
        break;
    case 'Mejor Audio Discord':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSc1_eKneEGwKed6k6yf-iy7pYzvproGUHmL2GoOtQfudLFtzw/viewform?usp=publish-editor');
        break;
    case 'Mejor Meme Independiente':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdYXgyNiXeZaUs7p9ZNkOpluLFOB2z3d8tNGnzr9vHz8Dq5pQ/viewform?usp=publish-editor');
        break;
    case 'Más Activo de Discord':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLScujnPFys3ClWBZpUoUbhMaY2e9GOH6DUxuP0n7GKagiW110w/viewform?usp=publish-editor');
        break;
    case 'Mejor Integración':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdbWipwE0tIYyLKveqjFXXPn3UjsDTvDcm55P4HAiXHXRf-pQ/viewform?usp=publish-editor');
        break;
    case 'Mejor Meme del Grupo':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSd2_xpUOP29K2ehsOWxp34Svr0jurvXLnKyPrhBJi9B9A57Iw/viewform?usp=publish-editor');
        break;
    case 'Marmota Revelación':
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfti-dxECEy_7lrJ1BIG2zK80fMRANsnx1Q3gOjK-NwlqxkHA/viewform?usp=publish-editor');
        break;

  }
}



