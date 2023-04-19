
// Function; Takes a percentage value and adds a + sign if it is a positive percentage // 

function isPositive(num){
    if (num>0){
        return `+${num}`
    } else {
        return num
    }
}

// Declare these variables globally so they can be accessed by multiple functions and update in real time //

let price= []
let volume= 0
let marketCap= 0
let supply= 0
let convertedSupply= 0
let convertedPrice= 0
let convertedMarketCap= 0
let convertedVolume = 0

// Function ; Format a number in USD (i.e 100000.54 ---> $100,000.54) //

function formatNumber(num){
    return `$`+parseFloat(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Fetch current crypto data; Out of the 100 returned asset objects, grab only the top 10 assets // 
// Append certain attributes of those assets to the DOM in an ordered list // 

document.addEventListener(`DOMContentLoaded`, ()=>{
    fetch(`https://api.coincap.io/v2/assets`)
    .then((res)=>{return res.json()})
    .then((data)=>{
        for(let i=0; i<10; i++){
            const currentAsset=document.createElement(`li`)
            currentAsset.setAttribute("class",`listItems`)
            currentAsset.setAttribute("id",`listItem${i}`)

             price[i]=data.data[i].priceUsd
             volume=data.data[i].volumeUsd24Hr
             marketCap=data.data[i].marketCapUsd
             supply=Number(data.data[i].supply).toFixed(2)
             change=Number(data.data[i].changePercent24Hr).toFixed(2)
             convertedSupply=parseFloat(supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
             convertedPrice="$" + parseFloat(price[i]).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            convertedVolume="$" + parseFloat(volume).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            convertedMarketCap="$" + parseFloat(marketCap).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            
            currentAsset.textContent=`${data.data[i][`name`]} // Current Price : ${convertedPrice} //  24hr Volume: ${convertedVolume} // Market Cap: ${convertedMarketCap}`
            document.querySelector(`#crypto-ol`).append(currentAsset)

            // Event Listener; change the color of the text when a top 10 asset is moused over // 

            currentAsset.addEventListener(`mouseover`,(e)=>{
                e.target.style.color=`white`
            })
            currentAsset.addEventListener(`mouseleave`,(e)=>{
                e.target.style.color=``
            })
        }


            // Event Listener; click the button to display the average gain of the top 10 assets //

        document.querySelector(`#button`).addEventListener(`click`,()=>{
            const avgChange=data.data.slice(0,10).reduce((accumulator,obj)=>{
                return ((accumulator)+(obj.changePercent24Hr)/10)
                },0)

            document.querySelector(`#avg`).innerHTML=`
                <div id="dailyAvg"> 
                The Average Change in Price (last 24 hours): ${isPositive(avgChange.toFixed(2))}%
                </div>`
        })
    })
})

// Update the DOM asset information every 2 seconds without needing to refresh the page //

document.addEventListener(`DOMContentLoaded`, ()=>{
    setInterval(()=>{
        fetch(`https://api.coincap.io/v2/assets`)
        .then((res)=>{return res.json()})
        .then((data)=>{
            for(let i=0; i<10; i++){
                price[i]=data.data[i].priceUsd
                volume=data.data[i].volumeUsd24Hr
                marketCap=data.data[i].marketCapUsd
                supply=Number(data.data[i].supply).toFixed(2)
                change=Number(data.data[i].changePercent24Hr).toFixed(2)
                convertedPrice=formatNumber(price[i])
                convertedVolume=formatNumber(volume)
                convertedMarketCap=formatNumber(marketCap)
                document.querySelector(`#listItem${i}`).textContent=`${data.data[i][`name`]} // Current Price : ${convertedPrice} //  24hr Volume: ${convertedVolume} // Market Cap: ${convertedMarketCap}`

                // Event Listener; click any of the top 10 assets for a closer look at some additional details of that asset //


                document.querySelector(`#listItem${i}`).addEventListener(`click`,()=>{
                    document.querySelector(`#closerLook`).innerHTML=
                    `<ul id="listTitle">${data.data[i].name}
                    <li>Asset Trading Symbol: $${data.data[i].symbol}</li>
                    <li>Asset Rank: ${data.data[i].rank}</li>
                    <li>Price: ${formatNumber(price[i])} (${isPositive(Number(data.data[i].changePercent24Hr).toFixed(2))}%)</li>
                    <li>Current Supply: ${parseFloat(supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${data.data[i].symbol}</li>
                    </ul>`
                    document.querySelector(`#newAssetDiv`).style.padding=`25px 0px 0px 25px`
                })
            }}
        )
    },1000)
})


// Formulas to format number values to US currency formatting including commas and dollar signs//

    // amt = "$" + amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // amt= "$" + parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
