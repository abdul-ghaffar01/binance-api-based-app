
// Creating urls
const createTradeUrl = (pairs) => {
    `wss://stream.binance.com:9443/ws/${pair}@trade`
    console.log("Creating url")
}

const createOrderBookUrl = (pairs) => {
    `wss://stream.binance.com:9443/ws/${pair}@depth5`
    console.log("Creating url")
}

const createTickerUrl = (pairs) => {
    `wss://stream.binance.com:9443/ws/${pair}@ticker`
    console.log("Creating url")
}


// Main exporting stream array
const binanceStreams = [
    { type: "trade", url: createTradeUrl },
    { type: "orderBook", url: createOrderBookUrl },
    { type: "ticker", url: createTickerUrl },
]

export default binanceStreams;