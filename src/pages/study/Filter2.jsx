//配列のフィルターメソッドの使い方2

import Profile from '../../components/study/Profile';
import { useState } from 'react';

const persons = [
  {
    name: 'Takahashi',
    age: 18,
    hobbies: ['sports', 'music'],
  },
  {
    name: 'Okuyama',
    age: 25,
    hobbies: ['movie', 'music'],
  },
  {
    name: 'Tom',
    age: 21,
    hobbies: ['sports', 'travel', 'game'],
  },
];

const Filter2 = () => {
  const [filterVal, setFilterVal] = useState('');
  return (
    <>
      <h3> 配列のFilterメソッドを確認しよう</h3>
      <p>入力欄を設置して、入力値と名前が一致したもののみ表示する仕組みを作成してください。(例:インプット欄にTakahashiと打てば、Takahashiが出る。)</p>
      <input type='text' value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
      <ul>
        {persons
          .filter((person) => {
            const isMatch = person.name.indexOf(filterVal) !== -1;
            return isMatch;
          })
          .map((person) => (
            <li key={person.name}>
              <Profile {...person} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default Filter2;
