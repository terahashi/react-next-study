import Profile from '../../components/study/Profile';

//⬇︎①オブジェクトを用意しよう
const persons = [
  {
    name: 'Takahashi',
    age: 18,
    hobbies: ['movie'],
  },
  {
    name: 'okuyama',
    age: 25,
    hobbies: ['game'],
  },
  {
    name: 'Tom',
    age: 29,
    hobbies: ['dance'],
  },
];

const ListKey = () => {
  return (
    <>
      <h3>リストにキーを設定しよう</h3>
      <p>Profileコンポーネント内のリスト表示部分にkeyを設定して、ワーニング表示がされないようにする。</p>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Profile {...person} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListKey;
