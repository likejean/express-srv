const _store = new dataStorage();  //store all users data

const fetchAllUsersData = async () => {
		// fetch all user records using POST API endpoints: /users
		await axios.get("/api/users", {
				headers: getRequestHeaders()
			})
			.then((result) => {
	
			//store all data in local data storage		
			_store["users"] = result;			
			createUsersTable();  //function invocation to create table for all users;
	
			})
			.catch((error) => {
			//display error message if data fetch failure occurs or any other internal error detected
			console.log(error);
		});
	};
	
fetchAllUsersData();