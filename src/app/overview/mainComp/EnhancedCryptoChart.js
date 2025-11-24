"use client";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale
} from 'chart.js';
import styles from '../page.module.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale);

const EnhancedCryptoChart = ({ data, showValues }) => {
  // Color with opacity for hover effect
  const transparentize = (color, opacity) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Generate lighter version of colors for hover
  const hoverColors = data.map(item => transparentize(item.color, 0.8));
  
  // Chart data configuration
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: showValues ? data.map(item => item.value) : data.map(item => item.percent),
        backgroundColor: data.map(item => item.color),
        hoverBackgroundColor: hoverColors,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        hoverBorderColor: 'rgba(255, 255, 255, 0.5)',
        hoverBorderWidth: 3,
        borderRadius: 5,
        spacing: 2,
        borderAlign: 'inner',
        offset: 10,
        weight: 1,
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: {
          size: 14,
          family: 'Inter, sans-serif',
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
          family: 'Inter, sans-serif',
        },
        padding: 12,
        cornerRadius: 8,
        boxPadding: 5,
        bodySpacing: 5,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const label = context.label || '';
            
            if (showValues) {
              return `${label}: $${value.toLocaleString()}`;
            } else {
              return `${label}: ${value}%`;
            }
          },
          labelTextColor: function(context) {
            return '#ffffff';
          },
          labelPointStyle: function(context) {
            return {
              pointStyle: 'circle',
              rotation: 0
            };
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutQuart',
    },
    layout: {
      padding: 20
    },
    elements: {
      arc: {
        borderWidth: 1
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  };

  return (
    <div className={styles.portfolioChartContainer}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default EnhancedCryptoChart; 