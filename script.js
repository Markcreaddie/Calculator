const digitsCont = document.querySelector(".digits")
const baseNums=['+/-','0','.'];

for (i=3;i>=0;i--){
    let numsRow = document.createElement('div');
    numsRow.className= 'numsRow'
    if (i===0){
        baseNums.forEach(item=>{
            let num = document.createElement('div');
            num. className = 'number';
            num.textContent = item;
            numsRow.appendChild(num)
        })
    }else{
        for (j=0;j<3;j++){
            let num = document.createElement('div');
            num. className = 'number';
            num.textContent = i*3-j;
            numsRow.appendChild(num);
        }
    }
    digitsCont.appendChild(numsRow)
}