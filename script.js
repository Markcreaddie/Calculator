const digitsCont = document.querySelector(".digits")
const symbols=['AC','<=','%', '/', 'x','-', '+', '+/-','0', '.','='];

nsym=0;
function createNumberPad(){
    for (i=4;i>=0;i--){
        let charRow = document.createElement('div')
        charRow.className = 'charRow'
        for (j=0;j<=3;j++){
            if (i===4 || j===3){
                let symbol= document.createElement('div')
                symbol.className= 'symbol'
                symbol.innerHTML= `<p>${symbols[nsym]}</p>`
                nsym++
                charRow.appendChild(symbol)
            }else if (i==0){
                let symbol= document.createElement('div')
                symbol.className= 'symbol'
                symbol.innerHTML= `<p>${symbols[nsym]}</p>`
                nsym++
                charRow.appendChild(symbol)            
            }else{
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