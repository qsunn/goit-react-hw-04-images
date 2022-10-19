import s from './Loader.module.css';

import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
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
  }
}
