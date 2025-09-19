import { useState, useEffect, useMemo } from "react";
import Card from "./assets/components/cards/Card";

const baseUrl = "http://localhost:3333/politicians";

export default function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [data, setData] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  const positions = useMemo(() => {
    const allPositions = [];
    data.forEach((p) => {
      if (!allPositions.includes(p.position)) {
        allPositions.push(p.position);
      }
    });
    return allPositions;
  }, [data]);

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
  }, []);

  const onChange = (e) => {
    setSearchedWord(e.target.value);
  };
  const onChangeSelect = (e) => {
    setSelectedPosition(e.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter((p) => {
      const filteredWord =
        p.name.toLowerCase().includes(searchedWord.toLowerCase()) ||
        p.biography.toLoweCase().includes(searchedWord.toLowerCase());
      const filterPosition =
        p.position.toLowerCase() === selectedPosition.toLowerCase() ||
        selectedPosition === "";
      return filteredWord && filterPosition;
    });
  }, [data, searchedWord, selectedPosition]);

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
        <select value={selectedPosition} onChange={onChangeSelect}>
          <option value="">Filtra per posizione</option>
          {positions.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        {filteredData.map((politician, index) => (
          <Card politician={politician} key={index} />
        ))}
      </div>
    </div>
  );
}
