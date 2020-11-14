import React from 'react';

interface IconContainerProps {
    icon: JSX.Element;
    name: string;
}

const IconContainer = (props: IconContainerProps): JSX.Element => {
    return (
        <span
            style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '15px',
                width: '25%'
            }}
        >
            <span
                style={{
                    borderRadius: '4px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    height: '40px',
                    width: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'rgba(0,0,0,0,0.10) 0 1px 3px 0',
                    flex: 'none',
                    background: '#FFFFFF',
                    marginRight: '15px'
                }}
            >
                {props.icon}
            </span>
            <span style={{ fontSize: '14px' }}>{`Name: ${props.name}`}</span>
        </span>
    );
};

export default IconContainer;
