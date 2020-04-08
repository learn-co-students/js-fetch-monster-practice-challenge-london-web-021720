document.addEventListener("DOMContentLoaded",event => {
    const trainer = document.querySelector("#monster-container")
    const URL = "http://localhost:3000/monsters"
    const UrlLimit = "?_limit=50&_page=1"
    const create = document.querySelector('#create-monster')
    const form = document.createElement("form")
    const label = document.createElement("label")
    const inputName = document.createElement("input")
    const inputAge = document.createElement("input")
    const inputDesc = document.createElement("input")
    const button = document.createElement("button")
    const foward = document.querySelector("#forward")
    const back = document.querySelector("#back")
    let num = 1


    
    form.id = "create"
    label.htmlFor = "create"
    label.innerText = "New Monster: "
    inputName.name = "name"
    inputName.placeholder = "Name"
    inputAge.name = "age"
    inputAge.type = "number"
    inputAge.placeholder = "AGE"
    inputDesc.name = "description"
    button.type = "submit"
   
    form.append(label,inputName,inputAge, inputDesc, button)
    create.append(form)


const fetchMonsters = (limit) => {
    fetch(URL + `${limit}`)
    .then(resp =>  resp.json())
    .then(data => renderMonsters(data))
}

const renderMonsters = monsters => {
    while (trainer.hasChildNodes()) {  
        trainer.removeChild(trainer.firstChild);
      }
    monsters.forEach(monster => renderMonster(monster))
}

const renderMonster = (monster) => {
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const p2 = document.createElement("p")

    h2.innerText = monster.name 
    p.innerText = monster.age
    p2.innerText = monster.description

    trainer.append(h2, p, p2)
}

form.addEventListener('submit', event => {
   event.preventDefault()
    const name = event.target.name.value
    const age = parseFloat(event.target.age.value)
    const description = event.target.description.value
    

    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name,
            age,
            description
        })
    }).then(resp => resp.json())
    .then(data => renderMonster(data))
})

foward.addEventListener("click", event => {
     ++num
    const urlNext = `?_limit=50&_page=${num}`
    fetchMonsters(urlNext)
})

back.addEventListener("click", event => {
    --num
   const urlNext = `?_limit=50&_page=${num}`
   fetchMonsters(urlNext)
})





fetchMonsters(UrlLimit);

})