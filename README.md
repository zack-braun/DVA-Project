# Team 96 DVA-Project

DESCRIPTION: 
The code for our project is split into three folders.

1. "CongressionalAPI" contains a description of the API we used for Congressional data. It walks through how we
utilized the ProPublicaAPI and VoteviewAPI.

2. "experiments" contains the csv's and json's where lots of our data was stored. It also contains python files
used for experimenting and creating our KNN model:
- data2csv.py: used to compile the congressional data from multiple APIs. You will need to get new API keys from the sources listed at the top of the code (OpenSecrets and ProPublica)
- CalculateAverageIdeologyOfBillVotesByPrimaryTopic.ipynb: used to calculate the average ideology
of bill votes by their primary topic.
- knn.py: used to create the KNN model and experiment with different Ks to find optimal silhouette scores. This
file is also used to generate the plots "K-means clustering.png" and "K-means Silhouette Scores.png". The
experiments for the KNN model can be rerun using knn.py.
- kmeans.sav: the saved KNN model.

3. "Node" contains the Node.js web application built with webpack.
- "src": the frontend source directory which contains the React.js components that display on the website.
- "dist": the compressed version of the "src" directory which is run on the client-side.
- "routes": the backend routes which serve the frontend requests allowing clients to submit their surveys.
- "controllers": the backend files which control the communication between the backend submitSurvey route, the
saved KNN model, and the MongoDB database.
- "models": the MongoDB schemas used.
- "node_modules": the Node.js modules used by the web application.

INSTALLATION:
For experimentation:
1. install python3 and pip install the following 
requests             2.21.0 
pandas               0.21.0  
numpy                1.16.2  
astor                0.7.1   
matplotlib           3.0.3   
sklearn              0.0     
networkx             2.3     
2. This will allow you to run "python3 knn.py" and regenerate the knn model.

For the web application:
View the app live at "dvaproj.herokuapp.com"
OR
Run the app locally:
1. Install node (8.15.1) via Homebrew or similar package manager
2. install npm (6.4.1) on command line
3. Also install the above required python3 and pip packages
2. With npm installed, inside "Node" directory type "npm install" and hit enter on the command line.
3. Ensure node modules described correctly on package.json (should already be correct after "npm install").
4. To run the web application, inside "Node" directory type "npm run dev" and hit enter on the command line.
5. This will startup a Node.js server locally which can be viewed in browser at the url "localhost:8081".

EXECUTION:
Once on the web application, click on "How It Works" for a description of how the application works.
OR
Click on "Find Your Matches" to begin the survey which will match you with current congresspeople. Instructions
for completing the survey are shown at the top of the survey. Once finished, click "Submit" at the bottom.
After the results are finished loading, you should be able to see the matches along with some descriptions.
You can click on the magnifying-glass icon to view more details on the congressperson.

Hope you enjoy the application!
