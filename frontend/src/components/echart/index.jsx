import * as React from 'react';
import * as echarts from 'echarts';
import { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
const baseUrl = "http://127.0.0.1:5000/";
const urls = {
    getTop10Activities: baseUrl + "Topic/getTop10Activities",
    getTop10CommentsActivities: baseUrl + "Topic/getTop10CommentsActivities",
    getTop10CommentsTopics: baseUrl + "Topic/getTop10CommentsTopics",
    getCategory: baseUrl + "Activity/getCategory",

}

export default function Comments() {
    const token = localStorage.getItem("token");
    const myDom1 = useRef()
    const myDom2 = useRef()
    const myDom3 = useRef()
    useEffect(() => {
        getTop10Activities();
        getTop10CommentsActivities();
        getTop10CommentsTopics();
        // getCategory();
    }, [])

    const getTop10Activities = async () => {
        const res = await fetch(urls.getTop10Activities, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const { success } = await res.json();
        echartFun(myDom1,success,'getTop10Activities')

    }

    const getTop10CommentsActivities = async () => {
        const res = await fetch(urls.getTop10CommentsActivities, {

            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const { success } = await res.json();
        echartFun(myDom2,success,'getTop10CommentsActivities')
    }
    const getTop10CommentsTopics = async () => {
        const res = await fetch(urls.getTop10CommentsTopics, {

            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const { success } = await res.json();
        echartFun(myDom3,success,'getTop10CommentsTopics')
    }
    const getCategory = async () => {
        const res = await fetch(urls.getCategory, {

            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const { success } = await res.json();
        // echartFun(myDom4,success,'getCategory')
    }

    const echartFun = (dom,arr,text) => {
        let arr2 = [];
        if (arr.length > 0) {
            arr.forEach(item => {
            arr2.push({id:item.activityId,name:item.activity_name,value:item.count})
            })
        }
        
        var myChart = echarts.init(dom.current);
        var option;
        option = {
            title: {
                text,
                // subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data:arr2,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        option && myChart.setOption(option);

    }

    return <>
        <div className={styles.pieBox}>
            <div ref={myDom1} className={styles.pieItem}></div>
        </div>
        <div className={styles.pieBox}>
           <div ref={myDom2} className={styles.pieItem}></div> 
        </div>
        <div className={styles.pieBox}>
                    
        
        <div ref={myDom3} className={styles.pieItem}></div>

        </div>
        
    </>
    
    

}
