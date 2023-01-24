
const input = document.querySelectorAll('.inputs')
const mensagem = document.querySelector('#msg')


function addPlayer(e){

    const firstName =  input[0].value
    const lastName = input[1].value
    const country =  input[2].value
    const score =  input[3].value

    const player = {
        firstName: firstName,
        hour: new Date().toLocaleString(),
        lastName: lastName,
        country: country,
        score: score
    }

    let players = JSON.parse(localStorage.getItem("players")) || []
    players.push(player)

    localStorage.setItem("players", JSON.stringify(players))

    input[0].value = ''
    input[1].value = ''
    input[2].value = ''
    input[3].value = ''

    displayPlayers()
}

function displayPlayers(){
    let players = JSON.parse(localStorage.getItem('players')) || []
    let playersHTML = ""
    players.sort((a, b) => b.score - a.score)
    players.forEach(player => {
        playersHTML += `<div class="player"> <span id="fullname">${player.firstName} ${player.lastName}<br>${player.hour}</span> 
${player.country} <span id ="score">${player.score} </span>
        <span class="botoes"><button id="excluir" class = "bttn-excluir" >🗑️</button></div>`
    })
    rank.innerHTML = playersHTML
}



function deletePlayer() {
    let players = JSON.parse(localStorage.getItem('players')) || []
    let index = 1
    players.splice(index, 1)
    localStorage.setItem("players", JSON.stringify(players))
    displayPlayers()
}

const rank = document.querySelector("#rank");
rank.addEventListener("click", (e) => {
    if (e.target.classList.contains("bttn-excluir")) {
        let players = JSON.parse(localStorage.getItem("players")) || [];
        let index = players.findIndex(player => player.firstName === e.target.parentNode.parentNode.children[0].textContent.split(' ')[0] && player.lastName === e.target.parentNode.parentNode.children[0].textContent.split(' ')[1])
        players.splice(index, 1);
        localStorage.setItem("players", JSON.stringify(players));
        displayPlayers();
    }
});



const btn = document.querySelector('#enviar')
btn.addEventListener('click', addPlayer)
displayPlayers()

