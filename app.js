function addItemOrder(num){
    const tmp = document.getElementById("input_form")
    if(tmp.childElementCount > 0){
        const line_break1 = document.createElement('br')
        const line_break2 = document.createElement('br')
        tmp.appendChild(line_break1)
        tmp.appendChild(line_break2)
    }

    const label_tmp = document.createElement('label')
    label_tmp.setAttribute("for", `Med${num}`)
    label_tmp.classList.add("OrderText") 
    label_tmp.innerHTML = `Med${num}: `
    tmp.appendChild(label_tmp)

    const input_tmp = document.createElement('input')
    input_tmp.type = "number"
    input_tmp.id = `M${num}`
    input_tmp.classList.add("inputMed") 
    tmp.appendChild(input_tmp)

    // <label for="Med1" class="OrderText">Med1: </label>
    // <input type="number" id="M1" class="inputMed"></input>
}

async function getData(){
    const response = await fetch('')
    const _data = await response.json()
    return _data
}

;(async ()=> {
    // const cabList = await getData()
})

addItemOrder(1)
addItemOrder(2)