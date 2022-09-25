const searchFormHandler = async (event) => {
    event.preventDefault();
    const plant = document.getElementById('pSearch').value.trim();
    //adding logic to prevent blank request (will return everything from plant DB)
    if (plant == "") {
        alert("Please enter at least one keyword")
    } else {
        let qJoined = plant.split(' ').join('%20');
        const response = await fetch('/api/searchplant?plant='
            + qJoined, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/api/searchplant?plant=' + qJoined);
        } else {
            alert("Unfortunately we don't have this plant in our database...")
        }
    }
};

document
    .getElementById('plantSearch')
    .addEventListener('submit', searchFormHandler);

//** Avatar upload*/

const uploadhFormHandler = async (event) => {
    event.preventDefault();
    if (document.getElementById('selectedFile').files.length == 0) {
        alert("You need to select at least 1 file");
    } else {
        const image = document.getElementById('uploadForm');
        console.log(image);
        var imageData = new FormData(image);
        console.log(imageData);
        const response = await fetch('/api/profile/upload', {
            method: 'POST',
            body: imageData
        });
        if (response.ok) {
            console.log("RESPONSE OK!");
            // document.location.replace('/api/profile');
        } else {
            console.log("Failed to add to collection...");
        }
    }

};

document
    .getElementById('uploadSubmit')
    .addEventListener('click', uploadhFormHandler);
//******************************* */
// WEATHER API BELOW

var weather = {
    APIKey: "d23ee897efa94295b3514040220808",
    myURL: 'https://api.weatherapi.com/v1/current.json?key=',
    fetchWeather: function () {
        fetch(this.myURL + this.APIKey + '&q=auto:ip')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('We are out of API calls :(');
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => {
                console.log(error)
            });;
    },
    displayWeather: function (data) {
        document.getElementById("icon").src = data.current.condition.icon;
        document.getElementById("city").innerText = data.location.name;
        document.querySelector(".temp").innerText = "Temp: " + data.current.feelslike_f + " °F";
        document.querySelector(".wind").innerText = "Wind: " + data.current.wind_mph + " MPH";
        document.querySelector(".humidity").innerText = "Humidity: " + data.current.humidity + "%";
    }
};

weather.fetchWeather();

/********************Route to add plant to collection, listening for clicks on all buttons****************************************** */

const plantID = document.querySelectorAll('.collection-add');

plantID.forEach(response => {
    response.addEventListener('click', async function myFunction(e) {
        let plant_id = e.target.id;
        const response = await fetch('/api/searchplant/add', {
            method: 'POST',
            body: JSON.stringify({ plant_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/api/profile');
        } else {
            console.log("Failed to add to collection...")
        }
    })
})

/***********Remove From Collection */
const selectedPlant = document.querySelectorAll('.collection-remove');

selectedPlant.forEach(response => {
    response.addEventListener('click', async function myFunction(e) {
        let selected_id = e.target.id;
        const response = await fetch('/api/searchplant/remove', {
            method: 'POST',
            body: JSON.stringify({ selected_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/api/profile');
        } else {
            console.log("Failed to remove...")
        }
    })
})