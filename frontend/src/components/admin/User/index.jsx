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

export default function UserMgr() {
    const [paginationObj, setPaginationObj] = useState({
        currentPage: 1,
        pageSize: 10,
        count: 1,
    })

    const [userData, setUserData] = useState([]);

    async function getUserData() {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:5000/Admin/infor/${paginationObj.currentPage}/${paginationObj.pageSize}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        });
        if (response.status === 200) {
            const data = await response.json();
            console.log('UserInfo: ', data.success)
            setPaginationObj(Object.assign(paginationObj, { count: data.total/paginationObj.pageSize }))
            if (data.success) {
                setUserData(data.success)
                console.log(data)
            }
        } else {
            const data = await response.json();
            console.log('Error: ', data)
        }
    }

    async function delUserData(email) {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:5000/Admin/deleteUser`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    "user_email": email
                }
            )

        });
        if (response.status === 200) {
            const data = await response.json();
            if (data.success) {
                console.log(data)
            }
        } else {
            const data = await response.json();
            console.log('Error: ', data)
        }
        await getUserData()
    }

    async function modifyPermission(email, identity) {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://127.0.0.1:5000/Admin/modifyPermission`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "identity": identity
                }
            )

        });
        if (response.status === 200) {
            const data = await response.json();
            if (data.success) {
                console.log(data)
            }
        } else {
            const data = await response.json();
            console.log('Error: ', data)
        }
    }

    useEffect(() => {
        getUserData()
    }, [paginationObj.count])

    const handleChange = (v) => {
        setPaginationObj(Object.assign(paginationObj, { pageSize: v.target.value,currentPage:1 }))
        getUserData()
    }
    const changePagination = (e, value) => {
        setPaginationObj(Object.assign(paginationObj, { currentPage: value }))
        getUserData()

    }
    const gen_usertable = () => {
        const table_item = []
        for (let key in userData) {
            table_item.push(
                <TableRow
                    key={userData[key].username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" align='center'>
                        <Person2Icon />
                    </TableCell>
                    <TableCell align='center'>{userData[key].username}</TableCell>
                    <TableCell align='center'>
                        <Select
                            labelId="user-role-select"
                            className={styles.select}
                            value={userData[key].identity}
                            onChange={(e) => {
                                userData[key].identity = e.target.value
                                setUserData({ ...userData })
                                modifyPermission(userData[key].email, userData[key].identity)
                            }}
                            size='small'
                            label="pageSize"
                        >
                            <MenuItem value={"User"} defaultOpen={true}>user</MenuItem>
                            <MenuItem value={"manager"}>manager</MenuItem>
                            <MenuItem value={"administrator"}>administrator</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell align='center'>{userData[key].email}</TableCell>
                    <TableCell align='center'>
                        <Button variant="outlined" color="error" onClick={() => {
                            delUserData(userData[key].email)
                        }}>Del</Button>
                    </TableCell>
                </TableRow>
            )

        }
        return table_item
    }

    return (
        <div className={styles.mainBox}>
            <Card style={{overflowY:"scroll"}} className={styles.cardBg}>
                <h1 className={styles.mainTitle}>User Mgr</h1>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Icon</TableCell>
                                <TableCell align='center'>User Name</TableCell>
                                <TableCell align='center'>authority management</TableCell>
                                <TableCell align='center'>Email</TableCell>
                                <TableCell align='center'>Del</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gen_usertable()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={styles.paginationBox}>
                    <Pagination count={paginationObj.count} page={paginationObj.currentPage} variant="outlined" color="primary" onChange={changePagination} />

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