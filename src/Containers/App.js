import React, { useState } from 'react';
import Location from 'Components/Location';

function App() {
  const [location, setLocation] = useState({});

  return (
    <Location
      value={location}
      onChange={v => setLocation(v)}
    />
  );
}

export default App;
