const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".dias"),
prevNextIcon = document.querySelectorAll(".icons span"),
wrapper = document.getElementById('wrapper');

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

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
    let firstDate = new Date(currYear, currMonth + 1 ,1).getDay(),
    lastDate = new Date(currYear, currMonth + 1 ,0).getDate(),
    lastDayMonth = new Date(currYear, currMonth,lastDate).getDay(),
    lastDateofMonth = new Date(currYear, currMonth,0).getDate();

    wrapper.style.backgroundImage = images[currMonth];

    let liTag = "";

    for (let i = firstDate; i > 0; i--) {
        liTag += `<li class="inactivo">${lastDateofMonth - i + 1}</li>`
    }

    for (let i = 1; i <= lastDate; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                            && currYear === new Date().getFullYear() ? "activo" : "";
        let specialDateClass = eventDates[`${currYear}-${currMonth + 1}-${i}`] ? "evento" : "";
        
        liTag += `<li class="${isToday} ${specialDateClass}" data-date="${currYear}-${currMonth + 1}-${i}">${i}</li>`;
        }

    for (let i = lastDayMonth; i < 6; i++) {
        liTag += `<li class="inactivo">${i - lastDayMonth + 1}</li>`
    }
    currentDate.innerText = `${month[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
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
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0|| currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }else{
            date = new Date();
        }
        renderCalendar();
    });
});