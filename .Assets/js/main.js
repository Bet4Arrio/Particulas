var particulas=[];
var mov = 0.0001
var vector = false
var limite = 50
var timing_stop = true;

var carg1={
    ind: null,

    set_ind: (val)=>{
        let a = Number(val.value);
        print(a);
        if(a != null &&  !isNaN(a)){
            print(particulas[a]);
            if(carg1.ind == null){
                carg1.ind = a;
                let select2 = document.getElementById("P2_"+a+"");
                select2.parentNode.removeChild(select2);
            }else{
                let selec = document.getElementById('carg2');
                let opt = document.createElement('option');
                let text = document.createTextNode("Particula " + carg1.ind)
                opt.value = carg1.ind;
                opt.id = "P2_" + carg1.ind + '';
                opt.appendChild(text);
                selec.appendChild(opt);
                let select2 = document.getElementById("P2_" + a + "");
                select2.parentNode.removeChild(select2);
            }
            carg1.ind = a;
            carg1.set_carg();
        }

    },
    set_carg: ()=>{
        if (carg1.ind != null){
            print(particulas[carg1.ind])
            document.getElementById('Carga_1').value = particulas[carg1.ind].carga; 
            carg1.set_color();
        } 
    },
    set_color: ()=>{
        if (particulas[carg1.ind].carga > 0) {
            print("asdsad")
            document.getElementById('particula1').style.backgroundColor = "#FF0000";
        } else if (particulas[carg1.ind].carga < 0) {
            document.getElementById('particula1').style.backgroundColor = "#0000FF";
        } else {
            document.getElementById('particula1').style.backgroundColor = "#FFFFFF";
        }
    },
    set_F: ()=>{
        // print(particulas[carg1.ind])
        if (carg1.ind != null) {
            document.getElementById('forca1').innerHTML = (Math.abs(particulas[carg1.ind].F)).toFixed(2) + "(N)";
        }
    },
    change_Carg: ()=>{
        let val = Number(document.getElementById('Carga_1').value);
        if(val != null && val != NaN){
            particulas[carg1.ind].carga = val;
            carg1.set_color();
            particulas[carg1.ind].change_color();
        }
    },
    remove: ()=>{
        if (carg1.ind != null && carg1.ind == particulas.length - 1){
            let select2 = document.getElementById("P1_" +carg1.ind + "");
            select2.parentNode.removeChild(select2);
            particulas.splice(carg1.ind, 1);
            carg1.ind = null;
            document.getElementById('forca1').innerHTML = '0';
            document.getElementById('particula1').style.backgroundColor = "#FFFFFF";
            document.getElementById('Carga_1').value = '';

        }
    }
}
var interaction = {
    distancia: null,
    Dist: ()=>{
        interaction.distancia = Math.abs(Math.sqrt(Math.pow(particulas[carg1.ind].pos_x - particulas[carg2.ind].pos_x, 2) + Math.pow(particulas[carg1.ind].pos_y - particulas[carg2.ind].pos_y, 2)))/1000;
        let locdis = document.getElementById("int_dist");
        locdis.innerHTML = interaction.distancia.toFixed(3);
    },
    Ep: ()=>{
        let EP = Math.abs(9 * Math.pow(10, 9) * particulas[carg1.ind].carga * Math.pow(10, -6) * particulas[carg2.ind].carga * Math.pow(10, -6)/interaction.distancia);
        document.getElementById("Ep").innerHTML = Math.round(EP);
    },
    Columb: ()=>{
        let F = Math.abs(9 * Math.pow(10, 9) * particulas[carg1.ind].carga * Math.pow(10, -6) * particulas[carg2.ind].carga * Math.pow(10, -6) / Math.pow(interaction.distancia,2));
        document.getElementById("columb").innerHTML = F.toFixed(2);
    },
    TipoF: ()=>{
        let el = document.getElementById("tipo");
        let el2 = document.getElementById("setas");
        if ((particulas[carg1.ind].carga > 0 && particulas[carg2.ind].carga > 0 )|| (particulas[carg1.ind].carga < 0 && particulas[carg2.ind].carga < 0)){
            el.innerHTML="REPULSÃO"
            el2.innerHTML = "&#8672 &#8674"
        } else if (particulas[carg1.ind].carga == 0 || particulas[carg2.ind].carga == 0 ){
            el.innerHTML = "NULA"
            el2.innerHTML = "."
        }else{
            el.innerHTML = "ATRAÇÃO"
            el2.innerHTML = "&#8674 &#8672"
        }

    },
    All: ()=>{
        if(carg1.ind != null && carg2.ind != null){
            interaction.Ep();
            interaction.Dist();
            interaction.TipoF();
            interaction.Columb();
        }

    }

}
var carg2 = {
    ind: null,

    set_ind: (val) => {
        let a = Number(val.value);
        print(a);
        if (a != null && !isNaN(a) && a != carg2.ind) {
            if (carg2.ind == null) {
                carg2.ind = a;
                let select2 = document.getElementById("P1_" + a + "");
                select2.parentNode.removeChild(select2);
            } else {
                let selec = document.getElementById('carg1');
                let opt = document.createElement('option');
                let text = document.createTextNode("Particula " + carg2.ind)
                opt.value = carg2.ind;
                opt.id = "P_1" + carg2.ind + '';
                opt.appendChild(text);
                selec.appendChild(opt);
                let select2 = document.getElementById("P1_" + a + "");
                select2.parentNode.removeChild(select2);
            }
            carg2.ind = a;
            carg2.set_carg();
        }

    },
    set_carg: () => {
        if (carg2.ind != null) {
            document.getElementById('Carga_2').value = particulas[carg2.ind].carga;
            carg2.set_color();
        }
    },
    set_color: ()=>{
        if (particulas[carg2.ind].carga > 0) {
            document.getElementById('particula2').style.backgroundColor = "#FF0000";
        } else if (particulas[carg2.ind].carga < 0) {
            document.getElementById('particula2').style.backgroundColor = "#0000FF";
        } else {
            document.getElementById('particula2').style.backgroundColor = "#FFFFFF";
        }
    },
    set_F: () => {
        if (carg2.ind != null) {
            document.getElementById('forca2').innerHTML = (Math.abs(particulas[carg2.ind].F)).toFixed(2)+"(N)";
        }
    },
    change_Carg: () => {
        let val = Number(document.getElementById('Carga_2').value);
        if (val != null && val != NaN) {
            particulas[carg2.ind].carga = val;
            carg2.set_color();
            particulas[carg2.ind].change_color();
        }
    },
    remove: () => {
        if(carg2.ind != null && carg2.ind == particulas.length-1){
            let select2 = document.getElementById("P2_" + carg2.ind + "");
            select2.parentNode.removeChild(select2);
            particulas.splice(carg2.ind, 1);
            carg2.ind = null;
            document.getElementById('forca2').innerHTML = '0';
            document.getElementById('particula2').style.backgroundColor = "#FFFFFF";
            document.getElementById('Carga_2').value = '';

        }
    }
}


const hei = window.innerHeight - 100;
document.querySelector('body').addEventListener('keydown', function (event) {
    if (event.keyCode == 112) {
        timing_stop = !timing_stop;
        console.log(particulas)
    } else if (event.keyCode == 113){
        vector = !vector
    }else if(event.keyCode == 114){
        //force = !force
    }
    // console.info(event.keyCode);
});

function setup(){
    a = createCanvas(windowWidth, hei);
    textAlign(CENTER, CENTER);
}
function draw(){
    background(51);
    draw_particles();
    if(particulas.length > 0){
        carg1.set_F();
        carg2.set_F();
        interaction.All();
    }
    a.mousePressed(function(){pos_x = mouseX; pos_y = mouseY; open_modal(pos_x, pos_y)});
}

function draw_particles(){
    if(!timing_stop){
        for (let i = 0; i < particulas.length; i++) {
            particulas[i].draw_mov()
        }
    }else{
        for (let i = 0; i < particulas.length; i++) {
            particulas[i].draw_stop()
        }
    }
}

function new_particle(X, Y, val){
    if(val > 0){
        
        cor = color(255, 50, 50)
    }else if(val < 0){
        cor = color(50, 50, 255)
    }else{
        cor = color(255, 255, 255)
    }

    let particula_index = particulas.length
    let particul = new particula(pos_x = X, pos_y = Y, carga = val, particula_index = particula_index, cor = cor)
    particulas.push(particul)
    set_selec(particula_index)
    
}

function set_selec(particula_index){
    let selec = document.getElementById('carg1');
    let opt = document.createElement('option');
    let text = document.createTextNode("Particula "+particula_index)
    opt.value = particula_index;
    opt.id = "P1_"+particula_index+'';
    opt.appendChild(text);
    selec.appendChild(opt);
    selec = document.getElementById('carg2');
    opt = document.createElement('option');
    text = document.createTextNode("Particula "+particula_index)
    opt.value = particula_index;
    opt.id = "P2_" + particula_index + '';
    opt.appendChild(text);
    selec.appendChild(opt);
    if (particula_index > 0) {
        document.getElementById('dados_2').style.visibility = "visible";
        document.getElementById('seleciona2').style.visibility = "visible";
        document.getElementById('interage').style.visibility = "visible";
    }
}


function open_modal(pos_x, pos_y){
    console.log(pos_x+"||"+pos_y)
    let modal = document.getElementById("modal");
    let btncria = document.getElementById("cria");
    let btncancela = document.getElementById("cancela");
    let campoCarga = document.getElementById("carga");
    campoCarga.focus();
    modal.style.display = "inline-block";
    btncria.onclick = ()=>{
        let carga = Number(document.getElementById("carga").value)
        new_particle(X = pos_x, Y = pos_y, val = carga)
        campoCarga.value = null;
        document.getElementById("parti").style.backgroundColor = "#fff";
        modal.style.display = "none";
    };
    btncancela.onclick = ()=>{
        campoCarga.value = null;
        modal.style.display = "none";
    };
    campoCarga.onkeyup = ()=>{
        let carga = Number(document.getElementById("carga").value)
        // console.log(carga)
        if (carga > 0) {
            document.getElementById("parti").style.backgroundColor = "#CF0000"
        } else if (carga < 0) {
            document.getElementById("parti").style.backgroundColor = "#0000CF"
        } else {
            document.getElementById("parti").style.backgroundColor = "#fff"
        }
    };
}

function particula(pos_x, pos_y, carga, particula_index, cor) {
    this.pos_x = pos_x
    this.pos_y = pos_y
    this.carga = carga
    this.cor = cor
    this.index = particula_index
    this.Fx = 0
    this.Fy = 0
    this.F = 0
    this.draw_charge = ()=>{
        fill(0);
        text(str(this.index), this.pos_x,this.pos_y);
    }
    this.draw_stop = ()=>{
        fill(this.cor)
        circle(this.pos_x, this.pos_y, 25);
        if(this.carga != 0){
            this.Physics()
        }
        this.draw_vector()
        this.draw_charge()
    }
    this.draw_vector = ()=>{
        let fimx = this.pos_x + this.Fx * 0.01
        let fimy = this.pos_y + this.Fy * 0.01
        line(this.pos_x, this.pos_y, fimx, fimy)
        if(fimy >= this.pos_y ){
            triangle(fimx + 5, fimy + 5, fimx, fimy, fimx + 5, fimy - 5)
        }else{
            triangle(fimx - 5, fimy - 5, fimx, fimy, fimx - 5, fimy + 5)
        }   
    }
    this.draw_mov = ()=>{
        if(this.carga != 0){
            this.Physics()
            this.pos_y = this.pos_y + this.Fy * mov
            this.pos_x = this.pos_x + this.Fx * mov
            if (this.pos_y <= 50) {
                this.pos_y = this.pos_y + 2 * Math.abs(this.Fy) * mov
            } else if (this.pos_y >= (hei - 50)) {
                this.pos_y = this.pos_y - 2 * Math.abs(this.Fy) * mov
            }
            if (this.pos_x <= 50) {
                this.pos_x = this.pos_x + 2* Math.abs(this.Fx) * mov
            } else if (this.pos_x >= (windowWidth - 50)) {
                this.pos_x = this.pos_x - 2 * Math.abs(this.Fx) * mov
            }
        }
        fill(this.cor)
        circle(this.pos_x, this.pos_y, 25);
        if(vector){
            this.draw_vector()
        }
            this.draw_charge()
    }
    this.Physics = ()=>{
        let interactions = particulas
        let d = 0.0
        let F = 0.0
        let Fx = 0.0
        let Fy = 0.0
        let Ftotx = 0.0
        let Ftoty = 0.0
        // interactions.splice(this.index, 1)
        for (let i = 0; i < interactions.length; i++){
            if( i != this.index && interactions[i].carga != 0){
                x1 = interactions[i].pos_x
                y1 = interactions[i].pos_y
                d = Math.abs(Math.sqrt(Math.pow(interactions[i].pos_x - this.pos_x,2) + Math.pow(interactions[i].pos_y-this.pos_y, 2)))/1000;
                if(d > 0.045 || ((interactions[i].carga > 0 && this.carga > 0) || (interactions[i].carga < 0 && this.carga < 0))){
                    F = (9 * Math.pow(10, 9)) * (this.carga * Math.pow(10, -6) *interactions[i].carga *Math.pow(10, -6))/Math.pow(d,2)    
                    if (interactions[i].pos_y - this.pos_y > 0 ){
                        var cos = (interactions[i].pos_y  - this.pos_y)/ d
                        var sen = (interactions[i].pos_x - this.pos_x) / d
                    } else if (interactions[i].pos_y - this.pos_y < 0){
                        var cos = (interactions[i].pos_x - this.pos_x) / d
                        var sen = (interactions[i].pos_y - this.pos_y) / d
                    } else if (Math.abs(interactions[i].pos_y) - Math.abs(this.pos_y) == 0){
                        var cos = 1
                        var sen = 0
                    }
                    Fx = Math.abs(F*cos)
                    Fy = Math.abs(F*sen)
                    
                    if ((interactions[i].carga > 0 && this.carga > 0) || (interactions[i].carga < 0 && this.carga < 0)){
                        if(interactions[i].pos_y - this.pos_y > 0){
                            Ftoty = Ftoty - Fy
                        }else{
                            Ftoty = Ftoty + Fy
                        }
                        if(interactions[i].pos_x - this.pos_x > 0){
                            Ftotx = Ftotx - Fx
                        }else{
                            Ftotx = Ftotx + Fx
                        }
                        
                    }else{
                        if (interactions[i].pos_y - this.pos_y > 0) {
                            Ftoty = Ftoty + Fy
                        } else {
                            Ftoty = Ftoty - Fy
                        }
                        if (interactions[i].pos_x - this.pos_x > 0) {
                            Ftotx = Ftotx + Fx
                        } else {
                            Ftotx = Ftotx - Fx
                        }
                    }
                }else{
                    this.contatc(interactions[i]);
                    i = 0
                }

            } else if (interactions[i].carga == 0){
                this.contatc(interactions[i], i)
            }   
        }
        this.Fx = Ftotx
        this.Fy = Ftoty
        this.F = F

        
    }
    this.contatc = (Q, a)=>{
        if(Math.abs(this.carga) > Math.abs(Q.carga)){
            let charge = Math.abs(this.carga) - Math.abs(Q.carga)
            if(this.carga > 0 ){
                this.carga = charge/2
                Q.carga = charge/2
                this.cor = color(255, 0, 0)
                Q.cor = color(255, 0, 0)
            }else{
                this.carga = 0 -charge/2
                Q.carga = 0 -charge/2
                this.cor = color(0, 0, 255)
                Q.cor = color(0, 0, 255)
            }
        }else if(Math.abs(this.carga) < Math.abs(Q.carga)){
            let charge = Math.abs(Q.carga) - Math.abs(this.carga) 
            if(Q.carga > 0 ){
                this.carga = charge/2
                Q.carga = charge/2
                this.cor = color(255, 0, 0)
                Q.cor = color(255, 0, 0)
            }else{
                this.carga = 0-charge/2
                Q.carga = 0-charge/2
                this.cor = color(0, 0, 255)
                Q.cor = color(0, 0, 255)
                
            }
        }else{
            this.carga = 0
            this.Fx = 0
            this.Fy = 0
            Q.carga = 0
            Q.Fx = 0
            Q.Fy = 0
            this.cor = color(255, 255, 255)
            Q.cor = color(255, 255, 255)
        }
            carg1.set_carg();     
            carg2.set_carg();   
    } 
    this.change_color = ()=>{
        if(this.carga > 0){
            this.cor = color(255, 0, 0);
        }else if(this.carga<0){
            this.cor = color(0, 0, 255);
        }else{
            this.cor = color(255, 255, 255);
        }
    }
}