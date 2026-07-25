//PostApp3.jsxから責務分離してきたもの
//検索入力欄

import React from 'react';

export const SearchInput2 = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor='searchInput'>ユーザー検索: </label>
      <input type='text' id='searchInput' value={value} onChange={onChange} />
    </div>
  );
};
