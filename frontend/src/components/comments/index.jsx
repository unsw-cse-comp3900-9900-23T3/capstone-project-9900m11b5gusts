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



export default function Comments() {
    const [expanded, setExpanded] = React.useState(false);
    const [listData, setListData] = React.useState([
        {
            id: 1, pid: null, name: "Hello", open: false, user: 'aaa', children: [
                {
                    id: 4, pid: 1, name: "中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文中文v", open: false, user: 'bbb', children: []
                },
                                {
                    id: 4, pid: 1, name: "NiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNiceNice", open: false, user: 'bbb', children: []
                },                {
                    id: 4, pid: 1, name: "Nice", open: false, user: 'bbb', children: []
                },                {
                    id: 4, pid: 1, name: "Nice", open: false, user: 'bbb', children: []
                },                {
                    id: 4, pid: 1, name: "Nice", open: false, user: 'bbb', children: []
                },                {
                    id: 4, pid: 1, name: "Nice", open: false, user: 'bbb', children: []
                },                {
                    id: 4, pid: 1, name: "Nice", open: false, user: 'bbb', children: []
                },                {
                    id: 4, pid: 1, name: "Nice", open: false, user: 'bbb', children: []
                },
            ]
        },
        {
            id: 2, pid: null, name: "heheh", open: false, user: 'ccc', children: [
                {
                    id: 5, pid: 2, name: "hahah", open: false, user: 'bbb', children: []
                }
            ]
        },
        {
            id: 3, pid: null, open: false, name: " heihei", user: 'ddd', children: []
        }
    ]);

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    const handleClose = () => setOpenModal(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const clickMore = (item) => {
        setOpenModal(true)
    }
    const deleteClick = () => {
        
    }

    return (
        <div className={styles.outerBox}>
            <div className={styles.showDetailTop}>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer
                            ,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer,My Answer
                        </Typography>
                    </CardContent>
                </Card>

            </div>
            <div className={styles.commentsBox}>
                <Card sx={{ width: "99%" }} style={{overflowY: 'scroll'}}>
                    <List dense={dense}>
                        {listData.map(item => (
                            <>
                                <ListItemButton onClick={() => {
                                    clickMore(item)
                                }}>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <Card style={{marginRight: '3rem'}}>{ item.user }</Card>
                                    <ListItemText style={{whiteSpace: 'pre-line',  wordBreak: 'break-all'}} primary={item.name}/>
                                </ListItemButton>
                                <Collapse in={item.children.length > 0} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            item.children.map(child => (
                                                <>
                                                    <ListItemButton sx={{ pl: 4 }} onClick={()=>{ clickMore(child) }}>
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
                        <Input style={{width: '100%'}} multiline placeholder="Good criticism starts civilization" ></Input>
                        {/* {[1, 2, 3, 4, 5, 6, 7].map(item => <>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={deleteClick}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircle />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItem>
                        </>)} */}
                        <div style={{display: 'flex', justifyContent: 'space-evenly', paddingTop: '2rem'}}>
                            <IconButton color="primary" onClick={() => {
                                setOpenModal(false)
                            }}>
                                <CheckIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => {
                                setOpenModal(false)
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
