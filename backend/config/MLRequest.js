
const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "global-incline-407709";
const MODEL_ID = "text-bison";
const LOCATION_ID = "us-central1";
const TOKEN = `ya29.a0AfB_byCaMJfoEEjpiUXvx5Zw8oicBmL5FmoOSx3BIxQKdn6Ig_zHfABtS6SL1XIiWfLpKKG9N-drURkuDEiI_VwsGNsOv94JQAdt7iC1i4AsSrY0RqZS07IrSISQ5Ov4EgTIToWJXnBe2NQlnCqItlM6wBnjDZ6ZBzvrrdJq2NlNC35b7MUjk-xsG5ACApSu4n3A4SP1oSYby2X-c_HYACE_sMDWmAZHyxtgrsrVQdF1wXd0PqjJiC8SNTPGT6N1oXn_715Q-EMjqZlfYuAVsiAp8FtW1W4hZLwS3F_8WbcDZjSXsIDWGe8rG38T1KgUjAEeY_8qhSjxzCcIj07dy69yfIKuRS_L-JLvwsiznkUh-2w2TndF0vxpg_rAS2808fOcMXEXSlRlFXgpFtKj13VH1qbNcvKsaCgYKAfUSARISFQHGX2MivXb8Wm6e1ZVYiWOP6tkMWg0423`;


app.post('/predict', async (req, res) => {
    try {
        // const { caseId, sectionsActs, caseDescription } = req.body; // Extract data from request body
        let caseId = "CS001";
        let sectionsActs = "IPC 302"
        let caseDescription = "A man accused to murder his wife"


        const data = {
            instances: [
                {
                    content: `Case ID - ${caseId}
                    Sections acts : ${sectionsActs}
                    case description : ${caseDescription}`,
                },
            ],
            parameters: {
                candidateCount: 2,
                maxOutputTokens: 1024,
                temperature: 0.9,
                topP: 1,
                topK: 23,
            },
        };

        const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`;

        try {

            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            console.log("this is error of axios :- ", err.response ? err.response.data : err.message);
            console.log(err);
        }
        console.log(response);
        const prediction = response.data.predictions[0]; // Extract prediction from response
        res.json({ prediction }); // Send prediction as JSON response
    } catch (error) {
        console.error(error);
        console.log("this is error :- ");
        res.status(500).json({ error: error.message }); // Handle error
    }
});

