const digitsCont = document.querySelector(".digits")
const symbols=['AC','<=','%', '/', 'x','-', '+', '+/-','0', '.','='];
const nums =Array.from(new Array(10));

nsym=0;
nnum=0;

for (i=4;i>=0;i--){
    let charRow = document.createElement('div')
    charRow.className = 'charRow'
    for (j=0;j<=3;j++){
        if (i===4 || j===3){
            let symbol= document.createElement('div')
            symbol.className= 'symbol'
            symbol.textContent= symbols[nsym]
            nsym++
            charRow.appendChild(symbol)
        }else if (i==0){
            let symbol= document.createElement('div')
            symbol.className= 'symbol'
            symbol.textContent= symbols[nsym]
            nsym++
            charRow.appendChild(symbol)            
        }else{

        }
    }
    
}