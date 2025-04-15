export const TOWNS = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Nyeri",
    "Meru", "Machakos", "Kisii", "Kericho", "Kakamega", "Bungoma", "Malindi", 
    "Kitui", "Garissa", "Nyahururu", "Narok", "Voi", "Isiolo"
  ];
  
  export const ROUTES = [];
  
  // Generate routes dynamically from the towns
  for (let i = 0; i < TOWNS.length; i++) {
    for (let j = 0; j < TOWNS.length; j++) {
      if (i !== j) {
        ROUTES.push(`${TOWNS[i]} to ${TOWNS[j]}`);
      }
    }
  }
  
  // Get departure and destination lists
  export const DEPARTURES = [...new Set(ROUTES.map(r => r.split(" to ")[0]))];
  export const DESTINATIONS = [...new Set(ROUTES.map(r => r.split(" to ")[1]))];
  