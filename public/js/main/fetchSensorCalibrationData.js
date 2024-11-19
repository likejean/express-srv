const _store = new dataStorage();  //store all sensors and calibrations data

//HOW IT GETS TO CALIBRATION CARD: 
//fetchSensorCalibrationData.js -> createMainSensorTable.js -> createGearIcon.js -> showSensorInfoCard.js -> createCalListItem.js

const fetchSensorCalibrationData = async () => {
	let notification = document.querySelector(".notification");

	// fetch all data using POST API endpoints: sensors, calibrations, procedures
	await Promise.all([axios.get("/api/sensors", {
			headers: getRequestHeaders()
		}), axios.get("/api/calibrations", {
			headers: getRequestHeaders()
		})])
		.then((result) => {

			//store all data in browser's local storage
			result.forEach((elem) => {
				let name = elem.data.collectionName;
				_store[name] = elem;
			});

			//function call to create all cells for main sensor table
			createMainSensorTable(
				_store.sensors.data.payload,
				_store.calibrations.data.payload
			);

			//disable all UPDATE, PATCH, DELETE buttons if authenticated user is not administrator!
			if(window.localStorage.getItem("userLevel") !== "Admin") {
				const adminClassifiedButtons = document.querySelectorAll(".admin-classified");
				adminClassifiedButtons.forEach(btn => {					
					if(btn.tagName === "A") {
						while (btn.classList.length > 0) {
							btn.classList.remove(btn.classList.item(0));
						}
						btn.style.pointerEvents="none";
						btn.style.cursor="default";	
						btn.classList.add("btn");					
						btn.classList.add("btn-outline-secondary");
						
					}
					else btn.style.display = "none";
				});			
			}	
					
		})
		.catch((error) => {
			const errorCode = error.response.status;			
						
			if (errorCode === 500){
				//display error message if undefined internal server error occurs (not related to user authentification)
				notification.innerHTML = `<div class="text-center">
					<div class="alert alert-danger" role="alert">${error.response.statusText}</div>
				</div>`;
			}			
			else
				//display error message if auth token invalid or user is not logged in
				notification.innerHTML = `<div class="text-center">
					<div class="alert alert-danger" role="alert">${error.response.data.message}</div>
				</div>`;
			
		});
	};

fetchSensorCalibrationData();
