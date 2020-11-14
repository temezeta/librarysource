import React from 'react';

interface CenteredProps {
    children: React.ReactNode;
}

const Centered: React.FC = (props: CenteredProps): JSX.Element => {
    return (
        <div style={{ display: 'flex', placeContent: 'center' }}>
            {props.children}
        </div>
    );
};

export default Centered;
