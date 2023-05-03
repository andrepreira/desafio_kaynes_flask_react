import React from 'react';

function ErrorPage(props) {
  return (
    console.log(props),
    console.log(props.errorCode),
    console.log(props.errorStatusText),
    <div>
      <h1>Oops! Something went wrong.</h1>
      {props.errorCode === 429 && props.errorStatusText === 'TOO MANY REQUESTS'? (
        <h2>You exceeded your current quota. Please check your plan and billing details.</h2>
      ) : props.errorCode === 401 && props.errorStatusText === 'UNAUTHORIZED'? (
        <h2>Your API key is invalid. Please check your API key and try again.</h2>
      )
      : (
        <h2>We're sorry, but an error has occurred. Please try again later.</h2>
      )}
    </div>
  );
}

export default ErrorPage;