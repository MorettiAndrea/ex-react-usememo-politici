import { useState, useEffect } from "react";
const baseUrl = "http://localhost:3333/politicians";
export default function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [data, setData] = useState([]);
  function fetchApi(url) {
    fetch(url)
      .then((res) => res.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }

  const onChange = (e) => {
    setSearchedWord(e.target.value);
  };

  useEffect(() => {
    fetchApi(baseUrl);
  }, []);

  const filtredData = data.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchedWord.toLowerCase()) ||
      p.biography.toLowerCase().includes(searchedWord.toLowerCase())
    );
  });

  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">Lista politici</h1>
        <div className="d-center flex-direction-column">
          <label htmlFor="Search">Filtra per nome </label>
          <input
            className="my-3"
            type="text"
            value={searchedWord}
            onChange={onChange}
          />
        </div>
        <div className="row">
          {filtredData.map((politician, index) => {
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
