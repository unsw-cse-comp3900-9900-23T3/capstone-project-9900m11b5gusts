import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// other components
import ShowImg from './showImage';

// mui
import Card from '@mui/material/Card';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// assets
import ActivityImg from '../../assets/bear.jpg'
import styles from "./index.module.css"


const baseUrl = "http://127.0.0.1:5000/";
const urls = {
  searchActivity: baseUrl + "Activity/searchActivity/",
  showActivity: baseUrl + "Activity/showActivity/",
  approveActivity: baseUrl + "Admin/approveActivity",
}



export default function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activityData, setActivityData] = useState([])
  const [open, setOpen] = useState(false)
  const [queryData, setQueryData] = useState({
    category: "",
    activity_name: "",
    status: "",
  })
  const [paginationObj, setPaginationObj] = useState({
    currentPage: 1,
    pageSize: 10,
    count: 1,
  })

  useEffect(() => {
    showActivity();
  }, [paginationObj.count])

  const changeSearch = (e, type) => {
    setQueryData(Object.assign(queryData, { [type]: e.target.value }))
  }
  const changePagination = (e, value) => {
    setPaginationObj(Object.assign(paginationObj, { currentPage: value }))
    // searchActivity()
    initQueryData()

    showActivity()
  }

  const initQueryData = () => {
    setQueryData({
      category: "",
      activity_name: "",
      status: "",
    })
  }
  const searchActivity = async () => {
    setPaginationObj(Object.assign(paginationObj, { currentPage: 1 }))
    const res = await fetch(urls.searchActivity + paginationObj.currentPage, {
      method: 'POST',
      body: JSON.stringify(queryData),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

    })
    const { success,total } = await res.json();
    setActivityData(formatData(success))
    setPaginationObj(Object.assign(paginationObj, { count: Math.ceil(total / paginationObj.pageSize) }))
  }

  const checkActivity = async (name, category, status) => {
    let body = {
      name,
      category,
      status
    }
    fetch(urls.approveActivity, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(() => {
      showActivity()
    })
  }


 const handleChange = (v) => {
    setPaginationObj(Object.assign(paginationObj, { pageSize: v.target.value }))
    initQueryData()
    showActivity()
    // searchActivity()

  }


  const handleDialogClose = () => {
    setOpen(false)

  }

  const handlerNewClick = () => {
    setOpen(true)
  }
  const saveAndUpdate = () => {
    console.log("保存")

  }
  const formatData = (data) => {
    let arr = []
    for (let k in data) {
      arr.push(data[k])
    }
    return arr;

  }

  const showActivity = async () => {
    const res = await fetch(urls.showActivity + paginationObj.currentPage + "/" + paginationObj.pageSize, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })

    const { success,total } = await res.json();
    setActivityData(formatData(success))
    setPaginationObj(Object.assign(paginationObj, { count: Math.ceil(total / paginationObj.pageSize) }))

  }

  const handleClick = () => {
    // navigate('/comments');
  }
  const SearchItem = ({ showInfo }) => {
    return <div className={styles.searchItem}>
      <SearchIcon className={styles.searchIcon} />
      <TextField label={showInfo.label} variant="outlined" size="small" defaultValue={showInfo.defaultValue} onChange={(e) => changeSearch(e, showInfo.type)} />
    </div>
  }

  const MediaCard = ({ activityObj }) => {

    return (
      <Card sx={{ width: 345 }} onClick={handleClick}>
        <CardMedia
          sx={{ height: 140 }}
          image={activityObj.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            name:{activityObj.activity_name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            category:{activityObj.category}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            overview:{activityObj.overview}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            detail:{activityObj.detail}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textAlign: 'right', color: 'skyblue' }}>
            AuditStatus:{activityObj.status == 0 ? ' Unaudited' : ' Audited'}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textAlign: 'right', color: 'skyblue' }}>
            {activityObj.status == 0 ? <Button onClick={
              () => {
                checkActivity(activityObj.activity_name, activityObj.category, "1")
              }
            }>Pass</Button> : ''}

          </Typography>
        </CardContent>
        {/* <CardActions>
          <div className={styles.buttonRight}>
            <Button size="small" variant="outlined" onClick={() => handleBtnDelClick(activityObj)}>Delete</Button>

            <Button size="small" variant="outlined" onClick={() => handleBtnClick(activityObj)}>Edit</Button>
          </div>
        </CardActions> */}
      </Card>
    );
  }
  return (
    <div className={styles.myCard}>
      <Card style={{ 'overflow-y': 'scroll' }} className={[styles.cardItem].join(',')}>

        <div className={styles.searchBox}>
          <SearchItem showInfo={{ label: 'Category', type: "category", defaultValue: queryData.category }} />
          <SearchItem showInfo={{ label: 'Name', type: "activity_name", defaultValue: queryData.activity_name }} />
          <SearchItem showInfo={{ label: 'Status', type: "status", defaultValue: queryData.status }} />
          <div>
            {/* <Button variant="contained" size="medium" onClick={handlerNewClick}>New</Button> */}
            <div style={{ padding: '10px' }}></div>
            <Button variant="contained" size="medium" onClick={searchActivity}>Search</Button>

          </div>
        </div>


        <div className={styles.MediaCardBox}>
          {
            activityData.map((item) => <div className={styles.mediaCard}><MediaCard activityObj={item}></MediaCard></div>)
          }
        </div>
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
      <Dialog onClose={handleDialogClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <div className={styles.dialogBody}>
          <div className={styles.picBox}>
            <ShowImg
              imgUrl={ActivityImg}
            ></ShowImg>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField label="Category" variant="filled" size="small" /></div>
            <div className={styles.textFieldDialog}><TextField label="Name" variant="filled" size="small" /></div>
            <div className={styles.textFieldDialog}><TextField label="Status" variant="filled" size="small" /></div>
            <div className={styles.textFieldDialog}><TextField label="Overview" variant="filled" size="big" /></div>
            <div className={styles.textFieldDialog}><TextField label="Detail" variant="filled" size="big" /></div>
          </div>
          {/* <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField label="Overview" variant="filled" size="big" /></div>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField label="Detail" variant="filled" size="big" /></div>
          </div> */}
          <div className={styles.btnBox}>
            <Button variant="contained" size="medium" onClick={saveAndUpdate}>ok</Button>
            <div style={{ padding: '10px' }}></div>
            <Button variant="contained" size="medium" onClick={handleDialogClose}>cancel</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}