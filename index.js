function isPositive(num){
    if (num>0){
        return `+${num}`
    } else {
        return num
    }
}

let price= []
let volume= 0
let marketCap= 0
let supply= 0
let convertedSupply= 0
let convertedPrice= 0
let convertedMarketCap= 0
let convertedVolume = 0
let fetchedData= 0

function fetcher(){
        fetch(`https://api.coincap.io/v2/assets`)
        .then((res)=>{return res.json()})
        .then((data)=>{
        fetchedData=data
        })
}

function formatNumber(num){
    return `$`+parseFloat(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
function renderAndUpdate(i){
    price[i]=fetchedData.data[i].priceUsd
    volume=fetchedData.data[i].volumeUsd24Hr
    marketCap=fetchedData.data[i].marketCapUsd
    supply=Number(fetchedData.data[i].supply).toFixed(2)
    change=Number(fetchedData.data[i].changePercent24Hr).toFixed(2)
    convertedSupply=formatNumber(supply)
    convertedPrice=formatNumber(price[i])
    convertedVolume=formatNumber(volume)
    convertedMarketCap=formatNumber(marketCap)
    document.querySelector(`#listItem${i}`).textContent=`${fetchedData.data[i][`name`]} // Current Price : ${convertedPrice} //  24hr Volume: ${convertedVolume} // Market Cap: ${convertedMarketCap}`
}

document.addEventListener(`DOMContentLoaded`, ()=>{
        fetcher()
        console.log(5)
        setTimeout(()=>{
        for(let i=0; i<10; i++){
            const currentAsset=document.createElement(`li`)
            currentAsset.setAttribute("class",`listItems`)
            currentAsset.setAttribute("id",`listItem${i}`)
            document.querySelector(`#crypto-ol`).append(currentAsset)
            renderAndUpdate(i)

            currentAsset.addEventListener(`mouseover`,(e)=>{
                e.target.style.color=`white`
            })
            currentAsset.addEventListener(`mouseleave`,(e)=>{
                e.target.style.color=``
            })
        }},400)

        document.querySelector(`#button`).addEventListener(`click`,()=>{
            const avgChange=fetchedData.data.slice(0,10).reduce((accumulator,obj)=>{
                return ((accumulator)+(obj.changePercent24Hr)/10)
                },0)

            document.querySelector(`#avg`).innerHTML=`
                <div id="dailyAvg"> 
                The Average Change in Price (last 24 hours): ${isPositive(avgChange.toFixed(2))}%
                </div>`
        })

    setInterval(()=>{
            fetcher()
            for(let i=0; i<10; i++){
                renderAndUpdate(i)
                document.querySelector(`#listItem${i}`).addEventListener(`click`,()=>{
                    document.querySelector(`#closerLook`).innerHTML=
                    `<ul id="listTitle">${fetchedData.data[i].name}
                    <li>Asset Trading Symbol: $${fetchedData.data[i].symbol}</li>
                    <li>Asset Rank: ${fetchedData.data[i].rank}</li>
                    <li>Price: ${formatNumber(price[i])} (${isPositive(Number(fetchedData.data[i].changePercent24Hr).toFixed(2))}%)</li>
                    <li>Current Supply: ${parseFloat(supply).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${fetchedData.data[i].symbol}</li>
                    </ul>`
                    document.querySelector(`#newAssetDiv`).style.padding=`25px 0px 0px 25px`
                })
            }
    },1000)
    console.log(4)})