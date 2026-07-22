//SearchFilterApp.jsxから ⬇︎絞り込んだ結果一覧の表示 を責務分離
import React from 'react';

// 親から「絞り込んだ後の配列(items)」を受け取る
export const SearchResult = ({ items }) => {
  return (
    <div style={{ marginTop: '16px' }}>
      <p>検索結果: {items.length}件</p>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
