// HTML den gerekli elementleri se�iyoruz
const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

// Hesap makinesi �zerindeki de�erleri tutacak de�i�kenler
let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Ekran� g�ncelleyen fonksiyon
function updateDisplay() {
    display.value = displayValue;
}

// Sayfa y�klendi�inde ekran� ba�lang�� de�eriyle g�ncelliyoruz

updateDisplay();

// Tu�lara t�klama olay�n� dinleyen fonksiyon
keys.addEventListener('click', function (e) {
    const element = e.target;
    const value = element.value;
    //Button d��� t�klama yap�nca tepki vermesin diye(bo�luk alanlar�na)
    if (!element.matches('button')) return;

    switch (element.value) {
         // Operator tu�lar� ve e�ittir tu�unu ele al�yoruz
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
         // Nokta tu�unu ele al�yoruz
        case '.':
            inputDecimal();
            break;
         // Temizleme tu�unu ele al�yoruz
        case 'clear':
            clear();
            break;
         // Say� tu�lar�n� ele al�yoruz
        default:
            inputNumber(value);

    }
     // Tu�a her t�klamada ekran� g�ncelliyoruz
    updateDisplay();
});


// Operator tu�lar� ve e�ittir tu�unu ele alan fonksiyon
function handleOperator(nextOperator) {
    //�u anki de�eri al�yoruz
    const value = parseFloat(displayValue);

    // Birden fazla kere i�lem yapmak i�in(tekrar operat�re t�klamak i�in) 
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        // �lk de�er atanmam��sa, �u anki de�eri ilk de�er olarak at�yoruz
        firstValue = value;
    } else if (operator) {
        // Operat�r varsa ve �u anki de�eri kullanarak i�lem yap�yoruz
        const result = calculate(firstValue, value, operator);

        //Virg�lden sonra 7 basamak ile s�n�rland�ral�m
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    //�kinci bir de�er giri�i i�in bekleniyor mu? = true olsun
    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);

}


// ��lemi ger�ekle�tiren fonksiyon
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
    // E�ittir butonuna t�klanm��sa sadece ikinci say�y� d�nd�r
    return second;  
}



// Say� tu�lar�n� ele alan fonksiyon
function inputNumber(num) {
    if (waitingForSecondValue) {
        // �kinci bir de�er giri�i bekleniyorsa, �u anki de�eri g�ncelliyoruz
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        //Say� 0 a e�it ise num de�erini de�i�tir, 0 de�ilse sonuna ekle (sadece tek basamakl� say� yazma sorununu ��zd�k)
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Nokta tu�unu ele alan fonksiyon
function inputDecimal() {
    //Nokta i�eriyorsa ba�ka nokta koyamayal�m diye
    if (!displayValue.includes('.')) {
        displayValue += '.'
    }
}

// Temizleme tu�unu ele alan fonksiyon
function clear() {
    //T�m de�erleri s�f�rlay�n
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}