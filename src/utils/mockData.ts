// Function to generate random values between min and max
export const randomValue = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Generate mock carbon monoxide (CO) data (in ppm)
export const generateCOData = (count: number, baseValue: number = 2.5, variance: number = 1.5): number[] => {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.max(0, baseValue + randomValue(-variance, variance)));
  }
  return data;
};

// Generate mock carbon dioxide (CO2) data (in ppm)
export const generateCO2Data = (count: number, baseValue: number = 400, variance: number = 50): number[] => {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.max(0, baseValue + randomValue(-variance, variance)));
  }
  return data;
};

// Generate mock timestamps for the last n hours
export const generateTimeLabels = (count: number): string[] => {
  const now = new Date();
  const labels: string[] = [];
  
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(now.getHours() - i);
    labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
  
  return labels;
};

// Generate mock daily averages for the last n days
export const generateDailyAverages = (days: number, type: 'CO' | 'CO2'): { date: string; value: number }[] => {
  const result: { date: string; value: number }[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    
    let baseValue, variance;
    if (type === 'CO') {
      baseValue = 2.5;
      variance = 0.8;
    } else {
      baseValue = 400;
      variance = 30;
    }
    
    result.push({
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      value: Math.max(0, baseValue + randomValue(-variance, variance))
    });
  }
  
  return result;
};

// Generate mock hotspots
export const generateHotspots = (count: number): Array<{
  id: number;
  lat: number;
  lng: number;
  level: 'low' | 'medium' | 'high';
  reading: number;
  type: 'CO' | 'CO2';
}> => {
  const hotspots = [];
  
  for (let i = 0; i < count; i++) {
    // Base coordinates (random city location)
    const baseLat = 40.7128; // New York
    const baseLng = -74.0060;
    
    // Random offset to spread points
    const latOffset = randomValue(-0.1, 0.1);
    const lngOffset = randomValue(-0.1, 0.1);
    
    // Determine emission level
    const randomLevel = Math.random();
    let level: 'low' | 'medium' | 'high';
    let reading: number;
    
    if (randomLevel < 0.5) {
      level = 'low';
      reading = randomValue(1, 3);
    } else if (randomLevel < 0.8) {
      level = 'medium';
      reading = randomValue(3, 8);
    } else {
      level = 'high';
      reading = randomValue(8, 15);
    }
    
    hotspots.push({
      id: i + 1,
      lat: baseLat + latOffset,
      lng: baseLng + lngOffset,
      level,
      reading,
      type: Math.random() > 0.5 ? 'CO' : 'CO2'
    });
  }
  
  return hotspots;
};

// Mock vehicle data
export const vehicleData = {
  ownerName: 'Alex Johnson',
  vehicleNumber: 'XYZ-1234',
  manufacturer: 'TATA Intra V30',
  model: 'Model 3',
  year: 2022,
  engineType: 'Fuel',
  lastInspection: '2023-06-15',
  nextDueDate: '2024-06-15',
  currentLocation: { lat: 40.7128, lng: -74.0060 },
  inspectionHistory: [
    { date: '2023-06-15', result: 'Pass', notes: 'All systems functioning properly' },
    { date: '2022-05-30', result: 'Pass', notes: 'Battery system upgraded' },
    { date: '2021-06-10', result: 'Pass', notes: 'Minor issues resolved' }
  ]
};