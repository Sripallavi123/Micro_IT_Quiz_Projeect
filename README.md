Quiz App
A dynamic, web-based quiz application built with HTML, CSS, and JavaScript, designed to test knowledge across multiple categories. Featuring a vibrant landing page with animated text, an interactive quiz interface, and celebratory animations, this app is a showcase for the Micro IT Internship 2025 portfolio.
Overview
The Quiz App offers an engaging experience with a landing page for navigation and 80 quiz questions across programming, general knowledge, and academic subjects. Users can start via a "Get Started" button or view app details with an "About" button. The quiz includes a 30-second timer, instant feedback, and a blast effect for perfect scores. Built with a responsive design and modern styling, it highlights front-end development skills.
Features

Landing Page: 
"Get Started" button to begin the quiz and "About" button to toggle app details.
Animated welcome text with sparkle effect.


Multi-Category Questions: 80 questions across 8 categories: C, C++, Java, Python, JavaScript, General Knowledge, Science, History.
Interactive Quiz UI: 
Start screen with username input and category selection.
30-second timer per question with auto-submission.
Single-option selection with feedback (green for correct, pink for wrong) and explanations.
Progress bar and audio feedback (correct, wrong, completion sounds).


Result Screen: Displays score, percentage, and message; perfect scores trigger a colorful blast effect; includes review of answers.
Responsive Design: Adapts to mobile and desktop with adjusted fonts and spacing.
Modern Styling: Cyan/purple gradient buttons (#4361ee, #3a0ca3), pink feedback (#f72585), study-themed background, and Poppins font.

Tech Stack

Frontend: HTML, CSS, JavaScript
Libraries: Font Awesome (icons), Poppins font (Google Fonts)
Background: Unsplash image (study-themed)
Audio: Mixkit sound effects
Hosting: Static files, served via local server

File Structure
Micro_IT_Quiz_Projeect/
├── home.html       # Landing page with Get Started and About buttons
├── home.js        # Logic for welcome animation and About toggle
├── index.html     # Quiz interface (start, quiz, result screens)
├── styles.css     # Global styling
├── script.js      # Quiz functionality and blast effect

Installation

Clone the Repository:
git clone https://github.com/Sripallavi123/quiz-app.git
cd Micro_IT_Quiz_Projeect


Run the App:

Start a local server:python -m http.server 8000


Open http://localhost:8000/home.html in a web browser.



Usage

Explore the Landing Page:

Open home.html.
Click "Get Started" to navigate to the quiz (index.html).
Click "About" to toggle app details.


Take the Quiz:

On index.html, enter a username, select a category, and click "Start Quiz".
Answer questions by selecting one option within 30 seconds.
Click "Submit Answer" to see feedback; then "Next Question" to proceed.


View Results:

See your score (out of 80), percentage, and message.
Perfect scores trigger a blast effect; high scores show a trophy.
Review answers or restart the quiz.


Responsive Design:

Access on mobile or desktop; layout adjusts automatically.



Screenshots
![Screenshot (323)](https://github.com/user-attachments/assets/f92b6220-dbe3-47ca-8a49-ea4a04be3bc8)
![Screenshot (324)](https://github.com/user-attachments/assets/e148d226-af05-42bf-aaf4-39bba1b2c8fd)
![Screenshot (325)](https://github.com/user-attachments/assets/c8619663-ece6-454e-84d0-d4385bdab3f4)



Troubleshooting

Background Not Displaying:
Test the Unsplash URL: https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8.
Check browser console for errors (Inspect > Console).
Clear cache: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac).
Confirm styles.css includes:body {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8') no-repeat center center fixed;
    background-size: cover;
}




Button Issues:
Ensure home.js toggles .about-section with about-btn click.
Check script.js for "Submit Answer" and "Next Question" logic.
Verify console for JavaScript errors.


Blast Effect or Audio Not Triggering:
Confirm script.js includes createBlastEffect for perfect scores.
Test audio URLs (e.g., https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3).
Check console for errors.


Timer or Options Not Working:
Verify script.js resets timeLeft and clears timer in resetState.
Ensure single-option selection with radio inputs.



Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License.
Acknowledgments

Unsplash for the study-themed background.
Mixkit for sound effects.
Font Awesome and Google Fonts for icons and typography.
Built with passion for the Micro IT Internship 2025!


Quiz App | May 2025
