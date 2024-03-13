const box = document.querySelector("#box")
const damageBtn = document.querySelector("#damage-btn")
const healBtn = document.querySelector("#heal-btn")

state = {
    health: 100
}

state = new Proxy(state, {
    set: (target, prop, value) => {
        target[prop] = value < 0 ? 0 : value;
        box.textContent = `Health: ${target[prop]} `
        return true
    }
})

damageBtn.addEventListener("click", () => {
    const damage = ~~(Math.random() * 10 + 1)
    state.health -= damage
    if(state.health <= 0) return

    const span = document.createElement('span')
    span.style.color = "red"
    span.textContent = `-${damage}`
    console.log(span)
    box.appendChild(span)    
})

healBtn.addEventListener("click", () => {
    state.health = 100
    box.textContent += "^"
})