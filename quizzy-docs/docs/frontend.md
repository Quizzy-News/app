# Frontend

## File System Overview

    App.js    # The main component responsible for rendering the entire application.
    assets/   # Contains fonts, timer images, and icons.
    modals/
        About.js    
        ClickBackMidGame.js
    pages/
        GamePageChildren/
            HeaderChildren/ # Presentation components for Header.js
                ExitButton.js
                PageCount.js
                ScoreCount.js
                Timer.js
            ChoiceDisplay.js
            Footer.js
            Header.js
            QuestionDisplay.js
        CountDownPage.js 
        GamePage.js
        Home.js
        ScorePage.js 
    routes/
        MyStack.js # Houses StackNavigator component that allows the app to transition between screens.
    styles/  # Contains style variables for buttons, colors, containers, and typography.
        
    

## Modals
####About 
Component that renders when About icon is clicked.

####ClickBackMidGame
Component that renders when Exit button is clicked. Gives user the opportunity to go back to their current screen or redirect to the Home page.

## Pages
Container components for Quizzy.News

####CountDownPage
`CountDownPage` is the component between `Home` and `GamePage`.
<br><br>
`useEffect` detects changes in `countdown`'s state. When `countdown` reaches `0`, `useEffect` triggers navigation to `GamePage`.

####GamePage
`GamePage` is the container for question text and answer buttons. This component handles game and points logic.
<br>

Multiple `useState` hooks are in place to update the different pieces that help `GamePage` work. 
<br>

`useEffect` detects changes in `currentQuestion`'s state, which then triggers an update to the next question and its corresponding choices in the next re-render.
<br>

`useEffect` also aids in tracking how much time is left to complete the game.
<br>

Helper functions are in place to detect user activity as well.
<br> 

See the <a href="http://127.0.0.1:8000/#appendix">Appendix</a> for more detail.

####Home
Container component for the homepage.

####ScorePage
Container component for final score page. This has a summary of results as well links to the news that was referenced in the game.      

## GamePageChildren
Presentation components for GamePage.js

####ChoiceDisplay

####Footer

####Header

####Question Display
