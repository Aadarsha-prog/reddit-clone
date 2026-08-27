import { useState } from "react";
import Button from "../components/core/button";

function mockingAPICall(userName: string, delay: number) {
  return new Promise<{ userName: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        userName,
      });
    }, delay);
  });
}

function Mutations() {
  const [fetchedData, setFetchedData] = useState<{ userName: string } | null>(
    null,
  );
  async function handleFetchData(userName: string, delay: number) {
    try {
      const data = await mockingAPICall(userName, delay);
      setFetchedData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        Fetched data will be displayed here: {JSON.stringify(fetchedData)}
      </div>
      <Button
        onClick={() => {
          handleFetchData("Jhon", 2000);
        }}
      >
        Fetch data Jhon
      </Button>
      <Button
        onClick={() => {
          handleFetchData("Mary", 500);
        }}
      >
        Fetch data Mary
      </Button>
      <Button
        onClick={() => {
          handleFetchData("Ram", 5000);
        }}
      >
        Fetch data Ram
      </Button>
      <Button
        onClick={() => {
          handleFetchData("Sita", 3000);
        }}
      >
        Fetch data Sita
      </Button>
    </div>
  );
}

export default Mutations;
