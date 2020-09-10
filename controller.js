/* Klasse Calculator */
class Calculator {
    constructor(previousOutputText, currentOutputText) {
        this.previousOutputText = previousOutputText
        this.currentOutputText = currentOutputText
        this.clear()
    }

    /* Alles löschen Funktion */
    clear() {
        this.currentOutput = ''
        this.previousOutput = ''
        this.operator = undefined
    }

    /* Rechte einzelne Zahl löschen Funktion */
    delete() {
        this.currentOutput = this.currentOutput.toString().slice(0, -1)
    }

    /* Nummer auswählen/klicken Funktion */
    clickNumber(number) {
        if (number === '.' && this.currentOutput.includes('.')){
            return
        }
        this.currentOutput = this.currentOutput.toString() + number.toString()
    }

    /* Operator auswählen/klicken Funktion */
    clickOperator(operator) {
        if (this.currentOutput === '') {
            return
        }
        if (this.previousOutput !== '') {
            this.calculate()
        }
        this.operator = operator
        this.previousOutput = this.currentOutput
        this.currentOutput = ''
    }

    /* Hier finden die Rechnungen stat */
    calculate() {
        let sum
        const previous = parseFloat(this.previousOutput)
        const current = parseFloat(this.currentOutput)
        if (isNaN(previous) || isNaN(current)){
            return
        }
        switch (this.operator) {
            case '+':
                sum = previous + current
                break
            case '-':
                sum = previous - current
                break
            case '*':
                sum = previous * current
                break
            case '/':
                sum = previous / current
                break
            default:
                return
        }
        this.currentOutput = sum
        this.operator = undefined
        this.previousOutput = ''
    }

    /* Hier wird der Display nach jedem Klick geupdated */
    updateCalculation() {
        this.currentOutputText.innerText = this.currentOutput
        if (this.operator != null) {
            this.previousOutputText.innerText = 
            `${this.previousOutput} ${this.operator}`
        } else {
            this.previousOutputText.innerText = ''
        }
    }
}

/* Deklaration und Verbindung mit dem HTML */
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOutputText = document.querySelector('[data-previous-Output]')
const currentOutputText = document.querySelector('[data-current-Output]')

const calculator = new Calculator(previousOutputText, currentOutputText)

/* Hier werden die Deklarierten Knöpfe mit den Funktionen oben verbunden */

/* Verbindung von den Nummernknöpfe */
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clickNumber(button.innerText)
        calculator.updateCalculation()
    })
})

/* Verbindung von den Operatorenknöpfe */
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clickOperator(button.innerText)
        calculator.updateCalculation()
    })
})

/* Verbindung vom Gleich (=) Knopf */
equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateCalculation()
})

/* Verbindung vom Clear Knöpf */
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateCalculation()
})

/* Verbindung vom Lösch (<--) Knöpf */
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateCalculation()
})