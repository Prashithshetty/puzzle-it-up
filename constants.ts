
export const COLORS = {
  primary: {
    skyBlue: '#00BFFF', // Trusting, calming
    coral: '#FF6F61',   // Energizing, inviting
    yellow: '#FFD166',  // Happiness, focus
    green: '#06D6A0',   // Playful, fresh
    lavender: '#B388EB',// Imaginative, soft
  },
  background: {
    softCream: '#FFF8E7',
    mintMist: '#E6FFF2',
    skyCloud: '#F5FAFF',
  },
  feedback: {
    correct: '#90EE90', // Light Green
    incorrect: '#FFB6C1', // Light Pink
  },
  text: {
    dark: '#333333',
    light: '#FFFFFF',
  },
};

// A cycle of colors for buttons to make quizzes more visually engaging
export const PRIMARY_COLORS_CYCLE = [
  COLORS.primary.skyBlue,
  COLORS.primary.coral,
  COLORS.primary.yellow,
  COLORS.primary.green,
];
