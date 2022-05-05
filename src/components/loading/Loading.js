import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
