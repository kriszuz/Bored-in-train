let root = document.querySelector('.root');
const heroSection = `<div class="hero-section">
    <h1>Zamów pyszne jedzenie pod twoje drzwi!</h1>
    <div class="search-line">
        <input type="text" placeholder="Wpisz adres" id="addres">
        <button>Szukaj</button>
    </div>   
    </div>`

let restaurants = [{name: "McDonalds", items: [{name: "Nuggets", price: 10}, {name: "McChicken", price: 22}]}, {name: "Hospudka", items: [{name: "Ser smażony", price: 20}, {name: "Knedliki", price: 30}]}, {name: "Frontiera", items: [{name: "Margeritta", price: 29}, {name: "Toskania", price: 32}]}]
let addres = null
let basket = []
let dostawa = 3

const sumBasket = () => {
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
        sum = sum + basket[i].price;
    } 
    return sum;
}

const renderFinalOrder = (restaurantIndex, addresInput, nameInput, surnameInput, phoneInput, uwagiInput) =>{
    root.innerHTML = `
    <div class="final">
        <div class="final-info">
            <h2>Dziękujemy za złożenie zamówienia z restauracji ${restaurants[restaurantIndex].name} na kwotę <span>${sumBasket() + dostawa} złotych!</span></h2>
            <span>Średni czas dostawy wynosi 30 minut</span>
        </div class="final-info">
        <div class="details">
            <h3>Szczegóły zamówienia:</h3>
            <li>Adres: <span>${addresInput}</span></li>
            <li>Imie: <span>${nameInput}</span></li>
            <li>Nazwisko: <span>${surnameInput}</span></li>
            <li>Telefon: <span>${phoneInput}</span></li>
            <li>Uwagi: <span>${uwagiInput}</span></li>
        </div>
    </div>
    `
}

const renderSummarySection = (restaurantIndex, value) => {
    root.innerHTML = `
        <div class="summary-section">
        <h2>Restauracja ${restaurants[restaurantIndex].name}</h2>
        <div class="form">
            <label>Adres:<input value=${value}></label>
            <label>Imie:<input placeholder="Twoje imie"></label>
            <label>Nazwisko:<input placeholder="Twoje nazwisko"></label>
            <label>Telefon:<input placeholder="Numer telefonu"></label>
            <div class="uwagi">
                <h4>Uwagi:</h4>
                <textarea placeholder="Uwagi dotyczące zamówienia"></textarea>
            </div>
            <div class="sum">
                <li class="item">Zamówienie <span>${sumBasket()} zł</span></li>
                <li class="item">Dostawa <span>${dostawa} zł</span></li>
                <li class="summary">RAZEM: <span>${sumBasket() + dostawa} zł</span></li>
            </div>
            <button>Zamawiam</button>
        </div>
    `

    const addresInput = document.querySelectorAll(".summary-section input")[0]
    const nameInput = document.querySelectorAll(".summary-section input")[1]
    const surnameInput = document.querySelectorAll(".summary-section input")[2]
    const phoneInput = document.querySelectorAll(".summary-section input")[3]
    const uwagiInput = document.querySelectorAll(".summary-section textarea")[0]

    const orderButton = document.querySelector(".summary-section button")

    orderButton.addEventListener('click', () => {
        renderFinalOrder(restaurantIndex, addresInput.value, nameInput.value, surnameInput.value, phoneInput.value, uwagiInput.value)
    })

}

const newItemInBasket = (restaurantIndex, value, item) =>{
    basket.push(restaurants[restaurantIndex].items[item])
    console.log(basket)
    root.innerHTML = `
    <div class="list-section">
            <h1>Zamawiasz dla adresu: <span>${value}</span></h1>
            <div class="restaurants">
            <h2>Restauracja ${restaurants[restaurantIndex].name}:</h2>
                <div class='restaurant'><span>${restaurants[restaurantIndex].items[0].name}, ${restaurants[restaurantIndex].items[0].price} zł</span><button>+</button></div>
                <div class='restaurant'><span>${restaurants[restaurantIndex].items[1].name}, ${restaurants[restaurantIndex].items[1].price} zł</span><button>+</button></div>
            </div>
            <div class="koszyk">
                <h3>Koszyk:</h3>
                ${basket.map((basketItem) => `<li class="basket-line">${basketItem.name}<span>${basketItem.price} zł</span></li>`).join("")}
                <li class="summary">RAZEM: <span>${sumBasket()} zł</span></li>
                <button class="summaryButton">Zapłać</button>
            </div>
    </div>`
    const addButton1 = document.querySelectorAll(".restaurant button")[0]
    const addButton2 = document.querySelectorAll(".restaurant button")[1]
    const payButton = document.querySelector('.summaryButton')

    addButton1.addEventListener('click', () => {
        newItemInBasket(restaurantIndex, value, 0)
    })
    addButton2.addEventListener('click', () => {
        newItemInBasket(restaurantIndex, value, 1)
    })
    payButton.addEventListener('click', () => {
        renderSummarySection(restaurantIndex, value)
    })
}

const renderRestaurantFood = (restaurantIndex, value) => {
    root.innerHTML = `
    <div class="list-section">
            <h1>Zamawiasz dla adresu: <span>${value}</span></h1>
            <div class="restaurants">
            <h2>Restauracja ${restaurants[restaurantIndex].name}:</h2>
                <div class='restaurant'><span>${restaurants[restaurantIndex].items[0].name}, ${restaurants[restaurantIndex].items[0].price} zł</span><button>+</button></div>
                <div class='restaurant'><span>${restaurants[restaurantIndex].items[1].name}, ${restaurants[restaurantIndex].items[1].price} zł</span><button>+</button></div>
            </div>
    </div>`

    const addButton1 = document.querySelectorAll(".restaurant button")[0]
    const addButton2 = document.querySelectorAll(".restaurant button")[1]

    addButton1.addEventListener('click', () => {
        newItemInBasket(restaurantIndex, value, 0)
    })
    addButton2.addEventListener('click', () => {
        newItemInBasket(restaurantIndex, value, 1)
    })

}

const renderList = (value) => {
    root.innerHTML = `
        <div class="list-section">
            <h1>Zamawiasz dla adresu: <span>${value}</span></h1>
            <div class="restaurants">
                <div class='restaurant'><span>${restaurants[0].name}</span><button>Zamów</button></div>
                <div class='restaurant'><span>${restaurants[1].name}</span><button>Zamów</button></div>
                <div class='restaurant'><span>${restaurants[2].name}</span><button>Zamów</button></div>
            </div>
        </div>`
        const McButton = document.querySelectorAll(".restaurant button")[0]
        const HospudkaButton = document.querySelectorAll(".restaurant button")[1]
        const FrontieraButton = document.querySelectorAll(".restaurant button")[2]

        McButton.addEventListener('click', () => {
            renderRestaurantFood(0, value)
        })
        HospudkaButton.addEventListener('click', () => {
            renderRestaurantFood(1, value)
        })
        FrontieraButton.addEventListener('click', () => {
            renderRestaurantFood(2, value)
        })
}

const renderApp = () => {
    root.innerHTML = heroSection
    const input = document.querySelector('.search-line input')
    const button = document.querySelector('.search-line button')
    button.addEventListener('click', () => {
        addres = input.value;
        renderList(addres)
    })
    
    
}

    
console.log('working');

document.onload = renderApp()


