//「複数のチェックボックス」を作成してみよう
import { useState } from 'react';

const MultipleCheckBox = () => {
  //⬇︎フルーツのuseState
  const [fruits, setFruits] = useState([
    { label: 'Apple', value: 100, checked: false },
    { label: 'Banana', value: 200, checked: false },
    { label: 'Cherry', value: 300, checked: false },
  ]);
  //⬇︎合計の料金useState
  const [sum, setSum] = useState(0);

  //⬇︎handleChangeイベントハンドラ
  const handleChange = (e) => {
    //⬇︎フルーツがクリックされた時falseがtrueになる
    const nowFruits = fruits.map((fruit) => {
      const newFruit = { ...fruit };
      if (newFruit.label === e.target.value) {
        newFruit.checked = !fruit.checked;
      }
      return newFruit;
    });
    setFruits(nowFruits);

    ////⬇︎合計の料金を足し合わせる
    let sumVal = 0;
    nowFruits.forEach((fruit) => {
      if (fruit.checked) {
        sumVal += fruit.value;
      }
    });
    setSum(sumVal);

    ////⬇︎filter + forEachバージョン
    // let sumVal = 0;
    // nowFruits.filter((fruit) => fruit.checked).forEach((fruit) => (sumVal = sumVal + fruit.value));
    // setSum(sumVal);

    ////⬇︎filter + reduceバージョン
    //let sumVal = nowFruits.filter((fruit) => fruit.checked).reduce((sumVal, fruit) => sumVal + fruit.value, 0);
    //setSum(sumVal);
  };

  return (
    <div>
      <h4>複数あるチェックボックスを作成してみよう。</h4>
      <p>チェックボックス押下で「果物が選択され、合計の値段が表示されます。」</p>

      {fruits.map((fruit) => {
        return (
          <div key={fruit.label}>
            <input type='checkbox' id={fruit.label} value={fruit.label} checked={fruit.checked} onChange={handleChange} />

            <label htmlFor={fruit.label}>
              {fruit.label}:{fruit.value}円
            </label>
          </div>
        );
      })}

      <div>合計：{sum}円</div>
    </div>
  );
};

export default MultipleCheckBox;
