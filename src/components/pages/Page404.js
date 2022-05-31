import phantom from '../../images/phantom.webp'

const Page404 = () => {
  return (
    <div className="page-404 animate__animated animate__fadeIn">
      <div>
        <img src={phantom} alt="phantom" />
        <p className="page-404__p">Страница не найдена</p>
      </div>
    </div>
  );
};

export default Page404;
