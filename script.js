const digitsCont = document.querySelector(".digits")
const display = document.querySelector(".display > p")
const symbols=['AC','<=','%', '/', '*','-', '+', '+/-','0', '.','='];
const historyDisplay = document.querySelector('.history')

nsym=0;
function createNumberPad(){
    for (i=4;i>=0;i--){
        let charRow = document.createElement('div')
        charRow.className = 'charRow'
        for (j=0;j<=3;j++){
            if (i===4 || j===3){
                //hold all symbols that are not numbers
                let symbol= document.createElement('div')
                symbol.className= 'symbol'
                symbol.innerHTML= `<p>${symbols[nsym]}</p>`
                nsym++
                charRow.appendChild(symbol)
            }else if (i==0){
                //hold numbers between 1-9
                let symbol= document.createElement('div')
                symbol.className= 'number'
                symbol.innerHTML= `<p>${symbols[nsym]}</p>`
                nsym++
                charRow.appendChild(symbol)            
            }else{
                //position '+/-','0' and '.'
                let num = document.createElement('div');
                num.className = 'number';
                num.innerHTML=`<p>${i*3-Math.abs(j-2)}</p>`;
                charRow.appendChild(num)
            }
        }
        digitsCont.appendChild(charRow)
    }
}

createNumberPad()

const digits = document.querySelectorAll('.charRow > div')
//start with a blank display
let answer = ''
//control when to start displaying a new number e.g. after pressing +,-,*,/, or =
let addToDisplay=true
//prevent creation of numbers with more than 1 decimal point
let addDecimal = false

digits.forEach(digit => {
    digit.addEventListener('click',()=>{
        //define how digits are displayed before evaluation
        if (digit.className==='number' && digit.textContent!='+/-'){
            if (digit.textContent==='.'&& display.textContent.includes('.')){
            }else{
                if (addToDisplay){
                    display.textContent+=digit.textContent
                }else{
                    display.textContent=digit.textContent
                    addToDisplay=true
                }
                answer+=digit.textContent
            }

        //define how the screen is cleared
        }else if (digit.textContent==='AC'){
            display.textContent='';
            answer=''
            historyDisplay.innerHTML=''
        //define how to delete the last character
        }else if (digit.textContent==='<='){
            display.textContent=display.textContent.slice(0,-1)
        //define how to convert from percentage to number
        }else if (digit.textContent==='%'){
            numOfDeci= getNumOfDecimals(display.textContent)
            //round answers with long decimals so that they don’t overflow the screen
            if (!numOfDeci){
                display.textContent=display.textContent/100
            }else{
                display.textContent=Math.floor(display.textContent*(10**numOfDeci))/((10**numOfDeci)*100)
            }
        //define how to negate a number
        }else if (digit.textContent==='+/-'){
        //define how to calculate written mathematical equations
        }else if(digit.textContent==='='){
            calculate(answer,historyDisplay)
            display.textContent=answer
            addToDisplay = false
        }else{ 
            if(!answer.slice(-1).match(/\*|\+|\-|\//)){
                calculate(answer,historyDisplay)
                addToDisplay=false
                answer+=digit.textContent
            }
        }
    }
    )
    
});

function getNumOfDecimals(number){
    if (Math.floor(number)!=number){
        return number.split('.')[1].length
    }
}

function logHistory(str,log){
    entry=document.createElement('p')
    entry.className='entry'
    entry.textContent=str
    log.appendChild(entry)
}

function calculate(equation, historyDisplay){
    if (equation.match(/\*|\+|\-|\// )){
        log=document.createElement('div')
        log.className='log'
        logHistory(equation, log)
        result=Function('return ' + equation)()
        accuracy=10**6
        //convert answer to string to facilitate appending characters in subsequent operations
        if(`${Math.round(result)}`.length>10){
            //represent large integers using scientific notation so they don't overflow the screen
            answer = `${result.toExponential(4)}`
        }else if (Math.round(result)!=result){
           answer=`${Math.round(result*accuracy)/(accuracy)}`
        }else{
            answer=`${result}`
        }
        logHistory(answer, log)
        
        //prevent false positive display of log due to scientific notation
        if (equation!=answer){
            historyDisplay.appendChild(log)
        }   
}
}

