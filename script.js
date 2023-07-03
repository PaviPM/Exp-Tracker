let balance= document.querySelector("#balance");
let inc_amt= document.querySelector("#inc-amt");
let exp_amt= document.querySelector("#exp-amt");
let description= document.querySelector("#desc");
let amount= document.querySelector("#amount");
let trans= document.querySelector("#trans");
let form= document.querySelector("#form");


// let sample=[
//     {id:1, description:"Book", amount:-100},
//     {id:2, description:"Salary", amount:30000},
//     {id:3, description:"Rent", amount:-2000},
//     {id:4, description:"Petrol", amount:-500},
//     {id:5, description:"Food", amount:-300},
//     {id:6, description:"Cloth", amount:-1000},
// ];

// let transactions= sample;



let localStorageTrans=JSON.parse(localStorage.getItem("trans"));

let transactions=localStorage.getItem("trans")!==null?  localStorageTrans :[];

function loadTransactionDetails(transaction){
    let sign = transaction.amount < 0 ? "-":"+" 
    // console.log(sign); 
    let items = document.createElement("li");
    items.classList.add(transaction.amount<0?"exp":"inc"); 
    items.innerHTML=`
    ${transaction.description}
    <span> ${sign}  ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans( ${transaction.id})">X<button>
    `;
    trans.appendChild(items);
    // console.log(items);

}
function removeTrans(id){
    if(confirm("Are you sure you want to delete this transaction?")){
        transactions=transactions.filter((transaction)=>transaction.id !=id);
        config();
        updateLocalStorage();
    }
    else{
        return;
    }
}

function updateAmount() {
    let amount= transactions.map((transaction)=>transaction.amount);
    // console.log(amount);
    let total  = amount.reduce((acc,item) => (acc+=item),0)
    .toFixed(2);
    balance.innerHTML =`₹ ${total}`;

    let income  = amount
    .filter((item)=>item>0)
    .reduce((acc,item)=>(acc+=item),0)
    .toFixed(2);
    inc_amt.innerHTML =`₹ ${income}`;

    let expense  = amount
    .filter((item)=>item<0)
    .reduce((acc,item)=>(acc+=item),0)
    .toFixed(2);
    exp_amt.innerHTML =`₹ ${Math.abs(expense)}`;
}

function config(){
     trans.innerHTML="";
     transactions.forEach(loadTransactionDetails);
     updateAmount();
}


function addTransaction(e) {
    e.preventDefault();
    if( description.value.trim()==""|| amount.value.trim()==""){
        alert("Please Enter Description and Amount")
    }else{
        let transaction={
        id: uniqueId(),
        description: description.value,
        amount: +amount.value};

        transactions.push(transaction);
        loadTransactionDetails(transaction);

        description.value ="";
        amount.value ="";
        updateAmount();
        updateLocalStorage();
    }
}


function uniqueId(){
    return Math.floor(Math.random()*100000);
}


form.addEventListener("submit",addTransaction);

window.addEventListener("load",function(){
    config();
})



function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}
