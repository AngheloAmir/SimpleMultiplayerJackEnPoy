# Documentation

This is a simple Jack en Poy game that uses camera for detecting hand gestures. To make it work, you need to have a camera. 

Before starting the project, I do my simple research by asking
Google Gemini regarding this feature and it is doable.

## Project Setup

First I open the terminal and I install monorepotime for monorepo tools.
Monorepotime is a tool that helps managing a monorepo and I am the author of that tool.

```
npm install -D monorepotime
npx monorepotime
```

The tool opens a browser and I let it scaffold the project for me.

## Adding Workspace

In a monorepo setup, projects like frontend / backend are called Workspace.
My Mmonorepo tool, it has a feature to quickly add new workspace.

So add the express/node.js backend and the React frontend.
The monorepotime offers quick setup for the React and Express.js. which is what I need.

after that I open the "Root Terminal" in the gui add the Github repo:
```
git regit remote add origin https://github.com/AngheloAmir/SimpleMultiplayerJackEnPoy.git
git push -u origin master
```

## Coding Prompts
initialy using "Claude Opus 4.5" in "Planning mode" and then switch to Google Gemini 3 Pro (High) and in "Fast mode".

## PROMPTS:
"in apps/game folder which is a frontend, can you make it that is uses Tensorflow and use hand gesture detection, The app checks if the user hand is rock, paper or scisor as we are creating "Rock, Paper and Scisor" game. Make sure the we use light version or setup to be a light version of the Tensorflow, i want the app the to be light as much as possible so removing any unused packages with tensor flow is a must. The front end uses a webcam and then use the image to detect the user hand gesture. Make it use Darkmode, display the content of the camera and then display the current hand gestrue, there is only 3 possible gesture. Make the porject modular meaning do not code everyting inside the app.tsx. So add components/Header.tsx, components/Welcome.tsx, Playing.tsx, In the Header, it contains the brand name: "SimpleMultiplayerJackEnPoy" with an brand icon. The app starts with "welcome screen". It looks like this: "Welcome player", "choose your side": "Team Read" or Team Blue which store the state of the player choosing. When the player choose, the Playing.tsx will be displayed which is contains the current content of the webcam, current detected hand gesture. There is also a panel which contains the button "Fight" which will send a post message to the backendexpress app, for now the route will just console log that it receive a request. Design the UI in modern looking and a properly fit for rock, paper scisor game. Use images or generate one as needed. Avoid using Border since it not looking good."

"In the Playing.tsx, the user has to perform gesture checks before it can fight. So the user has
do "Rock", "Paper" and "Scisor" at least 1 onces before fighting. So add a badge in the content screen saying "Before fighting, lets practice first" and then display the current hand gesture of the user. 
Then an image of the hand gesture will be displayed in the badge.  Each gesture has its own image.
Will turn green if the user has performed the gesture checks until all of the gesture is green.
Then the user can fight and the badge vanish in the view"

"Can you make it that the content is withing browser screen size?, meaning no scrolling all content fits in the window. Also the badge should be floating below the camera view."

"Please make it that it does not detect the user faces if that is possible since it being detected as rock."

"it seems like it fails on detecting more accurate, can you make it more accurate?"

"in the badge can add a text telling that the user hand have to closer to the camera but not too close, just the hand should be visible in the camera view. Also, make it that the the detected hand does not changes until a new gesture is detected. this prevent flickering of the user hand gesture."

"Can you make it that the detected hand gesture which is below the camera view and make it inside the camera view which appears in the bottom center of the camera view?"

## Mobile Responsive Design prompts
"Now we will be doing mobile responsive design, when viewing in mobile make the header to show only user team name, dont show the icon. This is how the mobile view should look like:
[Header - team name]
[
    [Camera View]
    [Gesture Display]
]
[
    [Fight button] 
    [Back button] 
]
 "

"make the welcome screen mobile frendly too"

"in the mobile view in the welcome screen, make the header showing only JackEnPoy and dont show the icon also dont show the "VS" word just two buttons in flex column layout. Remove the card while in mobile view."

"in mobile view, make everything dont scroll like by adding scroll hidden"

## Making the backend functional with Database

"now create an .env file and we are going to use Supabase as our database
 this the anon key="****" and the url="****"

Now this is the table format:
CREATE TABLE playerteam (
    id int PRIMARY KEY, 
    team_name text NOT NULL,
    gesture text NOT NULL
);
INSERT INTO playerteam (id, team_name, gesture)
VALUES 
    (1, 'Team Red',  'Rock'),
    (2, 'Team Blue', 'Paper');

When the user clicks the fight button it will send the ff data:
userteam and current hand gesture

The backend update the content based on the user team, then it will compare to the other team gesture.
this will return if the user "Won", "Lost", "Draw" and display it in the frontend.
""

"can you make it that the result is displayed in the center of the screen and make it with animation. Each has its own animaton like Winning will show starts, loosing will show sad face. and draw just use an icon for a draw"

## publishing

"Check the backend and make it can be publish to vercel, do adjustment as necessary"

"add hello world when visiting the root url of the backendexpress"

## Checking the publish project:

"https://simple-multiplayer-jack-en-poy-git-c07a71-angheloamirs-projects.vercel.app/ so it produce This Serverless Function has crashed.

Your connection is working correctly.

Vercel is working correctly.

500: INTERNAL_SERVER_ERROR Code: FUNCTION_INVOCATION_FAILED ID: hkg1::pp4lm-1768840558326-e82c85374427

    If you are a visitor, contact the website owner or try again later.
    If you are the owner, learn how to fix the error and check the logs.  how to fix this?
"

## After adjusting the Vercel environment variables
After visiting the deployed backend, i need to ask the ai to adjust the frontend to use the url "https://simple-multiplayer-jack-en-poy-backendexpress-g6sex8t9t.vercel.app/"

"Please adjust the frontend to use the url "https://simple-multiplayer-jack-en-poy-backendexpress-g6sex8t9t.vercel.app/""