import { useState } from 'react';
import { Pagination } from './Pagination';
import { sortRows, paginateRows } from './utils.js'

type Props = {
    columns: Array<any>,
    rows: Array<any>,
    currentIndex: Number,
    setActiveContact: (contact: number, index: number) => void
}

export const Table = ({ columns, rows, currentIndex, setActiveContact }: Props) => {
    const [activePage, setActivePage] = useState(1);
    const [sort, setSort] = useState({order: 'asc', orderBy: 'id'});
    const rowsPerPage: number = 3;
    const count = rows.length;
    const totalPages: number = Math.ceil(count/rowsPerPage);

    const sortedRows: Array<any> = sortRows(rows, sort);
    const calculateRows: Array<any> = paginateRows(sortedRows, activePage, rowsPerPage);

    const handleSort = (accessor: string) => {
        setActivePage(1);
        setSort((prevSort) => ({
          order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
          orderBy: accessor,
        }))
      }

    return (
        <>
        <table>
            <thead>
                <tr>
                {columns.map(column => {
                    const sortIcon = () => {
                        if (column.accessor === sort.orderBy) {
                            if (sort.order === 'asc') {
                                return '⬆️'
                            }
                            return '⬇️'
                        } else {
                            return '↕️'
                        }
                    }
                    return(
                    <th key={column.accessor}>
                        <span>{column.label}</span>
                        <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                    </th>
                    )
                })}
                </tr>
            </thead>
            <tbody>
                {calculateRows.map((row, index) => {
                return (
                    <tr key={row.id}
                    className={
                        (index === currentIndex ? "active-contact" : "")
                    }
                    onClick={()=>setActiveContact(row, index)}>
                    {columns.map(column => {
                        return <td key={column.accessor}>{row[column.accessor]}</td>
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
        <Pagination
            activePage={activePage}
            count={count}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            setActivePage={setActivePage}
        />
        </>
    );
}
