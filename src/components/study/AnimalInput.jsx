//Refactor.jsx
//④AnimalInputを作成

const AnimalInput = ({ InputState }) => {
  const [filterVal, setFilterVal] = InputState;
  return <input type='text' value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />;
};

export default AnimalInput;
