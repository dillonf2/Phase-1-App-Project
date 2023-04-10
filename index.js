function objToList(obj){
    for (const key in obj){
        if(key!==`title`){
        newLi=document.createElement(`li`)
        newLi.textContent=`${key}: ${obj[key]}`
        document.querySelector(`#testUl`).append(newLi)
        }
    }
}
document.addEventListener(`DOMContentLoaded`, function(){
    fetch(`https://api.coincap.io/v2/assets`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        console.log(data)
        let dataObj=data
        for(let i=0; i<10; i++){
            const currentAsset=document.createElement(`li`)
            currentAsset.setAttribute(`id`,`listItems`)
            // currentAsset.textContent=`${dataObj[`data`][i][`name`]} // Current Price : $${Number(dataObj[`data`][i][`priceUsd`]).toFixed(2).toLocaleString("en-US")} //  24hr Volume: $${(Number(dataObj[`data`][i][`volumeUsd24Hr`]).toFixed(2)).toLocaleString("en-US")} // Market Cap: $${(Number(dataObj[`data`][i][`marketCapUsd`]).toFixed(2)).toLocaleString("en-US")}`
            const price=dataObj.data[i].priceUsd
            const convertedPrice="$" + parseFloat(price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            currentAsset.textContent=`${dataObj[`data`][i][`name`]} // Current Price : ${convertedPrice} //  24hr Volume: $${(Number(dataObj[`data`][i][`volumeUsd24Hr`]).toFixed(2)).toLocaleString("en-US")} // Market Cap: $${(Number(dataObj[`data`][i][`marketCapUsd`]).toFixed(2)).toLocaleString("en-US")}`
            document.querySelector(`#crypto-ol`).append(currentAsset)
        }
    })

})
document.addEventListener(`DOMContentLoaded`, ()=>{
    document.querySelectorAll(`li`).forEach(()=>{console.log(`bitcoin`)})
})
// const e=document.querySelectorAll(`li`).forEach(function(){console.log(`bitcoin`)})
// console.log(e)
// amt = "$" + amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
amt= "$" + parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
currentAsset.textContent=`${dataObj[`data`][i][`name`]} // Current Price : $${Number(dataObj[`data`][i][`priceUsd`]).toFixed(2).toLocaleString("en-US")} //  24hr Volume: $${(Number(dataObj[`data`][i][`volumeUsd24Hr`]).toFixed(2)).toLocaleString("en-US")} // Market Cap: $${(Number(dataObj[`data`][i][`marketCapUsd`]).toFixed(2)).toLocaleString("en-US")}`