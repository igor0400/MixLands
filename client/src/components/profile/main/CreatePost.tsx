import { FC, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { sendPost } from './sendData';

import copy from '../../../images/icons/copy.svg';
import emoju from '../../../images/icons/emoju.svg';
import file from '../../../images/icons/file.svg';
import success from '../../../images/icons/check.svg';

const CreatePost: FC = () => {
   const { userData } = useSelector((state: any) => state.user);
   const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
   const [textareaValue, setTextareaValue] = useState<string>('');
   const [fileValue, setFileValue] = useState<any>(false);

   const dispatch = useDispatch();
   const inputFile: any = useRef(null);

   const copyText = () => {
      if (textareaValue.length) {
         navigator.clipboard
            .writeText(textareaValue)
            .then(() => {
               toast('Текст скопирован');
            })
            .catch((e) => {
               console.log(e);
            });
      }
   };

   const openFileSelect = () => {
      inputFile.current.click();
   };

   const handlePostData = async () => {
      if (textareaValue.length) {
         const formData = new FormData();
         formData.append('content', textareaValue);
         formData.append('image', fileValue[0]);

         setIsPostLoading(true);
         await sendPost(userData.NICKNAME, formData, dispatch);
         setIsPostLoading(false);
         setTextareaValue('');
         setFileValue(false);
      }
   };

   return (
      <div className="create-post mt-12">
         <textarea
            className="w-full accent-border rounded-lg default-background"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Написать пост..."
            maxLength={300}
         ></textarea>
         <div className="flex justify-between mt-1">
            <div className="flex gap-1 support-btns my-auto">
               <img
                  src={copy}
                  alt="copy"
                  className="default-background"
                  onClick={copyText}
               />
               <img src={emoju} alt="emoju" className="default-background" />
               <img
                  src={fileValue ? success : file}
                  alt="file"
                  className={classNames('default-background', {
                     'file-input-active': fileValue,
                  })}
                  onClick={openFileSelect}
               />

               <input
                  type="file"
                  name="post-file"
                  id="post-file"
                  style={{ display: 'none' }}
                  ref={inputFile}
                  accept="image/*"
                  onChange={() => setFileValue(inputFile.current.files)}
               />
            </div>
            {isPostLoading ? (
               <button className="accent-btn default-btn w-48">
                  <Spinner animation="border" variant="light" size="sm" />
               </button>
            ) : (
               <button
                  className="default-btn accent-btn w-46"
                  onClick={handlePostData}
                  disabled={isPostLoading}
               >
                  Опубликовать
               </button>
            )}
         </div>
      </div>
   );
};

export default CreatePost;
