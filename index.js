function objToList(obj){
    for (const key in obj){
        if(key!==`title`){
        newLi=document.createElement(`li`)
        newLi.textContent=`${key}: ${obj[key]}`
        document.querySelector(`#testUl`).append(newLi)
        }
    }
}
function isPositive(num){
    if (num>0){
        return `+${num}`
    } else {
        return num
    }
}

document.addEventListener(`DOMContentLoaded`, ()=>{
    fetch(`https://api.coincap.io/v2/assets`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        console.log(data)
        for(let i=0; i<10; i++){
            const currentAsset=document.createElement(`li`)
            currentAsset.setAttribute(`id`,`listItems`)
            const price=data.data[i].priceUsd
            const volume=data.data[i].volumeUsd24Hr
            const marketCap=data.data[i].marketCapUsd
            const supply=Number(data.data[i].supply).toFixed(2)
            const change=Number(data.data[i].changePercent24Hr).toFixed(2)
            const convertedSupply=parseFloat(supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const convertedPrice="$" + parseFloat(price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const convertedVolume="$" + parseFloat(volume).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            const convertedMarketCap="$" + parseFloat(marketCap).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            currentAsset.textContent=`${data.data[i][`name`]} // Current Price : ${convertedPrice} //  24hr Volume: ${convertedVolume} // Market Cap: ${convertedMarketCap}`
            document.querySelector(`#crypto-ol`).append(currentAsset)
            currentAsset.addEventListener(`click`,()=>{
                document.querySelector(`#closerLook`).innerHTML=
                `<ul id="listTitle">${data.data[i].name}
                <li>Asset Trading Symbol: $${data.data[i].symbol}</li>
                <li>Asset Rank: ${data.data[i].rank}</li>
                <li>Price: ${convertedPrice} (${isPositive(change)}%)</li>
                <li>Current Supply: ${convertedSupply} ${data.data[i].symbol}</li>
                </ul>`
            })
            currentAsset.addEventListener(`mouseover`,(e)=>{
                e.target.style.color=`purple`
            })
            currentAsset.addEventListener(`mouseleave`,(e)=>{
                e.target.style.color=``
            })
        }
        // document.querySelector(`#button`).addEventListener(`click`, ()=>{
        //     const reducer = (accumulator,currentValue)=>accumulator+currentValue
        //     const change = data.data.changePercent24Hr.reduce(reducer,0)
        //     const newDiv=document.createElement(`div`)
        //     newDiv.textContent=`The average 24hr change of the top 10 list is ${change/10}`
        //     document.querySelector(`#button`).append(newDiv)
        // })
        document.querySelector(`#button`).addEventListener(`click`,()=>{
            const avgChange=data.data.slice(0,10).reduce((accumulator,obj)=>{
                return ((accumulator)+(obj.changePercent24Hr)/10)
            },0)
            document.querySelector(`#avg`).innerHTML=`
                <div id="dailyAvg"> 
                The average change in price (last 24 hours): ${isPositive(avgChange.toFixed(2))}%
                </div>
            `
            // `${isPositive(avgChange.toFixed(2))}%`
        })
        
    })

})
//888,354,5500; -7950 1531 N telegraph

// const e=document.querySelectorAll(`li`).forEach(function(){console.log(`bitcoin`)})
// console.log(e)
// amt = "$" + amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// amt= "$" + parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// currentAsset.textContent=`${dataObj[`data`][i][`name`]} // Current Price : $${Number(dataObj[`data`][i][`priceUsd`]).toFixed(2).toLocaleString("en-US")} //  24hr Volume: $${(Number(dataObj[`data`][i][`volumeUsd24Hr`]).toFixed(2)).toLocaleString("en-US")} // Market Cap: $${(Number(dataObj[`data`][i][`marketCapUsd`]).toFixed(2)).toLocaleString("en-US")}`