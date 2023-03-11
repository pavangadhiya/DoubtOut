import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from 'react-router-dom'
import Chart from '../charts/Chart';
import  AdminSidebar  from '../Admin/AdminSidebar';
import axios from "axios";
import { Tag } from "@mui/icons-material";
export default function AdminHome() {
    const [user, setUser] = useState(0);
    const [question, setQuestion] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [accept, setAccept] = useState(0);
    const [questionByMonth, setquestionByMonth] = useState(null);

    const [chartInstance, setChartInstance] = useState(null);

    const noOfusers =  async () => {
        await fetch('http://localhost:5000/api/admin/noOfUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUser(data)
            }
            )
        }

   

    // const chartall= () => {
    //     if(chartInstance) chartInstance.destroy();
    //     const ctx = document.getElementById('user-chart1').getContext('2d');
    //     const newChartInstance = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['Users', 'Questions', 'Answers', 'Accepted Answers'],
    //             datasets: [{
    //                 label: 'Overall Report',
    //                 data: [user, question, answer, accept]
    //             }]
    //         }
    //     }); 
    //     setChartInstance(newChartInstance);
    //   // newChartInstance.reset();
    // }

    // const chart = async () => {
    //     await axios.get('http://localhost:5000/api/admin/chart')
    //     .then((response) => {
    //         setquestionByMonth(response.data)
    //     })
    //     if(chartInstance) chartInstance.destroy();
    //     const ctx = document.getElementById('user-chart1').getContext('2d');
    //     const newChartInstance = new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //             datasets: [{
    //                 label: 'Number of question',
    //                 data: questionByMonth
    //             }]
    //         }
    //     });
    //     setChartInstance(newChartInstance);
    //     //console.log("question by month",questionByMonth);
    // }
    const [questions, setQuestions] = useState([]);
    const [Tags, setTags] = useState([]);
    const [count, setCount] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/question/fetchquestions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => setQuestions(data));
    }, [])


    useEffect(() => {
        const freqOfTags = [];
        const tag = [];
        const cnt = [];

        questions.map(question => question.tags.split(" ").map(tag => {
            freqOfTags[tag] = 0;
        }))

        questions.map(question => question.tags.split(" ").map(tag => {
            freqOfTags[tag] = freqOfTags[tag] + 1;
        }))

        // console.log(freqOfTags);

        for (const i in freqOfTags) {
            tag.push(i);
            cnt.push(parseInt(freqOfTags[i]));
        }

        setTags(tag);
        setCount(cnt);

    }, [questions]);

    
 

    return (
        <div >
            <AdminSidebar />
     
        <br/>
        </div>
    );
    }