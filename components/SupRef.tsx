import React from 'react';

type Ref = {
    order: number,
    name: string,
    children: string,
}

export default (props: Ref) => {
    const {
        name,
        children,
        order
    } = props;

    return (
        <>
            <sup>
                <a
                    className="references"
                    href={`#${name}_note`}
                    id={`${name}_ref`}
                >
                    [{order}]
                </a>
            </sup>
            {children}
        </>
    )
}