import React from 'react';
import { useState, useEffect, useRef } from 'react';

// other components
import UploadImage from './UploadImage';

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
import styles from "./mainPage.module.css"

const baseUrl = "http://127.0.0.1:5000/";
const urls = {
  createActivity: baseUrl + "Activity/createActivity",
  deleteActivity: baseUrl + "Activity/deleteActivity",
  searchActivity: baseUrl + "Activity/searchActivity/",
  showActivity: baseUrl + "Activity/showActivity/",
  editActivity: baseUrl + "Activity/editActivity",
  archiveActivity: baseUrl + "Activity/archiveActivity",
}

export default function MainPage() {
  const token = localStorage.getItem("token");
  const [activityData, setActivityData] = useState([])
  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState("add")
  const [imgUrl, setImgUrl] = useState('')
  const [paginationObj, setPaginationObj] = useState({
    currentPage: 1,
    pageSize: 10,
    count: 1,
  })
  const intiDialogData = {
    "activity_name": "",
    "category": "",
    "overview": "",
    "detail": "",
    status: 0,
    image: ""
  }
  const [dialogData, setDialogData] = useState({
    "activity_name": "",
    "category": "",
    "overview": "",
    "detail": "",
    status: 0,
    image: ""
  })
  const [queryData, setQueryData] = useState({
    category: "",
    activity_name: "",
    status: "",
  })

  useEffect(() => {
    showActivity()
  }, [paginationObj.count])

  const handleChange = (v) => {
    setPaginationObj(Object.assign(paginationObj, { pageSize: v.target.value,currentPage:1 }))
    initQueryData()
    showActivity()
    // searchActivity()

  }
  const initQueryData = () => {
    setQueryData({
      category: "",
      activity_name: "",
      status: "",
    })
  }

  const handleDialogClose = () => {
    setOpen(false)
    setDialogData(intiDialogData)
    setImgUrl("")
  }


  const handlerNewClick = () => {
    setDialogType("add")
    setOpen(true)

  }

  const saveAndUpdate = () => {
    dialogType == "add" ? createActivity() : editActivity()
  }
  const changeText = (e, type) => {
    setDialogData(Object.assign(dialogData, { [type]: e.target.value }))
  }
  const changeSearch = (e, type) => {
    setQueryData(Object.assign(queryData, { [type]: e.target.value }))
  }
  const changePagination = (e, value) => {
    setPaginationObj(Object.assign(paginationObj, { currentPage: value }))
    // searchActivity()
    initQueryData()

    showActivity()
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

    const { success, total } = await res.json();
    setActivityData(formatData(success))
    setPaginationObj(Object.assign(paginationObj, { count: Math.ceil(total / paginationObj.pageSize) }))
  }

  const createActivity = () => {
    const body = Object.assign(dialogData, { image: imgUrl })
    fetch(urls.createActivity, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

    }).then(() => {
      handleDialogClose()
      showActivity()
    })
  }
  const editActivity = () => {
    // const body = Object.assign(dialogData, { image: imgUrl })

    fetch(urls.editActivity, {
      method: 'POST',
      body: JSON.stringify({
        activity_name: dialogData.activity_name,
        image: imgUrl,
        status: "",
        category: dialogData.category,
        overview: dialogData.overview,
        detail: dialogData.detail,
      }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

    }).then(() => {
      handleDialogClose()
      showActivity()
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
    const { success, total } = await res.json();
    setActivityData(formatData(success))
    setPaginationObj(Object.assign(paginationObj, { count: Math.ceil(total / paginationObj.pageSize) }))
  }


  const SearchItem = ({ showInfo }) => {
    return <div className={styles.searchItem}>
      <SearchIcon className={styles.searchIcon} />
      <TextField label={showInfo.label} variant="outlined" size="small" defaultValue={showInfo.defaultValue} onChange={(e) => changeSearch(e, showInfo.type)} />
    </div>
  }

  const MediaCard = ({ activityObj }) => {
    const handleBtnClick = (activityObj) => {
      setDialogType("edit")
      setOpen(true)
      setDialogData(activityObj);
      setImgUrl(activityObj.image)

    }
    const handleBtnDelClick = (activityObj) => {
      const body = {
        "activity_name": activityObj.activity_name,
        "category": activityObj.category
      }
      fetch(urls.deleteActivity, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(() => {
        showActivity()
      })
    }

    const handleBtnArchiveClick = (activityObj) => {
      const body = {
        "activity_name": activityObj.activity_name,
      }
      fetch(urls.archiveActivity, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(() => {
        showActivity()
      })
    }
  
    return (
      <Card sx={{ width: 345 }}>
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
        </CardContent>
        <CardActions>
          <div className={styles.buttonRight}>
            <Button size="small" variant="outlined" onClick={() => handleBtnDelClick(activityObj)}>Delete</Button>
            <Button size="small" variant="outlined" onClick={() => handleBtnArchiveClick(activityObj)}>Archive</Button>
            <Button size="small" variant="outlined" onClick={() => handleBtnClick(activityObj)}>Edit</Button>
          </div>
        </CardActions>
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
        </div>

        <div className={styles.btnBox}>
          <Button variant="outlined" size="medium" onClick={handlerNewClick} >New</Button>
          <div style={{ padding: '10px' }}></div>
          <Button variant="outlined" size="medium" onClick={searchActivity}>Search</Button>
        </div>

        <div className={styles.MediaCardBox}>
          {
            activityData.map((item) => <div className={styles.mediaCard}><MediaCard activityObj={item}></MediaCard></div>)
          }
        </div>
        <div className={styles.paginationBox}>
          {/* defaultPage={paginationObj.pageSize} */}
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
        <DialogTitle>{dialogType == "add" ? "CREATE" : "EDIT"}</DialogTitle>
        <div className={styles.dialogBody}>
          <div className={styles.picBox}>
            <UploadImage
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}></UploadImage>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField defaultValue={dialogData.category} onChange={(e) => changeText(e, "category")} label="Category" variant="outlined" size="small" /></div>
            <div className={styles.textFieldDialog}><TextField disabled={dialogType == "edit" ? true : false} defaultValue={dialogData.activity_name} onChange={(e) => changeText(e, "activity_name")} label="Name" variant="outlined" size="small" /></div>
            {/* <div className={styles.textFieldDialog}><TextField onChange={(e)=>changeText(e,"Status")} label="Status" variant="outlined" size="small" /></div> */}
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField defaultValue={dialogData.overview} onChange={(e) => changeText(e, "overview")} label="Overview" variant="outlined" size="big" /></div>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField defaultValue={dialogData.detail} onChange={(e) => changeText(e, "detail")} label="Detail" variant="outlined" size="big" /></div>
          </div>
          <div className={styles.btnBox}>
            <Button variant="outlined" size="medium" onClick={saveAndUpdate}>ok</Button>
            <div style={{ padding: '10px' }}></div>
            <Button variant="outlined" size="medium" onClick={handleDialogClose}>cancel</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}