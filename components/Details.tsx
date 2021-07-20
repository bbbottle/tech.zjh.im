import React from 'react';

type DetailsProps = {
    name: string,
    children: any,
}

const Details = (props: DetailsProps) => {
    const {
        name,
        children,
    }  = props;

    return (
        <details><summary>{name}</summary>
            <style jsx>{`
              summary:not(:focus-visible):focus {
                outline: none;
              }
            `}</style>
            {children}
        </details>
    )
}

export default Details;