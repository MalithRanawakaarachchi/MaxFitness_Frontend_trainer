import React from 'react';
import './dashBoard.css';
import Navbar from '../components/Navbar';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import newreg from '../images/new_reg.jpg';
import coin from '../images/coin.png';
import due from '../images/due.png';
import API from "../utils/api";


const DashBoard = () => {
    const [payment, setPayment] = useState([]);
    const [monthlyIncome, setMonthlyIncome] = useState({});
    const [remainingTime, setRemainingTime] = useState('');
    const [trainee, setTrainee] = useState('');
    const [targetMonthlyIncome, setTargetMonthlyIncome] = useState('');
    const [dataReady, setDataReady] = useState(false);

    const chartRef=useRef(null);
    const chartInstance=useRef(null);
    const chartRef2=useRef(null);
    const chartInstance2=useRef(null);
    const chartRef3=useRef(null);
    const chartInstance3=useRef(null);
    const chartRef4=useRef(null);
    const chartInstance4=useRef(null);
    const chartRef5=useRef(null);
    const chartInstance5=useRef(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const paymentResponse = await API.get('/payments');
            if (paymentResponse.status === 200) {
              setPayment(paymentResponse.data);

              //set calculate monthly income
              const monthlyIncomeData = {};
    
              // Initialize months with zero income
              const allMonths = [
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
              ];
    
              allMonths.forEach(month => {
                monthlyIncomeData[month] = 0;
              });
    
              paymentResponse.data.forEach((pay) => {
                const date = new Date(pay.added_date);
                const month = date.toLocaleString('default', { month: 'long' });
    
                if (!monthlyIncomeData[month]) {
                  monthlyIncomeData[month] = 0;
                }
                const paymentAmount = parseFloat(pay.amount);
                monthlyIncomeData[month] += paymentAmount;
              });
    
              Object.keys(monthlyIncomeData).forEach(month => {
                monthlyIncomeData[month] = monthlyIncomeData[month].toFixed(2);
              });
    
              setMonthlyIncome(monthlyIncomeData);
              setDataReady(true);
            }
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

       //get all trainees for target
       useEffect(() => {
        const fetchTraineeData = async () => {
          try {
            const res = await API.get('/trainee');
            if (res.status === 200) {
              setTrainee(res.data);
              // Get the count of trainees
              const traineeCount = res.data.length;
              const targetIncome = traineeCount * 4200;
              setTargetMonthlyIncome(targetIncome);
            }
          } catch (error) {
            console.log('Error fetching trainee data:', error);
          }
        };
    
        fetchTraineeData();
      }, []);

      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      const currentMonthTotalIncome = monthlyIncome[currentMonth] || 0;
      const percentage = (currentMonthTotalIncome / targetMonthlyIncome) * 100;

      // set pie chart
      useEffect(()=>{
        if (dataReady && chartRef.current) {
            if(chartInstance.current){
                chartInstance.current.destroy()
            }
            const myChartRef = chartRef.current.getContext('2d');

            chartInstance.current=new Chart(myChartRef, {
                type:"pie",
                data:{
                    datasets :[
                        {
                            data:[currentMonthTotalIncome, targetMonthlyIncome - currentMonthTotalIncome],
                            backgroundColor: ['#36A2EB', 'rgb(161, 161, 161)'],
                            borderWidth:2
                        },
                    ],
                },
            });
            return()=>{
                if(chartInstance.current){
                    chartInstance.current.destroy()
                }
            };
        }
      },[dataReady, currentMonthTotalIncome, targetMonthlyIncome]);

      //set chart
      useEffect(()=>{
        if(chartInstance2.current){
            chartInstance2.current.destroy()
        }
        const myChartRef2 = chartRef2.current.getContext('2d');

        chartInstance2.current=new Chart(myChartRef2, {
            type:"bar",
            data:{
                labels:["Sep","Oct","Nov","Dec"],
                datasets :[
                  {
                    label:"Income Chart",
                    data:[40000,30000,50000,0],
                    borderColor: ['#36A2EB'],
                    borderWidth:2
                  }
               ]
            }
        })
        return()=>{
            if(chartInstance2.current){
                chartInstance2.current.destroy()
            }
        }
      },[]);

      //set doughnuts
      useEffect(()=>{
        if(chartInstance3.current){
            chartInstance3.current.destroy()
        }
        const myChartRef3 = chartRef3.current.getContext('2d');

        chartInstance3.current=new Chart(myChartRef3, {
            type:"doughnut",
            data:{
                datasets :[
                  {
                    label:"Income Chart",
                    data:[40000,30000],
                    borderColor: ['rgb(255, 255, 0)'],
                    backgroundColor:['rgb(231, 231, 0)','rgb(161, 161, 161)'],
                    borderWidth:2
                  }
               ]
            }
        })
        return()=>{
            if(chartInstance2.current){
                chartInstance2.current.destroy()
            }
        }
      },[]);

      useEffect(()=>{
        if(chartInstance4.current){
            chartInstance4.current.destroy()
        }
        const myChartRef4 = chartRef4.current.getContext('2d');

        chartInstance4.current=new Chart(myChartRef4, {
            type:"doughnut",
            data:{
                datasets :[
                  {
                    label:"Income Chart",
                    data:[65000,8000],
                    borderColor: ['rgb(0, 224, 0)'],
                    backgroundColor:['rgb(0, 157, 0)','rgb(161, 161, 161)'],
                    borderWidth:2
                  }
               ]
            }
        })
        return()=>{
            if(chartInstance4.current){
                chartInstance4.current.destroy()
            }
        }
      },[]);

      useEffect(()=>{
        if(chartInstance5.current){
            chartInstance5.current.destroy()
        }
        const myChartRef5 = chartRef5.current.getContext('2d');

        chartInstance5.current=new Chart(myChartRef5, {
            type:"doughnut",
            data:{
                datasets :[
                  {
                    label:"Income Chart",
                    data:[14000,32000],
                    borderColor: ['rgb(255, 68, 0)'],
                    backgroundColor:['rgb(212, 57, 0)','rgb(161, 161, 161)'],
                    borderWidth:2
                  }
               ]
            }
        })
        return()=>{
            if(chartInstance5.current){
                chartInstance5.current.destroy()
            }
        }
      },[]);


      //set remaining date and time

      useEffect(() => {
        // Calculate remaining time in the current month
        const updateRemainingTime = () => {
            const currentDate = new Date();
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const remainingTimeInMilliseconds = lastDay - currentDate;
        
            const days = Math.floor(remainingTimeInMilliseconds / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTimeInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTimeInMilliseconds % (1000 * 60)) / 1000);
            const formattedDays = days < 10 ? `0${days}` : `${days}`;
            const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            setRemainingTime(`${formattedDays} DAYS / ${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
        };

        const intervalId = setInterval(updateRemainingTime, 0);
        return () => clearInterval(intervalId);

      }, []);
 
 return (
    <div className="home-container">
      <Navbar/>
      <Container className='container-home'>
        <Row>
          <Col md={4}>
            <h3 className='topic-text'>MF|DASHBOARD</h3>
                <Table className='table-border' style={{marginTop:40}}>
                <thead>
                    <tr>
                        <th class="table-active">
                            <font className='text-color-table lower-text-equipment'>
                                Month
                            </font></th>
                        <th class="table-active" style={{paddingRight:20}}>
                            <font className='text-color-table lower-text-equipment'>
                                Total Income LKR
                            </font>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(monthlyIncome).map(([month, totalIncome]) => (
                    <tr key={month}>
                        <td align='left' className='lower-text-equipment' style={{paddingLeft:40}}>{month}</td>
                        <td align='right' className='lower-text-equipment' style={{paddingRight:40, width:200}}>{totalIncome}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
                <label className='copyright'>Copyright © 2023 Max Fitness Gym Center (Pvt.) Ltd. All Rights Reserved</label>
          </Col>
          <Col md={3}>
            <div>
                <div  style={{textAlign:'left', marginTop:150, marginLeft:60}}>
                    <h5 className='text-bold tex-size-20 text-color-gray' style={{marginLeft:20}}>This Month</h5>
                    <p className='text-weight-time tex-size-20' style={{marginLeft:20}}> {remainingTime} </p>
                    <p className='text-weight tex-size-20' style={{marginTop:-20, marginLeft:20}}>Remaining</p>
                    <div>
                        <canvas ref={chartRef} style={{width:"300px", height:"200px"}}/>
                        <p align='center' className='text-color-black text-weight' style={{marginTop:20}}>
                            {percentage.toFixed(2)}% of the current month
                        </p>
                    </div>
                </div>
            </div>
          </Col>
          <Col md={4} className='col-right'>
            <div style={{marginLeft:4}}><p align='left' className='text-bold tex-size-20 text-color-gray'>Last Months</p></div>
            <div style={{marginLeft:26, height:200}}>
                <canvas ref={chartRef2} style={{width:"150px", height:"200px"}}/>
            </div>
            <div style={{marginTop:30}}>
                <div className='d-flex' style={{marginBottom:15}}>
                    <img src={newreg} style={{width:18, height:18, marginTop:3, marginRight:20, marginLeft:50}}/>
                    <label className='text-color-blue lower-text-equipment'>New registrations</label>
                    <label style={{marginLeft:130}}>2</label>
                </div>
                <div className='d-flex' style={{marginBottom:10}}>
                    <img src={coin} style={{width:35, height:35, marginTop:-5, marginRight:13, marginLeft:40}}/>
                    <label className='text-color-blue lower-text-equipment'>New incomes</label>
                    <label style={{marginLeft:155}}>0</label>
                </div>
                <div className='d-flex' style={{marginBottom:12}}>
                    <img src={due} style={{width:22, height:22, marginTop:2, marginRight:19, marginLeft:47}}/>
                    <label className='text-color-blue lower-text-equipment'>Due payments</label>
                    <label style={{marginLeft:149}}>0</label>
                </div>
                <div className='d-flex doughnut-bar'>
                    <div style={{width:150}}>
                        <label>Memberships</label>
                        <canvas ref={chartRef3} style={{ width: "50px", height: "50px", marginTop:-7}}/>
                    </div>
                    <div style={{width:150}}>
                        <label>Income Rate</label>
                        <canvas ref={chartRef4} style={{ width: "50px", height: "50px", marginTop:-7 }}/>
                    </div>
                    <div style={{ width:150}}>
                        <label>Income Rate</label>
                        <canvas ref={chartRef5} style={{ width: "50px", height: "50px", marginTop:-7 }}/>
                    </div>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DashBoard;