//PostApp3.jsxから責務分離してきたもの
//「表示目的」の絞り込み結果の計算

import react from 'react';

export const PostList3 = ({ filter }) => {
  //if文で「該当なし」を先に return してしまう書き方。(読みやすい)
  //⬇︎該当するユーザーがいない場合
  if (filter.length === 0) {
    return <p>該当するユーザーはいません</p>;
  }

  //⬇︎該当するユーザーがいる場合
  return (
    <ul>
      {filter.map((user) => (
        <li key={user.id}>
          <h3 style={{ display: 'inline-block', margin: '8px' }}>{user.name}</h3>
          <p style={{ display: 'inline-block', margin: '8px' }}>　({user.email})</p>
        </li>
      ))}
    </ul>
  );
};
