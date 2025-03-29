function createNewChartDatasetRecord() {
    //use POST API endpoint to create new chart dataset record
    
    axios
        .post(`../api/datasets`, newChartDatasetPostData)
        .then((response) => {
            console.log("New chart dataset record created successfully:", response);
            //window.location.href = "../index.html";
        })
        .catch((error) => {
            console.log("ERROR:", error);
        });
    }
        