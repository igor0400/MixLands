import { useEffect, useState } from 'react';

const ProfilePosts = ({ players }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const data = [];

    players.forEach((item) => {
      const posts = item.posts ? item.posts : null;

      if (posts) {
        for (let key in posts) {
          data.push({ ...posts[key], owner: item.name });
        }
      }
    });

    setPosts(data);
  }, []);

  return (
    <div className="profile-page__posts animate__animated animate__fadeIn duration05">
      <h2 className="titleh2">Посты</h2>
      {posts.length === 0 ? (
        <h2 className="posts-null">Пока нет постов</h2>
      ) : (
        posts
          .sort((a, b) => a.clearDate - b.clearDate)
          .reverse()
          .map((item, i) => (
            <div className="user__post" key={i}>
              <div className="title">
                {item.owner} — {item.date}
              </div>
              <div className="text">{item.text}</div>
            </div>
          ))
      )}
    </div>
  );
};

export default ProfilePosts;
