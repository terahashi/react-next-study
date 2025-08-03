//「チェックボックス」を作成してみよう
import { useState } from 'react';

const SingleCheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = (e) => {
    setIsChecked((prevState) => {
      let state = !prevState;
      return state;
    });
  };

  return (
    <div>
      <h4>シンプルなチェックボックスを作成してみよう。</h4>
      <p>チェックボックス押下で「ONとOFF文字表示」が切り替わります。</p>

      <label htmlFor='check'>チェック:</label>
      <input type='checkbox' id='check' checked={isChecked} onChange={() => toggleChecked((prevState) => !prevState)} />

      <p>{isChecked ? 'ON' : 'OFF'}</p>
    </div>
  );
};

export default SingleCheckBox;
