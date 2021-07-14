import React from 'react';

type FooterNote = {
    name: string,
    href: string,
    children: string
}

export default (props: FooterNote) => {
    const {
        name,
        href,
        children
    } = props;
    return (
        <>
            <a
                href={`#${name}_ref`}
                id={`${name}_note`}
                className="references"
            >^</a>
            &nbsp;
            <cite>
                <a href={href}>{children}</a>
            </cite>
        </>
    )
}