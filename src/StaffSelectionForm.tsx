import React, { useState } from "react";

const StaffSelectionForm = () => {
  const [selectedCategories, setSelectedCategories] = useState({
    chefsAndAssociates: false,
    stageSetup: false,
    welcomeServing: false,
    cateringStaff: false,
    eventManagement: false,
    security: false,
    housekeeping: false,
  });

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.header}>Staff Selection</h2>

      <div style={styles.checkboxContainer}>
        {[
          { label: "Chefs & Associates", key: "chefsAndAssociates" },
          { label: "Stage Setup & Decoration", key: "stageSetup" },
          { label: "Welcome and Serving Staff", key: "welcomeServing" },
          { label: "Catering Staff", key: "cateringStaff" },
          { label: "Event Management Staff", key: "eventManagement" },
          { label: "Security and Bouncers", key: "security" },
          { label: "House Keeping Staff", key: "housekeeping" },
        ].map((category, index) => (
          <div key={index} style={styles.checkboxRow}>
            <div style={styles.checkboxWrapper}>
              <input
                type="checkbox"
                checked={selectedCategories[category.key]}
                onChange={() => handleCheckboxChange(category.key)}
                style={styles.checkbox}
              />
              <label style={styles.label}>{category.label}</label>

              <select style={styles.select}>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="vip">VIP</option>
                <option value="pro">PRO</option>
              </select>
            </div>

            {/* Dynamic Sub-Checkboxes */}
            {selectedCategories[category.key] && (
              <div style={styles.subCheckboxContainer}>
                {category.key === "chefsAndAssociates"
                  ? ["Party Chef", "Chef", "Associates"].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : category.key === "stageSetup"
                  ? [
                      "Stage Setup Boys",
                      "Decoration Boys",
                      "Flower Decoration",
                      "Balloon Decoration",
                    ].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : category.key === "welcomeServing"
                  ? [
                      "Welcome Girls",
                      "Welcome Foreign Girls",
                      "Couple Service",
                      "H M Girls Services",
                      "Chinese Girls",
                    ].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : category.key === "cateringStaff"
                  ? [
                      "Food Pickup Staff",
                      "Catering Staff",
                      "Waves Cost Boys",
                      "Hotel Management Staff",
                    ].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : category.key === "eventManagement"
                  ? [
                      "Event Organizers",
                      "Event Planners",
                      "Event Managers",
                      "Event Supervisors",
                    ].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : category.key === "security"
                  ? [
                      "Security Staff",
                      "Bouncers",
                      "Drivers",
                      "Wethet Parks",
                    ].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : category.key === "housekeeping"
                  ? [
                      "House Keeping Supervisors",
                      "House Keeping Staff",
                      "Helpers",
                      "High Worker Staff",
                    ].map((name, subIndex) => (
                      <div key={subIndex} style={styles.subCheckboxRow}>
                        <input type="checkbox" style={styles.checkbox} />
                        <label style={styles.label}>{name}</label>
                        <input
                          type="number"
                          min="0"
                          style={styles.numberInput}
                          placeholder="No. of Staff"
                        />
                      </div>
                    ))
                  : null}
              </div>
            )}
          </div>
        ))}
      </div>


          
    </div>
  );
};

// Inline Styles
const styles = {
  formContainer: {
    width: "100%",
    margin: "40px auto",
    padding: "25px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
  header: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#444",
    fontFamily: "'Roboto', sans-serif",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  checkboxRow: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#555",
    flex: 1,
    fontWeight: "500",
    fontFamily: "'Roboto', sans-serif",
  },
  checkbox: {
    marginRight: "10px",
    cursor: "pointer",
    width: "18px",
    height: "18px",
    accentColor: "#6c63ff",
  },
  select: {
    padding: "6px 12px",
    cursor: "pointer",
    width: "160px",
    marginLeft: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    fontSize: "14px",
  },
  subCheckboxContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px",
    paddingTop: "12px",
    borderTop: "1px solid #ddd",
    gap: "10px",
  },
  subCheckboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  numberInput: {
    width: "120px",
    padding: "5px",
    marginLeft: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
};

export default StaffSelectionForm;
