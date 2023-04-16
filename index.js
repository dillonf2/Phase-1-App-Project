
// Takes a percentage and adds a + sign if it is a positive percentage // 

function isPositive(num){
    if (num>0){
        return `+${num}`
    } else {
        return num
    }
}

// Fetch current crypto data; Out of the 100 returned asset objects, grab only the top 10 assets // 
// Append certain attributes of those assets to the DOM in an ordered list // 

document.addEventListener(`DOMContentLoaded`, ()=>{
    fetch(`https://api.coincap.io/v2/assets`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        for(let i=0; i<10; i++){
            const currentAsset=document.createElement(`li`)
            currentAsset.setAttribute("class","listItems")
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

            // Event Listener; click any of the top 10 assets for a closer look at some additional details of that asset //

            currentAsset.addEventListener(`click`,()=>{
                document.querySelector(`#closerLook`).innerHTML=
                `<ul id="listTitle">${data.data[i].name}
                <li>Asset Trading Symbol: $${data.data[i].symbol}</li>
                <li>Asset Rank: ${data.data[i].rank}</li>
                <li>Price: ${convertedPrice} (${isPositive(change)}%)</li>
                <li>Current Supply: ${convertedSupply} ${data.data[i].symbol}</li>
                </ul>`
                document.querySelector(`#newAssetDiv`).style.padding=`0px 0px 0px 25px`
        })

            // Event Listener; change the color of the text when a top 10 asset is moused over // 

        currentAsset.addEventListener(`mouseover`,(e)=>{
            e.target.style.color=`purple`
        })
        currentAsset.addEventListener(`mouseleave`,(e)=>{
            e.target.style.color=``
        })
    }
        window.setInterval(()=>{

        },2000)

        document.querySelector(`#button`).addEventListener(`click`,()=>{
            const avgChange=data.data.slice(0,10).reduce((accumulator,obj)=>{
                return ((accumulator)+(obj.changePercent24Hr)/10)
            },0)
            document.querySelector(`#avg`).innerHTML=`
                <div id="dailyAvg"> 
                The Average Change in Price (last 24 hours): ${isPositive(avgChange.toFixed(2))}%
                </div>
            `
        })
    })
})

// Formulas to format number values to US currency formatting including commas and dollar signs
    // amt = "$" + amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // amt= "$" + parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// currentAsset.textContent=`${dataObj[`data`][i][`name`]} // Current Price : $${Number(dataObj[`data`][i][`priceUsd`]).toFixed(2).toLocaleString("en-US")} //  24hr Volume: $${(Number(dataObj[`data`][i][`volumeUsd24Hr`]).toFixed(2)).toLocaleString("en-US")} // Market Cap: $${(Number(dataObj[`data`][i][`marketCapUsd`]).toFixed(2)).toLocaleString("en-US")}`