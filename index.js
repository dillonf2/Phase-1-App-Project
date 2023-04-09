testObj = {
    title: "This is Test Object 1",
    one :1,
    two: 2,
    three: 3
}

function objToList(obj){
    for (const key in obj){
        if(key!==`title`){
        newLi=document.createElement(`li`)
        newLi.textContent=`${key}: ${obj[key]}`
        document.querySelector(`#testUl`).append(newLi)
        }
    }
}


// document.addEventListener(`DOMContentLoaded`, function (){
//     document.querySelector(`#testUl`).append(testObj[`title`])
//     objToList(testObj)
// })
document.addEventListener(`DOMContentLoaded`, function(){
    fetch(`https://api.coincap.io/v2/assets`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        console.log(data)
        let dataObj=data
        for(let i=0; i<10; i++){
            const currentAsset=document.createElement(`li`)
            currentAsset.setAttribute(`id`,`listItems`)
            currentAsset.textContent=`${dataObj[`data`][i][`name`]} // Current Price : $${(Number(dataObj[`data`][i][`priceUsd`]).toFixed(2))}`
            document.querySelector(`#crypto-ol`).append(currentAsset)
        }
    })

})

setTimeout(document.querySelector(`#listItems`).addEventListener(`click`, function(e){
    let theClickedItem= e.target
    console.log(theClickedItem)
    }
),1000)
