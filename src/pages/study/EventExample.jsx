//イベントリスナーを作成し確認する

const EventExample = () => {
  const clickHandler = () => {
    alert('ボタンがクリックされました');
  };
  const clickHandler2 = () => {
    console.log('ボタンがクリックされました2');
  };

  return (
    <>
      <h3>イベントリスナー No1</h3>
      <p>イベントリスナーを確認</p>
      <button onClick={clickHandler}>クリック</button>
      <button onClick={clickHandler2}>クリック2</button>
    </>
  );
};

export default EventExample;
