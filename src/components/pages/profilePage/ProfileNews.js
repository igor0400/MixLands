const ProfileNews = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [textareaValue, setTextareaValue] = useState('');
  const [addNewPostError, setAddNewPostError] = useState(false);
  const [addNewPostProggres, setAddNewPostProggres] = useState(false);

  const textarea = document.querySelector('#add-new-post');

  const response = async () => {
    let response = true;

    await axios
      .get('https://mixlands-3696a-default-rtdb.firebaseio.com/users.json')
      .catch(() => {
        response = false;
      });

    return response;
  };

  function getDateTime() {
    const now = new Date();
    const day = plusZero(now.getDate());
    const month = plusZero(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = plusZero(now.getHours());
    const minutes = plusZero(now.getMinutes());
    const seconds = plusZero(now.getSeconds());

    return `${hours}:${minutes} ${day}.${month}.${year}`;
  }

  const addNewPost = async () => {
    if (textareaValue === '') {
      setAddNewPostError('Заполните поле');
      setAddNewPostProggres('error');
      return;
    }

    if (!response()) {
      setAddNewPostError('Ошибка сервера');
      setAddNewPostProggres('error');
      return;
    }

    setAddNewPostError(false);
    setAddNewPostProggres('loading');

    await set(ref(database, `/users/${user.name}/posts/${postId}`), {
      text: textareaValue,
      date: getDateTime(),
      id: postId,
    });

    await set(
      ref(database, `/posts/postId`),
      +postId <= 8 ? `0${+postId + 1}` : +postId + 1
    );

    setAddNewPostProggres('succses');
    await getData();
    textarea.value = '';
    setTimeout(() => setAddNewPostProggres(false), 2000);
  };

  return (
    <div className="profile-page__profile__posts">
      <div className="profile-page__profile__posts__top">
        <h2 className="titleh2">Посты</h2>
      </div>
      <div className="profile-page__profile__posts__add-new">
        {addNewPostError ? <p className="error">{addNewPostError}</p> : null}
        <div className="textarea">
          <textarea
            placeholder="Напишите пост..."
            name="add-new-post"
            id="add-new-post"
            maxLength="500"
            onChange={(e) => setTextareaValue(e.target.value + '')}
          />
          <span>{textareaValue.length}/500</span>
        </div>
        <div className="add-posts-btn">
          <div className="support__btns">
            <button
              className="support-btn"
              onClick={() => (textarea.value = '')}
            >
              Очистить
            </button>
            <button
              className="support-btn"
              onClick={() => {
                if (textareaValue !== '') {
                  copyText(textareaValue, true);
                }
              }}
            >
              Копировать
            </button>
            <button
              className="support-btn"
              onClick={() => {
                window.navigator.clipboard
                  .readText()
                  .then((data) => (textarea.value += data));
              }}
            >
              Вставить
            </button>
          </div>
          {addNewPostProggres === 'loading' ? (
            <button className="btn btn-blue btn-loading">
              <Spinner animation="border" variant="primary" size="sm" />
            </button>
          ) : addNewPostProggres === 'succses' ? (
            <button className="btn btn-succses succses">
              <div className="animate__animated animate__fadeInLeft">
                Готово
              </div>
            </button>
          ) : (
            <button className="btn btn-blue" onClick={addNewPost}>
              Опубликовать
            </button>
          )}
        </div>
      </div>
      {user.posts ? (
        posts.reverse().map((item, i) => (
          <div className="user__post" key={i}>
            <div className="title">
              {user.name} — {item.date}
            </div>
            <div className="text">{item.text}</div>
          </div>
        ))
      ) : (
        <h4 className="posts-null">Пока нет постов</h4>
      )}
    </div>
  );
};

export default ProfileNews;
