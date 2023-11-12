import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import img from '../../assets/GuiyangMoon.jpg'
import styles from './index.module.css';
import { useNavigate, useParams } from 'react-router-dom';
// import { useRoute } from '@react-navigation/native';
import { useLocation } from 'react-router-dom';

import UploadImage from './UploadImage'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const baseUrl = "http://127.0.0.1:5000/";

const urls = {
  postTopic: baseUrl + "Topic/createTopic",
    topicDetail: baseUrl + "Topic/topicDetail/",
    deleteTopic: baseUrl + "Topic/deleteTopic",
    editTopic: baseUrl + "Topic/editTopic",
}


export default function Posts({ profileData }) {
    let location = useLocation();
    const { activityId,activity} = location.state
    const token = localStorage.getItem("token");
    console.log(activity)
    const navigate = useNavigate();
    const [openModal, setOpenModal] = React.useState(false);
    const [imgUrlArr, setImgUrlArr] = React.useState([]);
    const [addDetail, setAddDetail] = React.useState('');
    const [paginationObj, setPaginationObj] = React.useState({
    currentPage: 1,
    pageSize: 10,
    count: 0,
    })
    
    const [editTopicId, setEditTopicId] = React.useState()
    const [listData, setListData] = React.useState([]);

    React.useEffect(() => {

        GetTopicDetailApi()

    }, [paginationObj.count, paginationObj.pageSize, paginationObj.currentPage])

    const handleClose = () => {
        setAddDetail('')
        setImgUrlArr([])
        setEditTopicId("");
        setOpenModal(false)
    }

    const addPost = () => {
        setOpenModal(true)
    }
    const savePost = () => {
        if (editTopicId) {
            editTopic()
        } else {
            postTopicApi()
        }

        
        
        
        setOpenModal(false)

    }
    const goComments = (item) => {

        navigate("/comments",{state:{topicObj:item, activityId, activity}})
    }
      const changePagination = (e, value) => {
        setPaginationObj(Object.assign(paginationObj, { currentPage: value }))
        GetTopicDetailApi()
    }
    


      const  deleteTopic= async (topicId) => {
        const res = await fetch(urls.deleteTopic, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                   topicId,
                }
            )
        })
        await  GetTopicDetailApi()
    }

    const postTopicApi = async () => {
        const res = await fetch(urls.postTopic, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    "activityId": activityId,
                    "detail": addDetail,
                    'image': JSON.stringify(imgUrlArr)
                }
            )
        })
        handleClose()
        const { success, total } = await res.json();
        await  GetTopicDetailApi()
    }

    const editTopic = async () => {
            const res = await fetch(urls.editTopic, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    topicId: editTopicId,
                    detail: addDetail,
                    image:JSON.stringify(imgUrlArr)
                }
    
            )
        })
        handleClose()
        const { success, total } = await res.json();
        await  GetTopicDetailApi()
        
    }

    const GetTopicDetailApi = async () => {
        const res = await fetch(urls.topicDetail+`${activityId}/${paginationObj.currentPage}/${paginationObj.pageSize}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        const { success, total_rows } = await res.json();
        setPaginationObj(Object.assign(paginationObj, { count: Math.ceil(total_rows / paginationObj.pageSize) }))
        setListData(formatData(success))
    }
  const formatData = (data) => {
    let arr = []
    for (let k in data) {
      arr.push({ id: k, ...data[k]})
    }
    return arr;

    }
    const handleChange = (v) => {
        setPaginationObj(Object.assign(paginationObj, { pageSize: v.target.value,currentPage:1 }))
        GetTopicDetailApi()
    }
    
    const formatImg = (item) => {
        let res = null
        try {
            res = JSON.parse(item.image).map(item => 
                                <div className={styles.imgItem}><img src={item} alt="" /></div>
                                )        
        } catch (e) {
            console.log(e)
        }
        return res

    }
    const clickEdit = (item) => {
        
         
        let res = []
         try {
            res = JSON.parse(item.image)
        } catch (e) {
            console.log(e)
        }
        setImgUrlArr(res)
        setAddDetail(item.detail)
        setEditTopicId(item.id)
        setOpenModal(true)

    }

    return (
        <div className={styles.outerBox}>
            <div className={styles.showDetailTop} >
                <Card sx={{ width: "30%" }} >
                    <CardMedia
                        component="img"
                        height="194"
                        image={activity.image}
                        alt="Paella dish"
                    />
                </Card>
                <Card sx={{ width: '70%' }}>
                    <CardContent>
                        <h1>{ activity.activity_name}</h1>
                        <Typography variant="body2" color="text.secondary">
                            {activity.detail}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing style={{ flexDirection:"column", alignItems: "end", }}>
                        
                        <Button variant="contained" size="medium" onClick={addPost}>Add &nbsp;&nbsp;&nbsp;Post</Button>
                        <div style={{padding:'10px'}}></div>
                        <Button variant="contained" size="medium" onClick={()=>navigate("/user_compaigns")}>prev Page</Button>
                       
                    </CardActions>

                </Card>

            </div>
          


             {
                listData.map(item=> <Card onClick={()=>goComments(item)} className={styles.marginBtn}>
                        <CardContent style={{backgroundColor:'aliceblue'}}>
                        <Typography variant="body2" color="text.secondary">
                            <div className={styles.imgbox}>
                                {
                                    formatImg(item)
                                }
                            </div>
                            {item.detail}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ justifyContent: "center"}}>
                            <Tooltip title="Comment">
                       
                        <IconButton aria-label="show chats">
                            <ChatIcon style={{ color: "rgb(8 98 246 / 77%)" }} />
                            
                            </IconButton>
                           </Tooltip>
                            
                        {profileData.identity != 'User' ?
                             <Tooltip title="DELETE">
                            <IconButton aria-label="show chats" >
                                <DeleteIcon onClick={(e) => {
                                    deleteTopic(item.id)
                                    e.stopPropagation()
                                    return false
                                }} style={{ color: "red" }}></DeleteIcon>
                            </IconButton></Tooltip>:""
                        }
                        {
                            profileData.email === item.email?<Tooltip title="EDIT"><IconButton aria-label="show chats">
                            <EditIcon style={{ color: "rgb(8 98 246 / 77%)" }} onClick={(e) => {
                                clickEdit(item)
                                 e.stopPropagation()
                                    return false
                            }} />
                            </IconButton></Tooltip>:""
                        
                        }
                            
                        
                        
                         

                    </CardActions>
                </Card>) 
                
                
            }
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
            

            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                    <Box sx={style} style={{overflow:"scroll",maxHeight:"80vh"}}>
                    <List >
                        {
                            imgUrlArr.map((e, idx) => {
                                console.log(idx)
                                return <UploadImage setImgUrl={setImgUrlArr} imgUrl={ imgUrlArr } idx={idx} />
                            })
                        }
                        <UploadImage setImgUrl={setImgUrlArr} imgUrl={imgUrlArr} idx={imgUrlArr.length}/>
                        <Input defaultValue={addDetail} style={{ width: '100%' }}
                            multiline placeholder="please add your views" onChange={(e) => {
                                setAddDetail(e.target.value)
                            }}></Input>
                      
                        <div style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem'}}>
                        <Button variant="contained" size="medium" onClick={savePost}>ok</Button>
                        <div style={{ padding: '10px' }}></div>
                        <Button variant="contained" size="medium" onClick={handleClose}>cancel</Button>
                        </div>
                    </List>
                </Box>
            </Modal>
           
        </div>
    );
}


