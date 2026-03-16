const UserName = prompt ("Как тебя зовут?"); 
console.log ("Привет," + UserName + "!");

const UserAge = Number(prompt ("Сколько тебе лет?"));
if (UserAge < 18) {
    console.log ("Возраст не принят");
} else {
    console.log ("Возраст принят");
}

const role = prompt ("Кто ты: guest, user?");
const message = role === "user" ? "Добро пожаловать обратно!" : "Заходи";

console.log (message);

const social = prompt("Какую соцсеть ты используешь чаще всего?");

if (social === "YouTube") {
    console.log("Видюшки");
} else if (social === "TikTok") {
    console.log ("Видюшки покороче");
} else if (social === "Instagram") {
    console.log ("Фоточки");
} else if (social === "Telegram") {
    console.log ("Чаты");
} else {
    console.log ("Интересно...");
}

if (UserAge >= 18 && role === "user") {
    alert("Доступ разрешен");
} else {
    alert ("Доступ запрещен");
}

let description;

switch(social) {
    case "YouTube":
    description = "Вечный зритель. Даже рекламу не пропускаешь.";
    break;
    case "TikTok":
    description = "Пальцы у тебя прокачаны — скроллишь быстрее, чем думаешь.";
    break;
    case "Instagram":
    description = "Главное — не жизнь, а красивый завтрак. Одобряем.";
    break;
    case "Telegram":
    description = "Счастливый обладатель премиум";
    break;
    default:
    description = "Ты вне матрицы. Мы не знаем, как ты сюда попал.";
}

alert ("Анализ завершён. " + UserName + ", ты — " + description);