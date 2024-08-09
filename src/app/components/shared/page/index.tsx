import { ComponentProps } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';

import './style.scss';

interface PageProps extends ComponentProps<'main'> {
  withHeader?: boolean;
  withFooter?: boolean;
}
export const Page = ({
  children,
  className,
  withHeader,
  withFooter,
}: PageProps) => {
  return (
    <Box
      className={clsx('page', className, {
        'with-header': withHeader,
        'with-footer': withFooter,
      })}
      component="main"
    >
      {children}
    </Box>
  );
};
