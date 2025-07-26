//配列のフィルターメソッドの使い方
//※filterメソッドはよく使う
import { useState } from 'react';

//⬇︎配列
const animals = ['Dog', 'Cat', 'Rat'];

const Filter = () => {
  const [filterVal, setFilterVal] = useState('');
  //⬇︎配列animalsに「filter処理でduckが一致したならば、コンソールにduckを表示する(duckは存在しないので何も表示されない)」
  console.log(animals.filter((animal) => animal === 'duck'));

  return (
    <>
      <h3>配列のFilterメソッドを確認しよう</h3>

      <input type='text' value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />

      <ul>
        {animals
          .filter((animal) => animal.indexOf(filterVal) !== -1)
          .map((animal) => (
            <li key={animal}>{animal}</li>
          ))}
      </ul>
    </>
  );
};

export default Filter;
