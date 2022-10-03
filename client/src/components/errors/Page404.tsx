import { FC } from 'react';

import './page404.scss';

const Page404: FC = () => {
   return (
      <div className="page-404 fade-animation flex flex-col justify-center items-center">
         <h2 className="text-8xl font-black">404</h2>
         <h3 className="text-xl text-gray-500">Страница не найдена</h3>
      </div>
   );
};

export default Page404;
