import { FC, useState } from 'react';
import { proxy } from '../../../config';

import { Spinner } from 'react-bootstrap';
import { deleteUserPost } from './sendData';
import { useDispatch } from 'react-redux';

import trash from '../../../images/icons/trash.svg';

interface Props {
   item: any;
}

const Post: FC<Props> = ({ item }) => {
   const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
   const dispatch = useDispatch();

   const { id, author, date, content } = item;

   const deletePost = async () => {
      setDeleteLoading(true);
      try {
         await deleteUserPost(id, dispatch);
      } finally {
         setDeleteLoading(false);
      }
   };

   return (
      <div className="user-post rounded-lg p-3 mb-3 whitespace-pre-line">
         <div className="flex justify-between mb-2">
            <p className="user-post__date text-sm">
               {author}, {date.replace(' ', ' - ').slice(0, -3)}
            </p>
            {deleteLoading ? (
               <Spinner
                  animation="border"
                  size="sm"
                  style={{ color: '#92432A' }}
               />
            ) : (
               <img
                  src={trash}
                  alt="delete"
                  className="cursor-pointer"
                  onClick={deletePost}
               />
            )}
         </div>
         <p className="user-post__content text-lg">{content}</p>
         {item.image ? (
            <div className="w-fit mt-3 flex gap-3">
               <a href={`${proxy}/${item.image}`} target="_blank">
                  <img
                     src={`${proxy}/${item.image}`}
                     alt="post-img"
                     className="rounded-lg max-w-max"
                  />
               </a>
            </div>
         ) : null}
      </div>
   );
};

export default Post;
