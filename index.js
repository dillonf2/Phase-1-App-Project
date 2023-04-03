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
