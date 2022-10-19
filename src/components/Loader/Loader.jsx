import s from './Loader.module.css';

import { Blocks } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={s.Loader}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};
