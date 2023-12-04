function Seats({ seatData }) {
    const getColumnID = (col) => {
        return String.fromCharCode(65 + col);
    };

    if (
        !seatData ||
        typeof seatData.row !== "number" ||
        typeof seatData.col !== "number"
    ) {
        return <span>Invalid seat data</span>;
    }

    const columnID = getColumnID(seatData.row);
    const seatID = `${columnID}${seatData.col}`;

    return <span>{seatID}</span>;
}

export default Seats;