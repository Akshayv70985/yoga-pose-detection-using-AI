// Ultimate Indian Diet Database - 50+ items with comprehensive nutrition data

const INDIAN_DIET_DATABASE = {
  breakfast: [
    // South Indian (10+ items)
    { name: "Idli (4 pieces)", quantity: "4 pieces (200g)", calories: 240, protein: 8, carbs: 48, fat: 2, region: "South", type: "veg", veg: true, vegan: true, fiber: 4, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Dosa (2 pieces)", quantity: "2 pieces (150g)", calories: 280, protein: 10, carbs: 52, fat: 4, region: "South", type: "veg", veg: true, vegan: true, fiber: 5, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Upma (1 bowl)", quantity: "1 bowl (250g)", calories: 320, protein: 9, carbs: 58, fat: 8, region: "South", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Pesarattu (2 pieces)", quantity: "2 pieces (200g)", calories: 280, protein: 16, carbs: 42, fat: 6, region: "South", type: "veg", veg: true, vegan: true, fiber: 8, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Rava Dosa (1 piece)", quantity: "1 piece (180g)", calories: 320, protein: 8, carbs: 58, fat: 6, region: "South", type: "veg", veg: true, vegan: true, fiber: 4, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Appam (3 pieces)", quantity: "3 pieces (200g)", calories: 260, protein: 7, carbs: 50, fat: 3, region: "South", type: "veg", veg: true, vegan: true, fiber: 3, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Pongal (1 bowl)", quantity: "1 bowl (250g)", calories: 380, protein: 12, carbs: 65, fat: 8, region: "South", type: "veg", veg: true, vegan: true, fiber: 5, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Rava Upma (1 bowl)", quantity: "1 bowl (250g)", calories: 340, protein: 10, carbs: 60, fat: 9, region: "South", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Ven Pongal (1 bowl)", quantity: "1 bowl (250g)", calories: 360, protein: 11, carbs: 62, fat: 7, region: "South", type: "veg", veg: true, vegan: true, fiber: 4, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Uttapam (2 pieces)", quantity: "2 pieces (200g)", calories: 300, protein: 12, carbs: 55, fat: 5, region: "South", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    
    // North Indian (10+ items)
    { name: "Poha (1 bowl)", quantity: "1 bowl (200g)", calories: 240, protein: 6, carbs: 45, fat: 5, region: "North", type: "veg", veg: true, vegan: true, fiber: 4, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Paratha (2 pieces)", quantity: "2 pieces (150g)", calories: 350, protein: 12, carbs: 55, fat: 10, region: "North", type: "veg", veg: true, vegan: false, fiber: 5, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Aloo Paratha (2 pieces)", quantity: "2 pieces (180g)", calories: 420, protein: 14, carbs: 65, fat: 12, region: "North", type: "veg", veg: true, vegan: false, fiber: 6, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Gobi Paratha (2 pieces)", quantity: "2 pieces (180g)", calories: 400, protein: 13, carbs: 62, fat: 11, region: "North", type: "veg", veg: true, vegan: false, fiber: 7, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Thepla (3 pieces)", quantity: "3 pieces (150g)", calories: 330, protein: 11, carbs: 52, fat: 8, region: "West", type: "veg", veg: true, vegan: false, fiber: 6, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Bread Toast (4 slices)", quantity: "4 slices (120g)", calories: 300, protein: 10, carbs: 56, fat: 4, region: "All", type: "veg", veg: true, vegan: false, fiber: 3, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Moong Dal Chilla (2 pieces)", quantity: "2 pieces (150g)", calories: 280, protein: 18, carbs: 38, fat: 6, region: "North", type: "veg", veg: true, vegan: true, fiber: 8, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Besan Chilla (2 pieces)", quantity: "2 pieces (150g)", calories: 300, protein: 16, carbs: 42, fat: 8, region: "North", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    
    // Non-veg Breakfast
    { name: "Egg Bhurji (2 eggs)", quantity: "2 eggs (150g)", calories: 280, protein: 20, carbs: 4, fat: 20, region: "North", type: "non-veg", veg: false, vegan: false, fiber: 0, preference: ["Non-Vegetarian", "Eggetarian"] },
    { name: "Omelette (2 eggs)", quantity: "2 eggs (140g)", calories: 260, protein: 18, carbs: 2, fat: 18, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 0, preference: ["Non-Vegetarian", "Eggetarian"] },
    { name: "Boiled Eggs (2)", quantity: "2 eggs (100g)", calories: 140, protein: 12, carbs: 1, fat: 10, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 0, preference: ["Non-Vegetarian", "Eggetarian"] },
  ],
  
  midMorning: [
    { name: "Fruit Bowl", quantity: "1 bowl (200g)", calories: 120, protein: 2, carbs: 28, fat: 0, region: "All", type: "veg", veg: true, vegan: true, fiber: 5, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Banana (1 piece)", quantity: "1 piece (120g)", calories: 110, protein: 1, carbs: 28, fat: 0, region: "All", type: "veg", veg: true, vegan: true, fiber: 3, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Apple (1 piece)", quantity: "1 piece (180g)", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, region: "All", type: "veg", veg: true, vegan: true, fiber: 4, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Nuts Mix (30g)", quantity: "30g", calories: 180, protein: 6, carbs: 6, fat: 15, region: "All", type: "veg", veg: true, vegan: true, fiber: 3, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Roasted Chana (50g)", quantity: "50g", calories: 180, protein: 9, carbs: 30, fat: 3, region: "All", type: "veg", veg: true, vegan: true, fiber: 8, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Coconut Water (200ml)", quantity: "200ml", calories: 45, protein: 1, carbs: 9, fat: 0, region: "All", type: "veg", veg: true, vegan: true, fiber: 1, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Buttermilk (200ml)", quantity: "200ml", calories: 40, protein: 2, carbs: 5, fat: 1, region: "All", type: "veg", veg: true, vegan: false, fiber: 0, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Sprouts Salad (100g)", quantity: "100g", calories: 80, protein: 7, carbs: 12, fat: 1, region: "All", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Poha Chivda (30g)", quantity: "30g", calories: 120, protein: 3, carbs: 22, fat: 2, region: "North", type: "veg", veg: true, vegan: true, fiber: 2, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Dry Fruits (20g)", quantity: "20g", calories: 130, protein: 4, carbs: 8, fat: 10, region: "All", type: "veg", veg: true, vegan: true, fiber: 2, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Chana Chaat (100g)", quantity: "100g", calories: 150, protein: 8, carbs: 25, fat: 2, region: "All", type: "veg", veg: true, vegan: true, fiber: 7, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Protein Shake (250ml)", quantity: "250ml", calories: 200, protein: 25, carbs: 15, fat: 3, region: "All", type: "veg", veg: true, vegan: false, fiber: 1, preference: ["Vegetarian", "Eggetarian"] },
  ],
  
  lunch: [
    // South Indian
    { name: "Rice + Sambar + Rasam", quantity: "Rice (200g) + Sambar (200ml) + Rasam (150ml)", calories: 480, protein: 16, carbs: 95, fat: 6, region: "South", type: "veg", veg: true, vegan: true, fiber: 12, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Rice + Dal + Vegetables", quantity: "Rice (200g) + Dal (150ml) + Veg (150g)", calories: 520, protein: 18, carbs: 98, fat: 8, region: "All", type: "veg", veg: true, vegan: true, fiber: 14, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Curd Rice", quantity: "1 plate (300g)", calories: 450, protein: 12, carbs: 85, fat: 6, region: "South", type: "veg", veg: true, vegan: false, fiber: 4, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Bisi Bele Bath", quantity: "1 plate (350g)", calories: 520, protein: 16, carbs: 95, fat: 10, region: "South", type: "veg", veg: true, vegan: true, fiber: 11, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    
    // North Indian
    { name: "Chapati (3) + Dal + Sabzi", quantity: "3 chapatis (150g) + Dal (150ml) + Sabzi (200g)", calories: 540, protein: 20, carbs: 88, fat: 10, region: "North", type: "veg", veg: true, vegan: false, fiber: 15, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Rajma Chawal", quantity: "1 plate (350g)", calories: 580, protein: 22, carbs: 95, fat: 10, region: "North", type: "veg", veg: true, vegan: true, fiber: 18, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Chole Bhature (2)", quantity: "2 bhature + Chole (300g)", calories: 720, protein: 18, carbs: 120, fat: 20, region: "North", type: "veg", veg: true, vegan: false, fiber: 14, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Dal Makhani + Naan (2)", quantity: "Dal (200ml) + 2 naans (200g)", calories: 680, protein: 24, carbs: 105, fat: 18, region: "North", type: "veg", veg: true, vegan: false, fiber: 12, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Paneer Butter Masala + Roti (3)", quantity: "Paneer (200g) + 3 rotis (150g)", calories: 720, protein: 32, carbs: 85, fat: 22, region: "North", type: "veg", veg: true, vegan: false, fiber: 8, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Aloo Gobi + Roti (3)", quantity: "Sabzi (250g) + 3 rotis (150g)", calories: 580, protein: 18, carbs: 95, fat: 12, region: "North", type: "veg", veg: true, vegan: false, fiber: 14, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Thali (Veg)", quantity: "1 thali", calories: 650, protein: 22, carbs: 110, fat: 12, region: "All", type: "veg", veg: true, vegan: false, fiber: 16, preference: ["Vegetarian", "Eggetarian"] },
    
    // All Regions
    { name: "Biryani (Veg)", quantity: "1 plate (300g)", calories: 580, protein: 14, carbs: 95, fat: 15, region: "All", type: "veg", veg: true, vegan: false, fiber: 8, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Khichdi", quantity: "1 bowl (300g)", calories: 420, protein: 14, carbs: 75, fat: 8, region: "All", type: "veg", veg: true, vegan: true, fiber: 10, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    
    // Non-veg
    { name: "Chicken Biryani", quantity: "1 plate (350g)", calories: 680, protein: 35, carbs: 85, fat: 18, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 4, preference: ["Non-Vegetarian"] },
    { name: "Chicken Curry + Rice", quantity: "Rice (200g) + Curry (200g)", calories: 620, protein: 38, carbs: 88, fat: 16, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 3, preference: ["Non-Vegetarian"] },
    { name: "Fish Curry + Rice", quantity: "Rice (200g) + Curry (200g)", calories: 550, protein: 32, carbs: 85, fat: 12, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 2, preference: ["Non-Vegetarian"] },
    { name: "Mutton Biryani", quantity: "1 plate (350g)", calories: 750, protein: 40, carbs: 88, fat: 22, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 3, preference: ["Non-Vegetarian"] },
    { name: "Egg Curry + Rice", quantity: "Rice (200g) + Curry (200g)", calories: 520, protein: 28, carbs: 80, fat: 14, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 3, preference: ["Non-Vegetarian", "Eggetarian"] },
  ],
  
  eveningSnack: [
    { name: "Tea + Biscuits (2)", quantity: "Tea (200ml) + 2 biscuits", calories: 120, protein: 2, carbs: 20, fat: 4, region: "All", type: "veg", veg: true, vegan: false, fiber: 1, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Samosa (2 pieces)", quantity: "2 pieces (120g)", calories: 320, protein: 6, carbs: 42, fat: 14, region: "North", type: "veg", veg: true, vegan: false, fiber: 4, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Pakora (4 pieces)", quantity: "4 pieces (100g)", calories: 280, protein: 8, carbs: 32, fat: 12, region: "All", type: "veg", veg: true, vegan: false, fiber: 5, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Dhokla (4 pieces)", quantity: "4 pieces (150g)", calories: 200, protein: 10, carbs: 32, fat: 4, region: "West", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Vada (2 pieces)", quantity: "2 pieces (100g)", calories: 240, protein: 8, carbs: 35, fat: 6, region: "South", type: "veg", veg: true, vegan: true, fiber: 5, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Bhel Puri", quantity: "1 plate (150g)", calories: 280, protein: 6, carbs: 48, fat: 8, region: "West", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Pav Bhaji", quantity: "1 plate (250g)", calories: 420, protein: 12, carbs: 65, fat: 12, region: "West", type: "veg", veg: true, vegan: false, fiber: 10, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Dahi Vada (2 pieces)", quantity: "2 pieces (150g)", calories: 220, protein: 8, carbs: 32, fat: 5, region: "North", type: "veg", veg: true, vegan: false, fiber: 4, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Roasted Peanuts (50g)", quantity: "50g", calories: 280, protein: 14, carbs: 8, fat: 24, region: "All", type: "veg", veg: true, vegan: true, fiber: 5, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Fruit Chat", quantity: "1 bowl (200g)", calories: 140, protein: 2, carbs: 32, fat: 1, region: "All", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Poha (1 bowl)", quantity: "1 bowl (150g)", calories: 180, protein: 4, carbs: 34, fat: 4, region: "North", type: "veg", veg: true, vegan: true, fiber: 3, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Egg Roll", quantity: "1 roll (150g)", calories: 320, protein: 16, carbs: 35, fat: 12, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 2, preference: ["Non-Vegetarian", "Eggetarian"] },
    { name: "Kadhi + Rice", quantity: "Kadhi (200ml) + Rice (150g)", calories: 380, protein: 10, carbs: 70, fat: 8, region: "West", type: "veg", veg: true, vegan: false, fiber: 5, preference: ["Vegetarian", "Eggetarian"] },
  ],
  
  dinner: [
    { name: "Chapati (2) + Dal + Sabzi", quantity: "2 chapatis (100g) + Dal (150ml) + Sabzi (200g)", calories: 420, protein: 18, carbs: 68, fat: 8, region: "North", type: "veg", veg: true, vegan: false, fiber: 12, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Rice + Dal + Vegetables", quantity: "Rice (150g) + Dal (150ml) + Veg (150g)", calories: 450, protein: 16, carbs: 85, fat: 6, region: "All", type: "veg", veg: true, vegan: true, fiber: 11, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Khichdi + Curd", quantity: "1 bowl (300g) + Curd (100g)", calories: 380, protein: 14, carbs: 70, fat: 6, region: "All", type: "veg", veg: true, vegan: false, fiber: 9, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Dosa (2) + Sambar", quantity: "2 dosas (150g) + Sambar (200ml)", calories: 360, protein: 12, carbs: 65, fat: 6, region: "South", type: "veg", veg: true, vegan: true, fiber: 10, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Idli (3) + Sambar", quantity: "3 idlis (150g) + Sambar (200ml)", calories: 280, protein: 10, carbs: 52, fat: 3, region: "South", type: "veg", veg: true, vegan: true, fiber: 8, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Dal Khichdi", quantity: "1 bowl (300g)", calories: 400, protein: 16, carbs: 72, fat: 7, region: "All", type: "veg", veg: true, vegan: true, fiber: 10, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Vegetable Pulao", quantity: "1 plate (300g)", calories: 480, protein: 12, carbs: 88, fat: 10, region: "All", type: "veg", veg: true, vegan: false, fiber: 8, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Roti (2) + Paneer Sabzi", quantity: "2 rotis (100g) + Paneer (150g)", calories: 520, protein: 28, carbs: 55, fat: 18, region: "North", type: "veg", veg: true, vegan: false, fiber: 6, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Moong Dal Khichdi", quantity: "1 bowl (300g)", calories: 380, protein: 18, carbs: 65, fat: 6, region: "All", type: "veg", veg: true, vegan: true, fiber: 12, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Litti Chokha (3 pieces)", quantity: "3 litti (180g) + Chokha (150g)", calories: 450, protein: 16, carbs: 75, fat: 8, region: "East", type: "veg", veg: true, vegan: false, fiber: 10, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Chicken Curry + Roti (2)", quantity: "2 rotis (100g) + Curry (200g)", calories: 580, protein: 42, carbs: 60, fat: 18, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 3, preference: ["Non-Vegetarian"] },
    { name: "Fish Curry + Rice", quantity: "Rice (150g) + Curry (200g)", calories: 480, protein: 32, carbs: 68, fat: 10, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 2, preference: ["Non-Vegetarian"] },
    { name: "Egg Curry + Roti (2)", quantity: "2 rotis (100g) + Curry (200g)", calories: 520, protein: 28, carbs: 58, fat: 16, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 4, preference: ["Non-Vegetarian", "Eggetarian"] },
  ],
  
  proteinBoosters: [
    { name: "Boiled Eggs (2)", quantity: "2 eggs (100g)", calories: 140, protein: 12, carbs: 1, fat: 10, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 0, preference: ["Non-Vegetarian", "Eggetarian"] },
    { name: "Paneer (100g)", quantity: "100g", calories: 260, protein: 18, carbs: 4, fat: 20, region: "All", type: "veg", veg: true, vegan: false, fiber: 0, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Roasted Chana (50g)", quantity: "50g", calories: 180, protein: 9, carbs: 30, fat: 3, region: "All", type: "veg", veg: true, vegan: true, fiber: 8, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Sprouts (100g)", quantity: "100g", calories: 80, protein: 7, carbs: 12, fat: 1, region: "All", type: "veg", veg: true, vegan: true, fiber: 6, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Greek Yogurt (100g)", quantity: "100g", calories: 100, protein: 10, carbs: 4, fat: 3, region: "All", type: "veg", veg: true, vegan: false, fiber: 0, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Protein Shake (250ml)", quantity: "250ml", calories: 200, protein: 25, carbs: 15, fat: 3, region: "All", type: "veg", veg: true, vegan: false, fiber: 1, preference: ["Vegetarian", "Eggetarian"] },
    { name: "Chicken Breast (100g)", quantity: "100g", calories: 165, protein: 31, carbs: 0, fat: 3.6, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 0, preference: ["Non-Vegetarian"] },
    { name: "Fish (100g)", quantity: "100g", calories: 120, protein: 20, carbs: 0, fat: 4, region: "All", type: "non-veg", veg: false, vegan: false, fiber: 0, preference: ["Non-Vegetarian"] },
    { name: "Almonds (30g)", quantity: "30g", calories: 170, protein: 6, carbs: 6, fat: 15, region: "All", type: "veg", veg: true, vegan: true, fiber: 3, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
    { name: "Peanut Butter (30g)", quantity: "30g", calories: 180, protein: 7, carbs: 6, fat: 15, region: "All", type: "veg", veg: true, vegan: true, fiber: 2, preference: ["Vegetarian", "Vegan", "Eggetarian"] },
  ]
};

// Activity level multipliers
const ACTIVITY_MULTIPLIERS = {
  "Sedentary": 1.2,      // Little to no exercise
  "Lightly Active": 1.375, // Light exercise 1-3 days/week
  "Moderately Active": 1.55, // Moderate exercise 3-5 days/week
  "Very Active": 1.725,   // Hard exercise 6-7 days/week
  "Extremely Active": 1.9 // Very hard exercise, physical job
};

// Helper function to filter meals by dietary preference
function filterByDietaryPreference(meals, preference) {
  if (preference === "Vegetarian") {
    return meals.filter(m => m.veg === true);
  } else if (preference === "Vegan") {
    return meals.filter(m => m.vegan === true);
  } else if (preference === "Eggetarian") {
    return meals.filter(m => m.veg === true || m.name.toLowerCase().includes("egg"));
  } else { // Non-Vegetarian
    return meals;
  }
}

// Helper function to get random meal from category
function getRandomMeal(category, dietaryPreference, goal = "General Fitness") {
  let availableMeals = filterByDietaryPreference(INDIAN_DIET_DATABASE[category] || [], dietaryPreference);
  
  if (availableMeals.length === 0) {
    availableMeals = INDIAN_DIET_DATABASE[category] || [];
  }
  
  // Goal-based filtering
  if (goal === "Weight Loss") {
    availableMeals = availableMeals.filter(m => m.calories <= 400 || m.fiber >= 5);
  } else if (goal === "Weight Gain") {
    availableMeals = availableMeals.filter(m => m.calories >= 300);
  } else if (goal === "Muscle Gain") {
    availableMeals = availableMeals.filter(m => m.protein >= 10);
  } else if (goal === "Yoga Lifestyle") {
    availableMeals = availableMeals.filter(m => 
      !m.name.toLowerCase().includes("chicken") && 
      !m.name.toLowerCase().includes("mutton") &&
      !m.name.toLowerCase().includes("fish") &&
      m.calories <= 500
    );
  }
  
  if (availableMeals.length === 0) {
    availableMeals = INDIAN_DIET_DATABASE[category] || [];
  }
  
  return availableMeals[Math.floor(Math.random() * availableMeals.length)];
}

// Calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(age, gender, height, weight) {
  if (gender === "Male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Calculate TDEE with activity level
function calculateTDEE(bmr, goal, activityLevel = "Moderately Active") {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = bmr * multiplier;
  
  // Adjust based on goal
  if (goal === "Weight Loss") {
    return tdee * 0.75; // 25% calorie reduction
  } else if (goal === "Weight Gain") {
    return tdee * 1.25; // 25% calorie increase
  } else if (goal === "Muscle Gain") {
    return tdee * 1.15; // 15% calorie increase with focus on protein
  } else {
    return tdee; // General Fitness and Yoga Lifestyle
  }
}

// Calculate ideal macro targets
function calculateIdealMacros(dailyCalories, weight, goal) {
  let proteinTarget, fatTarget, carbTarget;
  
  // Protein: 1.2-1.8g per kg body weight
  if (goal === "Muscle Gain") {
    proteinTarget = weight * 1.8; // Higher for muscle gain
  } else if (goal === "Weight Loss") {
    proteinTarget = weight * 1.6; // Higher to preserve muscle
  } else {
    proteinTarget = weight * 1.4; // Standard
  }
  
  const proteinCalories = proteinTarget * 4; // 4 cal per gram
  
  // Fat: 25-35% of calories
  const fatPercentage = goal === "Weight Loss" ? 0.25 : 0.30;
  const fatCalories = dailyCalories * fatPercentage;
  fatTarget = fatCalories / 9; // 9 cal per gram
  
  // Carbs: remaining calories
  const carbCalories = dailyCalories - proteinCalories - fatCalories;
  carbTarget = carbCalories / 4; // 4 cal per gram
  
  return {
    protein: Math.round(proteinTarget),
    carbs: Math.round(carbTarget),
    fats: Math.round(fatTarget)
  };
}

// Analyze macro balance
function analyzeMacroBalance(actualMacros, idealMacros) {
  const proteinDiff = ((actualMacros.protein - idealMacros.protein) / idealMacros.protein) * 100;
  const carbDiff = ((actualMacros.carbs - idealMacros.carbs) / idealMacros.carbs) * 100;
  const fatDiff = ((actualMacros.fats - idealMacros.fats) / idealMacros.fats) * 100;
  
  let remark = "Balanced";
  
  if (proteinDiff < -15) {
    remark = "Low Protein";
  } else if (proteinDiff > 20) {
    remark = "High Protein";
  }
  
  if (carbDiff > 20) {
    remark = remark === "Balanced" ? "High Carb" : remark + " / High Carb";
  } else if (carbDiff < -20) {
    remark = remark === "Balanced" ? "Low Carb" : remark + " / Low Carb";
  }
  
  if (fatDiff > 25) {
    remark = remark === "Balanced" ? "High Fat" : remark + " / High Fat";
  } else if (fatDiff < -25) {
    remark = remark === "Balanced" ? "Low Fat" : remark + " / Low Fat";
  }
  
  return {
    remark,
    proteinDiff: Math.round(proteinDiff),
    carbDiff: Math.round(carbDiff),
    fatDiff: Math.round(fatDiff)
  };
}

// Calculate meal score (0-100)
function calculateMealScore(meal, idealMacros, mealType) {
  let score = 50; // Base score
  
  // Protein adequacy (30 points)
  const proteinRatio = meal.protein / (idealMacros.protein / 5); // Assuming 5 meals
  if (proteinRatio >= 0.8 && proteinRatio <= 1.2) {
    score += 30;
  } else if (proteinRatio >= 0.6 && proteinRatio < 0.8) {
    score += 20;
  } else if (proteinRatio >= 0.4) {
    score += 10;
  }
  
  // Fiber content (20 points)
  if (meal.fiber >= 5) {
    score += 20;
  } else if (meal.fiber >= 3) {
    score += 10;
  }
  
  // Healthy fats (15 points)
  const fatRatio = meal.fat / (meal.calories / 9);
  if (fatRatio >= 0.2 && fatRatio <= 0.35) {
    score += 15;
  } else if (fatRatio >= 0.15) {
    score += 8;
  }
  
  // Low oil/processed (15 points)
  if (!meal.name.toLowerCase().includes("fried") && 
      !meal.name.toLowerCase().includes("bhature") &&
      meal.calories < 600) {
    score += 15;
  } else if (meal.calories < 700) {
    score += 8;
  }
  
  // Calorie appropriateness (20 points)
  const idealMealCalories = idealMacros.protein * 4 + idealMacros.carbs * 4 + idealMacros.fats * 9;
  const calorieRatio = meal.calories / (idealMealCalories / 5);
  if (calorieRatio >= 0.8 && calorieRatio <= 1.2) {
    score += 20;
  } else if (calorieRatio >= 0.6 && calorieRatio <= 1.4) {
    score += 10;
  }
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

// Scale meal based on goal with smart portion scaling
function scaleMeal(meal, goal, baseCalories, targetCalories) {
  let scaledMeal = { ...meal };
  
  if (goal === "Weight Loss") {
    // 20-30% smaller portions
    const reduction = 0.75; // 25% reduction
    scaledMeal.calories = Math.round(meal.calories * reduction);
    scaledMeal.protein = Math.round(meal.protein * 0.85);
    scaledMeal.carbs = Math.round(meal.carbs * 0.80);
    scaledMeal.fat = Math.round(meal.fat * 0.70);
    scaledMeal.fiber = Math.round((meal.fiber || 0) * 0.90);
  } else if (goal === "Weight Gain") {
    // 20-40% larger portions
    const increase = 1.30; // 30% increase
    scaledMeal.calories = Math.round(meal.calories * increase);
    scaledMeal.protein = Math.round(meal.protein * 1.15);
    scaledMeal.carbs = Math.round(meal.carbs * 1.30);
    scaledMeal.fat = Math.round(meal.fat * 1.35);
    scaledMeal.fiber = Math.round((meal.fiber || 0) * 1.10);
  } else if (goal === "Muscle Gain") {
    // Increase protein portion first
    if (meal.protein < 25) {
      const proteinMultiplier = 30 / meal.protein;
      scaledMeal.protein = Math.round(meal.protein * proteinMultiplier);
      scaledMeal.calories = Math.round(meal.calories * (1 + (proteinMultiplier - 1) * 0.4));
      scaledMeal.carbs = Math.round(meal.carbs * 1.15);
      scaledMeal.fat = Math.round(meal.fat * 1.10);
    } else {
      scaledMeal.calories = Math.round(meal.calories * 1.20);
      scaledMeal.protein = Math.round(meal.protein * 1.20);
      scaledMeal.carbs = Math.round(meal.carbs * 1.15);
      scaledMeal.fat = Math.round(meal.fat * 1.10);
    }
    scaledMeal.fiber = Math.round((meal.fiber || 0) * 1.05);
  } else if (goal === "Yoga Lifestyle") {
    // Sattvic, low-spice, light foods
    scaledMeal.calories = Math.round(meal.calories * 0.95);
    scaledMeal.fat = Math.round(meal.fat * 0.85);
    scaledMeal.fiber = Math.round((meal.fiber || 0) * 1.05);
  }
  
  return scaledMeal;
}

// Generate hydration and supplement advice
function generateHydrationAndSupplements(weight, goal, dietaryPreference) {
  const waterIntake = (weight * 0.04).toFixed(1); // 40ml per kg
  
  const advice = {
    water: `${waterIntake}L daily`,
    electrolytes: goal === "Weight Loss" || goal === "Muscle Gain" ? "Add electrolytes after workouts" : "Include natural electrolytes (coconut water, buttermilk)",
    supplements: []
  };
  
  if (dietaryPreference === "Vegetarian" || dietaryPreference === "Vegan") {
    advice.supplements.push("Vitamin B12: 2.4mcg daily (essential for vegetarians)");
    advice.supplements.push("Vitamin D3: 1000-2000 IU daily (especially in winter)");
    if (dietaryPreference === "Vegan") {
      advice.supplements.push("Omega-3: Consider algae-based supplement");
    }
  }
  
  if (goal === "Muscle Gain") {
    advice.supplements.push("Whey Protein or Plant Protein: 20-30g post-workout");
    advice.supplements.push("Creatine: 3-5g daily (optional)");
  }
  
  if (goal === "Weight Loss") {
    advice.supplements.push("Green Tea Extract: May aid metabolism");
  }
  
  return advice;
}

// Generate personalized tips
function generateTips(userData, dailyCalories, macros, meals, macroBalance) {
  const tips = [];
  const { goal, dietaryPreference } = userData;
  
  // Macro balance tips
  if (macroBalance.remark !== "Balanced") {
    tips.push(`Macro Balance: ${macroBalance.remark} - Adjust your meal portions accordingly`);
  }
  
  // Goal-based tips
  if (goal === "Weight Loss") {
    tips.push("Drink 3-4 liters of water daily to boost metabolism");
    tips.push("Avoid heavy dinner after 8 PM for better digestion");
    tips.push("Include 15 minutes of Pranayama in the morning for better metabolism");
    if (macros.protein < 60) {
      tips.push("Increase protein intake to maintain muscle mass during weight loss");
    }
  } else if (goal === "Weight Gain") {
    tips.push("Have calorie-dense snacks between meals (nuts, dry fruits)");
    tips.push("Include protein shakes or smoothies for extra calories");
    tips.push("Eat every 2-3 hours to meet calorie goals");
  } else if (goal === "Muscle Gain") {
    tips.push("Consume protein within 30 minutes post-workout");
    tips.push("Ensure 25-35g protein per meal for optimal muscle synthesis");
    tips.push("Stay hydrated - aim for 3.5-4 liters of water daily");
    tips.push("Include complex carbs for sustained energy");
  } else if (goal === "Yoga Lifestyle") {
    tips.push("Practice Surya Namaskar in the morning for better digestion");
    tips.push("Add 15 minutes of Pranayama for improved metabolism");
    tips.push("Eat light, sattvic foods 2 hours before yoga practice");
    tips.push("Avoid heavy, spicy foods in the evening");
  } else {
    tips.push("Maintain a balanced diet with all macronutrients");
    tips.push("Stay hydrated throughout the day");
    tips.push("Include 30 minutes of physical activity daily");
  }
  
  // Protein-based tips
  const totalProtein = macros.protein;
  if (totalProtein > 100) {
    tips.push("High protein diet detected - increase water intake to 4L for kidney health");
  }
  
  // Meal timing tips
  tips.push("Have breakfast within 1 hour of waking up");
  tips.push("Keep 3-4 hour gaps between main meals");
  tips.push("Evening snack should be light and consumed 2 hours before dinner");
  
  // Dietary preference tips
  if (dietaryPreference === "Vegetarian" || dietaryPreference === "Vegan") {
    tips.push("Combine dal and rice for complete protein profile");
    tips.push("Include iron-rich foods like spinach, lentils with Vitamin C sources");
  }
  
  return tips;
}

// Generate yoga recommendations with icons
function generateYogaRecommendations(goal) {
  const recommendations = [];
  
  if (goal === "Weight Loss") {
    recommendations.push({ name: "Surya Namaskar (Sun Salutation)", rounds: "12 rounds daily", benefit: "Full body workout, metabolism boost", icon: "🌅" });
    recommendations.push({ name: "Kapalbhati Pranayama", duration: "5 minutes", benefit: "Metabolism boost, fat burning", icon: "💨" });
    recommendations.push({ name: "Bhastrika Pranayama", duration: "3 minutes", benefit: "Fat burning, energy boost", icon: "🔥" });
    recommendations.push({ name: "Vajrasana", timing: "After meals", benefit: "Better digestion", icon: "🧘" });
  } else if (goal === "Weight Gain") {
    recommendations.push({ name: "Surya Namaskar", rounds: "6 rounds", benefit: "Appetite stimulation", icon: "🌅" });
    recommendations.push({ name: "Pawanmuktasana", benefit: "Digestion improvement", icon: "🌀" });
    recommendations.push({ name: "Bhujangasana (Cobra Pose)", benefit: "Metabolism boost", icon: "🐍" });
  } else if (goal === "Muscle Gain") {
    recommendations.push({ name: "Surya Namaskar", rounds: "12 rounds", benefit: "Full body strength", icon: "🌅" });
    recommendations.push({ name: "Virabhadrasana (Warrior Poses)", benefit: "Leg strength", icon: "⚔️" });
    recommendations.push({ name: "Chaturanga Dandasana", benefit: "Core and arm strength", icon: "💪" });
    recommendations.push({ name: "Savasana", benefit: "Muscle recovery", icon: "😌" });
  } else if (goal === "Yoga Lifestyle") {
    recommendations.push({ name: "Surya Namaskar", rounds: "12 rounds", timing: "Morning", icon: "🌅" });
    recommendations.push({ name: "Anulom Vilom Pranayama", duration: "10 minutes", icon: "🧘" });
    recommendations.push({ name: "Meditation", duration: "15-20 minutes daily", icon: "🧘‍♀️" });
    recommendations.push({ name: "Gentle Stretches + Savasana", timing: "Evening", icon: "🌙" });
  } else {
    recommendations.push({ name: "Surya Namaskar", rounds: "6 rounds", benefit: "Overall fitness", icon: "🌅" });
    recommendations.push({ name: "Basic Asanas", poses: "Tadasana, Vrikshasana, Trikonasana", icon: "🌳" });
    recommendations.push({ name: "Pranayama", duration: "5-10 minutes daily", icon: "💨" });
    recommendations.push({ name: "Savasana", benefit: "Relaxation", icon: "😌" });
  }
  
  return recommendations;
}

// Calculate fiber suggestion
function calculateFiberSuggestion(meals) {
  let totalFiber = 0;
  Object.values(meals).forEach(meal => {
    totalFiber += meal.fiber || 0;
  });
  
  const recommended = 28;
  const suggestion = Math.max(0, recommended - totalFiber);
  
  return {
    current: Math.round(totalFiber),
    recommended: recommended,
    suggestion: suggestion > 0 ? `Add ${suggestion}g more fiber through fruits and vegetables` : "Fiber intake is adequate"
  };
}

// Generate meal timing recommendations
function generateMealTiming() {
  return {
    breakfast: "7:00 AM - 8:00 AM",
    midMorning: "10:00 AM - 11:00 AM",
    lunch: "12:30 PM - 1:30 PM",
    eveningSnack: "4:00 PM - 5:00 PM",
    dinner: "7:00 PM - 8:00 PM"
  };
}

// Main function to generate diet plan
export function generateDietPlan(userData) {
  const { age, gender, height, weight, goal, dietaryPreference, activityLevel = "Moderately Active" } = userData;
  
  // Calculate BMR and TDEE
  const bmr = calculateBMR(age, gender, height, weight);
  const targetCalories = calculateTDEE(bmr, goal, activityLevel);
  const idealMacros = calculateIdealMacros(targetCalories, weight, goal);
  
  // Generate meals
  const breakfast = getRandomMeal("breakfast", dietaryPreference, goal);
  const midMorning = getRandomMeal("midMorning", dietaryPreference, goal);
  const lunch = getRandomMeal("lunch", dietaryPreference, goal);
  const eveningSnack = getRandomMeal("eveningSnack", dietaryPreference, goal);
  const dinner = getRandomMeal("dinner", dietaryPreference, goal);
  
  // Scale meals based on goal
  const baseCalories = breakfast.calories + midMorning.calories + lunch.calories + eveningSnack.calories + dinner.calories;
  const scaledBreakfast = scaleMeal(breakfast, goal, baseCalories, targetCalories);
  const scaledMidMorning = scaleMeal(midMorning, goal, baseCalories, targetCalories);
  const scaledLunch = scaleMeal(lunch, goal, baseCalories, targetCalories);
  const scaledEveningSnack = scaleMeal(eveningSnack, goal, baseCalories, targetCalories);
  const scaledDinner = scaleMeal(dinner, goal, baseCalories, targetCalories);
  
  // Calculate totals
  const dailyCalories = scaledBreakfast.calories + scaledMidMorning.calories + scaledLunch.calories + scaledEveningSnack.calories + scaledDinner.calories;
  const totalProtein = scaledBreakfast.protein + scaledMidMorning.protein + scaledLunch.protein + scaledEveningSnack.protein + scaledDinner.protein;
  const totalCarbs = scaledBreakfast.carbs + scaledMidMorning.carbs + scaledLunch.carbs + scaledEveningSnack.carbs + scaledDinner.carbs;
  const totalFats = scaledBreakfast.fat + scaledMidMorning.fat + scaledLunch.fat + scaledEveningSnack.fat + scaledDinner.fat;
  
  const actualMacros = {
    protein: Math.round(totalProtein),
    carbs: Math.round(totalCarbs),
    fats: Math.round(totalFats)
  };
  
  // Analyze macro balance
  const macroBalance = analyzeMacroBalance(actualMacros, idealMacros);
  
  // Calculate meal scores
  const mealScores = {
    breakfast: calculateMealScore(scaledBreakfast, idealMacros, "breakfast"),
    midMorning: calculateMealScore(scaledMidMorning, idealMacros, "snack"),
    lunch: calculateMealScore(scaledLunch, idealMacros, "lunch"),
    eveningSnack: calculateMealScore(scaledEveningSnack, idealMacros, "snack"),
    dinner: calculateMealScore(scaledDinner, idealMacros, "dinner")
  };
  
  // Generate additional information
  const hydrationSupplements = generateHydrationAndSupplements(weight, goal, dietaryPreference);
  const fiberInfo = calculateFiberSuggestion({
    breakfast: scaledBreakfast,
    midMorning: scaledMidMorning,
    lunch: scaledLunch,
    eveningSnack: scaledEveningSnack,
    dinner: scaledDinner
  });
  const mealTiming = generateMealTiming();
  const tips = generateTips(userData, dailyCalories, actualMacros, {
    breakfast: scaledBreakfast,
    midMorning: scaledMidMorning,
    lunch: scaledLunch,
    eveningSnack: scaledEveningSnack,
    dinner: scaledDinner
  }, macroBalance);
  const yogaRecommendations = generateYogaRecommendations(goal);
  
  return {
    userData,
    dailyCalories: Math.round(dailyCalories),
    idealMacros,
    macros: actualMacros,
    macroBalance,
    mealScores,
    waterIntake: hydrationSupplements.water,
    hydrationSupplements,
    fiber: fiberInfo,
    mealTiming,
    meals: {
      breakfast: scaledBreakfast,
      midMorning: scaledMidMorning,
      lunch: scaledLunch,
      eveningSnack: scaledEveningSnack,
      dinner: scaledDinner
    },
    tips,
    yogaRecommendations,
    generatedAt: new Date().toISOString()
  };
}

// Function to swap a meal
export function swapMeal(category, dietaryPreference, goal, currentMeal) {
  let newMeal;
  let attempts = 0;
  do {
    newMeal = getRandomMeal(category, dietaryPreference, goal);
    attempts++;
  } while (newMeal.name === currentMeal.name && attempts < 10);
  
  return newMeal;
}

// Function to increase protein in a meal
export function increaseProtein(meal, dietaryPreference) {
  const boosters = filterByDietaryPreference(INDIAN_DIET_DATABASE.proteinBoosters || [], dietaryPreference);
  if (boosters.length === 0) return meal;
  
  const booster = boosters[Math.floor(Math.random() * boosters.length)];
  
  return {
    ...meal,
    name: `${meal.name} + ${booster.name}`,
    quantity: `${meal.quantity} + ${booster.quantity}`,
    calories: meal.calories + booster.calories,
    protein: meal.protein + booster.protein,
    carbs: meal.carbs + booster.carbs,
    fat: meal.fat + booster.fat,
    fiber: (meal.fiber || 0) + (booster.fiber || 0)
  };
}

// Function to create low-calorie version
export function createLowCalorieVersion(meal) {
  return {
    ...meal,
    calories: Math.round(meal.calories * 0.75),
    protein: Math.round(meal.protein * 0.90),
    carbs: Math.round(meal.carbs * 0.70),
    fat: Math.round(meal.fat * 0.60),
    fiber: Math.round((meal.fiber || 0) * 1.10)
  };
}

// Function to generate weekly diet plan
export function generateWeeklyDietPlan(userData) {
  const weeklyPlan = [];
  for (let day = 0; day < 7; day++) {
    weeklyPlan.push(generateDietPlan(userData));
  }
  return weeklyPlan;
}
