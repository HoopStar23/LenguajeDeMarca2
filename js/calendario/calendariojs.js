const diaActual = document.querySelector(".current-date"),
diaTag = document.querySelector(".dias"),
prevNextIcon = document.querySelectorAll(".icons span"),
wrapper = document.getElementById('wrapper');

let date = new Date(),
anyoActual = date.getFullYear(),
mesActual = date.getMonth();

const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const images = [
'url("../../img/calendario/calendarioImgMonths/1.jpg")', 
'url("../../img/calendario/calendarioImgMonths/2.jpg")', 
'url("../../img/calendario/calendarioImgMonths/3.jpg")',
'url("../../img/calendario/calendarioImgMonths/4.jpg")',
'url("../../img/calendario/calendarioImgMonths/5.jpg")',
'url("../../img/calendario/calendarioImgMonths/6.jpg")',
'url("../../img/calendario/calendarioImgMonths/7.jpg")',
'url("../../img/calendario/calendarioImgMonths/8.jpg")',
'url("../../img/calendario/calendarioImgMonths/9.jpg")',
'url("../../img/calendario/calendarioImgMonths/10.jpg")',
'url("../../img/calendario/calendarioImgMonths/11.jpg")',
'url("../../img/calendario/calendarioImgMonths/12.jpg")'];

let eventDates = {};

const renderCalendar = () => {
    let primerDia = new Date(anyoActual, mesActual ,1).getDay(),
    ultimoDia = new Date(anyoActual, mesActual + 1 ,0).getDate(),
    ultimoDiaMes = new Date(anyoActual, mesActual,ultimoDia).getDay(),
    ultimoDiaDeUltimoMes = new Date(anyoActual, mesActual,0).getDate();

    wrapper.style.backgroundImage = images[mesActual];

    let liTag = "";

    for (let i = primerDia; i > 0; i--) {
        liTag += `<li class="inactivo">${ultimoDiaDeUltimoMes - i + 1}</li>`
    }

    for (let i = 1; i <= ultimoDia; i++) {
        let isToday = i === date.getDate() && mesActual === new Date().getMonth()
                            && anyoActual === new Date().getFullYear() ? "activo" : "";
        let specialDateClass = eventDates[`${anyoActual}-${mesActual + 1}-${i}`] ? "evento" : "";
        
        liTag += `<li class="${isToday} ${specialDateClass}" data-date="${anyoActual}-${mesActual + 1}-${i}">${i}</li>`;
        }

    for (let i = ultimoDiaMes; i < 6; i++) {
        liTag += `<li class="inactivo">${i - ultimoDiaMes + 1}</li>`
    }
    diaActual.innerText = `${month[mesActual]} ${anyoActual}`;
    diaTag.innerHTML = liTag;
    marcarEvento();
}




const toggleEventDate = (date) => {
    if (eventDates[date]) {
        delete eventDates[date];
    } else {
        eventDates[date] = true;
    }
}

function marcarEvento(){
    document.querySelectorAll(".dias li:not(.inactivo)").forEach(day => {
        day.addEventListener("click", (e) => {
            const date = e.target.getAttribute('data-date');
            e.target.classList.add("evento");
            toggleEventDate(date);
        });
    });
}

function quitarEvento(){
    document.querySelectorAll(".dias li:not(.inactivo)").forEach(day => {
        day.addEventListener("click", (e) => {
            e.target.classList.remove("evento");
        });
    });
}

renderCalendar();

prevNextIcon.forEach(icon =>{
    icon.addEventListener("click", () =>{
        mesActual = icon.id === "prev" ? mesActual - 1 : mesActual + 1;

        if (mesActual < 0|| mesActual > 11) {
            date = new Date(anyoActual, mesActual);
            anyoActual = date.getFullYear();
            mesActual = date.getMonth();
        }else{
            date = new Date();
        }
        renderCalendar();
    });
});