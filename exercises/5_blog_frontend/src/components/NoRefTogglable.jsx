import { useState } from 'react';

const NoRefTogglable = (props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onMouseDown={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onMouseDown={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default NoRefTogglable;
