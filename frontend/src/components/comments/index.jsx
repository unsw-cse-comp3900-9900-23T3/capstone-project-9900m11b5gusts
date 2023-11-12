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
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import img from '../../assets/GuiyangMoon.jpg'
import styles from './index.module.css';

import CheckIcon from '@mui/icons-material/Check'; 
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import UserInfoChip from "../user_general/UserInfoChip"


const baseUrl = "http://127.0.0.1:5000/";

const urls = {
    commentTopic: baseUrl + "Topic/commentTopic",
    deleteComment: baseUrl + "Topic/deleteComment",
    topicComment: baseUrl + "Topic/topicComment",
}



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



export default function Comments({profileData}) {

    const token = localStorage.getItem("token");
    let location = useLocation();
    const { topicObj } = location.state

    const comments = topicObj?.comments

    const [topicData,setTopicData] = React.useState({})
    const [expanded, setExpanded] = React.useState(false);
    const [listData, setListData] = React.useState([])


    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [comment, setComment] = React.useState('');

    const handleClose = () => {
        setOpenModal(false);
        setComment('');
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    React.useEffect(() => {
        setTopicData(topicObj)

        setListData(comments.map(e => {
            return {
                id: e.id,
                pid: null,
                name: e.comment,
                open: false,
                user: e.email,
                avatar: e.avatar,
                children: []
            }
        }))

    }, [])

    const createCommentApi = async () => {
        const res = await fetch(urls.commentTopic, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    "topicId": topicObj.id,
                    "comment": comment
                }
            )
        })
        handleClose()
        const { success, total } = await res.json();

        await getCommentApi()
    }

    const getCommentApi = async () => {
        const res = await fetch(urls.topicComment+`/${topicObj.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        const { success, total } = await res.json();
        console.log(success)
        setListData(success.comments.map(e => {
            return {
                id: e.id,
                pid: null,
                name: e.comment,
                open: false,
                user: e.email,
                avatar: e.avatar,
                children: []
            }
        }))
    }

    const delCommentApi = async (commentId) => {
        const res = await fetch(urls.deleteComment+`/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        handleClose()
        const { success, total } = await res.json();
        await getCommentApi()
    }

    const clickMore = () => {
        setOpenModal(true)
    }
    const deleteClick = () => {
        
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

    return (
        <div className={styles.outerBox}>
            <div className={styles.showDetailTop}>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardContent onClick={() => {
                                    clickMore()
                                }}>
                        <Typography variant="body2" color="text.secondary">
                            <div className={styles.imgbox}>
                                {
                                    formatImg(topicData)
                                }
                                {topicData.detail}
                            </div>
                            
                        </Typography>
                    </CardContent>
                </Card>

            </div>
            <div className={styles.commentsBox}>
                <Card sx={{ width: "99%" }} style={{overflowY: 'scroll'}}>
                    <List dense={dense}>
                        {listData.map(item => (
                            <>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <UserInfoChip token={token} email={item.user} name={item.user}/>
                                    </ListItemIcon>
                                    {/* <Card style={{marginRight: '3rem'}}>{ item.user }</Card> */}
                                    <ListItemText style={{whiteSpace: 'pre-line',  wordBreak: 'break-all', paddingLeft: '15px'}} primary={item.name}/>
                                {profileData.email === item.user ?
                                        <IconButton aria-label="show chats" >
                                            <DeleteIcon onClick={(e) => {
                                                delCommentApi(item.id)
                                                e.stopPropagation()
                                                return false
                                            }} style={{ color: "red" }}></DeleteIcon>
                                        </IconButton>:""
                                    }
                                </ListItemButton>
                                <Collapse in={item.children.length > 0} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            item.children.map(child => (
                                                <>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <ListItemIcon>
                                                            <AccountCircle />
                                                        </ListItemIcon>
                                                        <Card style={{marginRight: '3rem'}}>{ child.user }</Card>
                                                        <ListItemText style={{ whiteSpace: 'pre-line',  wordBreak: 'break-all' }} primary={child.name} />
                                                    </ListItemButton>
                                                </>
                                            ))
                                        }

                                    </List>
                                </Collapse>
                                

                            </>))}
                    </List>
                </Card>
            </div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: 'center'}}>
                        {/* Good criticism is the starting point of civilization */}
                        Comment
                    </Typography>
                    <List>
                        <Input style={{ width: '100%' }} onChange={(e) => {
                            setComment(e.target.value)
                        }} multiline placeholder="Good criticism starts civilization" ></Input>

                        <div style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem'}}>
                            <IconButton color="primary" onClick={() => {
                                createCommentApi()
                            }}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => {
                                handleClose()
                            }}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </List>
                </Box>
            </Modal>
        </div>
    );
}
