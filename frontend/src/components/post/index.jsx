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
import img from '../../assets/GuiyangMoon.jpg'
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';


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
}


export default function Posts() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [openModal, setOpenModal] = React.useState(false);
    const [imgUrlArr, setImgUrlArr] = React.useState([]);
    const [addDetail, setAddDetail] = React.useState('');
    
    const [listData, setListData] = React.useState([{
            "activityId": "2",
            "detail": "Happy to help with cards your missing but you will need to send a returned stamped envelope.Or lm located in Berwick.Woolworths cards heaps off and about 15 to card of the Coles",
        }
    ]);

    const handleClose = () => {
        setAddDetail('')
        setImgUrlArr([])
        setOpenModal(false)
    }

    const addPost = () => {
        setOpenModal(true)
    }
    const savePost = () => {
        
        postTopicApi()
        
        setOpenModal(false)

    }
    const goComments = () => {
        navigate("/comments")
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
                    "activityId": "2",
                    "detail": addDetail,
                    'image': ''
                }
            )
        })
        const { success, total } = await res.json();
    }


    return (
        <div className={styles.outerBox}>
            <div className={styles.showDetailTop} onClick={addPost}>
                <Card sx={{ maxWidth: "30%" }} >
                    <CardMedia
                        component="img"
                        height="194"
                        image={img}
                        alt="Paella dish"
                    />
                </Card>
                <Card sx={{ maxWidth: '70%' }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like. This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like. This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like. This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                            This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like. This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like. This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like. This impressive paella is a perfect party dish and a fun meal to cook
                            together with your guests. Add 1 cup of frozen peas along with the mussels,
                            if you like.
                        </Typography>
                    </CardContent>
                </Card>

            </div>
          


             {
                listData.map(item=> <Card onClick={goComments} className={styles.marginBtn}>
                        <CardContent style={{backgroundColor:'aliceblue'}}>
                        <Typography variant="body2" color="text.secondary">
                            <div className={styles.imgbox}>
                                <div className={styles.imgItem}><img src={img} alt="" /></div>
                                <div className={styles.imgItem}><img src={img} alt="" /></div>
                                <div className={styles.imgItem}><img src={img} alt="" /></div>
                                <div className={styles.imgItem}><img src={img} alt="" /></div>
                            </div>
                            {item.detail}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing style={{ justifyContent: "center"}}>
                        <IconButton aria-label="show chats">
                            <ChatIcon style={{ color:"rgb(8 98 246 / 77%)"}} />
                        </IconButton>
                    </CardActions>
                </Card>)      
            }
            

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
                        <Input style={{ width: '100%' }}
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


