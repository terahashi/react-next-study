//条件分岐を設ける
//if文、３項演算子、&&(AND条件)、??(Null合体演算子)、
import { useState } from 'react';

const ConditionalBranch = () => {
  const animals = ['Dog', 'Cat', 'Rat'];
  //⬇︎④??(Null合体演算子)の確認の時に使用する。
  // const animals = ['Dog', 'Cat', null, 'Rat'];

  const [filterVal, setFilterVal] = useState('');

  return (
    <>
      <h3>条件分岐を設ける方法を学ぼう</h3>
      <p>if文、三項演算子(?を使用)、&&(AND条件演算子)について学ぶ。</p>
      <br />
      {/* <input type='text' value={filterVal} onChange={(e) => setFilterVal(e.target.value)} /> */}
      <ul>
        {/* ⬇︎①if文を確認しよう。 */}
        <h4>①if文「Dogに一致したら★印を付ける。」</h4>
        <p>お馴染みのif文。else有り</p>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            console.log(animal.indexOf(filterVal));
            return isMatch;
          })
          .map((animal) => {
            if (animal === 'Dog') {
              return <li key={animal}>{animal}★</li>;
            } else {
              return <li key={animal}>{animal}</li>;
            }
          })}

        <br />

        {/* ⬇︎②三項演算子を確認しよう。 */}
        <h4>②三項演算子(?を使用)「Catに一致したら★印を付ける。」</h4>
        <p>条件式 ? 真の場合の値 : 偽の場合の値</p>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((animal) => {
            return <li key={animal}>{animal === 'Cat' ? animal + '★' : animal}</li>;
          })}

        <br />

        {/* ⬇︎③&&(AND条件)を確認しよう(trueの時のみ'★'が付きます) */}
        <h4>③&&(AND条件演算子)「Ratに一致したら★印を付ける。」</h4>
        <p>条件1 && 条件2</p>
        {animals
          .filter((animal) => {
            const isMatch = animal.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((animal) => {
            return (
              <li key={animal}>
                {animal}
                {animal === 'Rat' && '★'}
              </li>
            );
          })}

        {/* ⬇︎④??(Null合体演算子)を確認しよう(trueの時のみ'★'が付きます) */}
        {/* <p>④??(Null合体演算子)先取りと理解する➡︎「Dogに一致したら★印を付ける。」</p>
        {animals
          .filter((animal) => {
            const animalStr = animal ?? '';
            const isMatch = animalStr.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((animal) => {
            return (
              <li key={animal}>
                {animal ?? 'null,またはundefindでした'}
                {animal === 'Dog' && '★'}
              </li>
            );
          })} */}
      </ul>
    </>
  );
};

export default ConditionalBranch;
