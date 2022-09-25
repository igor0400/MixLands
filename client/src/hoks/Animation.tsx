import React, { FC, useEffect, useState } from 'react';

interface PropsType {
   children: React.ReactNode;
}

const PageAnimation: FC<PropsType> = (props: PropsType) => {
   const [animateCalss, setAnimateClass] = useState(
      'animate__animated animate__fadeIn'
   );
   useEffect(() => {
      const timeout = setTimeout(
         () => setAnimateClass('animate__animated'),
         300
      );
      return () => {
         clearTimeout(timeout);
      };
   });
   return <div className={animateCalss}>{props.children}</div>;
};

export default PageAnimation;
