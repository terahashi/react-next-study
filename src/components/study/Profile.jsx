//ListKey.jsx
//Filter2.jsx

//ListKeyから{ name, age, hobbies }が渡ってくる。
const Profile = ({ name, age, hobbies }) => {
  return (
    //渡ってきた{ name, age, hobbies }を下記３箇所で使用する。
    <div>
      <h4>Name: {name}</h4>
      <h4>Age: {age}</h4>

      <h4>Hobby:</h4>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
