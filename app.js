function addCabinet(num){
    // <div class="cabinetItem" id="cab1">
    //     <p class="cabText"><b>Cabinet 1</b></p>
    //     <p class="cabText subText">Med 1</p>
    //     <br>
    //     <div class="statusBox">
    //         <div class="statusLevel" id="lv_0"></div>
    //         <div class="statusLevel" id="lv_1"></div>
    //         <div class="statusLevel" id="lv_2"></div>
    //     </div>
    //     <p class="cabText subText">Status : Full</p>
    // </div>
    for(let i=0;i<num;i++){
        const tmp = document.createElement('div')
        tmp.classList.add("cabinetItem")
        tmp.id = `cab${i}`

        let text = document.createElement('p')
        text.classList.add('cabText')
        text.innerHTML = `<b>Cabinet ${i+1}</b>`
        tmp.appendChild(text)

        text = document.createElement('p')
        text.classList.add('cabText')
        text.classList.add('subText')
        text.innerHTML = `Med ${i+1}`
        tmp.appendChild(text)

        tmp.appendChild(document.createElement('br'))

        const subTmp = document.createElement('div')
        subTmp.classList.add('statusBox')
        for(let j=0;j<3;j++){
            let box = document.createElement('div')
            box.classList.add('statusLevel')
            box.id = `lv_${j}`
            subTmp.appendChild(box)
        }
        tmp.appendChild(subTmp)

        text = document.createElement('p')
        text.classList.add('cabText')
        text.classList.add('subText')
        text.classList.add('statusTxt')
        text.innerHTML = 'Status : N/A'
        tmp.appendChild(text)

        document.getElementById('cabinetSection').appendChild(tmp)

        addItemOrder(i+1)
    }
}

function changeCabStatus(num, status){
    const color = [['#3EEE00', '#3EEE00', '#3EEE00'], ['white', '#EBED6F', '#EBED6F'], ['white', 'white', '#F10D0D'], ['white', 'white', 'white']] //full half, low, empty
    let sel = 3
    
    const tmp = document.getElementById(`cab${num}`)
    tmp.querySelector('.statusTxt').innerHTML = `Status : ${status}`
    if(status==='full') sel=0
    else if(status==='half') sel=1
    else if(status==='low') sel=2
    else sel=3
    for(let i=0;i<3;i++){
        tmp.querySelector(`#lv_${i}`).style.backgroundColor = color[sel][i]
    }
}

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
    label_tmp.innerHTML = `Med${num} : `
    tmp.appendChild(label_tmp)

    const input_tmp = document.createElement('input')
    input_tmp.type = "number"
    input_tmp.id = `M${num}`
    input_tmp.classList.add("inputMed") 
    tmp.appendChild(input_tmp)

    // <label for="Med1" class="OrderText">Med1: </label>
    // <input type="number" id="M1" class="inputMed"></input>
}

async function addOrdering(){
    // console.log("it's work tho")

    const order_count = document.getElementsByClassName("OrderText").length
    let txt = {}
    for(let i=1;i<order_count+1;i++){
        var tmp = document.getElementById(`M${i}`).value
        document.getElementById(`M${i}`).value = ''
        if(tmp==='') tmp=0
        txt[`${i}`] = parseInt(`${tmp}`)
    }

    const obj = { "order" : txt}

    console.log(obj)

    // const response = await fetch('', {
    //     method: 'POST',
    //     body: JSON.stringify( {obj} ),
    //     header: {
    //        'Content-Type' : 'application/json'
    //     }
    // }
    // )


}

// GET /order_get/{n} n start at 0
// orderList{
//     "1" : 2,
//     "2" : 3,
//     "3" : 4
// }
function addDeliverOrder(num, orderID, orderList){
    // <div class="itemInfo">
    //     <b>1</b>
    //     <div class="deliverItem" id="item0">
    //         <h2>Order ID : xxxx</h2>
    //         <h2>Medicine List</h2>
    //         <h3><pre>   Med 1 : 1/1</pre></h3>
    //         <h3><pre>   Med 2 : 2/3</pre></h3>
    //     </div>
    // </div>

    const tmp = document.createElement('div')
    tmp.classList.add("itemInfo")

    const numtmp = document.createElement('b')
    numtmp.innerHTML = `${num+1}`
    tmp.appendChild(numtmp)

    const deliver = document.createElement('div')
    deliver.classList.add("deliverItem")
    deliver.id = `item${num}`

    const txt1 = document.createElement('h2')
    txt1.innerHTML = `Order ID : ${orderID}`
    deliver.appendChild(txt1)

    const txt2 = document.createElement('h2')
    txt2.innerHTML = 'Medicine List'
    deliver.appendChild(txt2)

    for(let i=0;i<Object.keys(orderList).length;i++){
        let txt3 = document.createElement('h3')
        txt3.innerHTML = `<pre>   Med ${i+1} : 0/${orderList[`${i+1}`]}</pre>`
        deliver.appendChild(txt3)
    }

    tmp.appendChild(deliver)

    document.getElementById('deliverList').appendChild(tmp)
}

async function getData(){
    const response = await fetch('')
    const _data = await response.json()
    return _data
}

;(async ()=> {
    // const cabList = await getData()
})


const deliverTMP = [ { orderID : 'xxxx', list : { "1" : 1, "2" : 3 } }, { orderID : 'yyyy', list : { "1" : 0, "2" : 1 } }, { orderID : 'zzzz', list : { "1" : 5, "2" : 1 } }, { orderID : 'aaaa', list : { "1" : 1, "2" : 3 } } ]

addCabinet(4)
changeCabStatus(0, 'full')
changeCabStatus(1, 'half')
changeCabStatus(2, 'low')
changeCabStatus(3, 'empty')

for(let i=0;i<deliverTMP.length;i++){
    // console.log(deliverTMP[i])
    addDeliverOrder(i, deliverTMP[i]['orderID'], deliverTMP[i]['list'])
}