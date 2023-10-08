import React from 'react';
import {
    useState, useEffect, useRef
} from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import img from '../../../assets/bear.jpg'


import styles from './index.module.css'

export default function ShowImg(props) {
    const {
        imgUrl,
    } = props
    return <div className={styles.uploadBox}>
       <div className={styles.uploadWrapBox}>
            <img src={img} alt="None" style={{
                width: '100%'
            }} />
        </div>
    </div>
}