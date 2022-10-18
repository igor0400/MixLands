import { FC } from 'react';
import { getSortedPosts } from '../../../utils/supportFunctions';

import { useSelector } from 'react-redux';
import Post from './Post';

const Posts: FC = () => {
   const { userData } = useSelector((state: any) => state.user);

   return (
      <div className="mt-20">
         {userData?.siteData?.posts?.length
            ? getSortedPosts([...userData.siteData.posts]).map(
                 (item: any, i: number) => <Post key={i} item={item} />
              )
            : null}
      </div>
   );
};

export default Posts;
