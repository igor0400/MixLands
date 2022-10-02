import { FC, useEffect, useState } from 'react';

interface Props {
   children: any;
}

const Background: FC<Props> = ({ children }: Props) => {
   const [scrollHeight, setScrollHeight] = useState<number>(
      document.body.scrollHeight
   );
   useEffect(
      () => setScrollHeight(document.body.scrollHeight),
      [document.body.scrollHeight]
   );

   return (
      <>
         <div className="background">
            <div className="bg-ellipse bg-ellipse__orange"></div>
            <div
               className="bg-ellipse bg-ellipse__yellow"
               style={scrollHeight < 1200 ? { display: 'none' } : undefined}
            ></div>
            <div
               className="bg-ellipse bg-ellipse__green"
               style={scrollHeight < 1400 ? { display: 'none' } : undefined}
            ></div>
         </div>
         {children}
      </>
   );
};

export default Background;
