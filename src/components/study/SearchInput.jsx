//SearchFilterApp.jsxから 検索入力欄 input を責務分離
import React from 'react';

export const SearchInput = ({ value, onChange }) => {
  return (
    <div>
      {/* //検索入力欄 input */}
      <input type='text' placeholder='フレームワーク名を検索する' value={value} onChange={onChange} />
    </div>
  );
};
