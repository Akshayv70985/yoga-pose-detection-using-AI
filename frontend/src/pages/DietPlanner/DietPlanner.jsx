import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { generateDietPlan, swapMeal, generateWeeklyDietPlan, increaseProtein, createLowCalorieVersion } from '../../utils/dietPlannerLogic';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DietPlanner.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DietPlanner() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    goal: 'General Fitness',
    dietaryPreference: 'Vegetarian',
    activityLevel: 'Moderately Active'
  });

  const [dietPlan, setDietPlan] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [planType, setPlanType] = useState('daily'); // 'daily' or 'weekly'
  const resultsRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    setMounted(true);
    // Load last saved plan from localStorage
    const savedPlan = localStorage.getItem('lastDietPlan');
    if (savedPlan) {
      try {
        setDietPlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error('Error loading saved plan:', e);
      }
    }
    // Load saved plans history
    loadSavedPlans();
  }, []);

  const loadSavedPlans = () => {
    try {
      const saved = localStorage.getItem('dietHistory');
      if (saved) {
        setSavedPlans(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading saved plans:', e);
    }
  };

  const savePlanToHistory = (plan) => {
    try {
      const history = savedPlans.length > 0 ? savedPlans : [];
      const newPlan = {
        ...plan,
        savedAt: new Date().toISOString(),
        id: Date.now()
      };
      const updatedHistory = [newPlan, ...history].slice(0, 10); // Keep last 10 plans
      setSavedPlans(updatedHistory);
      localStorage.setItem('dietHistory', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error saving plan:', e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.age || !formData.height || !formData.weight) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.age < 10 || formData.age > 100) {
      alert('Please enter a valid age (10-100)');
      return;
    }

    if (formData.height < 100 || formData.height > 250) {
      alert('Please enter a valid height in cm (100-250)');
      return;
    }

    if (formData.weight < 30 || formData.weight > 200) {
      alert('Please enter a valid weight in kg (30-200)');
      return;
    }

    setIsGenerating(true);
    
    // Simulate loading animation (1-2 seconds)
    setTimeout(() => {
      if (planType === 'weekly') {
        const weekly = generateWeeklyDietPlan({
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          goal: formData.goal,
          dietaryPreference: formData.dietaryPreference,
          activityLevel: formData.activityLevel
        });
        setWeeklyPlan(weekly);
        setDietPlan(null);
      } else {
        const plan = generateDietPlan({
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          goal: formData.goal,
          dietaryPreference: formData.dietaryPreference,
          activityLevel: formData.activityLevel
        });

        setDietPlan(plan);
        setWeeklyPlan(null);
        
        // Save to localStorage
        localStorage.setItem('lastDietPlan', JSON.stringify(plan));
        savePlanToHistory(plan);
      }
      
      setIsGenerating(false);
      
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1500);
  };

  const handleRegenerate = () => {
    handleSubmit({ preventDefault: () => {} });
  };

  const handleSwapMeal = (categoryKey) => {
    if (!dietPlan || !dietPlan.meals) return;
    
    const currentMeal = dietPlan.meals[categoryKey];
    if (!currentMeal) return;
    
    const newMeal = swapMeal(categoryKey, formData.dietaryPreference, formData.goal, currentMeal);
    if (!newMeal) return;
    
    // Recalculate totals
    const updatedMeals = { ...dietPlan.meals, [categoryKey]: newMeal };
    const dailyCalories = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.calories || 0), 0);
    const totalProtein = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.protein || 0), 0);
    const totalCarbs = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.carbs || 0), 0);
    const totalFats = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.fat || 0), 0);
    
    const updatedPlan = {
      ...dietPlan,
      meals: updatedMeals,
      dailyCalories: Math.round(dailyCalories),
      macros: {
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats)
      }
    };
    
    setDietPlan(updatedPlan);
    localStorage.setItem('lastDietPlan', JSON.stringify(updatedPlan));
  };

  const handleIncreaseProtein = (categoryKey) => {
    if (!dietPlan || !dietPlan.meals) return;
    
    const currentMeal = dietPlan.meals[categoryKey];
    if (!currentMeal) return;
    
    const boostedMeal = increaseProtein(currentMeal, formData.dietaryPreference);
    
    // Recalculate totals
    const updatedMeals = { ...dietPlan.meals, [categoryKey]: boostedMeal };
    const dailyCalories = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.calories || 0), 0);
    const totalProtein = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.protein || 0), 0);
    const totalCarbs = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.carbs || 0), 0);
    const totalFats = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.fat || 0), 0);
    
    const updatedPlan = {
      ...dietPlan,
      meals: updatedMeals,
      dailyCalories: Math.round(dailyCalories),
      macros: {
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats)
      }
    };
    
    setDietPlan(updatedPlan);
    localStorage.setItem('lastDietPlan', JSON.stringify(updatedPlan));
  };

  const handleLowCalorieVersion = (categoryKey) => {
    if (!dietPlan || !dietPlan.meals) return;
    
    const currentMeal = dietPlan.meals[categoryKey];
    if (!currentMeal) return;
    
    const lowCalMeal = createLowCalorieVersion(currentMeal);
    
    // Recalculate totals
    const updatedMeals = { ...dietPlan.meals, [categoryKey]: lowCalMeal };
    const dailyCalories = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.calories || 0), 0);
    const totalProtein = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.protein || 0), 0);
    const totalCarbs = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.carbs || 0), 0);
    const totalFats = Object.values(updatedMeals).reduce((sum, meal) => sum + (meal?.fat || 0), 0);
    
    const updatedPlan = {
      ...dietPlan,
      meals: updatedMeals,
      dailyCalories: Math.round(dailyCalories),
      macros: {
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats)
      }
    };
    
    setDietPlan(updatedPlan);
    localStorage.setItem('lastDietPlan', JSON.stringify(updatedPlan));
  };

  const handleVoiceOutput = () => {
    if (!dietPlan) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      let text = `Your personalized diet plan for ${dietPlan.userData.goal}. `;
      text += `Total calories: ${dietPlan.dailyCalories}. `;
      text += `Protein: ${dietPlan.macros.protein} grams. `;
      text += `Carbs: ${dietPlan.macros.carbs} grams. `;
      text += `Fats: ${dietPlan.macros.fats} grams. `;
      text += `Breakfast: ${dietPlan.meals.breakfast.name}. `;
      text += `Lunch: ${dietPlan.meals.lunch.name}. `;
      text += `Dinner: ${dietPlan.meals.dinner.name}. `;
      text += `Water intake: ${dietPlan.waterIntake} liters daily.`;
      
      utterance.text = text;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis not supported in your browser');
    }
  };

  const handleLoadSavedPlan = (plan) => {
    setDietPlan(plan);
    setWeeklyPlan(null);
    setShowSavedPlans(false);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDeleteSavedPlan = (id) => {
    const updated = savedPlans.filter(p => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem('dietHistory', JSON.stringify(updated));
  };

  const handleDownloadPDF = () => {
    if (!dietPlan) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    // Header with gradient effect (simulated with colored text)
    doc.setFontSize(24);
    doc.setTextColor(102, 126, 234);
    doc.text('YogaIntelliJ', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    doc.setFontSize(18);
    doc.setTextColor(118, 75, 162);
    doc.text('Diet Plan', pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;

    // User Info
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Age: ${dietPlan.userData.age} | Gender: ${dietPlan.userData.gender} | Height: ${dietPlan.userData.height}cm | Weight: ${dietPlan.userData.weight}kg`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;
    doc.text(`Goal: ${dietPlan.userData.goal} | Dietary Preference: ${dietPlan.userData.dietaryPreference}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;

    // Daily Summary with colored boxes
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('📊 Daily Summary', 20, yPos);
    yPos += 8;
    
    // Summary box
    doc.setFillColor(102, 126, 234);
    doc.roundedRect(20, yPos - 2, pageWidth - 40, 30, 3, 3, 'S');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Calories: ${dietPlan.dailyCalories} kcal`, 25, yPos + 5);
    doc.text(`Protein: ${dietPlan.macros.protein}g | Carbs: ${dietPlan.macros.carbs}g | Fats: ${dietPlan.macros.fats}g`, 25, yPos + 12);
    const fiberText = dietPlan.fiber ? `Fiber: ${dietPlan.fiber.current}g/${dietPlan.fiber.recommended}g` : 'Fiber: N/A';
    doc.text(`Water Intake: ${dietPlan.waterIntake || 'N/A'}L | ${fiberText}`, 25, yPos + 19);
    yPos += 35;

    // Meal Timing
    if (dietPlan.mealTiming) {
      doc.setFontSize(14);
      doc.setTextColor(102, 126, 234);
      doc.text('⏰ Meal Timing Recommendations', 20, yPos);
      yPos += 8;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Breakfast: ${dietPlan.mealTiming.breakfast}`, 25, yPos);
      yPos += 6;
      doc.text(`Mid-Morning: ${dietPlan.mealTiming.midMorning}`, 25, yPos);
      yPos += 6;
      doc.text(`Lunch: ${dietPlan.mealTiming.lunch}`, 25, yPos);
      yPos += 6;
      doc.text(`Evening Snack: ${dietPlan.mealTiming.eveningSnack}`, 25, yPos);
      yPos += 6;
      doc.text(`Dinner: ${dietPlan.mealTiming.dinner}`, 25, yPos);
      yPos += 10;
    }

    // Meals
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('🍽️ Meal Plan', 20, yPos);
    yPos += 8;

    const meals = [
      { name: '🌅 Breakfast', meal: dietPlan.meals?.breakfast },
      { name: '☕ Mid-Morning Snack', meal: dietPlan.meals?.midMorning },
      { name: '🍱 Lunch', meal: dietPlan.meals?.lunch },
      { name: '🥗 Evening Snack', meal: dietPlan.meals?.eveningSnack },
      { name: '🌙 Dinner', meal: dietPlan.meals?.dinner }
    ].filter(item => item.meal); // Filter out undefined meals

    meals.forEach(({ name, meal }) => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }
      
      // Meal header with color
      doc.setFontSize(12);
      doc.setTextColor(102, 126, 234);
      doc.text(`${name}:`, 20, yPos);
      yPos += 7;
      
      // Meal details in a box
      if (meal) {
        doc.setDrawColor(200, 200, 200);
        doc.roundedRect(20, yPos - 2, pageWidth - 40, 20, 2, 2, 'S');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`${meal.name || 'N/A'} (${meal.quantity || ''})`, 25, yPos + 5);
        doc.text(`${meal.calories || 0} kcal | P: ${meal.protein || 0}g | C: ${meal.carbs || 0}g | F: ${meal.fat || 0}g`, 25, yPos + 12);
        yPos += 25;
      }
    });

    // Yoga Recommendations
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('🧘 Yoga Recommendations', 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    (dietPlan.yogaRecommendations || []).forEach((rec, index) => {
      if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
      }
      let recText = `${index + 1}. ${rec.name || rec}`;
      if (rec.rounds) recText += ` - ${rec.rounds}`;
      if (rec.duration) recText += ` - ${rec.duration}`;
      if (rec.benefit) recText += ` (${rec.benefit})`;
      doc.text(recText, 25, yPos);
      yPos += 6;
    });

    // Tips
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 5;
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('💡 Personalized Tips', 20, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    (dietPlan.tips || []).forEach((tip, index) => {
      if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${index + 1}. ${tip}`, 25, yPos);
      yPos += 6;
    });

    // Save PDF
    doc.save(`YogaIntelliJ_DietPlan_${dietPlan.userData.goal}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Calculate macro percentages for progress bars
  const calculateMacroPercentages = () => {
    if (!dietPlan || !dietPlan.macros || !dietPlan.dailyCalories) return { protein: 0, carbs: 0, fats: 0 };
    
    const total = (dietPlan.macros.protein || 0) + (dietPlan.macros.carbs || 0) + (dietPlan.macros.fats || 0);
    if (total === 0) return { protein: 0, carbs: 0, fats: 0 };
    
    // Recommended ratios: Protein 30%, Carbs 45%, Fats 25%
    const recommendedProtein = dietPlan.dailyCalories * 0.30 / 4; // 4 cal per gram
    const recommendedCarbs = dietPlan.dailyCalories * 0.45 / 4; // 4 cal per gram
    const recommendedFats = dietPlan.dailyCalories * 0.25 / 9; // 9 cal per gram
    
    return {
      protein: Math.min(100, ((dietPlan.macros.protein || 0) / recommendedProtein) * 100),
      carbs: Math.min(100, ((dietPlan.macros.carbs || 0) / recommendedCarbs) * 100),
      fats: Math.min(100, ((dietPlan.macros.fats || 0) / recommendedFats) * 100)
    };
  };

  const macroPercentages = calculateMacroPercentages();

  // Prepare chart data for macro distribution
  const getChartData = () => {
    if (!dietPlan || !dietPlan.macros) return null;
    
    const proteinCal = dietPlan.macros.protein * 4;
    const carbsCal = dietPlan.macros.carbs * 4;
    const fatsCal = dietPlan.macros.fats * 9;
    const total = proteinCal + carbsCal + fatsCal;
    
    return {
      labels: ['Protein', 'Carbs', 'Fats'],
      datasets: [{
        data: [
          Math.round((proteinCal / total) * 100),
          Math.round((carbsCal / total) * 100),
          Math.round((fatsCal / total) * 100)
        ],
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(240, 147, 251, 0.8)',
          'rgba(79, 172, 254, 0.8)'
        ],
        borderColor: [
          'rgba(102, 126, 234, 1)',
          'rgba(240, 147, 251, 1)',
          'rgba(79, 172, 254, 1)'
        ],
        borderWidth: 2
      }]
    };
  };

  // Get meal score color
  const getMealScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  // Calculate hydration percentage
  const getHydrationPercentage = () => {
    if (!dietPlan || !dietPlan.waterIntake) return 0;
    const target = parseFloat(dietPlan.waterIntake);
    return Math.min(100, (target / 4) * 100); // Assuming 4L is ideal
  };

  return (
    <div className={`diet-planner-page ${mounted ? 'mounted' : ''}`}>
      {/* Floating Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Navbar */}
      <nav className="diet-navbar">
        <div className="navbar-container">
          <Link to="/" className="diet-logo">
            <span className="logo-gradient">Yoga</span>IntelliJ
          </Link>
          <div className="nav-links">
            {isAuthenticated() ? (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/start" className="nav-link">Yoga</Link>
                <Link to="/diet-planner" className="nav-link active">Diet Planner</Link>
                <Link to="/progress" className="nav-link">Progress</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/start" className="nav-link">Yoga</Link>
                <Link to="/diet-planner" className="nav-link active">Diet Planner</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="diet-content">
        <div className="diet-container">
          {/* Header */}
          <div className="diet-header">
            <h1 className="diet-title">
              <span className="gradient-text">Personalized</span> Diet Planner 🍛
            </h1>
            <p className="diet-subtitle">
              Get a customized Indian meal plan tailored to your goals, preferences, and lifestyle
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="diet-form glass-card">
            <h2 className="form-title">Your Information</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="10"
                  max="100"
                  required
                  placeholder="e.g., 25"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="height">Height (cm) *</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="100"
                  max="250"
                  required
                  placeholder="e.g., 170"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg) *</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="30"
                  max="200"
                  required
                  placeholder="e.g., 70"
                />
              </div>

              <div className="form-group">
                <label htmlFor="goal">Goal</label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                >
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="General Fitness">General Fitness</option>
                  <option value="Yoga Lifestyle">Yoga Lifestyle</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dietaryPreference">Dietary Preference</label>
                <select
                  id="dietaryPreference"
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleInputChange}
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Eggetarian">Eggetarian</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="activityLevel">Activity Level</label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                >
                  <option value="Sedentary">Sedentary (Little to no exercise)</option>
                  <option value="Lightly Active">Lightly Active (Light exercise 1-3 days/week)</option>
                  <option value="Moderately Active">Moderately Active (Moderate exercise 3-5 days/week)</option>
                  <option value="Very Active">Very Active (Hard exercise 6-7 days/week)</option>
                  <option value="Extremely Active">Extremely Active (Very hard exercise, physical job)</option>
                </select>
              </div>
            </div>

            {/* Plan Type Selection */}
            <div className="plan-type-selector">
              <label className="plan-type-label">Plan Type:</label>
              <div className="plan-type-buttons">
                <button
                  type="button"
                  className={`plan-type-btn ${planType === 'daily' ? 'active' : ''}`}
                  onClick={() => setPlanType('daily')}
                >
                  📅 Daily Plan
                </button>
                <button
                  type="button"
                  className={`plan-type-btn ${planType === 'weekly' ? 'active' : ''}`}
                  onClick={() => setPlanType('weekly')}
                >
                  📆 Weekly Plan
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="generate-btn"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner"></span>
                  Generating Your Diet Plan...
                </>
              ) : (
                <>
                  <span>🍽️</span>
                  Generate Diet Plan
                </>
              )}
            </button>
          </form>

          {/* Saved Plans Button */}
          {savedPlans.length > 0 && (
            <div className="saved-plans-section">
              <button 
                onClick={() => setShowSavedPlans(!showSavedPlans)}
                className="view-saved-btn"
              >
                {showSavedPlans ? '📂 Hide' : '📂 View'} Saved Diet Plans ({savedPlans.length})
              </button>
              
              {showSavedPlans && (
                <div className="saved-plans-modal glass-card">
                  <h3>Saved Diet Plans</h3>
                  <div className="saved-plans-list">
                    {savedPlans.map((plan) => (
                      <div key={plan.id} className="saved-plan-item">
                        <div className="saved-plan-info">
                          <div className="saved-plan-title">
                            {plan.userData.goal} - {new Date(plan.savedAt).toLocaleDateString()}
                          </div>
                          <div className="saved-plan-details">
                            {plan.dailyCalories} kcal | {plan.macros.protein}g P | {plan.macros.carbs}g C | {plan.macros.fats}g F
                          </div>
                        </div>
                        <div className="saved-plan-actions">
                          <button onClick={() => handleLoadSavedPlan(plan)} className="load-plan-btn">
                            Load
                          </button>
                          <button onClick={() => handleDeleteSavedPlan(plan.id)} className="delete-plan-btn">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading Skeleton */}
          {isGenerating && (
            <div ref={resultsRef} className="diet-results">
              <div className="loading-skeleton">
                <div className="skeleton-card glass-card">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
                <div className="skeleton-card glass-card">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
                <div className="skeleton-card glass-card">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {dietPlan && !isGenerating && (
            <div ref={resultsRef} className="diet-results">
              <motion.div 
                className="results-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="results-title">Your Personalized Diet Plan 🍛</h2>
                <div className="results-actions">
                  <button onClick={handleVoiceOutput} className="action-btn voice-btn" title="Listen to your diet plan">
                    🔊 Listen
                  </button>
                  <button onClick={handleRegenerate} className="action-btn regenerate-btn">
                    🔄 Regenerate Plan
                  </button>
                  <button onClick={handleDownloadPDF} className="action-btn download-btn">
                    📥 Download PDF
                  </button>
                </div>
              </motion.div>

              {/* Daily Summary */}
              <motion.div 
                className="summary-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="card-title">📊 Daily Summary</h3>
                
                {/* Macro Balance Remark */}
                {dietPlan.macroBalance && (
                  <div className="macro-balance-remark" style={{ 
                    color: dietPlan.macroBalance.remark === 'Balanced' ? '#10b981' : '#f59e0b',
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    Macro Balance: {dietPlan.macroBalance.remark}
                  </div>
                )}

                <div className="summary-layout">
                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="summary-label">Total Calories</div>
                      <div className="summary-value">{dietPlan.dailyCalories || 'N/A'} kcal</div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Protein</div>
                      <div className="summary-value">{dietPlan.macros?.protein || 0}g</div>
                      <div className="macro-progress-bar">
                        <div className="macro-progress-fill protein" style={{ width: `${macroPercentages.protein}%` }}></div>
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Carbs</div>
                      <div className="summary-value">{dietPlan.macros?.carbs || 0}g</div>
                      <div className="macro-progress-bar">
                        <div className="macro-progress-fill carbs" style={{ width: `${macroPercentages.carbs}%` }}></div>
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Fats</div>
                      <div className="summary-value">{dietPlan.macros?.fats || 0}g</div>
                      <div className="macro-progress-bar">
                        <div className="macro-progress-fill fats" style={{ width: `${macroPercentages.fats}%` }}></div>
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-label">Fiber</div>
                      <div className="summary-value">
                        {dietPlan.fiber ? `${dietPlan.fiber.current}g / ${dietPlan.fiber.recommended}g` : 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Macro Distribution Chart */}
                  {getChartData() && (
                    <div className="chart-container">
                      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Macro Distribution</h4>
                      <Doughnut 
                        data={getChartData()} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                padding: 15,
                                font: { size: 12 }
                              }
                            }
                          }
                        }}
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>

                {/* Hydration Meter */}
                <div className="hydration-meter" style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600' }}>💧 Hydration Target</span>
                    <span>{dietPlan.waterIntake || 'N/A'}L</span>
                  </div>
                  <div className="hydration-bar" style={{ 
                    width: '100%', 
                    height: '20px', 
                    background: 'rgba(255, 255, 255, 0.2)', 
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${getHydrationPercentage()}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                </div>
              </motion.div>

              {/* Meal Timing */}
              {dietPlan.mealTiming && (
                <div className="meal-timing-card glass-card">
                  <h3 className="card-title">⏰ Recommended Meal Timing</h3>
                  <div className="meal-timing-grid">
                    <div className="timing-item">
                      <span className="timing-meal">🌅 Breakfast</span>
                      <span className="timing-time">{dietPlan.mealTiming.breakfast}</span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-meal">☕ Mid-Morning</span>
                      <span className="timing-time">{dietPlan.mealTiming.midMorning}</span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-meal">🍱 Lunch</span>
                      <span className="timing-time">{dietPlan.mealTiming.lunch}</span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-meal">🥗 Evening Snack</span>
                      <span className="timing-time">{dietPlan.mealTiming.eveningSnack}</span>
                    </div>
                    <div className="timing-item">
                      <span className="timing-meal">🌙 Dinner</span>
                      <span className="timing-time">{dietPlan.mealTiming.dinner}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Meals */}
              <div className="meals-section">
                <h3 className="section-title">🍽️ Your Meal Plan</h3>
                <div className="meals-grid">
                  {dietPlan.meals && [
                    { name: 'Breakfast', meal: dietPlan.meals.breakfast, icon: '🌅', key: 'breakfast' },
                    { name: 'Mid-Morning', meal: dietPlan.meals.midMorning, icon: '☕', key: 'midMorning' },
                    { name: 'Lunch', meal: dietPlan.meals.lunch, icon: '🍱', key: 'lunch' },
                    { name: 'Evening Snack', meal: dietPlan.meals.eveningSnack, icon: '🥗', key: 'eveningSnack' },
                    { name: 'Dinner', meal: dietPlan.meals.dinner, icon: '🌙', key: 'dinner' }
                  ].filter(item => item.meal).map(({ name, meal, icon, key }) => (
                    <motion.div 
                      key={name} 
                      className="meal-card glass-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * (['breakfast', 'midMorning', 'lunch', 'eveningSnack', 'dinner'].indexOf(key) || 0) }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="meal-header">
                        <span className="meal-icon">{icon}</span>
                        <h4 className="meal-name">{name}</h4>
                        {dietPlan.mealScores && dietPlan.mealScores[key] && (
                          <div 
                            className="meal-score-badge"
                            style={{
                              background: getMealScoreColor(dietPlan.mealScores[key]),
                              color: 'white',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.85rem',
                              fontWeight: '700'
                            }}
                          >
                            Score: {dietPlan.mealScores[key]}
                          </div>
                        )}
                      </div>
                      <div className="meal-content">
                        <p className="meal-item">{meal?.name || 'N/A'}</p>
                        <p className="meal-quantity">{meal?.quantity || ''}</p>
                        <div className="meal-macros">
                          <span className="macro-badge">{meal?.calories || 0} kcal</span>
                          <span className="macro-badge">P: {meal?.protein || 0}g</span>
                          <span className="macro-badge">C: {meal?.carbs || 0}g</span>
                          <span className="macro-badge">F: {meal?.fat || 0}g</span>
                        </div>
                        <div className="meal-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                          <button 
                            onClick={() => handleSwapMeal(key)}
                            className="meal-action-btn swap-btn"
                            title="Swap this meal"
                          >
                            🔄 Swap
                          </button>
                          <button 
                            onClick={() => handleIncreaseProtein(key)}
                            className="meal-action-btn protein-btn"
                            title="Increase protein"
                          >
                            💪 +Protein
                          </button>
                          <button 
                            onClick={() => handleLowCalorieVersion(key)}
                            className="meal-action-btn lowcal-btn"
                            title="Low calorie version"
                          >
                            🥗 Low-Cal
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Yoga Recommendations */}
              <motion.div 
                className="yoga-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="card-title">🧘 Yoga Recommendations</h3>
                <ul className="yoga-list">
                  {(dietPlan.yogaRecommendations || []).map((rec, index) => (
                    <li key={index} className="yoga-item">
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
                        {rec.icon || '🧘'}
                      </span>
                      <div>
                        <strong>{rec.name}</strong>
                        {rec.rounds && <span> - {rec.rounds}</span>}
                        {rec.duration && <span> - {rec.duration}</span>}
                        {rec.timing && <span> ({rec.timing})</span>}
                        {rec.benefit && <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{rec.benefit}</div>}
                        {rec.poses && <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{rec.poses}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Hydration & Supplements */}
              {dietPlan.hydrationSupplements && (
                <motion.div 
                  className="supplement-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="card-title">💊 Hydration & Supplement Advice</h3>
                  <div className="supplement-item">
                    <strong>💧 Water:</strong> {dietPlan.hydrationSupplements.water} daily
                  </div>
                  <div className="supplement-item">
                    <strong>⚡ Electrolytes:</strong> {dietPlan.hydrationSupplements.electrolytes}
                  </div>
                  {dietPlan.hydrationSupplements.supplements && dietPlan.hydrationSupplements.supplements.length > 0 && (
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Supplements:</strong>
                      {dietPlan.hydrationSupplements.supplements.map((supp, index) => (
                        <div key={index} className="supplement-item" style={{ marginLeft: '1rem' }}>
                          {supp}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tips */}
              <motion.div 
                className="tips-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="card-title">💡 Personalized Tips</h3>
                <ul className="tips-list">
                  {(dietPlan.tips || []).map((tip, index) => (
                    <li key={index} className="tip-item">{tip}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )}

          {/* Weekly Plan Results */}
          {weeklyPlan && !isGenerating && (
            <div ref={resultsRef} className="diet-results">
              <div className="results-header">
                <h2 className="results-title">Your 7-Day Weekly Diet Plan 📆</h2>
                <button onClick={() => setWeeklyPlan(null)} className="action-btn regenerate-btn">
                  Back to Daily Plan
                </button>
              </div>
              <div className="weekly-plan-grid">
                {weeklyPlan.map((dayPlan, dayIndex) => (
                  <div key={dayIndex} className="weekly-day-card glass-card">
                    <h4 className="weekly-day-title">Day {dayIndex + 1}</h4>
                    <div className="weekly-summary">
                      <div>{dayPlan.dailyCalories || 'N/A'} kcal</div>
                      <div>P: {dayPlan.macros?.protein || 0}g | C: {dayPlan.macros?.carbs || 0}g | F: {dayPlan.macros?.fats || 0}g</div>
                    </div>
                    <div className="weekly-meals">
                      <div className="weekly-meal">🌅 {dayPlan.meals?.breakfast?.name || 'N/A'}</div>
                      <div className="weekly-meal">☕ {dayPlan.meals?.midMorning?.name || 'N/A'}</div>
                      <div className="weekly-meal">🍱 {dayPlan.meals?.lunch?.name || 'N/A'}</div>
                      <div className="weekly-meal">🥗 {dayPlan.meals?.eveningSnack?.name || 'N/A'}</div>
                      <div className="weekly-meal">🌙 {dayPlan.meals?.dinner?.name || 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
