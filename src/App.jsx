import { useState, useEffect, useMemo } from "react";
import Card from "./assets/components/cards/Card";

const baseUrl = "http://localhost:3333/politicians";

export default function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [data, setData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, []);

  const onChange = (e) => {
    setSearchedWord(e.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchedWord.toLowerCase()) ||
        p.biography.toLowerCase().includes(searchedWord.toLowerCase())
      );
    });
  }, [data, searchedWord]);

  return (
    <div className="container">
      <h1 className="text-center my-5">Lista politici</h1>
      <div className="d-center flex-direction-column">
        <label htmlFor="Search">Filtra per nome o biografia</label>
        <input
          className="my-3"
          type="text"
          value={searchedWord}
          onChange={onChange}
        />
      </div>
      <div className="row">
        {filteredData.map((politician, index) => (
          <Card politician={politician} key={index} />
        ))}
      </div>
    </div>
  );
}
