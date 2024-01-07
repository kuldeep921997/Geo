import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import AddSite from './AddSite';

const DynamicTable = () => {
    const [textBoxes, setTextBoxes] = useState([{ id: 1, value: '' }]);
    const [saveCounter, setSaveCounter] = useState(0);
    const [createGeography, setCreateGeography] = useState(false);
    const [showAddSite, setShowAddSite] = useState(false);
    const [addSiteParentId, setAddSiteParentId] = useState('');
    const [error, setError] = useState(true);
    const [geoErrorLevel, setGeoErrorLevel] = useState([]);



    useEffect(() => {
        const existingGeoSites = JSON.parse(localStorage.getItem('GeoSites')) || [];

        const geoSitesExist = existingGeoSites && existingGeoSites.length > 0;

        console.log("geoSitesExist = ", geoSitesExist)
        if (!geoSitesExist) {
            localStorage.setItem('GeoSites', JSON.stringify([]));
        }
        else {
            setCreateGeography(true)
            setTextBoxes([...existingGeoSites])
        }

    }, [])

    const addLabel = (parentId) => {
        const newTextBoxes = [...textBoxes];
        const newId = newTextBoxes.length + 1;
        newTextBoxes.push({ id: newId, value: '', parentId });
        setTextBoxes(newTextBoxes);
    };


    const saveIntoLocal = () => {
        console.log("inside saveIntoLocal")

        let temp = localStorage.getItem('GeoSites')
        console.log("temp = ", temp)

        localStorage.setItem('GeoSites', JSON.stringify(textBoxes));
    }

    const handleSave = () => {
        textBoxes.forEach((x, index) => {
            index += 1
            console.log("inside handle save")
            let temp_error = false;
            if (!x.value) {
                console.log("inside if")
                setError(true)
                if (geoErrorLevel.indexOf(index) == -1) {
                    let temp = [...geoErrorLevel, index]
                    temp_error = true
                    temp.sort()
                    setGeoErrorLevel([...temp])
                }
            }

            else {
                console.log("A")
                if (geoErrorLevel.includes(index)) {

                    const i = geoErrorLevel.indexOf(index);
                    if (i > -1) {
                        geoErrorLevel.splice(i, 1);
                        setGeoErrorLevel([...geoErrorLevel])
                    }
                }
            }

            if (!temp_error) {
                setError(false)
                saveIntoLocal()
            }


        })
        setSaveCounter(saveCounter + 1)
    }

    console.log("geoErrorLevel = ", geoErrorLevel)
    console.log("error = ", error)

    const handleChange = (id, value) => {
        const newTextBoxes = [...textBoxes];
        const textBoxIndex = newTextBoxes.findIndex((box) => box.id === id);
        newTextBoxes[textBoxIndex].value = value;
        setTextBoxes(newTextBoxes);
    };

    useEffect(() => {
        console.log(JSON.stringify(textBoxes, null, 2));
    }, [textBoxes.length, saveCounter]);

    const handleDelete = (index) => {
        console.log("index = ", index)
        console.log("textBoxes = ", textBoxes)

        setTextBoxes(textBoxes.slice(0, textBoxes.length - 1))
        if (textBoxes.length == 0) {
            setCreateGeography(false)
        }
    }

    const handleCreateGeography = () => {
        setCreateGeography(true)
        setTextBoxes([{ id: 1, value: '' }])
    }

    const handleAddSite = (parentId) => {
        setAddSiteParentId(parentId)
        setShowAddSite(true)
    }

    const handleHideAddSite = () => {
        setShowAddSite(false);
    }

    return (
        <>
            {showAddSite && <AddSite parentId={addSiteParentId} handleHideAddSite={handleHideAddSite} />}

            <div style={{ display: "flex", flexDirection: "column", minWidth: "100%", width: "containt", overflow: "auto" }}>
                {!createGeography &&
                    <Button onClick={() => handleCreateGeography()} style={{ border: "1px solid black", width: "max-content", margin: "auto", marginBottom: "2rem" }}>Create Geography</Button>
                }

                {geoErrorLevel.length > 0 && <div>Please provide some value at geography level {geoErrorLevel[0]}.</div>}

                {createGeography &&
                    textBoxes.map((textBox, index) => (
                        <Box key={textBox.id} className="text-box-container" style={{ marginLeft: `${(textBox.id - 1) * 3}rem`, display: "flex", alignItems: "center" }} sx={{ marginBottom: 3 }}>
                            <TextField
                                size='small'
                                required={true}
                                value={textBox.value}
                                onChange={(e) => handleChange(textBox.id, e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {(textBoxes.length == index + 1) && <Button size='small' onClick={() => handleDelete(index)}>Delete</Button>}
                                            <Button size='small' onClick={() => handleAddSite(textBox.id)}>Add Site</Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {(textBoxes.length == index + 1) && (textBox.value && textBox.value.length >= 3) &&
                                <Button size='small' variant='contained' onClick={() => addLabel(textBox.id)} sx={{ marginLeft: 2 }} style={{ whiteSpace: 'nowrap', width: "9.5rem" }}>Add Label</Button>}
                        </Box>
                    ))
                }

                {createGeography &&
                <button onClick={() => handleSave()} style={{ width: "max-content", margin: "auto" }}>Save</button>}
            </div>
        </>
    );
};

export default DynamicTable;