/* ═══════════════════════════════════════════════════
   DVSA THEORY TEST – MOCK DATA
   ═══════════════════════════════════════════════════ */

/* ─── 14 Official DVSA Practice Topics ─── */
export const TOPICS = [
  { id: 1,  name: 'Alertness',                       icon: '👁️',  color: '#4F8CFF', progress: 78, count: 32, free: true },
  { id: 2,  name: 'Attitude',                        icon: '😊',  color: '#7B61FF', progress: 62, count: 28, free: true },
  { id: 3,  name: 'Documents',                       icon: '📄',  color: '#00C9A7', progress: 90, count: 18, free: true },
  { id: 4,  name: 'Hazard Awareness',                icon: '⚠️',  color: '#FF9500', progress: 45, count: 48, free: false },
  { id: 5,  name: 'Incidents, Accidents & Emergencies', icon: '🚨', color: '#FF6B6B', progress: 33, count: 35, free: false },
  { id: 6,  name: 'Motorway Rules',                  icon: '🛣️',  color: '#13C2C2', progress: 50, count: 24, free: true },
  { id: 7,  name: 'Other Types of Vehicle',          icon: '🚜',  color: '#667eea', progress: 20, count: 22, free: false },
  { id: 8,  name: 'Road & Traffic Signs',            icon: '🚧',  color: '#E84393', progress: 85, count: 60, free: true },
  { id: 9,  name: 'Rules of the Road',               icon: '📏',  color: '#6C5CE7', progress: 55, count: 44, free: false },
  { id: 10, name: 'Safety & Your Vehicle',            icon: '🔧',  color: '#00B894', progress: 40, count: 38, free: false },
  { id: 11, name: 'Safety Margins',                   icon: '📐',  color: '#FDCB6E', progress: 15, count: 26, free: false },
  { id: 12, name: 'Vehicle Handling',                 icon: '🛞',  color: '#0984E3', progress: 70, count: 30, free: true },
  { id: 13, name: 'Vehicle Loading',                  icon: '📦',  color: '#A29BFE', progress: 0,  count: 20, free: false },
  { id: 14, name: 'Vulnerable Road Users',            icon: '🚶',  color: '#E17055', progress: 60, count: 36, free: true },
];

/* ─── Practice Questions (10 per topic example – Road & Traffic Signs) ─── */
export const PRACTICE_QUESTIONS = {
  8: [ // Road & Traffic Signs
    {
      id: 1, type: 'image',
      text: 'What does this sign mean?',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/UK_road_sign_544.svg/200px-UK_road_sign_544.svg.png',
      options: ['Zebra crossing ahead', 'No pedestrians allowed', 'Pedestrians in road ahead', 'School crossing patrol'],
      correct: 2,
      explanation: 'This sign warns you that pedestrians may be in the road ahead. It is often found where there is no pavement.'
    },
    {
      id: 2, type: 'image',
      text: 'What does this road sign indicate?',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/UK_traffic_sign_601.1.svg/200px-UK_traffic_sign_601.1.svg.png',
      options: ['Roundabout ahead', 'No right turn', 'Give way', 'Mini roundabout'],
      correct: 0,
      explanation: 'This blue circular sign indicates a mini-roundabout. You must give way to traffic from the right.'
    },
    {
      id: 3, type: 'text',
      text: 'What shape are warning signs on UK roads?',
      options: ['Circular', 'Rectangular', 'Triangular', 'Octagonal'],
      correct: 2,
      explanation: 'Warning signs are triangular in shape. They alert you to hazards ahead.'
    },
    {
      id: 4, type: 'image',
      text: 'What does this sign mean?',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/UK_traffic_sign_606.svg/200px-UK_traffic_sign_606.svg.png',
      options: ['No entry', 'Give way to oncoming traffic', 'Stop and wait', 'Road ahead closed'],
      correct: 1,
      explanation: 'This sign means you must give priority to vehicles coming from the opposite direction.'
    },
    {
      id: 5, type: 'text',
      text: 'What colour are motorway signs in the UK?',
      options: ['Green with white text', 'Blue with white text', 'White with black text', 'Brown with white text'],
      correct: 1,
      explanation: 'Motorway signs are blue with white text. Green signs are used on primary routes.'
    },
    {
      id: 6, type: 'text',
      text: 'What does a circular sign with a red border mean?',
      options: ['Information only', 'Give orders', 'Give warnings', 'Direction guidance'],
      correct: 1,
      explanation: 'Circular signs with red borders give orders – they tell you what you must or must not do.'
    },
    {
      id: 7, type: 'image',
      text: 'What hazard does this sign warn you about?',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/UK_traffic_sign_556.svg/200px-UK_traffic_sign_556.svg.png',
      options: ['Road narrows on both sides', 'Dual carriageway ends', 'Two-way traffic', 'Road works ahead'],
      correct: 2,
      explanation: 'This triangular sign warns you that two-way traffic crosses ahead or the road ahead has two-way traffic.'
    },
    {
      id: 8, type: 'text',
      text: 'A sign showing a camera symbol warns you of what?',
      options: ['Tourist information', 'Speed camera ahead', 'No photography zone', 'CCTV area'],
      correct: 1,
      explanation: 'The camera symbol on a sign warns you of a speed camera ahead. Slow down to the posted speed limit.'
    },
    {
      id: 9, type: 'text',
      text: 'What does a brown sign with white writing indicate?',
      options: ['Motorway information', 'Tourist attraction', 'Road works', 'Speed advisory'],
      correct: 1,
      explanation: 'Brown signs are used to indicate tourist destinations and facilities.'
    },
    {
      id: 10, type: 'image',
      text: 'What does this sign mean?',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/UK_traffic_sign_616.svg/200px-UK_traffic_sign_616.svg.png',
      options: ['No stopping', 'No waiting', 'No parking', 'Clearway – no stopping'],
      correct: 3,
      explanation: 'This sign indicates a clearway. You must not stop on the main carriageway unless in an emergency.'
    },
  ],
  // Default questions for other topics
  default: [
    {
      id: 1, type: 'text',
      text: 'What is the national speed limit on a single carriageway for cars?',
      options: ['50 mph', '60 mph', '70 mph', '80 mph'],
      correct: 1,
      explanation: 'The national speed limit on a single carriageway is 60 mph for cars and motorcycles.'
    },
    {
      id: 2, type: 'text',
      text: 'When must you use your headlights?',
      options: ['Only at night', 'When visibility is seriously reduced', 'Only on motorways', 'Only in fog'],
      correct: 1,
      explanation: 'You must use headlights when visibility is seriously reduced, generally when you cannot see more than 100 metres.'
    },
    {
      id: 3, type: 'text',
      text: 'What is the stopping distance at 30 mph in good conditions?',
      options: ['6 metres', '14 metres', '23 metres', '36 metres'],
      correct: 2,
      explanation: 'At 30 mph, the overall stopping distance is 23 metres (75 feet) – 9m thinking + 14m braking.'
    },
    {
      id: 4, type: 'text',
      text: 'You are following a large vehicle. Why should you stay well back?',
      options: ['To help you see the road ahead', 'To keep out of the spray', 'To help the driver see you', 'To reduce fuel consumption'],
      correct: 0,
      explanation: 'Staying well back from a large vehicle gives you a better view of the road ahead so you can anticipate hazards.'
    },
    {
      id: 5, type: 'image',
      text: 'What does this sign mean?',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/UK_road_sign_544.svg/200px-UK_road_sign_544.svg.png',
      options: ['Pedestrians ahead', 'School zone', 'Crossing guard', 'No walking'],
      correct: 0,
      explanation: 'This sign warns motorists that pedestrians are likely to be in or near the road.'
    },
    {
      id: 6, type: 'text',
      text: 'At puffin crossings, which light will not show to a driver?',
      options: ['Green', 'Amber', 'Red', 'Flashing amber'],
      correct: 3,
      explanation: 'Puffin crossings do not have a flashing amber phase. The red light stays on until the crossing is clear.'
    },
    {
      id: 7, type: 'text',
      text: 'When should you use hazard warning lights?',
      options: ['When parking on double yellow lines', 'When your vehicle has broken down', 'When being towed', 'When driving slowly'],
      correct: 1,
      explanation: 'Use hazard warning lights to warn other road users that your vehicle is temporarily obstructing traffic.'
    },
    {
      id: 8, type: 'text',
      text: 'What is the legal minimum tread depth for car tyres?',
      options: ['1 mm', '1.6 mm', '2 mm', '2.5 mm'],
      correct: 1,
      explanation: 'The legal minimum tyre tread depth for cars is 1.6 mm across the central three-quarters of the tyre.'
    },
    {
      id: 9, type: 'text',
      text: 'How should you signal when going straight ahead at a roundabout?',
      options: ['Signal right on approach', 'Signal left on approach', 'No signal on approach, signal left to exit', 'Signal right then left'],
      correct: 2,
      explanation: 'Going straight ahead at a roundabout: no signal on approach, then signal left as you pass the exit before yours.'
    },
    {
      id: 10, type: 'text',
      text: 'What should you do if an ambulance flashes its lights behind you?',
      options: ['Speed up to get away', 'Pull over when safe and let it pass', 'Ignore it', 'Brake immediately'],
      correct: 1,
      explanation: 'Move out of the way as soon as it is safe to do so. Do not endanger other road users.'
    },
  ]
};

/* ─── Mock Test Questions (50 questions per test) ─── */
export const MOCK_TEST_QUESTIONS = [
  {
    id: 1, type: 'text',
    text: 'Which of these would be affected if your vehicle\'s exhaust system has a hole?',
    options: ['Tyre pressure', 'The anti-lock braking system', 'The noise level', 'Engine oil level'],
    correct: 2,
    explanation: 'An exhaust system with a hole will make more noise than normal.'
  },
  {
    id: 2, type: 'text',
    text: 'You are driving on a motorway. When should you use the hard shoulder?',
    options: ['To rest if you feel tired', 'To phone for help', 'In an emergency or breakdown', 'To let faster traffic pass'],
    correct: 2,
    explanation: 'The hard shoulder is only for emergencies or breakdowns. Use a service station for rest.'
  },
  {
    id: 3, type: 'image',
    text: 'What does this sign mean?',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/UK_road_sign_544.svg/200px-UK_road_sign_544.svg.png',
    options: ['Crossing ahead', 'No pedestrians', 'Pedestrians in road', 'School patrol'],
    correct: 2,
    explanation: 'This sign warns of pedestrians likely to be in the road ahead.'
  },
  {
    id: 4, type: 'text',
    text: 'What is the national speed limit on a dual carriageway for cars?',
    options: ['50 mph', '60 mph', '70 mph', '80 mph'],
    correct: 2,
    explanation: 'The national speed limit on a dual carriageway is 70 mph for cars.'
  },
  {
    id: 5, type: 'text',
    text: 'When must you stop your vehicle?',
    options: ['At a green traffic light', 'When signalled by a police officer', 'At an amber light you can stop safely for', 'Both B and C'],
    correct: 3,
    explanation: 'You must stop when signalled by a police officer and at amber lights if it is safe to do so.'
  },
  {
    id: 6, type: 'text',
    text: 'What is the stopping distance at 70 mph?',
    options: ['53 metres', '73 metres', '96 metres', '120 metres'],
    correct: 2,
    explanation: 'At 70 mph the overall stopping distance is 96 metres (315 feet).'
  },
  {
    id: 7, type: 'text',
    text: 'A toucan crossing is different from other crossings because:',
    options: ['It has flashing amber beacons', 'Cyclists can ride across', 'It is controlled by a sensor', 'The lights are different'],
    correct: 1,
    explanation: 'A toucan crossing allows both pedestrians and cyclists to cross together.'
  },
  {
    id: 8, type: 'text',
    text: 'What does the term "blind spot" mean for a driver?',
    options: ['An area of road not visible in mirrors', 'A damaged windscreen area', 'A dark stretch of road', 'A bend in the road'],
    correct: 0,
    explanation: 'The blind spot is an area around your vehicle that cannot be seen in the mirrors.'
  },
  {
    id: 9, type: 'text',
    text: 'You must not reverse for longer than necessary because:',
    options: ['It uses too much fuel', 'It is difficult to steer', 'The road behind may be unclear', 'All of the above'],
    correct: 2,
    explanation: 'Reversing is more hazardous than going forward. Only reverse as far as is necessary.'
  },
  {
    id: 10, type: 'text',
    text: 'When may you overtake on the left?',
    options: ['Never', 'When the vehicle in front is turning right', 'On any dual carriageway', 'When driving on a motorway at night'],
    correct: 1,
    explanation: 'You may pass on the left when the vehicle ahead is signalling to turn right and it is safe to do so.'
  },
];

/* ─── 15 Mock Tests Listing ─── */
export const MOCK_TESTS = [
  { id: 1,  title: 'Mock Test 1',  status: 'completed', score: 43, total: 50, time: '48:22', date: '28 Mar' },
  { id: 2,  title: 'Mock Test 2',  status: 'completed', score: 45, total: 50, time: '51:05', date: '27 Mar' },
  { id: 3,  title: 'Mock Test 3',  status: 'completed', score: 39, total: 50, time: '55:30', date: '25 Mar' },
  { id: 4,  title: 'Mock Test 4',  status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 5,  title: 'Mock Test 5',  status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 6,  title: 'Mock Test 6',  status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 7,  title: 'Mock Test 7',  status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 8,  title: 'Mock Test 8',  status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 9,  title: 'Mock Test 9',  status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 10, title: 'Mock Test 10', status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 11, title: 'Mock Test 11', status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 12, title: 'Mock Test 12', status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 13, title: 'Mock Test 13', status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 14, title: 'Mock Test 14', status: 'new',       score: null, total: 50, time: null, date: null },
  { id: 15, title: 'Mock Test 15', status: 'new',       score: null, total: 50, time: null, date: null },
];

/* ─── Video-Based Questions ─── */
export const VIDEO_QUESTIONS = [
  {
    id: 1,
    title: 'Roundabout Rules',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:30',
    thumbnail: '🔄',
    color: '#4F8CFF',
    questions: [
      {
        text: 'When approaching a roundabout, you should:',
        options: ['Always stop', 'Give way to traffic from the right', 'Speed up to merge quickly', 'Flash your headlights'],
        correct: 1,
        explanation: 'At a roundabout, you must give priority to traffic coming from your right unless road markings indicate otherwise.'
      },
      {
        text: 'Which lane should you use to go straight ahead at a roundabout?',
        options: ['Right lane', 'Left lane', 'Either lane unless marked', 'Middle lane only'],
        correct: 2,
        explanation: 'For going straight ahead, either lane can be used unless road markings direct you otherwise.'
      },
    ]
  },
  {
    id: 2,
    title: 'Stopping Distances',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '2:15',
    thumbnail: '📐',
    color: '#FF9500',
    questions: [
      {
        text: 'In wet conditions, stopping distances:',
        options: ['Stay the same', 'Are halved', 'At least double', 'Only increase slightly'],
        correct: 2,
        explanation: 'In wet weather, stopping distances at least double due to reduced tyre grip on the road surface.'
      },
      {
        text: 'What is the thinking distance at 60 mph?',
        options: ['6 metres', '12 metres', '18 metres', '24 metres'],
        correct: 2,
        explanation: 'At 60 mph the thinking distance is approximately 18 metres (60 feet).'
      },
    ]
  },
  {
    id: 3,
    title: 'Overtaking Safely',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '1:45',
    thumbnail: '🚗',
    color: '#7B61FF',
    questions: [
      {
        text: 'You should NOT overtake when:',
        options: ['On a straight road', 'Approaching a bend or junction', 'On a dual carriageway', 'The road is wide'],
        correct: 1,
        explanation: 'Never overtake when approaching a junction, bend, or where your view of the road ahead is limited.'
      },
    ]
  },
  {
    id: 4,
    title: 'Night Driving',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '2:00',
    thumbnail: '🌙',
    color: '#13C2C2',
    questions: [
      {
        text: 'When should you dip your headlights at night?',
        options: ['Never', 'When following or meeting other vehicles', 'Only in towns', 'Only if asked'],
        correct: 1,
        explanation: 'Dip your headlights when meeting or following other traffic to avoid dazzling other drivers.'
      },
    ]
  },
  {
    id: 5,
    title: 'Emergency Stops',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '1:20',
    thumbnail: '🛑',
    color: '#FF6B6B',
    questions: [
      {
        text: 'During an emergency stop, you should:',
        options: ['Only brake', 'Press the brake and clutch at the same time', 'Brake firmly then clutch just before stopping', 'Steer first then brake'],
        correct: 2,
        explanation: 'Brake firmly first. Press the clutch just before the car stops to prevent stalling.'
      },
    ]
  },
  {
    id: 6,
    title: 'Motorway Joining',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '1:55',
    thumbnail: '🛣️',
    color: '#34C759',
    questions: [
      {
        text: 'How should you join a motorway from a slip road?',
        options: ['Stop and wait for a gap', 'Match the speed of motorway traffic', 'Drive at 30 mph then accelerate', 'Flash headlights to warn'],
        correct: 1,
        explanation: 'Build up your speed on the slip road to match motorway traffic, then merge safely when there is a gap.'
      },
    ]
  },
];

/* ─── Achievements ─── */
export const ACHIEVEMENTS = [
  { id: 1, name: 'Early Bird',    icon: '☀️', description: 'Practice 5 days before 8 AM',         unlocked: true },
  { id: 2, name: 'Perfect Score', icon: '🎯', description: 'Get 50/50 in a Mock Test',            unlocked: false },
  { id: 3, name: 'Road Expert',   icon: '🏆', description: 'Complete all topics',                 unlocked: false },
  { id: 4, name: 'Fast Learner',  icon: '⚡', description: 'Answer 20 questions correctly in a row', unlocked: true },
];

/* ─── Subscription Plans ─── */
export const PLANS = [
  { id: 1, name: 'Free',     price: '$0',     period: 'Forever',   features: ['Daily Practice', 'Limited Mock Tests', 'Ads'] },
  { id: 2, name: 'Pro',      price: '$9.99',  period: 'per month', features: ['All 1,000+ Questions', 'Unlimited Mock Tests', 'No Ads', 'AI Tutor', 'Pass Guarantee'], recommended: true },
  { id: 3, name: 'Lifetime', price: '$49.99', period: 'once',      features: ['Everything in Pro', 'Lifetime Updates', 'Priority Support'] },
];

/* ─── Legacy compat ─── */
export const QUESTIONS = PRACTICE_QUESTIONS.default;
