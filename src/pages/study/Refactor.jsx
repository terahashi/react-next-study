//コンポーネントのリファクタリング(整理))
//作成したモノを「components(部品)に分けて整理して'呼び出していく'」

import { useState } from 'react';
import AnimalList from '../../components/study/AnimalList';
import AnimalInput from '../../components/study/AnimalInput';

const Refactor = () => {
  const animals = ['Dog', 'Cat', 'Rat'];
  const [filterVal, setFilterVal] = useState('');

  //⬇︎②filterの機能(filterを元にfilterdAnimalsとして新しく作成)
  const filterdAnimals = animals.filter((animal) => {
    const isMatch = animal.indexOf(filterVal) !== -1;
    return isMatch;
  });

  return (
    <>
      <h3>コンポーネントのリファクタリング(整理)をやってみよう</h3>
      <p>「配列のFilterメソッドを確認しようのコード」を【リファクタリング】する。</p>
      <p>'Dog', 'Cat', 'Rat'以外を入力すると「アニマルが見つかりません」と文章が出る。</p>
      <AnimalInput InputState={[filterVal, setFilterVal]} />
      <AnimalList animals={filterdAnimals} />
    </>
  );
};

export default Refactor;
