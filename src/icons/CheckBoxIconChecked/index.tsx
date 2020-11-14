import React from 'react';
import { IconProps } from '../../common/types';

const CheckBoxIconChecked = (props: IconProps): JSX.Element => {
    return (
        <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={props.style}
            onClick={props.onClick}
            className={props.className}
        >
            <rect width='20' height='20' fill='#001A70' />
            <path d='M4 9.5L8.5 14.5L16.5 6' stroke='white' />
        </svg>
    );
};

export default CheckBoxIconChecked;
