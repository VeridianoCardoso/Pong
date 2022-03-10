//bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 18;
let raioBolinha = diametroBolinha/2;
let colidiu = false;


let velocidadeXBolinha = 4;
let velocidadeYBolinha = 4;

// Raquete Jogador
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let comprimentoRaqueteOponente = 10;
let alturaRaqueteOponente = 90;

let velocidadeYOponente;

//placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo

let raquetada;
let ponto;
let trilha;

let chanceDeErrar;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}



function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBordas();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteJogador();
  movimentaRaqueteOponente();
  
  verificaColisaoRaqueteExterna(xRaquete, yRaquete);
  verificaColisaoRaqueteExterna(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto()
  
  
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametroBolinha);  
}


function movimentaBolinha(){
   xBolinha += velocidadeXBolinha;
   yBolinha += velocidadeYBolinha;  
}


function verificaColisaoBordas(){
  
  if (xBolinha - raioBolinha <= 0 || xBolinha + raioBolinha >= width) {
  velocidadeXBolinha *= -1;
    
  }
  
  if (yBolinha - raioBolinha <= 0 || yBolinha + raioBolinha >= height) {
  velocidadeYBolinha *= -1;
    
  }
}

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
  
}


function movimentaRaqueteJogador(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete/2 - 30;
  yRaqueteOponente += velocidadeYOponente;
  calculaChanceDeErrar();
  
}



function verificaColisaoRaqueteExterna(x, y){
 colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raioBolinha);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16)
  
  fill(color(255,140,0));
  rect(130, 10, 40, 20);
  fill(color(255,140,0));
  rect(430,10, 40, 20 );
  
  fill(255);
  text(meusPontos, 150, 26);
  fill(255);
  text("PLACAR", 300, 26);
  fill(255);
  text(pontosOponente, 450, 26);
}

function marcaPonto(){
  if(xBolinha> 590){
    meusPontos ++;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente ++;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }  
  }
  else{
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35;
    }
  }
  
}
