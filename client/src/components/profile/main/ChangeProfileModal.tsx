import { useState } from 'react';
import { FC } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import edit from '../../../images/icons/edit.svg';
import { postUserSiteInfo } from './postData';

const ChangeProfileModal: FC = () => {
   const { userData } = useSelector((state: any) => state.user);
   const [bio, setBio] = useState<string>(userData?.siteData?.bio || '');
   const [lor, setLor] = useState<string>(userData?.siteData?.lor || '');
   const [loading, setLoading] = useState<boolean>(false);
   const [show, setShow] = useState<boolean>(false);
   const dispatch = useDispatch();

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const changeBioValue = (e: React.ChangeEvent<any>) => {
      setBio(e.target.value);
   };

   const changeLorValue = (e: React.ChangeEvent<any>) => {
      setLor(e.target.value);
   };

   const postChanged = async () => {
      if (
         (bio.length && bio !== userData?.siteData?.bio) ||
         (lor.length && lor !== userData?.siteData?.lor)
      ) {
         setLoading(true);

         await postUserSiteInfo(userData.NICKNAME, { bio, lor }, dispatch);

         setLoading(false);
         handleClose();
      }
   };

   return (
      <>
         <div>
            <img
               src={edit}
               alt="edit"
               className="default-background accent-border p-2 rounded-lg cursor-pointer"
               onClick={handleShow}
            />
         </div>

         <Modal
            show={show}
            onHide={handleClose}
            className="change-profile-modal w-screen"
         >
            <Modal.Header>
               <h4 className="text-center font-black text-lg">
                  Редактировать профиль
               </h4>
               <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleClose}
               >
                  <path d="m5 5 14 14m-14 0 14-14" />
               </svg>
            </Modal.Header>
            <Modal.Body>
               <input
                  className="w-full p-3 rounded-lg"
                  type="text"
                  placeholder="Био..."
                  value={bio}
                  onChange={changeBioValue}
               />
               <div className="gray-line w-20 h-1 rounded-full my-3 flex mx-auto"></div>
               <textarea
                  className="w-full rounded-lg"
                  placeholder="Лор персонажа..."
                  value={lor}
                  onChange={changeLorValue}
                  maxLength={200}
               />
               <div className="flex justify-center mt-4 px-1">
                  {loading ? (
                     <button className="w-1/2 p-2.5 accent-btn default-btn">
                        <Spinner animation="border" variant="light" size="sm" />
                     </button>
                  ) : (
                     <button
                        disabled={loading}
                        className="w-1/2 p-2.5 accent-btn default-btn"
                        onClick={postChanged}
                     >
                        Сохранить
                     </button>
                  )}
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default ChangeProfileModal;
