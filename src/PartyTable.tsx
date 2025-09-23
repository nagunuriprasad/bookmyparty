import React, { useState } from "react";

const PartyTable: React.FC = () => {
  const fixedRows = [
    { type: "Breakfast" },
    { type: "Lunch" },
    { type: "Liquor Lunch" },
    { type: "Snacks" },
    { type: "Dinner" },
    { type: "Liquor Dinner" },
  ];

  const [rows, setRows] = useState(fixedRows);

  const handleAddRowBelow = (index: number) => {
    setRows((prev) => {
      const newRows = [...prev];
      newRows.splice(index + 1, 0, { ...prev[index], isDuplicate: true });
      return newRows;
    });
  };

  const handleDeleteRow = (index: number) => {
    setRows((prev) =>
      prev.filter((_, i) => i !== index || !prev[i].isDuplicate)
    );
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.partyTimeCol}>Party Time</th>
            <th style={styles.partyTypeCol}>Party Type</th>
            <th style={styles.smallCol}>No. of Pax</th>
            <th style={styles.dateTimeCol}>Date & Time</th>
            <th style={styles.uploadCol}>Upload Menu</th>
            <th style={styles.smallCol}>No. of Staff</th>
            <th style={styles.addressCol}>Event Address</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <div style={styles.rowContainer}>
                  <span>{row.type}</span>
                  <div style={styles.buttonContainer}>
                    <button
                      onClick={() => handleAddRowBelow(index)}
                      style={styles.addButton}
                    >
                      +
                    </button>
                    {row.isDuplicate && (
                      <button
                        onClick={() => handleDeleteRow(index)}
                        style={styles.deleteButton}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              </td>
              <td>
                <select style={styles.select}>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="vip">VIP</option>
                  <option value="Pro">PRO</option>
                </select>
              </td>
              <td>
                <input type="number" min="0" style={styles.smallInput} />
              </td>
              <td>
                <input type="datetime-local" style={styles.input} />
              </td>
              <td>
                <input type="file" style={styles.input} />
              </td>
              <td>
                <input type="number" min="0" style={styles.smallInput} />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Address"
                  style={styles.addressInput}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  partyTimeCol: {
    width: "15%",
    textAlign: "left",
    padding: "8px",
    fontWeight: "bold",
  },
  partyTypeCol: {
    width: "12%", // Reduced width slightly
    textAlign: "center",
    padding: "8px",
    fontWeight: "bold",
  },
  smallCol: {
    width: "8%",
    textAlign: "center",
    padding: "8px",
    fontWeight: "bold",
  },
  dateTimeCol: {
    width: "15%",
    textAlign: "center",
    padding: "8px",
    fontWeight: "bold",
  },
  uploadCol: {
    width: "15%",
    textAlign: "center",
    padding: "8px",
    fontWeight: "bold",
  },
  addressCol: {
    width: "27%", // Increased width for "Event Address"
    textAlign: "left",
    padding: "8px",
    fontWeight: "bold",
  },
  select: {
    width: "90%",
    padding: "6px",
    fontSize: "14px",
  },
  input: {
    width: "90%",
    padding: "6px",
    fontSize: "14px",
  },
  smallInput: {
    width: "70%",
    padding: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  addressInput: {
    width: "95%",
    padding: "6px",
    fontSize: "14px",
  },
  rowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  addButton: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "lightgreen",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  deleteButton: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "lightcoral",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
};

export default PartyTable;
