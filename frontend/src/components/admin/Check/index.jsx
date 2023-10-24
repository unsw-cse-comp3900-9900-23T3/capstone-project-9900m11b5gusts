// react
import React from 'react';
import { useState, useEffect } from 'react';

// mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// assets
import styles from "./index.module.css"

// icon
import Person2Icon from '@mui/icons-material/Person2';
import { Button } from '@mui/material';

export default function Check({ token }) {

    useEffect(() => {

    }, [])

    const handleChange = (v) => {
        console.log(v)
    }


    // function createData(name, calories, fat, carbs, protein) {
    //     return { name, calories, fat, carbs, protein };
    // }

    // const rows = [
    //     createData('Frozen yoghurt', 159, 1, 0, 1),
    //     createData('Ice cream sandwich', 237, 0, 1, 1),
    //     createData('Eclair', 262, 1, 1, 0),
    //     createData('Cupcake', 305, 0, 0, 1),
    //     createData('Gingerbread', 356, 1, 1, 1),
    // ];

    const rows = [
        {"name": "jioewjioe", "overview": "Hello World", "detail": "new job", "check": 1},
        {"name": "jioewjioe", "overview": "Hello World", "detail": "new job", "check": 1},
        {"name": "jioewjioe", "overview": "Hello World", "detail": "new job", "check": 0},
        {"name": "jioewjioe", "overview": "Hello World", "detail": "new job", "check": 0},
        {"name": "jioewjioe", "overview": "Hello World", "detail": "new job", "check": 1},
    ]


    return (
        <div className={styles.mainBox}>
            <Card className={styles.cardBg}>
                <h1 className={styles.mainTitle}>Check Compaigns</h1>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Image</TableCell>
                                <TableCell align='center'>Name</TableCell>
                                <TableCell align='center'>Overview</TableCell>
                                <TableCell align='center'>Detail</TableCell>
                                <TableCell align='center'>Pass</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='center'>
                                        {/* {row.name} */}
                                        <Person2Icon/>
                                    </TableCell>
                                    <TableCell align='center'>{row.name}</TableCell>
                                    <TableCell align='center'>
                                        {row.overview}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.detail}
                                        {/* {row.carbs === 1 ? <Button variant="outlined" color="success">Lock</Button> : <Button variant="outlined">Unlock</Button>} */}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.check === 1 ? <Button variant="outlined" color="success">Allow</Button> : <Button variant="outlined">Deny</Button>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={styles.paginationBox}>
                    <Pagination count={10} variant="outlined" color="primary" />
                    <Select
                        labelId="demo-simple-select-standard-label"
                        className={styles.select}
                        // value={age}
                        onChange={handleChange}
                        defaultValue={10}
                        size='small'
                        label="pageSize"
                    >
                        <MenuItem value={10} defaultOpen={true}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </div>
            </Card>
        </div>
    )
}