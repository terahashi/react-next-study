////トーストを作成してみよう
import { useState } from 'react';
import Toast from '../../components/study/Toast';

const ToastLesson = () => {
  const [showToast, setToast] = useState(false); //showToastの初期値は「false」

  const handleClick = () => {
    setToast(true); // トーストをtrueにして表示
    setTimeout(() => setToast(false), 5000); // 5秒後にトーストをfalseにして非表示
  };

  return (
    <div>
      <h2>トーストの例(5秒間トーストを表示)</h2>
      <button onClick={handleClick}>トーストのボタン</button>

      {showToast && <Toast message='トーストが表示されました！' />}
    </div>
  );
};

export default ToastLesson;
