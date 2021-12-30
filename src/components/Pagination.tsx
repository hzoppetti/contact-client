type Props = {
    activePage: number,
    count: number,
    rowsPerPage: number,
    totalPages: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>
}
export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }: Props) => {
    const beginning: number = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
    const end: number = activePage === totalPages ? count : beginning + rowsPerPage - 1;

    return (
        <>
        <div className="pagination">
            <button
                disabled={activePage === 1}
                onClick={() => setActivePage(1)}>
                   &lt;&lt;
            </button>
            <button
                disabled={activePage === 1}
                onClick={() => setActivePage(activePage -1)}>
                &lt;
            </button>
            <button
                disabled={activePage === totalPages}
                onClick={() => setActivePage(activePage + 1)}>
                &gt;
            </button>
            <button
                disabled={activePage === totalPages}
                onClick={() => setActivePage(totalPages)}>
                &gt;&gt;
            </button>
        </div>
        <p>
            Page {activePage} of {totalPages}
        </p>
        <p>
            Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
        </>
    );
};
