//一番最小単位の、記事1件分を表示するコンポーネント

import React from 'react';

export const PostItem = ({ post }) => {
  //postは「PostList.jsxのmapで回している1件分のpostデータを「受け取る」
  return <li>{post.title}</li>;
};
