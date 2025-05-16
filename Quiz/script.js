document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const reviewBtn = document.getElementById('review-btn');
    const restartBtn = document.getElementById('restart-btn');
    const backToResultsBtn = document.getElementById('back-to-results');
    const usernameInput = document.getElementById('username');
    const categorySelect = document.getElementById('category');
    const playerNameDisplay = document.getElementById('player-name');
    const questionCountDisplay = document.getElementById('question-count');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackContainer = document.querySelector('.feedback-container');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const explanationText = document.getElementById('explanation');
    const progressBar = document.getElementById('progress');
    const timerDisplay = document.getElementById('time');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultScore = document.getElementById('result-score');
    const resultMessage = document.getElementById('result-message');
    const reviewScreen = document.getElementById('review-screen');
    const reviewQuestionsContainer = document.getElementById('review-questions');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const completeSound = document.getElementById('complete-sound');

    // Quiz Variables
    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;
    let selectedOptions = [];
    let userName = '';
    let selectedOption = null;
    let isAnswerSubmitted = false;

    // Quiz Data
    const quizzes = {
        c: [
            { 
                question: "What is the purpose of 'printf' in C?", 
                options: ["Read input", "Print output", "Declare variables", "Loop execution"], 
                answer: "Print output",
                explanation: "The printf function in C is used to print formatted output to the standard output (usually the screen)."
            },
            { 
                question: "Which keyword is used to define a function in C?", 
                options: ["func", "def", "return", "void"], 
                answer: "void",
                explanation: "In C, 'void' is used to define a function that does not return a value, or other return types like 'int' can be used."
            },
            { 
                question: "What does the '++' operator do in C?", 
                options: ["Decrements by 1", "Increments by 1", "Multiplies by 2", "Divides by 2"], 
                answer: "Increments by 1",
                explanation: "The '++' operator increments the value of a variable by 1."
            },
            { 
                question: "Which of these is a valid pointer declaration in C?", 
                options: ["int ptr;", "int *ptr;", "*int ptr;", "ptr int;"], 
                answer: "int *ptr;",
                explanation: "In C, a pointer is declared using the '*' symbol, e.g., 'int *ptr;' declares a pointer to an integer."
            },
            { 
                question: "What is the purpose of the 'malloc' function?", 
                options: ["Free memory", "Allocate memory", "Copy memory", "Clear memory"], 
                answer: "Allocate memory",
                explanation: "The 'malloc' function allocates a specified amount of memory dynamically and returns a pointer to it."
            },
            { 
                question: "Which loop is guaranteed to execute at least once?", 
                options: ["for", "while", "do-while", "nested"], 
                answer: "do-while",
                explanation: "A do-while loop executes the loop body at least once before checking the condition."
            },
            { 
                question: "What does the 'break' statement do?", 
                options: ["Exits a loop", "Skips an iteration", "Declares a variable", "Calls a function"], 
                answer: "Exits a loop",
                explanation: "The 'break' statement terminates the nearest enclosing loop or switch statement."
            },
            { 
                question: "What is the size of 'int' in C on a 32-bit system?", 
                options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"], 
                answer: "4 bytes",
                explanation: "On a 32-bit system, an 'int' typically occupies 4 bytes of memory."
            },
            { 
                question: "Which header file is needed for file operations?", 
                options: ["stdio.h", "stdlib.h", "string.h", "time.h"], 
                answer: "stdio.h",
                explanation: "The 'stdio.h' header file includes functions like 'fopen' and 'fclose' for file operations."
            },
            { 
                question: "What does 'const' keyword do?", 
                options: ["Changes a variable", "Makes a variable constant", "Declares a function", "Loops a block"], 
                answer: "Makes a variable constant",
                explanation: "The 'const' keyword makes a variable's value unmodifiable after initialization."
            }
        ],
        cpp: [
            { 
                question: "What is the purpose of 'cout' in C++?", 
                options: ["Input", "Output", "File handling", "Memory allocation"], 
                answer: "Output",
                explanation: "The 'cout' object in C++ is used to output data to the standard output (usually the screen)."
            },
            { 
                question: "Which keyword is used for inheritance in C++?", 
                options: ["extends", "implements", "public", "class"], 
                answer: "public",
                explanation: "In C++, inheritance is specified using access specifiers like 'public', e.g., 'class Derived : public Base'."
            },
            { 
                question: "What is a reference in C++?", 
                options: ["A pointer", "An alias", "A constant", "A function"], 
                answer: "An alias",
                explanation: "A reference in C++ is an alias for an existing variable, allowing it to be accessed by another name."
            },
            { 
                question: "What does the 'virtual' keyword do?", 
                options: ["Declares a variable", "Enables polymorphism", "Frees memory", "Loops code"], 
                answer: "Enables polymorphism",
                explanation: "The 'virtual' keyword allows function overriding in derived classes, enabling runtime polymorphism."
            },
            { 
                question: "Which operator is used to access class members?", 
                options: [".", "->", "::", "&"], 
                answer: ".",
                explanation: "The dot operator (.) is used to access members of a class or struct, e.g., 'obj.member'."
            },
            { 
                question: "What is the purpose of a constructor in C++?", 
                options: ["Frees memory", "Initializes objects", "Declares variables", "Loops code"], 
                answer: "Initializes objects",
                explanation: "A constructor is a special member function that initializes objects of a class."
            },
            { 
                question: "What is the default access specifier in a class?", 
                options: ["public", "private", "protected", "friend"], 
                answer: "private",
                explanation: "In a C++ class, members are private by default unless specified otherwise."
            },
            { 
                question: "What does 'new' operator do in C++?", 
                options: ["Deletes memory", "Allocates memory", "Copies memory", "Clears memory"], 
                answer: "Allocates memory",
                explanation: "The 'new' operator dynamically allocates memory for an object and returns a pointer to it."
            },
            { 
                question: "Which library includes 'vector' in C++?", 
                options: ["iostream", "string", "vector", "algorithm"], 
                answer: "vector",
                explanation: "The 'vector' container is defined in the '<vector>' header file."
            },
            { 
                question: "What is function overloading in C++?", 
                options: ["Same function, different parameters", "Different functions, same name", "Same function, same parameters", "Nested functions"], 
                answer: "Same function, different parameters",
                explanation: "Function overloading allows multiple functions with the same name but different parameter lists."
            }
        ],
        java: [
            { 
                question: "What is the purpose of 'System.out.println' in Java?", 
                options: ["Read input", "Print output", "Declare variables", "Loop execution"], 
                answer: "Print output",
                explanation: "The 'System.out.println' method prints output to the console followed by a new line."
            },
            { 
                question: "Which keyword is used to define a class in Java?", 
                options: ["class", "struct", "type", "def"], 
                answer: "class",
                explanation: "The 'class' keyword is used to define a class in Java, e.g., 'class MyClass'."
            },
            { 
                question: "What is the default value of an object reference?", 
                options: ["0", "null", "undefined", "false"], 
                answer: "null",
                explanation: "In Java, an uninitialized object reference is set to 'null' by default."
            },
            { 
                question: "Which keyword is used for inheritance in Java?", 
                options: ["extends", "implements", "super", "this"], 
                answer: "extends",
                explanation: "The 'extends' keyword is used to indicate that a class inherits from another class."
            },
            { 
                question: "What is the purpose of the 'final' keyword?", 
                options: ["Declares a loop", "Makes a variable constant", "Frees memory", "Calls a method"], 
                answer: "Makes a variable constant",
                explanation: "The 'final' keyword prevents a variable from being modified or a method from being overridden."
            },
            { 
                question: "Which exception is thrown for array out of bounds?", 
                options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ClassCastException"], 
                answer: "ArrayIndexOutOfBoundsException",
                explanation: "This exception is thrown when an array is accessed with an invalid index."
            },
            { 
                question: "What is the purpose of the 'static' keyword?", 
                options: ["Creates an object", "Shares a member", "Frees memory", "Loops code"], 
                answer: "Shares a member",
                explanation: "The 'static' keyword indicates that a member belongs to the class, not instances."
            },
            { 
                question: "Which interface is used for lists in Java?", 
                options: ["List", "Set", "Map", "Queue"], 
                answer: "List",
                explanation: "The 'List' interface in Java is used for ordered collections, implemented by classes like ArrayList."
            },
            { 
                question: "What does the 'super' keyword do?", 
                options: ["Calls a parent class", "Declares a variable", "Loops code", "Frees memory"], 
                answer: "Calls a parent class",
                explanation: "The 'super' keyword refers to the parent class, used to call its methods or constructors."
            },
            { 
                question: "What is the main method's return type in Java?", 
                options: ["int", "void", "String", "boolean"], 
                answer: "void",
                explanation: "The main method in Java has a 'void' return type as it does not return a value."
            }
        ],
        python: [
            { 
                question: "What is the purpose of 'print' in Python?", 
                options: ["Read input", "Print output", "Declare variables", "Loop execution"], 
                answer: "Print output",
                explanation: "The 'print' function in Python outputs data to the console."
            },
            { 
                question: "Which keyword is used to define a function in Python?", 
                options: ["func", "def", "return", "lambda"], 
                answer: "def",
                explanation: "The 'def' keyword is used to define a function in Python, e.g., 'def my_function()'."
            },
            { 
                question: "What does the 'len' function do?", 
                options: ["Returns length", "Converts to string", "Loops code", "Frees memory"], 
                answer: "Returns length",
                explanation: "The 'len' function returns the number of items in an object, like a list or string."
            },
            { 
                question: "Which symbol is used for comments in Python?", 
                options: ["//", "#", "/*", "--"], 
                answer: "#",
                explanation: "The '#' symbol is used for single-line comments in Python."
            },
            { 
                question: "What is the purpose of the 'in' operator?", 
                options: ["Checks membership", "Declares a variable", "Frees memory", "Loops code"], 
                answer: "Checks membership",
                explanation: "The 'in' operator checks if a value exists in a sequence, like a list or string."
            },
            { 
                question: "Which data type is mutable in Python?", 
                options: ["tuple", "string", "list", "integer"], 
                answer: "list",
                explanation: "Lists in Python are mutable, meaning their elements can be changed after creation."
            },
            { 
                question: "What does the 'range' function do?", 
                options: ["Generates numbers", "Converts to string", "Frees memory", "Declares variables"], 
                answer: "Generates numbers",
                explanation: "The 'range' function generates a sequence of numbers, often used in loops."
            },
            { 
                question: "Which module is used for math operations?", 
                options: ["math", "random", "time", "sys"], 
                answer: "math",
                explanation: "The 'math' module provides functions for mathematical operations, like 'math.sqrt'."
            },
            { 
                question: "What is a list comprehension in Python?", 
                options: ["A loop", "A concise list creation", "A function", "A class"], 
                answer: "A concise list creation",
                explanation: "List comprehensions provide a concise way to create lists, e.g., '[x*2 for x in range(5)]'."
            },
            { 
                question: "What does the 'try' keyword do?", 
                options: ["Loops code", "Handles exceptions", "Declares variables", "Frees memory"], 
                answer: "Handles exceptions",
                explanation: "The 'try' keyword is used to define a block of code to be tested for errors."
            }
        ],
        javascript: [
            { 
                question: "What is the purpose of 'console.log' in JavaScript?", 
                options: ["Read input", "Print output", "Declare variables", "Loop execution"], 
                answer: "Print output",
                explanation: "The 'console.log' method outputs data to the console for debugging or display."
            },
            { 
                question: "Which keyword declares a variable in JavaScript?", 
                options: ["var", "def", "int", "class"], 
                answer: "var",
                explanation: "The 'var' keyword, along with 'let' and 'const', is used to declare variables in JavaScript."
            },
            { 
                question: "What does the '===' operator do?", 
                options: ["Checks equality", "Assigns a value", "Loops code", "Frees memory"], 
                answer: "Checks equality",
                explanation: "The '===' operator checks for strict equality, comparing both value and type."
            },
            { 
                question: "What is a closure in JavaScript?", 
                options: ["A loop", "A function with preserved data", "A class", "A variable"], 
                answer: "A function with preserved data",
                explanation: "A closure is a function that retains access to its outer scope's variables even after the outer function has finished."
            },
            { 
                question: "Which method adds an element to an array?", 
                options: ["push", "pop", "shift", "slice"], 
                answer: "push",
                explanation: "The 'push' method adds one or more elements to the end of an array."
            },
            { 
                question: "What is the purpose of 'addEventListener'?", 
                options: ["Declares a variable", "Attaches an event handler", "Frees memory", "Loops code"], 
                answer: "Attaches an event handler",
                explanation: "The 'addEventListener' method attaches an event handler to an element, like a click event."
            },
            { 
                question: "What does 'undefined' mean in JavaScript?", 
                options: ["A variable with no value", "A function", "A loop", "A class"], 
                answer: "A variable with no value",
                explanation: "'undefined' indicates that a variable has been declared but not assigned a value."
            },
            { 
                question: "Which keyword is used for asynchronous functions?", 
                options: ["async", "sync", "await", "promise"], 
                answer: "async",
                explanation: "The 'async' keyword defines an asynchronous function that returns a Promise."
            },
            { 
                question: "What is the purpose of 'JSON.parse'?", 
                options: ["Converts to string", "Parses JSON to object", "Loops code", "Frees memory"], 
                answer: "Parses JSON to object",
                explanation: "The 'JSON.parse' method converts a JSON string into a JavaScript object."
            },
            { 
                question: "What does the 'this' keyword refer to?", 
                options: ["Global object", "Current object", "Parent object", "Child object"], 
                answer: "Current object",
                explanation: "The 'this' keyword refers to the object that is currently executing the code."
            }
        ],
        gk: [
            { 
                question: "What is the capital city of France?", 
                options: ["Paris", "London", "Berlin", "Madrid"], 
                answer: "Paris",
                explanation: "Paris is the capital city of France, known for landmarks like the Eiffel Tower."
            },
            { 
                question: "Which planet is known as the Red Planet?", 
                options: ["Jupiter", "Mars", "Venus", "Mercury"], 
                answer: "Mars",
                explanation: "Mars is called the Red Planet due to its reddish appearance caused by iron oxide (rust)."
            },
            { 
                question: "Who wrote the play 'Romeo and Juliet'?", 
                options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], 
                answer: "William Shakespeare",
                explanation: "William Shakespeare is the renowned playwright who wrote 'Romeo and Juliet'."
            },
            { 
                question: "What is the largest ocean on Earth?", 
                options: ["Atlantic", "Indian", "Pacific", "Arctic"], 
                answer: "Pacific",
                explanation: "The Pacific Ocean is the largest and deepest ocean, covering about one-third of Earth's surface."
            },
            { 
                question: "Which country is known as the Land of the Rising Sun?", 
                options: ["China", "Japan", "Korea", "Thailand"], 
                answer: "Japan",
                explanation: "Japan is called the Land of the Rising Sun due to its eastern location and sunrise views."
            },
            { 
                question: "What is the chemical symbol for gold?", 
                options: ["Au", "Ag", "Fe", "Cu"], 
                answer: "Au",
                explanation: "The chemical symbol 'Au' represents gold on the periodic table, derived from its Latin name 'aurum'."
            },
            { 
                question: "Who painted the Mona Lisa?", 
                options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], 
                answer: "Leonardo da Vinci",
                explanation: "Leonardo da Vinci painted the Mona Lisa, famous for its detailed background and enigmatic smile."
            },
            { 
                question: "What is the longest river in the world?", 
                options: ["Amazon", "Nile", "Yangtze", "Mississippi"], 
                answer: "Nile",
                explanation: "The Nile River, flowing through Africa, is considered the longest river at approximately 6,650 km."
            },
            { 
                question: "Which currency is used in Japan?", 
                options: ["Yuan", "Yen", "Won", "Dollar"], 
                answer: "Yen",
                explanation: "The Yen is the official currency of Japan, used in all financial transactions."
            },
            { 
                question: "What is the smallest country in the world?", 
                options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], 
                answer: "Vatican City",
                explanation: "Vatican City is the smallest country, with an area of about 44 hectares, located within Rome, Italy."
            }
        ],
        science: [
            { 
                question: "What gas do plants absorb during photosynthesis?", 
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
                answer: "Carbon Dioxide",
                explanation: "Plants absorb carbon dioxide from the air during photosynthesis to produce glucose and oxygen."
            },
            { 
                question: "What is the primary source of energy for Earth?", 
                options: ["Moon", "Sun", "Wind", "Geothermal"], 
                answer: "Sun",
                explanation: "The Sun provides the primary energy for Earth's climate and sustains life through photosynthesis."
            },
            { 
                question: "What is the chemical formula for water?", 
                options: ["H2O", "CO2", "O2", "H2SO4"], 
                answer: "H2O",
                explanation: "Water's chemical formula is H2O, indicating two hydrogen atoms bonded to one oxygen atom."
            },
            { 
                question: "Which planet is closest to the Sun?", 
                options: ["Venus", "Mercury", "Earth", "Mars"], 
                answer: "Mercury",
                explanation: "Mercury is the closest planet to the Sun, orbiting at an average distance of about 58 million km."
            },
            { 
                question: "What is the unit of electric current?", 
                options: ["Volt", "Watt", "Ampere", "Ohm"], 
                answer: "Ampere",
                explanation: "The Ampere is the SI unit of electric current, measuring the flow of electric charge."
            },
            { 
                question: "What type of bond involves sharing electrons?", 
                options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], 
                answer: "Covalent",
                explanation: "Covalent bonds involve the sharing of electrons between atoms to achieve stability."
            },
            { 
                question: "What is the main gas in Earth's atmosphere?", 
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], 
                answer: "Nitrogen",
                explanation: "Nitrogen makes up about 78% of Earth's atmosphere, essential for life and atmospheric processes."
            },
            { 
                question: "What is the speed of light in a vacuum?", 
                options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], 
                answer: "300,000 km/s",
                explanation: "The speed of light in a vacuum is approximately 299,792 km/s, commonly rounded to 300,000 km/s."
            },
            { 
                question: "Which organ pumps blood in the human body?", 
                options: ["Lungs", "Heart", "Liver", "Kidneys"], 
                answer: "Heart",
                explanation: "The heart is the organ that pumps blood throughout the body, supplying oxygen and nutrients."
            },
            { 
                question: "What is the process of cell division called?", 
                options: ["Mitosis", "Meiosis", "Fission", "Fusion"], 
                answer: "Mitosis",
                explanation: "Mitosis is the process by which a cell divides to produce two identical daughter cells."
            }
        ],
        history: [
            { 
                question: "Who was the first President of the United States?", 
                options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], 
                answer: "George Washington",
                explanation: "George Washington served as the first U.S. President from 1789 to 1797."
            },
            { 
                question: "In which year did World War II end?", 
                options: ["1942", "1945", "1948", "1939"], 
                answer: "1945",
                explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September."
            },
            { 
                question: "What was the name of the ship that carried the Pilgrims to America?", 
                options: ["Santa Maria", "Mayflower", "Nina", "Pinta"], 
                answer: "Mayflower",
                explanation: "The Mayflower carried the Pilgrims to Plymouth, Massachusetts, in 1620."
            },
            { 
                question: "Which ancient civilization built the pyramids of Giza?", 
                options: ["Romans", "Greeks", "Egyptians", "Mayans"], 
                answer: "Egyptians",
                explanation: "The ancient Egyptians built the pyramids of Giza around 2600 BCE as tombs for pharaohs."
            },
            { 
                question: "Who was the leader of the Indian independence movement?", 
                options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"], 
                answer: "Mahatma Gandhi",
                explanation: "Mahatma Gandhi led India's non-violent independence movement against British rule."
            },
            { 
                question: "What was the main cause of the French Revolution?", 
                options: ["Economic inequality", "Religious conflict", "Foreign invasion", "Technological change"], 
                answer: "Economic inequality",
                explanation: "The French Revolution (1789-1799) was driven by economic inequality, high taxes, and social unrest."
            },
            { 
                question: "Which empire was ruled by Genghis Khan?", 
                options: ["Roman Empire", "Mongol Empire", "Ottoman Empire", "Byzantine Empire"], 
                answer: "Mongol Empire",
                explanation: "Genghis Khan founded and ruled the Mongol Empire in the 13th century, the largest contiguous empire."
            },
            { 
                question: "What event marked the start of World War I?", 
                options: ["Invasion of Poland", "Assassination of Archduke Franz Ferdinand", "Sinking of the Lusitania", "Treaty of Versailles"], 
                answer: "Assassination of Archduke Franz Ferdinand",
                explanation: "The assassination of Archduke Franz Ferdinand in 1914 triggered the events leading to World War I."
            },
            { 
                question: "Which country was divided into East and West during the Cold War?", 
                options: ["Korea", "Germany", "Vietnam", "China"], 
                answer: "Germany",
                explanation: "Germany was divided into East and West Germany during the Cold War, from 1945 to 1990."
            },
            { 
                question: "Who discovered America in 1492?", 
                options: ["Christopher Columbus", "Ferdinand Magellan", "Marco Polo", "Vasco da Gama"], 
                answer: "Christopher Columbus",
                explanation: "Christopher Columbus reached the Americas in 1492, initiating European exploration and colonization."
            }
        ]
    };

    // Create Blast Effect for Perfect Score
    function createBlastEffect() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#9900ff'];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('blast-particle');
            
            const size = Math.random() * 15 + 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Position at center of result screen
            const rect = resultScreen.getBoundingClientRect();
            particle.style.left = `${rect.width / 2}px`;
            particle.style.top = `${rect.height / 2}px`;
            
            // Random angle and distance for spread
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 300 + 150;
            particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
            
            resultScreen.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1200);
        }
    }

    // Start Quiz
    startBtn.addEventListener('click', () => {
        userName = usernameInput.value.trim();
        const category = categorySelect.value;
        
        if (!userName) {
            alert('Please enter your name');
            return;
        }
        
        currentQuiz = quizzes[category] || [];
        if (currentQuiz.length === 0) {
            alert('No questions available for this category');
            return;
        }
        
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        playerNameDisplay.textContent = userName;
        loadQuestion();
    });

    // Load Question
    function loadQuestion() {
        resetState();
        const currentQuestion = currentQuiz[currentQuestionIndex];
        
        questionText.textContent = currentQuestion.question;
        questionCountDisplay.textContent = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`;
        progressBar.style.width = `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%`;
        
        optionsContainer.innerHTML = '';
        
        currentQuestion.options.forEach(option => {
            const optionElement = document.createElement('label');
            optionElement.classList.add('option');
            
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'quiz-option';
            radioInput.value = option;
            
            const radioCustom = document.createElement('span');
            radioCustom.classList.add('radio-custom');
            
            const optionText = document.createElement('span');
            optionText.textContent = option;
            
            const feedbackIcon = document.createElement('i');
            feedbackIcon.classList.add('feedback-icon');
            
            optionElement.appendChild(radioInput);
            optionElement.appendChild(radioCustom);
            optionElement.appendChild(optionText);
            optionElement.appendChild(feedbackIcon);
            optionsContainer.appendChild(optionElement);
            
            radioInput.addEventListener('change', () => {
                selectedOption = option;
            });
        });
        
        startTimer();
    }

    // Handle Next Button Click
    nextBtn.addEventListener('click', () => {
        if (!isAnswerSubmitted) {
            // Submit Answer
            if (!selectedOption) {
                alert('Please select an answer');
                return;
            }
            
            const currentQuestion = currentQuiz[currentQuestionIndex];
            const isCorrect = selectedOption === currentQuestion.answer;
            
            // Mark correct and incorrect answers
            document.querySelectorAll('.option').forEach(option => {
                const optionValue = option.querySelector('span:not(.radio-custom):not(.feedback-icon)').textContent;
                const feedbackIcon = option.querySelector('.feedback-icon');
                
                if (optionValue === currentQuestion.answer) {
                    option.classList.add('correct');
                    feedbackIcon.classList.add('fas', 'fa-check-circle', 'correct');
                } else if (optionValue === selectedOption && !isCorrect) {
                    option.classList.add('incorrect');
                    feedbackIcon.classList.add('fas', 'fa-times-circle', 'incorrect');
                }
                
                option.style.pointerEvents = 'none';
            });
            
            // Update score and store for review
            if (isCorrect) {
                score += 10;
                correctSound.play();
            } else {
                wrongSound.play();
            }
            
            selectedOptions.push({
                question: currentQuestion.question,
                selected: selectedOption,
                correct: currentQuestion.answer,
                isCorrect,
                explanation: currentQuestion.explanation
            });
            
            // Show feedback
            showFeedback(isCorrect, currentQuestion.explanation);
            nextBtn.textContent = 'Next Question';
            isAnswerSubmitted = true;
        } else {
            // Advance to Next Question
            nextBtn.classList.add('bounce');
            setTimeout(() => nextBtn.classList.remove('bounce'), 500); // Match bounce duration
            
            feedbackContainer.classList.add('fade-out');
            setTimeout(() => {
                feedbackContainer.classList.add('hidden');
                feedbackContainer.classList.remove('fade-out');
                
                currentQuestionIndex++;
                selectedOption = null;
                isAnswerSubmitted = false;
                
                if (currentQuestionIndex < currentQuiz.length) {
                    loadQuestion();
                    nextBtn.textContent = 'Submit Answer';
                } else {
                    showResults();
                }
            }, 300); // Match fade-out duration
        }
    });

    // Show Feedback
    function showFeedback(isCorrect, explanation) {
        feedbackContainer.classList.remove('hidden');
        feedbackContainer.classList.add('fade-in');
        
        if (isCorrect) {
            feedbackIcon.innerHTML = '<i class="fas fa-check-circle correct-feedback"></i>';
            feedbackText.textContent = 'Correct!';
            feedbackText.style.color = 'var(--success-color)';
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times-circle incorrect-feedback"></i>';
            feedbackText.textContent = 'Incorrect!';
            feedbackText.style.color = 'var(--error-color)';
        }
        
        explanationText.textContent = explanation;
    }

    // Start Timer
    function startTimer() {
        timeLeft = 30;
        timerDisplay.textContent = timeLeft;
        
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                if (!selectedOption && !isAnswerSubmitted) {
                    autoSelectOption();
                }
            }
        }, 1000);
    }

    // Auto Select Option
    function autoSelectOption() {
        const options = document.querySelectorAll('input[name="quiz-option"]');
        if (options.length > 0 && !selectedOption) {
            options[0].checked = true;
            selectedOption = options[0].value;
            nextBtn.click();
        }
    }

    // Show Results
    function showResults() {
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');
        completeSound.play();
        
        const maxScore = currentQuiz.length * 10;
        const percentage = (score / maxScore) * 100;
        
        resultScore.textContent = `${userName}, you scored ${score} out of ${maxScore} (${percentage.toFixed(1)}%)`;
        
        if (percentage === 100) {
            resultIcon.innerHTML = '<i class="fas fa-trophy success-icon bounce"></i>';
            resultTitle.textContent = 'Perfect Score!';
            resultMessage.textContent = 'Incredible! You aced the quiz!';
            createBlastEffect();
        } else if (percentage >= 80) {
            resultIcon.innerHTML = '<i class="fas fa-trophy success-icon bounce"></i>';
            resultTitle.textContent = 'Excellent!';
            resultMessage.textContent = 'You have an outstanding knowledge in this area!';
        } else if (percentage >= 50) {
            resultIcon.innerHTML = '<i class="fas fa-award average-icon bounce"></i>';
            resultTitle.textContent = 'Good Job!';
            resultMessage.textContent = 'You have a decent understanding, but there\'s room for improvement.';
        } else {
            resultIcon.innerHTML = '<i class="fas fa-redo fail-icon bounce"></i>';
            resultTitle.textContent = 'Keep Practicing!';
            resultMessage.textContent = 'Don\'t worry, keep learning and you\'ll improve!';
        }
    }

    // Show Review
    reviewBtn.addEventListener('click', () => {
        resultScreen.querySelector('.result-card').classList.add('hidden');
        reviewScreen.classList.remove('hidden');
        
        reviewQuestionsContainer.innerHTML = '';
        
        selectedOptions.forEach((item, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('review-question');
            
            questionElement.innerHTML = `
                <h4>Question ${index + 1}: ${item.question}</h4>
                <p class="review-answer ${item.isCorrect ? 'review-correct' : 'review-incorrect'}">
                    <strong>Your answer:</strong> ${item.selected}
                </p>
                <p class="review-answer review-correct">
                    <strong>Correct answer:</strong> ${item.correct}
                </p>
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${item.explanation}
                </div>
            `;
            
            reviewQuestionsContainer.appendChild(questionElement);
        });
    });

    // Back to Results
    backToResultsBtn.addEventListener('click', () => {
        reviewScreen.classList.add('hidden');
        resultScreen.querySelector('.result-card').classList.remove('hidden');
    });

    // Restart Quiz
    restartBtn.addEventListener('click', () => {
        resultScreen.classList.remove('active');
        startScreen.classList.add('active');
        
        currentQuestionIndex = 0;
        score = 0;
        selectedOptions = [];
        selectedOption = null;
        isAnswerSubmitted = false;
        usernameInput.value = '';
    });

    // Reset State
    function resetState() {
        clearInterval(timer);
        timeLeft = 30;
        timerDisplay.textContent = timeLeft;
        optionsContainer.innerHTML = '';
        feedbackContainer.classList.add('hidden');
        nextBtn.textContent = 'Submit Answer';
        isAnswerSubmitted = false;
    }
});