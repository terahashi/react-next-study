//Refactor.jsx
//①「<ul>をリファクタリングする。」

import AnimalItem from './AnimalItem';

const AnimalList = ({ animals }) => {
  if (animals.length === 0) {
    return <h3>アニマルが見つかりません。</h3>;
  }
  return (
    <ul>
      {animals.map((animal) => {
        return <AnimalItem key={animal} animal={animal} />;
      })}
    </ul>
  );
};

export default AnimalList;
