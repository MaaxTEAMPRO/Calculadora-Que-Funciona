const quotes = [
    '"O dinheiro é um servo excelente, mas um mestre terrível." - Francis Bacon',
    '"Riqueza não é sobre ter muito dinheiro, mas sobre ter muitas opções." - Chris Rock',
    '"O preço é o que você paga. O valor é o que você recebe." - Warren Buffett',
    '"Não é o dinheiro que faz você feliz, é a paz de espírito." - Dalai Lama',
    '"Dinheiro é apenas uma ferramenta. Te levará aonde quiser, mas não te substituirá como motorista." - Ayn Rand',
    '"A verdadeira riqueza é ter menos desejos." - Lao Tsé',
    '"Invista em você mesmo. Seu talento é seu capital mais valioso." - Benjamin Franklin',
    '"A maior riqueza é a sabedoria." - Sócrates',
    '"Dinheiro não compra felicidade, mas a falta dele também não." - Millôr Fernandes',
    '"Seja rico em experiências, não em posses." - Confúcio',
    '💡 Guarde 20% do seu salário todo mês, mesmo que seja pouco.',
    '💡 Antes de comprar algo, espere 24 horas para evitar compras por impulso.',
    '💡 Mantenha um fundo de emergência para 6 meses de despesas.',
    '💡 Anote todos os seus gastos por 30 dias. Você vai se surpreender.',
    '💡 Pague sempre o valor total do cartão de crédito, nunca o mínimo.',
    '💡 Invista em conhecimento, é o único investimento que ninguém pode tirar de você.',
    '💡 Compare preços antes de comprar, inclusive em lojas online.',
    '💡 Evite dívidas para comprar coisas que se depreciam.',
    '💡 Automatize suas economias com transferências automáticas.',
    '💡 Aprenda sobre investimentos antes de investir.',
    '💡 Use a regra 50/30/20: 50% necessidades, 30% desejos, 20% poupança.',
    '💡 Cancele assinaturas que você não usa frequentemente.',
    '💡 Faça manutenção preventiva de seus bens para evitar gastos maiores.',
    '💡 Pesquise preços de seguro anualmente para encontrar melhores ofertas.',
    '💡 Crie múltiplas fontes de renda.'
];
function displayRandomQuote() {
    const quoteElement = document.getElementById('random-quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}
window.addEventListener('load', displayRandomQuote);
class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }
    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Não é possível dividir por zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }
    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        if (this.operation != null) {
            document.querySelector('.previous-operand').textContent =
                `${this.previousOperand} ${this.operation}`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}
const calculator = new Calculator();
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});
document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});
document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
document.addEventListener('keydown', event => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        const operatorMap = {
            '*': '×',
            '/': '÷'
        };
        calculator.chooseOperation(operatorMap[event.key] || event.key);
        calculator.updateDisplay();
    }
    if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    }
    if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
}); 