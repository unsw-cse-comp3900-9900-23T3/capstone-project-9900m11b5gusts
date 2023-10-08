import React from 'react';
import { useState, useEffect } from 'react';

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
import ActivityImg from '../../assets/GuiyangMoon.jpg'
import styles from "./mainPage.module.css"


const SearchItem = (props) => {
  const { showInfo } = props;

  return <div className={styles.searchItem}>
    <SearchIcon className={styles.searchIcon} />
    <TextField label={showInfo} variant="outlined" size="small" />
  </div>
}

const MediaCard = () => {
  const handleBtnClick = () => {
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={ActivityImg}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <div className={styles.buttonRight}>
          <Button size="small" variant="outlined" onClick={handleBtnClick}>Edit</Button>
        </div>
      </CardActions>
    </Card>
  );
}

export default function MainPage({ token }) {

  const [data, setData] = useState({})
  const [open, setOpen] = useState(false)

  const [imgUrl, setImgUrl] = useState('')

  const [dialogData, setDialogData] = useState({
    Category: "Category",
    Name: "Name",
    Status: "Status",
    img: ActivityImg
  })

  useEffect(() => {

  }, [])

  const handleChange = (v) => {
    console.log(v)
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
  return (
    <div className={styles.myCard}>
      <Card className={[styles.cardItem].join(',')}>

        <div className={styles.searchBox}>
          <SearchItem showInfo={'Category'} />
          <SearchItem showInfo={'Name'} />
          <SearchItem showInfo={'Status'} />
        </div>

        <div className={styles.btnBox}>
          <Button variant="outlined" size="medium" onClick={handlerNewClick}>New</Button>
          <div style={{ padding: '10px' }}></div>
          <Button variant="outlined" size="medium">Search</Button>
        </div>

        <div className={styles.MediaCardBox}>
          {
            [1, 1, 1, 1].map(() => <div className={styles.mediaCard}><MediaCard></MediaCard></div>)
          }
        </div>
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
      <Dialog onClose={handleDialogClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <div className={styles.dialogBody}>
          <div className={styles.picBox}>
            <UploadImage
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}></UploadImage>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField label="Category" variant="outlined" size="small" /></div>
            <div className={styles.textFieldDialog}><TextField label="Name" variant="outlined" size="small" /></div>
            <div className={styles.textFieldDialog}><TextField label="Status" variant="outlined" size="small" /></div>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField label="Overview" variant="outlined" size="big" /></div>
          </div>
          <div className={styles.searchBox}>
            <div className={styles.textFieldDialog}><TextField label="Detail" variant="outlined" size="big" /></div>
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