import React, { useState, useEffect } from 'react';

const OpIdManager = ({ selectModel, showEditOPID }) => {
    const [canEditOPID, setCanEditOPID] = useState([]);

    useEffect(() => {   
        const fetchOpIds = async () => {
            if (selectModel) {
                try {
                    const response = await fetch(`http://localhost:3000/api/moduleops/${selectModel}`);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setCanEditOPID(data.map(op => op.op_id));
                    } else if (data && data.op_id) {
                        setCanEditOPID([data.op_id]); // 如果是單個對象，將其轉換為單元素陣列
                    } else {
                        console.error("Unexpected data format:", data);
                    }
                } catch (error) {
                    console.error("Failed to fetch OPIDs:", error);
                    setCanEditOPID([])
                }
            }
        };
        fetchOpIds();
    }, [selectModel]);

    const removeOPID = async (opidToRemove) => {
        try {
            const response = await fetch(`http://localhost:3000/api/moduleops/${selectModel}/${opidToRemove}`, { method: 'DELETE' });
            if (response.ok) {
                setCanEditOPID(prevOPIDs => prevOPIDs.filter(opid => opid !== opidToRemove));
                alert('OP ID deleted successfully');
            } else {
                throw new Error(`Failed to delete OP ID: Status ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting OP ID:', error);
            alert('Failed to delete OP ID: ' + error.message);
        }
    };

    const addOPID = async () => {
        const newOPID = prompt("Enter new OP ID:");
        if (newOPID && newOPID.length === 6 && !canEditOPID.includes(newOPID)) {
            try {
                const response = await fetch(`http://localhost:3000/api/moduleops`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ module_id: selectModel, op_id: newOPID })
                });
                if (response.ok) {
                    const data = await response.json();
                    setCanEditOPID(prevOPIDs => [...prevOPIDs, data.op_id]);
                    alert('OP ID added successfully');
                } else {
                    throw new Error(`Failed to add OP ID: ${await response.text()}`);
                }
            } catch (error) {
                console.error('Error adding OP ID:', error);
                alert('Failed to add OP ID: ' + error.message);
            }
        } else {
            alert("Invalid OP ID! It must be exactly 6 characters long and not duplicated.");
        }
    };

    return (
        <>
            {showEditOPID && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                }}>
                    <div style={{ width: "15%", fontSize: "20px", fontWeight: "bold" }}>Editable OP ID：</div>
                    {canEditOPID.map((opid, index) => (
                        <div key={index} style={{
                            width: "15%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "5px",
                            marginBottom: "5px",
                        }}>
                            <div>{opid}</div>
                            <button className="btn btn-danger" onClick={() => removeOPID(opid)}>Delete</button>
                        </div>
                    ))}
                    <button className="btn btn-primary" onClick={addOPID}>+ Added editable OPID</button>
                </div>
            )}
        </>
    );
};

export default OpIdManager;
