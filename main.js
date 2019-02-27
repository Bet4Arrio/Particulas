let particulas = [];
var a;
var pos_x;
var pos_y;


function setup(){
    a = createCanvas(windowWidth, 590);
}

function draw(){
    background(51);
    draw_particles();
    a.mousePressed(function(){pos_x = mouseX; pos_y = mouseY; open_modal()});
}

function open_modal(){
    (M.Modal.getInstance(document.getElementById('modal_add'))).open();
}

document.getElementById('forcas').addEventListener('submit',add_particula);

function add_particula(){
    (M.Modal.getInstance(document.getElementById('modal_add'))).close();
    let cor;
    let forca = $('#forca').val();
    if($('#forca').val() < 0){
        forca = $('#forca').val()*-1;
        cor = color(255,0,0);
    }else if($('#forca').val() == 0){
        cor = color(255,255,255); 
    }else{
        cor = color(0,0,255);
    }
    particula = new Particula(pos_x,pos_y,forca,cor);
    particulas.push(particula);
    document.getElementById('forcas').reset();
}

function draw_particles(){
    for (let i = 0; i < particulas.length; ++i){
        particula = particulas[i];
        fill(particula.cor);
        if(particula.forca == 0){
            ellipse(particula.x, particula.y, 100);
        }else{
            ellipse(particula.x, particula.y, int(particula.forca));
        }
    }
}

class Particula{
    constructor(x, y, forca, cor){
        this.x = x;
        this.y = y;
        this.forca = forca;
        this.cor = cor;
    }
}


function resetar(){
    location.href="./";
}