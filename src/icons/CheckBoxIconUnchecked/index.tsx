import React from 'react';
import { IconProps } from '../../common/types';

const CheckBoxIconUnchecked = (props: IconProps): JSX.Element => {
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
            <rect x='1' y='1' width='18' height='18' fill='white' />
        </svg>
    );
};

export default CheckBoxIconUnchecked;
