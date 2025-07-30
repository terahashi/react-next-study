//③AnimalItemを追加

const AnimalItem = ({ animal }) => {
  return (
    <li>
      {animal}
      {animal === 'Dog' && '★'}
    </li>
  );
};

export default AnimalItem;
