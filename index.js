let dealersum=0
let mysum=0

let dealeracecnt=0
let myacecnt=0

let hasbj = false
let jinda = false

let msg=""

let hidden
let deck

let MessageEl = document.getElementById("message-el")


window.onload=function(){
    startGame();
}

function buildDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"]
    deck = []

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffle(){
    for(let i=0;i<deck.length;i++){
        let temp = deck[i];
        let j = Math.floor(Math.random()*deck.length);
        deck[i]=deck[j];
        deck[j]=temp;
    }
}

function startGame(){
    jinda=true
    hasbj =false;
    dealersum=0;
    mysum=0;
    myacecnt=0;
    dealeracecnt=0;
    //window.location.reload();
    buildDeck();
    shuffle();
    renderGame();
}

function renderGame(){
    hidden = deck.pop();
    dealersum+= getVal(hidden);
    dealeracecnt+=checkAce(hidden);

    console.log(hidden);
    console.log(dealersum);
    console.log(dealeracecnt);
    console.log(deck);

    while(dealersum<17){
        let cardImg = document.createElement("img");
        let card=deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealersum+=getVal(card);
        dealeracecnt+=checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    for(let i=0;i<2;i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/"+card+".png";
        mysum+=getVal(card);
        myacecnt+=checkAce(card);
        document.getElementById("my-cards").append(cardImg);
    }

    if(mysum>21)jinda = false;
    if(mysum==21){jinda=false;hasbj=true;}

    document.getElementById("New_Card").addEventListener("click",newcard);
    document.getElementById("Stay").addEventListener("click",stay);  
}

function newcard(){
    // console.log("New card drawn!")
    if(jinda && !hasbj){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/"+card+".png";
        document.getElementById("my-cards").append(cardImg);
        if(reduceAce(mysum,myacecnt)>21){
            jinda=false;
        }
        console.log(mysum);
        console.log(myacecnt);
        mysum+=getVal(card);
        myacecnt+=checkAce(card);
    }
    else{
        if(!jinda){
            msg = "You've already lost, LOSER!";
            MessageEl.innerText = msg;
        }
        else if(hasbj){
            msg = "You've already won!";
            MessageEl.innerText = msg;
        }
    }
}

function stay(){
    if(!jinda){
        msg = "You've already lost, LOSER!";
        MessageEl.innerText = msg;
    }
    else if(hasbj){
        msg = "You've already won!";
        MessageEl.innerText = msg;
    }
    else{
        dealersum = reduceAce(dealersum,dealeracecnt);
        mysum = reduceAce(mysum,myacecnt);

        document.getElementById("hidden").src = "./cards/"+hidden+".png";

        if(mysum>21){
            msg = "SUCK IT, Loser!";
            jinda=false;
        }
        else if(dealersum>21){
            msg = "Congracts! You Win!🥳";
            hasbj = true;
        }
        else if(mysum>dealersum){
            msg = "Congracts! You Win!🥳"
            hasbj=true;
        }
        else if(mysum<dealersum){
            msg =  "SUCK IT, Loser!";
            jinda=false;
        }
        else{
            msg = "Whew! It's a draw!";
        }
        document.getElementById("dealer-sum").innerText=dealersum;
        document.getElementById("my-sum").innerText=mysum;
        MessageEl.innerText=msg;
        //document.getElementById("resuls")
    }
}

function getVal(card){
    let data = card.split("-");
    let val = data[0];

    if(isNaN(val)){
        if(val=="A"){
            return 11;
        }
        return 10;
    }

    return parseInt(val);
}

function checkAce(card){
    if(card[0]=="A"){
        return 1;
    }
    return 0;
}

function reduceAce(mysum,myacecnt){
    while(mysum>21 && myacecnt>0){
        myacecnt--;
        mysum-=10;
    }
    return mysum;
}

