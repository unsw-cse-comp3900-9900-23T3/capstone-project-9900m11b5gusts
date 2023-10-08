// recat
import React from 'react';
import {
    useState, useEffect, useRef
} from 'react';

// mui
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// mui icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// assets
import styles from './index.module.css'
import MoonImg from '../../../assets/GuiyangMoon.jpg'

export default function UploadImage(props) {

    const {
        imgUrl,
        setImgUrl
    } = props

    const hiddenInputRef = useRef()

    function fn() {
        hiddenInputRef.current.oninput = function(){
            if(hiddenInputRef.current.files && hiddenInputRef.current.files[0]) {

                // read file obj
                let reader = new FileReader();

                reader.onload = function (evt) {
                    let src = evt.target.result;
                    // send by xhr
                    setImgUrl(src)
                }

                // 将文件读取为 DataURL
                // reader.readAsArrayBuffer(hiddenInputRef.current.files[0]);
                reader.readAsDataURL(hiddenInputRef.current.files[0]);
            }
        }
    }


    const handleUploadImage = () => {

        // file mock input click event
        var evt = new MouseEvent("click", {
            bubbles: false,
            cancelable: true,
            view: window,
        });
        hiddenInputRef.current.dispatchEvent(evt,fn());
    }

    const handleUploadDelBtn = () => {
        setImgUrl('')
    }

    const showUpload = () => {
        return <div>
            <div onClick={handleUploadImage}>
                <UploadFileIcon className={[styles.iconStyle].join(',')} />
            </div>
            <input type="file" hidden ref={hiddenInputRef} />
        </div>
    }

    const showImage = () => {
        return <div className={styles.uploadWrapBox}>
            <img src={imgUrl} alt="None" style={{
                width: '100%'
            }} />
            <HighlightOffIcon className={ styles.uploadDelIcon } onClick={handleUploadDelBtn} />
        </div>
    }

    return <div className={styles.uploadBox}>
        { imgUrl? showImage(): showUpload() }
    </div>
}