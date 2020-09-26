import './index.css';

import EmailsInput from './emails-input';

export default (inputContainerNode, options) => {
  const { add, getAll, destroy } = new EmailsInput(inputContainerNode, options);

  return {
    add,
    getAll,
    destroy,
  };
};
