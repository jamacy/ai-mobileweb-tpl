import * as React from 'react';
import './index.scss'

interface SubTitleProps{
    title?: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({
    title = '标题',
  }: SubTitleProps) => {
    
    return (
        <h2 className="sub-title">{title}</h2>
    );
  };
  

