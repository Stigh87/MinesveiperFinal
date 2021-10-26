//view
show();
function show() {
let appDiv = document.getElementById('app');
let html = '';

        html += `<div id="info">MINESVEIPER: <br>
                        </br>        
                        Total mines:<br>
                        ${mines}<br>
                        </br>
                        Time: </br>
                        ${minutes} min: ${seconds} sec<br>
                        </br>
                        
                        </br>
                        Velg størrelse: </br>  
                                <select id="størrelse" class="option" ${disable} onchange="setSize()">
                                <option name="null" value="" >${width}x${width}</option> 
                                <option name="Small" value="10" >10x10</option>
                                <option name="Medium" value="12" >12x12</option>
                                <option name="Medium" value="16" >16x16</option>
                                <option name="Large" value="20" >20x20</option>
                                </select>
                        <br>        
                        </br>
                        Velg vansklighetsgrad: </br>
                        <select id="difficulity" class="option" ${disable} onchange="setMines()" value="difficulity.value">
                        <option name="" value="">${difficulty}</option>
                        <option value="1">Practice</option>
                        <option value="2">Normal</option>
                        <option value="3">Intermediate</option>
                        <option value="4">Expert</option>
                        </select>
                        <br></br>
                        


                <button class="btn" ${disable} onclick="newGame()">START</button> </br>
                <button class="btn" ${disable1} onclick="restart()">New Game</button></br>
                <hr>
                <button id="flag" class="btn " ${disable1} onclick="flag()">Flag Mine</button>
                <div>${flagEnable}</div></br>
                Flags: <br>
                ${flags}<br>
                </br>
                Mines Left:</br>
                ${minesLeft}
                <br>
                </div>`;

        html += `<div id="board" class="${boardClass}">`
        let index = -1;
        for (let element of shuffledArray) {
        let first = (element.i % width === 0) ? 'first' : '';
        let last = (element.i % width === width - 1) ? 'last' : ''; 
        index += 1;
        html += ` 
        <div id="${element.id}"
                class="${element.class} ${first} ${last} ${tile}" 
                onclick="clicked(this, ${element.totalMines}, ${index})">${element.field}</div>
                `   
        }
        html += `</div>
                        <div id="winLoose">${winLoose}</div>
        `;
        appDiv.innerHTML = html;
        }
