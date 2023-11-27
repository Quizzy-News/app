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

`useEffect` detects changes in `countdown`'s state. When `countdown` reaches `0`, `useEffect` triggers navigation to `GamePage`.

####GamePage

`GamePage` is like the control center for playing the quiz game in the app. Think of it as the game board where everything happens – from showing questions and choices to keeping track of scores and moving through the quiz.

#####Key Features:

`Timer`: This counts down from 60. It's used to give the player a sense of time, possibly adding a bit of pressure to answer quickly.

`QuestionDisplay` and `ChoiceDisplay`: These presentation components shows the current question and possible answers (choices). Players select one of these choices as their answer.

Scoring and Feedback: As players answer questions, `GamePage` keeps score. It also shows immediate feedback – if the answer was right or wrong.

Navigation to `ScorePage`: When the quiz ends, either by answering all questions or when the timer runs out, `GamePage` takes the player to the ScorePage to see their final score and a summary of their answers.

See the <a href="http://127.0.0.1:8000/#appendix">Appendix</a> for more detail.

####Home
Container component for the homepage.

####ScorePage
Container component for final score page. This has a summary of results as well links to the news that was referenced in the game.      

