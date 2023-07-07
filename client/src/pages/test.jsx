import axios from "axios";
import React, { useState, useEffect } from "react";

const urlMikronode = "http://localhost:4000/api/v1/isp/mikronode";

const RetryComponent = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (retryCount >= 3) {
      setResult(`${retryCount} Not Connected`);
      return;
    }

    // Function to perform the action (e.g., API call, network request)
    const performAction = async () => {
      try {
        axios
          .get(urlMikronode)
          .then((response) => {
            return console.log(response);
          })
          .catch((error) => {
            return console.log(error);
          });
        // Simulating an unsuccessful action for demonstration purposes
        throw new Error("Unsuccessful action");
        // Replace the above line with your actual action logic
        // If successful, update the 'result' state accordingly
      } catch (error) {
        console.log("Error:", error);
        setRetryCount(retryCount + 1);
        setTimeout(performAction, 2000); // Retry after 20 seconds
      }
    };

    performAction();
  }, [retryCount]);

  return (
    <div>
      <h1>Result: {result}</h1>
    </div>
  );
};

export default RetryComponent;
