let table;
let mapInstance;

// toggle variables
let showDrink = false;
let showMilk = false;
let showPrice = false;
let showRating = false;
let showCompany = false;
let showDuration = false;

function preload() {
    table = fetch("retrieve.php").then(response => response.json());
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setupMap();
    textSize(12);
    displayCafeNames();

    // Add event listeners to the toggles
    document.querySelector('.toggle-drink').addEventListener('change', (event) => {
        showDrink = event.target.checked;
        displayCafeNames();
    });

    document.querySelector('.toggle-milk').addEventListener('change', (event) => {
        showMilk = event.target.checked;
        displayCafeNames();
    });

    document.querySelector('.toggle-price').addEventListener('change', (event) => {
        showPrice = event.target.checked;
        displayCafeNames();
    });

    document.querySelector('.toggle-rating').addEventListener('change', (event) => {
        showRating = event.target.checked;
        displayCafeNames();
    });

    document.querySelector('.toggle-company').addEventListener('change', (event) => {
        showCompany = event.target.checked;
        displayCafeNames();
    });

    document.querySelector('.toggle-duration').addEventListener('change', (event) => {
        showDuration = event.target.checked;
        displayCafeNames();
    });
    
    document.querySelector('.legend-button').addEventListener('click', () => {
      document.querySelector('.legend-popup').style.display = 'block';
    });
    
    // Add click event listener to close the legend popup
    document.querySelector('.legend-popup').addEventListener('click', (event) => {
      if (event.target == document.querySelector('.legend-popup')) {
        document.querySelector('.legend-popup').style.display = 'none';
      }
    });

    // displayCafeNames();
}

// map functionality using Mapbox
function setupMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc2J5bWlhIiwiYSI6ImNsdXRmNnFiYjBtNWMyaW85ZmptcWtic3kifQ.VwHVPql5ArIpy-UeKdV-Gg';
    mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapsbymia/clutfmzvn002m01q0ave3egew',
        center: [-118.3057, 34.0582],
        zoom: 12.5
    });
    mapInstance.addControl(new mapboxgl.NavigationControl());
}

function displayCafeNames() {
    table.then(data => {
        data.forEach(cafe => {
            const { cafe: cafeName, date, lat, lng, size, temperature, type, drink, milk, price, rating, company, duration } = cafe;

            let drinkText = '';
            if (showDrink) {
                drinkText = `<p>Drink: ${drink}</p>`;
            }

            let milkText = '';
            if (showMilk) {
                milkText = `<p>Milk: ${milk}</p>`;
            }

            let priceText = '';
            if (showPrice) {
                priceText = `<p>Price: ${price}</p>`;
            }

            let ratingText = '';
            if (showRating) {
                ratingText = `<p>Rating: ${rating}</p>`;
            }

            let companyText = '';
            if (showCompany) {
                companyText = `<p>Company: ${company}</p>`;
            }

            let durationText = '';
            if (showDuration) {
                durationText = `<p>Duration: ${duration} hours</p>`;
            }

            // Calculate the circle radius and set the marker color as before
            const radius = mapSizeToRadius(size);
            let markerColor;
            if (temperature === 'Iced' && type === 'Matcha') {
                markerColor = '#99D376';
            } else if (temperature === 'Hot' && type === 'Matcha') {
                markerColor = '#34730E';
            } else if (temperature === 'Iced' && type === 'Coffee') {
                markerColor = '#CF905F';
            } else if (temperature === 'Hot' && type === 'Coffee') {
                markerColor = '#92603A';
            } else {
                markerColor = '#8CCEDD';
            }

            const el = document.createElement('div');
            el.className = 'marker';
            el.style.background = markerColor;
            el.style.width = `${radius * 2}px`;
            el.style.height = `${radius * 2}px`;
            el.style.borderRadius = '50%';

            new mapboxgl.Marker(el)
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup().setHTML(`
                <h3>${cafeName}</h3>
                <p>Date: ${date}</p>
                ${drinkText}
                ${milkText}
                ${priceText}
                ${ratingText}
                ${companyText}
                ${durationText}
                `))
                .addTo(mapInstance);
        });
    });
}

function mapSizeToRadius(size) {
    
    const sizeNum = parseInt(size, 10);
    
    switch (sizeNum) {
        case 12:
            return 10;
        case 16:
            return 13;
        case 20:
            return 16;
        case 24:
            return 19;
        default:
            return 20;
    }
}