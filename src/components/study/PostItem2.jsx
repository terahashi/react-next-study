//PostApp2.jsxを責務分離したもの
//ユーザー1人分の表示（見た目）
import React from 'react';

export const PostItem2 = ({ user }) => {
  return (
    <li style={{ marginBottom: '30px' }}>
      <h3 style={{ margin: '8px' }}>id(例):{user.id}</h3>
      <p style={{ margin: '8px' }}>名前(例):{user.name}</p>
      <p style={{ margin: '8px' }}>メールアドレス(例):{user.email}</p>
    </li>
  );
};
