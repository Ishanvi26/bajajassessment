import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(JSON.parse(jsonInput)),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Invalid JSON input', error);
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((option) => option !== value)
        : [...prevOptions, value]
    );
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div>
      <Head>
        <title>21BCE2712</title> {}
      </Head>

      <h1>BFHL JSON Processor</h1>
      
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON input here'
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleOptionChange}
          />
          Alphabets
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            value="Highest Lowercase Alphabet"
            onChange={handleOptionChange}
          />
          Highest Lowercase Alphabet
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        {renderFilteredResponse()}
      </div>
    </div>
  );
}