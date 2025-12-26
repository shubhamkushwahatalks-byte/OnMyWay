import React, { useState } from 'react';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import Features from './components/Features';
import AIPlanner from './components/AIPlanner';
import Footer from './components/Footer';
import DriverRegistration from './components/DriverRegistration';
import AppDownload from './components/AppDownload';
import { AppView, SearchParams, RideType } from './types';
import { Car, Star, User, ArrowRight, Bike, CarFront, Gift, MapPin } from './components/Icons';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setCurrentView(AppView.SEARCH_RESULTS);
  };

  const handleDestinationSelect = (destination: string) => {
    setCurrentView(AppView.LANDING);
  };

  // Helper to get icon based on ride type
  const getRideIcon = (type: RideType | undefined) => {
    switch(type) {
      case RideType.AUTO: return <Bike className="w-5 h-5 text-gray-400" />;
      case RideType.TAXI: return <CarFront className="w-5 h-5 text-gray-400" />;
      default: return <Car className="w-5 h-5 text-gray-400" />;
    }
  };

  // Helper to generate mock prices based on type
  const getMockPrice = (basePrice: number, type: RideType | undefined, isFree: boolean) => {
    if (isFree) return 0;
    switch(type) {
      case RideType.AUTO: return Math.round(basePrice * 0.4); // Auto is cheaper
      case RideType.TAXI: return Math.round(basePrice * 1.5); // Taxi is expensiver
      default: return basePrice; // Carpool
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />

      <main className="flex-1">
        {currentView === AppView.LANDING && (
          <>
            {/* Hero Section */}
            <div className="relative bg-brand text-brand-contrast h-[420px] overflow-hidden">
               {/* Background Pattern/Image placeholder */}
               <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1549520937-25e2e96d132d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               
               <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10 pb-20">
                 <div className="text-center">
                    <span className="inline-block bg-white text-black text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest shadow-lg">
                      #1 Community Travel App
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg max-w-4xl leading-tight mb-2">
                     Get <span className="text-brand">On My Way</span>
                    </h1>
                    <p className="text-xl text-gray-100 font-medium mb-6 drop-shadow-md">
                      Carpools. Autos. Taxis. And free rides for those in need.
                    </p>
                 </div>
               </div>
            </div>

            {/* Floating Search Bar */}
            <HeroSearch 
              onSearch={handleSearch} 
              onNavigateAI={() => setCurrentView(AppView.AI_PLANNER)}
            />

            {/* Features Section */}
            <div className="mt-8">
               <Features />
            </div>

            {/* App Download Section */}
            <AppDownload />
          </>
        )}

        {currentView === AppView.AI_PLANNER && (
          <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
            <AIPlanner onSelectDestination={handleDestinationSelect} />
          </div>
        )}

        {currentView === AppView.DRIVER_REGISTRATION && (
          <div className="bg-white min-h-[calc(100vh-64px)]">
             <DriverRegistration />
          </div>
        )}

        {currentView === AppView.SEARCH_RESULTS && (
          <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden">
            {/* Left Panel - Results */}
            <div className="w-full md:w-1/2 lg:w-5/12 h-full overflow-y-auto bg-gray-50 border-r border-gray-200">
               <div className="p-4 sticky top-0 bg-gray-50 z-10 border