import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const AddSite = ({ parentId, handleHideAddSite }) => {
    const [tableData, setTableData] = useState([{ id: 1, firstName: '', lastName: '' }]);
    let geoSitesExist = false;

    useEffect(() => {
        const existingGeoSites = JSON.parse(localStorage.getItem('GeoSites')) || [];
        console.log("existingGeoSites = ", existingGeoSites)
        geoSitesExist = existingGeoSites
        console.log("geoSitesExist = ", geoSitesExist)

        if (geoSitesExist) {
            console.log("we have some data")
            console.log("existingGeoSites : ", existingGeoSites)

            // for(let i=0; i<existingGeoSites.)
        }
        else {
            localStorage.setItem('GeoSites', JSON.stringify([]));
        }

    }, [])

    const addRow = () => {
        const newRow = {
            id: tableData.length + 1,
            firstName: '',
            lastName: '',
        };

        setTableData([...tableData, newRow]);
    };

    const handleInputChange = (id, columnName, value) => {
        const updatedData = tableData.map((row) =>
            row.id === id ? { ...row, [columnName]: value } : row
        );

        setTableData(updatedData);
    };

    const handleSave = () => {
        console.log("inside handle save....")

        console.log("tableData = ", tableData)

        if (geoSitesExist) {
            const updatedGeoSites = [...existingGeoSites, jsonData];
            localStorage.setItem('GeoSites', JSON.stringify(updatedGeoSites));
        }
        else {
            let geoSites = {parentId: parentId, tableData}
            localStorage.setItem('GeoSites', JSON.stringify({geoSites}));
        }
    }

    const handleClose = () => {

    }


    return (
        <Dialog open={true} onClose={handleHideAddSite}>
            <DialogTitle>Popup Dialog</DialogTitle>
            <DialogContent>
                <div style={{ display: "flex", position: "relative", width: "30rem" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>
                                        <input
                                            type="text"
                                            value={row.firstName}
                                            onChange={(e) => handleInputChange(row.id, 'firstName', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={row.lastName}
                                            onChange={(e) => handleInputChange(row.id, 'lastName', e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={addRow} style={{ position: "absolute", margin: "0", bottom: "0px", right: "0px" }}>Add Row</button>
                </div>
            </DialogContent>
            <DialogActions>
                <button onClick={() => handleSave()} style={{ margin: "0", marginTop: "5rem" }}>Save</button>
            </DialogActions>

        </Dialog>
    );
};

export default AddSite;