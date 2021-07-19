import React from 'react';

type TableProps = {
    headsStringMatrix: string[][],
    bodyStringMatrix: string[][],
}

const Table = (props: TableProps) => {
    const {
        headsStringMatrix,
        bodyStringMatrix,
    } = props;

    return (
        <table>
            <thead>
                {headsStringMatrix.map(row => <tr>{row.map(col => <th>{col}</th>)}</tr>)}
            </thead>
            <tbody>
                {bodyStringMatrix.map(row => <tr>{row.map(col => <td>{col}</td>)}</tr>)}
            </tbody>
        </table>
    )
}

export default Table;