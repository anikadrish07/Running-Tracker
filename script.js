let watchId;
let distanceTraveled = 0;
let prevPosition;

function startTracking() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

function successCallback(position) {
    prevPosition = position.coords;
    watchId = navigator.geolocation.watchPosition(updateDistance, errorCallback);
}

function updateDistance(position) {
    const { latitude, longitude } = position.coords;
    // For simplicity, distance is calculated in a straight line
    // In practice, you may want to use more sophisticated algorithms
    distanceTraveled += calculateDistance(prevPosition.latitude, prevPosition.longitude, latitude, longitude);
    prevPosition = position.coords;
    document.getElementById('distance').innerText = `Distance: ${distanceTraveled.toFixed(2)} km`;
}

function errorCallback(error) {
    console.error('Error getting geolocation:', error);
    // Handle error gracefully
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    // For simplicity, this function calculates distance between two points using Haversine formula
    // You may want to use more accurate methods for your application
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

// Other functions remain unchanged
