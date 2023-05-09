import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

interface CoinData {
  id: string;
  name: string;
  image: string;
  current_price: number;
  symbol: string;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface CoinProps {
  key: string;
  name: string;
  image: string;
  price: number;
  symbol: string;
  volume: number;
  priceChange: number;
  marketCap: number;
}

const Coin: React.FC<CoinProps> = ({
  name,
  image,
  price,
  symbol,
  volume,
  priceChange,
  marketCap,
}) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol.toUpperCase()}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${price.toLocaleString()}</p>
          <p className="coin-volume">${volume.toLocaleString()}</p>
          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
          )}
          <p className="coin-marketcap">
             ${marketCap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className="coin-app">
        <h1 className="coin-text">Crypto Price Tracker</h1>
        <h3 className="creator-content">Developed & Designed by <a href="https://rmzn.netlify.app" target="_blank">Ramazan Azimli</a></h3>
        <form>
          <input
            type="text"
            placeholder="Search Crypto"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              price={coin.current_price}
              symbol={coin.symbol}
              volume={coin.total_volume}
              priceChange={coin.price_change_percentage_24h}
              marketCap={coin.market_cap}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
    
    // With our app, you can easily track the prices of all your favorite cryptocurrencies in real-time, including Bitcoin, Ethereum, Litecoin, and more. Our app provides you with accurate and up-to-date information on the latest prices, market trends, and trading volumes, so you can make informed decisions about your investments. Whether you're a seasoned crypto trader or just getting started, our app is the perfect tool for keeping track of the ever-changing crypto market. ###########################################################################################################################################################################################################################################################################################################################################################################################################################################################################################
 // Developed & Designed by Ramazan Azimli. ALl Rights Reserved.
