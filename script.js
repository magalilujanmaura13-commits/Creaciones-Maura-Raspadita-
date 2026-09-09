const canvasList = document.querySelectorAll(".canvas");
const premiosHTML = document.querySelectorAll(".premio");

const mensaje = document.getElementById("mensaje");
const textoPremio = document.getElementById("textoPremio");

let premioElegido = premios[Math.floor(Math.random()*premios.length)];

let jugado = false;

canvasList.forEach((canvas,index)=>{

const ctx = canvas.getContext("2d");

canvas.width = 105;
canvas.height = 105;

ctx.fillStyle="#FFD54F";
ctx.beginPath();
ctx.arc(52.5,52.5,52.5,0,Math.PI*2);
ctx.fill();

ctx.fillStyle="#ffffff";
ctx.font="bold 16px Arial";
ctx.textAlign="center";
ctx.fillText("RASPÁ",52,48);
ctx.fillText("AQUÍ",52,68);

ctx.globalCompositeOperation="destination-out";

let raspando=false;

function raspar(x,y){

ctx.beginPath();

ctx.arc(x,y,16,0,Math.PI*2);

ctx.fill();

}

canvas.addEventListener("mousedown",()=>{

if(jugado)return;

raspando=true;

});

canvas.addEventListener("mouseup",()=>{

raspando=false;

});

canvas.addEventListener("mousemove",(e)=>{

if(!raspando)return;

const rect=canvas.getBoundingClientRect();

raspar(e.clientX-rect.left,e.clientY-rect.top);

comprobar(index);

});

canvas.addEventListener("touchstart",()=>{

if(jugado)return;

raspando=true;

});

canvas.addEventListener("touchend",()=>{

raspando=false;

});

canvas.addEventListener("touchmove",(e)=>{

if(!raspando)return;

e.preventDefault();

const rect=canvas.getBoundingClientRect();

const t=e.touches[0];

raspar(t.clientX-rect.left,t.clientY-rect.top);

comprobar(index);

});

});function comprobar(indice){

if(jugado)return;

const canvas = canvasList[indice];
const ctx = canvas.getContext("2d");

const img = ctx.getImageData(0,0,canvas.width,canvas.height);

let transparentes = 0;

for(let i=3;i<img.data.length;i+=4){

    if(img.data[i]===0){

        transparentes++;

    }

}

const porcentaje = transparentes/(canvas.width*canvas.height);

if(porcentaje>=0.40){

    jugado=true;

    canvas.style.display="none";

    premiosHTML[indice].classList.remove("oculto");

    premiosHTML[indice].innerHTML="🎁";

    textoPremio.innerHTML=premioElegido;

    mensaje.classList.remove("oculto");

    bloquearRestantes(indice);

    lanzarConfeti();

}

}

function bloquearRestantes(indiceElegido){

canvasList.forEach((canvas,i)=>{

    if(i!==indiceElegido){

        canvas.style.pointerEvents="none";

        canvas.style.opacity=".35";

    }

});

}

function lanzarConfeti(){

for(let i=0;i<80;i++){

    const papel=document.createElement("div");

    papel.style.position="fixed";
    papel.style.left=Math.random()*100+"vw";
    papel.style.top="-20px";
    papel.style.width="8px";
    papel.style.height="12px";
    papel.style.background=[
        "#ff4ea3",
        "#c03cff",
        "#ffd84d",
        "#ffffff"
    ][Math.floor(Math.random()*4)];

    papel.style.borderRadius="2px";
    papel.style.zIndex="9999";
    papel.style.pointerEvents="none";

    document.body.appendChild(papel);

    const duracion=2500+Math.random()*1500;

    papel.animate(

    [

    {
        transform:"translateY(0px) rotate(0deg)"
    },

    {
        transform:`translateY(${window.innerHeight+100}px) rotate(${Math.random()*720}deg)`
    }

    ],

    {

    duration:duracion,

    easing:"ease-out"

    }

    );

    setTimeout(()=>{

        papel.remove();

    },duracion);

}

}