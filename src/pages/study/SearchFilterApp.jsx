//リアルタイム検索フィルターを作成してみよう。
//検索入力欄（input）に文字を入れると、その文字が含まれるアイテムだけがリアルタイムで下に絞り込まれて表示されます。

import React, { useState } from 'react';
import { SearchInput } from '../../components/study/SearchInput';
import { SearchResult } from '../../components/study/SearchResult';

//元となるデータ配列（本来はAPIなどから届くデータ）
const FRAMEWORKS = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Next.js' },
  { id: 3, name: 'Angular' },
  { id: 4, name: 'Vue' },
  { id: 5, name: 'Svelte' },
];

//SearchFilterAppコンポーネント
export const SearchFilterApp = () => {
  // ①検索欄に入力された文字を管理するstate
  const [searchTerm, setSearchTerm] = useState('');

  // ❌注意: 「元のデータから計算して作れるものは、Stateにしてはいけない」 、つまり「絞り込んだ結果」をStateにするとバグる（2重管理の罠）
  // ✖︎だから下記は不要となる。
  // ✖︎const [searchTerm, setSearchTerm] = useState(''); // State 1: 検索文字
  // ✖︎const [filteredList, setFilteredList] = useState(FRAMEWORKS); // State 2: 絞り込み結果　(❌不要となる)

  // ②元の配列を、入力された文字で絞り込んだ「新しい配列」を作るイベントハンドラー
  const filteredFrameworks = FRAMEWORKS.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()); //大文字・小文字を区別せずに検索できるように、どちらも小文字（toLowerCase）に揃えて判定する
    //.includes()⇒ 「現在の値searchTerm」に文字列(reactの中のrなど)が含まれているかをチェック　⇒ 含まれている場合trueを「filteredFrameworks」に返す(入れる)。
  });

  //return
  return (
    <div>
      <h2>リアルタイム検索フィルター</h2>

      {/* ⬇︎責務分離済み */}
      {/* 検索入力欄 input */}
      {/* <input type='text' placeholder='フレームワーク名を検索する' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> */}

      {/* ⬇︎SearchInput子コンポーネント */}
      {/* 検索入力欄 input */}
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {/* ⬇︎責務分離済み */}
      {/* 絞り込んだ結果一覧の表示 */}
      {/* <div style={{ marginTop: '20px' }}>
        <p>検索結果: {filteredFrameworks.length}</p>
        <ul>
          {filteredFrameworks.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div> */}

      {/* ⬇︎SearchResultList子コンポーネント */}
      {/* 絞り込んだ結果一覧の表示 */}
      <SearchResult items={filteredFrameworks} />
    </div>
  );
};
