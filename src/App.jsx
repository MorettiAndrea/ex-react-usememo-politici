import { useState, useEffect } from "react";
const baseUrl = "http://localhost:3333/politicians";
export default function App() {
  const [data, setData] = useState([]);
  function fetchApi(url) {
    fetch(url)
      .then((res) => res.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchApi(baseUrl);
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="text-center">Lista politici</h1>
        <div className="row">
          {data.map((politician, index) => {
            return (
              <div className="col-4">
                <div className="card" key={index}>
                  <div className="card-body">
                    <img
                      src={politician.image}
                      class="card-img-top"
                      alt="..."
                    ></img>
                    <div className="card-text text-center">
                      {politician.name}
                    </div>
                    <div className="card-text text-center">
                      {politician.position}
                    </div>
                    <div className="card-text text-center">
                      {politician.biography}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
