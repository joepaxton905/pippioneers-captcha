"use client";
import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';

// Note: You'll need to run this command later:
// npm install chart.js react-chartjs-2

// This is a placeholder until you install the packages
const CryptoDonutChart = ({ data, showValues }) => {
  const chartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    // This implementation will be replaced by Chart.js once installed
    // For now, create a visually appealing canvas-based chart
    const renderChart = async () => {
      if (!chartRef.current || !data || data.length === 0) return;

      const canvas = chartRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 30;
      const innerRadius = radius * 0.6;
      if (!Number.isFinite(radius) || !Number.isFinite(innerRadius) || radius <= 0 || innerRadius <= 0) return;

      // Function to create a modern gradient
      const createModernGradient = (color1, color2, ctx, startX, startY, endX, endY) => {
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
      };

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate total value
      const totalValue = data.reduce((sum, item) => sum + item.value, 0);

      // Drop shadow for the whole chart
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;

      // Draw outer glow/background
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30, 41, 59, 0.2)';
      ctx.fill();

      // Reset shadow for segments
      ctx.shadowColor = 'transparent';

      // Draw the donut segments with modern styling
      let startAngle = -0.5 * Math.PI; // Start at 12 o'clock

      data.forEach((item, index) => {
        const valueForAngle = showValues && totalValue > 0 ? item.value : item.percent;
        const totalForAngle = showValues && totalValue > 0 ? totalValue : 100;
        const segmentAngle = (valueForAngle / totalForAngle) * (Math.PI * 2);
        const endAngle = startAngle + segmentAngle;
        if (!Number.isFinite(segmentAngle) || segmentAngle <= 0) {
          startAngle = endAngle;
          return;
        }

        // Determine if this segment is active
        const isActive = index === activeIndex;

        // Calculate segment midpoint for offset
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const offsetDistance = isActive ? 10 : 0;
        const offsetX = Math.cos(midAngle) * offsetDistance;
        const offsetY = Math.sin(midAngle) * offsetDistance;

        // Save context before transformations
        ctx.save();

        // Apply offset if active
        ctx.translate(offsetX, offsetY);

        // Draw segment with rounded corners
        ctx.beginPath();

        // Draw outer arc with slight padding between segments
        ctx.arc(
          centerX,
          centerY,
          radius,
          startAngle + 0.01,
          endAngle - 0.01
        );

        // Draw inner arc
        ctx.arc(
          centerX,
          centerY,
          innerRadius,
          endAngle - 0.01,
          startAngle + 0.01,
          true
        );

        ctx.closePath();

        // Create gradient based on the segment color
        const color1 = item.color;
        const color2 = adjustBrightness(item.color, isActive ? 20 : -20);

        const gradient = createModernGradient(
          color1,
          color2,
          ctx,
          centerX + Math.cos(midAngle) * innerRadius,
          centerY + Math.sin(midAngle) * innerRadius,
          centerX + Math.cos(midAngle) * radius,
          centerY + Math.sin(midAngle) * radius
        );

        // Apply special effects for active segment
        if (isActive) {
          ctx.shadowColor = color1;
          ctx.shadowBlur = 15;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }

        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle stroke
        ctx.lineWidth = 1;
        ctx.strokeStyle = isActive
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();

        // Reset shadow
        ctx.shadowColor = 'transparent';

        // Add percentage label in the middle of the segment if it's significant enough
        if (segmentAngle > 0.2) {
          const labelRadius = innerRadius + (radius - innerRadius) / 2;
          const labelX = centerX + Math.cos(midAngle) * labelRadius;
          const labelY = centerY + Math.sin(midAngle) * labelRadius;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Only show percentage if segment is large enough
          if (segmentAngle > 0.4) {
            ctx.fillText(`${Math.round(item.percent)}%`, labelX, labelY);
          }
        }

        // Restore context
        ctx.restore();

        startAngle = endAngle;
      });

      // Create inner circle with glassmorphism effect
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);

      // Create radial gradient for glassmorphism
      const innerGradient = ctx.createRadialGradient(
        centerX - innerRadius * 0.3,
        centerY - innerRadius * 0.3,
        0,
        centerX,
        centerY,
        innerRadius
      );

      innerGradient.addColorStop(0, 'rgba(30, 41, 59, 0.7)');
      innerGradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');

      ctx.fillStyle = innerGradient;
      ctx.fill();

      // Add subtle inner border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Add reflection highlight
      ctx.beginPath();
      ctx.ellipse(
        centerX - innerRadius * 0.3,
        centerY - innerRadius * 0.3,
        innerRadius * 0.5,
        innerRadius * 0.2,
        -Math.PI / 4,
        0, Math.PI * 2
      );

      const reflectionGradient = ctx.createRadialGradient(
        centerX - innerRadius * 0.3,
        centerY - innerRadius * 0.3,
        0,
        centerX - innerRadius * 0.3,
        centerY - innerRadius * 0.3,
        innerRadius * 0.5
      );

      reflectionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      reflectionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = reflectionGradient;
      ctx.fill();
    };

    renderChart();

    // Handle mouse interactions
    const handleMouseMove = (event) => {
      if (!chartRef.current || !data || data.length === 0) return;

      const canvas = chartRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2 - 30;
      const innerRadius = radius * 0.6;

      // Calculate distance from center
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if within donut
      if (distance > innerRadius && distance < radius) {
        // Calculate angle
        let angle = Math.atan2(dy, dx);
        if (angle < 0) angle += Math.PI * 2;

        // Adjust angle to match our starting position (-0.5 * Math.PI)
        angle = (angle + 0.5 * Math.PI) % (Math.PI * 2);

        // Find which segment this angle falls in
        let startAngle = 0;
        const totalValue = data.reduce((sum, item) => sum + item.value, 0);

        for (let i = 0; i < data.length; i++) {
          const segmentValue = data[i].percent;
          const segmentAngle = (segmentValue / 100) * (Math.PI * 2);
          const endAngle = startAngle + segmentAngle;

          if (angle >= startAngle && angle < endAngle) {
            setActiveIndex(i);
            canvas.style.cursor = 'pointer';
            renderChart();
            return;
          }

          startAngle = endAngle;
        }
      }

      // Not hovering over a segment
      if (activeIndex !== -1) {
        setActiveIndex(-1);
        canvas.style.cursor = 'default';
        renderChart();
      }
    };

    const handleMouseLeave = () => {
      setActiveIndex(-1);
      renderChart();
    };

    const canvas = chartRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data, showValues, activeIndex]);

  // Helper function to adjust color brightness
  const adjustBrightness = (hex, percent) => {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const adjustedR = Math.min(255, Math.max(0, r + percent));
    const adjustedG = Math.min(255, Math.max(0, g + percent));
    const adjustedB = Math.min(255, Math.max(0, b + percent));

    return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
  };

  // Render tooltip if a segment is active
  const renderTooltip = () => {
    if (activeIndex === -1 || !data[activeIndex]) return null;

    const activeItem = data[activeIndex];

    return (
      <div className={styles.portfolioTooltip}>
        <div className={styles.tooltipHeader}>
          <div
            className={styles.tooltipColorDot}
            style={{ backgroundColor: activeItem.color }}
          ></div>
          <span>{activeItem.name}</span>
        </div>
        <div className={styles.tooltipValue}>
          {showValues ? `$${activeItem.value.toLocaleString()}` : `${activeItem.percent}%`}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.portfolioChartContainer}>
      <canvas
        ref={chartRef}
        width={400}
        height={400}
        className={styles.portfolioCanvas}
      />
      {activeIndex !== -1 && renderTooltip()}

      {/* Once Chart.js is installed, the comment below shows the implementation you'll use */}
      {/*
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
        />
      */}
    </div>
  );
};

export default CryptoDonutChart;