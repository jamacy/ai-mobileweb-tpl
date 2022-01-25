import * as React from "react";
import './button.scss';

/**
 * @description 按钮
 * @namespace Main
 */
export interface ButtonProps {
  text: string;
  highted?: boolean;
  onClick(): void;
}

function Button(props: ButtonProps) {
  let { text = "按钮", highted = false, onClick = () => { } } = props;
  let clsName = highted ? 'highted' : 'normal';
  return (
    <button
      className={`btn ${clsName}`}
      onClick={onClick}
    >
      {text}
    </button>

  );
}

export default Button;
