const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".dias"),
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const renderCalendar = () => {
    let firstDate = new Date(currYear, currMonth + 1 ,1).getDay(),
    lastDate = new Date(currYear, currMonth + 1 ,0).getDate(),
    lastDayMonth = new Date(currYear, currMonth,lastDate).getDay(),
    lastDateofMonth = new Date(currYear, currMonth,0).getDate();

    let liTag = "";

    for (let i = firstDate; i > 0; i--) {
        liTag += `<li class="inactivo">${lastDateofMonth - i + 1}</li>`
    }

    for (let i = 1; i <= lastDate; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                            && currYear === new Date().getFullYear() ? "activo" : "";
        let specialDateClass = i === 31 && currMonth === 4 &&  currYear === 2024 ? "evento" : "";
        
        liTag += `<li class="${isToday} ${specialDateClass}">${i}</li>`
    }

    for (let i = lastDayMonth; i < 6; i++) {
        liTag += `<li class="inactivo">${i - lastDayMonth + 1}</li>`
    }
    currentDate.innerText = `${month[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    marcarEvento();
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
    })
})

function marcarEvento(){
    document.querySelectorAll(".dias li:not(.inactivo)").forEach(day => {
        day.addEventListener("click", (e) => {
            e.target.classList.add("evento");
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