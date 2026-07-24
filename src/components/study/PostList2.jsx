//PostApp2.jsxを責務分離したもの
//ユーザー一覧のループ表示（見た目）

import React from 'react';
import { PostItem2 } from './PostItem2';

export const PostList2 = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <PostItem2 key={user.id} user={user} />
      ))}
    </ul>
  );
};
