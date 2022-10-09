import { FC } from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading: FC = () => {
   return (
      <Box className="flex justify-center items-center my-72 ml-12">
         <CircularProgress />
      </Box>
   );
};

export default Loading;
