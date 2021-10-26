// Controller
function setSize() {
    if (størrelse.value === "10") {width = 10;}
    if (størrelse.value === "12") {width = 12;}
    if (størrelse.value === "16") {width = 16;}
    if (størrelse.value === "20") {width = 20;}
}

function setMines() {
    if (difficulity.value === "1") {
        mines = parseInt((5 * (width*width))/100);
        difficulty = "Practice";}
    if (difficulity.value === "2") {
        mines = parseInt((10 * (width*width))/100);
        difficulty = "Normal";}
    if (difficulity.value === "3") {
        mines = parseInt((15 * (width*width))/100);
        console.log(mines);
        difficulty = "Intermediate";}
    if (difficulity.value === "4") {
        mines = parseInt((20 * (width*width))/100);
        difficulty = "Expert";}
}

// async starttime.//await
function startTime() {
    
    timer = setInterval(countTime, 1000);
            async function countTime() {
            seconds++;
            // minutes = Math.floor((seconds)/60);
            if (seconds >= 60) {
             minutes++;       
             seconds = 0;}
            await show();    
            }
}

function newGame() {
    setSize();
    setMines();
    if (mines === 0) return;
    shuffle();
    addNumbers();
    startTime();
    disable = "disabled";
    disable1 = "";
    minesLeft = mines;
show();
}

function restart() {
    object = {};
    shuffledArray = [];
    numberArray = [];
    tile = "tile";
    width = 0;
    mines = 0;
    difficulty = '-';
    seconds = 0;
    minutes = 0;
    flagToggle = "false";
    flagEnable = 'OFF';
    wrong = 0;
    flags = 0;
    winLoose = '';
    reveal = "false";
    boardClass = "";
    disable = "";
    disable1 = "disabled";
    clearInterval(timer);

show();
}

function shuffle() {
   let mineArray = [];
   let validArray = [];
   let tempArray = []; 
        
        for (let i = 0; i < (mines); i++) {
            let object = {
                id: "div"+i,
                class: 'mine',
                // i: i, 
                field: '',
            }
            mineArray.push(object);
        }
        for (let i = 0; i < ((width * width)-mines); i++) {
            let object = {
                id: "div"+(mines+i),
                class: 'valid',  
                // i: width+i,
                field: '',
            }
            validArray.push(object);
        }   
    tempArray = validArray.concat(mineArray);
    shuffledArray = tempArray.sort(() => Math.random() - 0.5);
   
}

async function clicked(element, totMines, index) {
    if (flagEnable === 'ON') {
        if (shuffledArray[index].class === 'flagged') {
            shuffledArray[index].class = 'valid';
            element.classList.remove('flagged');
            element.classList.add('valid');
            flags = flags -1;
            wrong = wrong -1;
        }
        else if (flags >= mines) return;
        else if (shuffledArray[index].class === 'valid') {
            wrong++;
            shuffledArray[index].class = 'flagged';
            flags++;
        }
        else if (shuffledArray[index].class === 'mine') {    
        shuffledArray[index].class = 'flagged';
        flags++;
        }
    }    
    if (flagEnable === 'OFF') {
        if (shuffledArray[index].class === 'flagged') {
            shuffledArray[index].class = 'valid';
            element.classList.remove('flagged');
            element.classList.add('valid');
            element.click();
            flags = flags -1;
            wrong = wrong -1;
        }    
        else if (totMines === 0) {
            open(element, totMines, index);
            shuffledArray[index].class = 'zero';
        }   
        else if (totMines >= 1 && totMines < 9) {
            shuffledArray[index].class = 'field';
            shuffledArray[index].field = totMines;
        }
        else if ((element.classList.contains('mine')) || 
            (shuffledArray[index].class === 'mine') || 
            (shuffledArray[index].totalMines === 'mine')) {
            //     //LEGG INN TAP FUNKSJON - Delay?
                shuffledArray[index].class = 'boom';
                boardClass = 'boardLock';
            if (reveal === 'false') {
                revealMines()
                reveal = 'true';
                winLoose = 'GAME OVER'
                clearInterval(timer);
            }   
    }
} 
    minesLeft = (mines - flags);
    if (minesLeft === 0) checkWin();

show();
}

function flag() { 
    flagToggle != "false" ? flagToggle = "false" : flagToggle = "true";
    if (flagToggle == "true") {
        flagEnable = 'ON';
        boardClass = "boardFlag";
    }
    if (flagToggle == "false") {
        flagEnable = 'OFF';
        boardClass = "";
    }    
show();
}

function checkWin() {
    if (minesLeft === 0) {
        let left = 0;
        for (let i = 0; i < shuffledArray.length; i++) {
            if (shuffledArray[i].class === 'mine') {
                    winLoose = "Wrong flag(s)";         
                }
            if (shuffledArray[i].class === 'valid') {
                left++;
            }
        }
        if (wrong === 0) {
            winLoose = '';
            if ((flags === mines) && (left === 0)) {
                
                winLoose = "Congratulations!"+"<br>"+"Time:"+" "+minutes+"min"+" "+"&"+" "+seconds+"sec";
                boardClass = 'boardLock';
                clearInterval(timer);
            }
        }
    } 
}

function revealMines() {
    for (let i = 0; i < shuffledArray.length; i++) {
        
        if (shuffledArray[i].class === 'mine') {
            setTimeout(function() {         
                const newI = shuffledArray[i];
                const checkedDiv = document.getElementById(newI.id);
                checkedDiv.click();
            }, 10) 
        }        
    }
}

function addNumbers() {

    for (let i = 0; i < shuffledArray.length; i++) {
        let totalMines = 0;
        let leftSide = (i % width === 0);
        let rightSide = (i % width === width - 1);

        if (shuffledArray[i].class === 'valid') {
        //Venstre    
            if ((element =! leftSide) && (shuffledArray[i - 1].class === 'mine')) totalMines++; 
        //Høyre    
            if ((element =! rightSide) && (shuffledArray[i + 1].class === 'mine')) totalMines++; 
        //Opp    
            if ((i >= width) && (shuffledArray[i - width].class === 'mine')) totalMines++; 
        //Ned    
            if ((i < (width * width - width)) && 
                (shuffledArray[i + width].class === 'mine')) totalMines++; 
        //Venstre Opp    
            if ((i >= width) && (element =! leftSide) && 
                (shuffledArray[i - 1 - width].class === 'mine')) totalMines++;
        //Høyre Opp    
            if ((i >= width) && (element =! rightSide) && 
                (shuffledArray[i + 1 - width].class === 'mine')) totalMines++; 
        //Venstre Ned
            if ((i < (width * width - width)) && (element =! leftSide) && 
                (shuffledArray[i - 1 + width].class === 'mine')) totalMines++;
        //Høyre Ned     
            if ((i < (width * width - width)) && (element =! rightSide) && 
                (shuffledArray[i + 1 + width].class === 'mine')) totalMines++; 
             
        shuffledArray[i].totalMines = totalMines;
        shuffledArray[i].i = i;
    }
        if (shuffledArray[i].class === 'mine') {
            shuffledArray[i].totalMines = 'mine';
            shuffledArray[i].i = i;
        } 
          
    }
show();    
}

function open(element, totMines, i) {
    
        let leftSide = (i % width === 0);
        let rightSide = (i % width === width - 1);
       
        if (totMines === 0 && element.classList.contains('valid')) {
            
         setTimeout(function()  {    
            //Venstre    
                if ((element =! leftSide) && (shuffledArray[i - 1])) {
                    const newI = shuffledArray[i - 1];
                    const checkedDiv = document.getElementById(newI.id);
                    checkedDiv.click();                   
                } 
            //Høyre    
                if ((element =! rightSide) && (shuffledArray[i + 1])) {
                    const newI = shuffledArray[i + 1];
                    const checkedDiv = document.getElementById(newI.id);
                    checkedDiv.click();
                }
            //Opp    
                if ((i >= width) && (shuffledArray[i - width])) {
                    const newI = shuffledArray[i - width];
                    const checkedDiv = document.getElementById(newI.id);
                    checkedDiv.click();
                };
            //Ned    
                if ((i< (width * width - width)) && 
                        (shuffledArray[i + width])) {
                            const newI = shuffledArray[i + width];
                            const checkedDiv = document.getElementById(newI.id);
                                checkedDiv.click();            
                };
            //Venstre Opp    
                if ((i >= width) && (element =! leftSide) && 
                    (shuffledArray[i - 1 - width])) {
                        const newI = shuffledArray[i - 1 - width];
                        const checkedDiv = document.getElementById(newI.id);
                            checkedDiv.click();
                        };
            //Høyre Opp    
                if ((i >= width) && (element =! rightSide) && 
                    (shuffledArray[i + 1 - width])) {
                        const newI = shuffledArray[i + 1 - width];
                        const checkedDiv = document.getElementById(newI.id);
                            checkedDiv.click();
                };
            //Venstre Ned
                if ((i < (width * width - width)) && (element =! leftSide) && 
                    (shuffledArray[i - 1 + width])) {
                        const newI = shuffledArray[i - 1 + width];
                        const checkedDiv = document.getElementById(newI.id);
                            checkedDiv.click();
                };
            //Høyre Ned     
                if ((i< (width * width - width)) && (element =! rightSide) && 
                    (shuffledArray[i + 1 + width])) {
                        const newI = shuffledArray[i + 1 + width];
                        const checkedDiv = document.getElementById(newI.id);
                            checkedDiv.click();
                };    
                return;         
            }, 10)
           
        } 
    }


