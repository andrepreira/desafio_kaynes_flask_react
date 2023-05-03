import React, { useState } from 'react';
import ErrorPage from './ErrorPage';

function App() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [r, setR] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [errorStatusText, setStatusText] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://my-ip/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      setIsSubmitting(false);

      if (!response.ok) {
        const res = await response;
        console.log(res.status);
        console.log(res.statusText);
        setR(res);
        if (res.status === 401) {
          throw new Error('API key is invalid');
        } else if (res.status === 429) {
          throw new Error('API key has reached its daily request limit');
        }

        throw new Error('Something went wrong');
      }
      const data = await response.json();
      console.log(data.output);
      setOutput(data.output);
    } catch (error) {
      console.log(error);
      console.log(r);
      setError(true);
      setIsSubmitting(false);
      setErrorCode(r.status);
      setStatusText(r.statusText);
    }
  };

  return (
    <div className="row">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter your prompt here"
            className="form-container"
          />
          {!isSubmitting && <button type="submit">Submit</button>}
          {isSubmitting && <div className="div-load">Loading...</div>}
        </form>
        {error ? (
          <div>
            <ErrorPage errorCode={errorCode} errorStatusText={errorStatusText}> </ErrorPage>
          </div>
        ) : (
          <div className="output">{output}</div>
        )}
      </div>
    </div>
  );
}

export default App;
