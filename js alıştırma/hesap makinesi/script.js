// HTML den gerekli elementleri seçiyoruz
const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

// Hesap makinesi üzerindeki deðerleri tutacak deðiþkenler
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Ekraný güncelleyen fonksiyon
function updateDisplay() {
    display.value = displayValue;
}

// Sayfa yüklendiðinde ekraný baþlangýç deðeriyle güncelliyoruz

updateDisplay();

// Tuþlara týklama olayýný dinleyen fonksiyon
keys.addEventListener('click', function (e) {
    const element = e.target;
    const value = element.value;
    //Button dýþý týklama yapýnca tepki vermesin diye(boþluk alanlarýna)
    if (!element.matches('button')) return;

    switch (element.value) {
         // Operator tuþlarý ve eþittir tuþunu ele alýyoruz
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
         // Nokta tuþunu ele alýyoruz
        case '.':
            inputDecimal();
            break;
         // Temizleme tuþunu ele alýyoruz
        case 'clear':
            clear();
            break;
         // Sayý tuþlarýný ele alýyoruz
        default:
            inputNumber(value);

    }
     // Tuþa her týklamada ekraný güncelliyoruz
    updateDisplay();
});


// Operator tuþlarý ve eþittir tuþunu ele alan fonksiyon
function handleOperator(nextOperator) {
    //Þu anki deðeri alýyoruz
    const value = parseFloat(displayValue);

    // Birden fazla kere iþlem yapmak için(tekrar operatöre týklamak için) 
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        // Ýlk deðer atanmamýþsa, þu anki deðeri ilk deðer olarak atýyoruz
        firstValue = value;
    } else if (operator) {
        // Operatör varsa ve þu anki deðeri kullanarak iþlem yapýyoruz
        const result = calculate(firstValue, value, operator);

        //Virgülden sonra 7 basamak ile sýnýrlandýralým
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    //Ýkinci bir deðer giriþi için bekleniyor mu? = true olsun
    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);

}


// Ýþlemi gerçekleþtiren fonksiyon
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second; 
    }
    // Eþittir butonuna týklanmýþsa sadece ikinci sayýyý döndür
    return second;  
}



// Sayý tuþlarýný ele alan fonksiyon
function inputNumber(num) {
    if (waitingForSecondValue) {
        // Ýkinci bir deðer giriþi bekleniyorsa, þu anki deðeri güncelliyoruz
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        //Sayý 0 a eþit ise num deðerini deðiþtir, 0 deðilse sonuna ekle (sadece tek basamaklý sayý yazma sorununu çözdük)
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Nokta tuþunu ele alan fonksiyon
function inputDecimal() {
    //Nokta içeriyorsa baþka nokta koyamayalým diye
    if (!displayValue.includes('.')) {
        displayValue += '.'
    }
}

// Temizleme tuþunu ele alan fonksiyon
function clear() {
    //Tüm deðerleri sýfýrlayýn
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}