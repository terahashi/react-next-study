//オブジェクトのステートを更新
//useStateを使用する
import { useState } from 'react';

const ObjectState = () => {
  const orderObject = { item: 'Apple', count: 1 };
  const [order, setOrder] = useState(orderObject);

  ////⬇︎イベントハンドラー
  const chengeItem = (e) => {
    //(order)は元々の値item:'Apple'のこと。
    //オブジェクトを更新する際は...orderで【新しいオブジェクトをstateに登録する。】
    setOrder((order) => ({ ...order, item: e.target.value }));
  };
  const countUp = () => {
    setOrder((order) => ({ ...order, count: order.count + 1 }));
  };
  const countDown = () => {
    setOrder((order) => ({ ...order, count: order.count - 1 }));
  };
  return (
    <>
      <h3>"オブジェクトのステート"を更新しよう</h3>
      <p>「+と-ボタンをクリックするとCountの表示が1ずつ増減する機能」と「input要素に連動してItemの文字が変更される機能」を実装する。</p>
      <h4>
        Item: {order.item}　/　count: {order.count}
      </h4>

      <input type='text' order={order.item} onChange={chengeItem} />
      <br />
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>+</button>
    </>
  );
};
export default ObjectState;
