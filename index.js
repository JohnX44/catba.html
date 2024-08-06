document.addEventListener('DOMContentLoaded', function() {
    const hotlineLink = document.getElementById('hotline-link1');

    hotlineLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Request user's permission to access their location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Use reverse geocoding API to get accurate location details
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        const city = data.address.city || 'Unknown City';
                        const barangay = data.address.suburb || 'Unknown Barangay';
                        const locationMessage = `Emergency at: ${city}, ${barangay}`;

                        // Copy location message to clipboard
                        navigator.clipboard.writeText(locationMessage)
                            .then(function() {
                                // Open default email client with pre-filled message
                                window.open(`mailto:?subject=Emergency Location&body=${encodeURIComponent(locationMessage)}`);
                            })
                            .catch(function(error) {
                                console.error('Error copying to clipboard:', error);
                            });
                    })
                    .catch(function(error) {
                        console.error('Error getting location data:', error);
                        alert('An error occurred while fetching location data.');
                    });
            }, function(error) {
                console.error('Error getting location:', error);
                alert('Location access denied or unavailable. Please allow location access and try again.');
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    });
});
