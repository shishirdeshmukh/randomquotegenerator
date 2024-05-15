import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    alert('Quote copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${quote} - ${author}`
    )}`;
    window.open(twitterUrl, '_blank');
  };
  

  return (
    <div className="App">
      <div className='heading'><i className="fa-solid fa-quote-left"></i> Random Quote Generator <i className="fa-solid fa-quote-right"></i></div>
      <div className="quote-card">
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>{quote}</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            <cite title="Source Title">{author}</cite>
          </figcaption>
          <div className="copy-icon" onClick={copyToClipboard}>
            <i className="fa-regular fa-copy"></i>
          </div>
        </figure>
      </div>
      <div className="button-container">
        <button onClick={fetchQuote}>New Quote</button>
        <button onClick={shareOnTwitter}>Share on Twitter</button>
      </div>

      <footer>
  <p> Note - Keep your internet connection active as this application requires internet access to fetch random quotes from an API.</p>
    <p className='copyright'>@Copyright - Shishir Deshmukh</p>
</footer>

    </div>
  );
}

export default App;
