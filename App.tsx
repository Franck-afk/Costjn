import React, { useState } from 'react';
import Preloader from './components/Preloader';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* 
        The Preloader handles its own unmounting animation visually 
        before triggering the state change 
      */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}
      
      {/* 
        Main content is rendered behind the loader initially, 
        or you can conditionally render it if you prefer 
        fetching data only after load.
      */}
      <MainContent />
    </div>
  );
};

export default App;