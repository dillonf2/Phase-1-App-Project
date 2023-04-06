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


document.addEventListener(`DOMContentLoaded`, function (){
    document.querySelector(`#testUl`).append(testObj[`title`])
    objToList(testObj)
})
document.addEventListener(`DOMContentLoaded`, function(){
    fetch(`https://api.coincap.io/v2/assets`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        console.log(data)
        let dataObj=data
        for(let i=0; i<10; i++){
        console.log(dataObj[`data`][i])
        }
    })

})
