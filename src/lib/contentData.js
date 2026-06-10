export const domains = [
  { id: 'mechanical', name: 'Mechanical Engineering', icon: '⚙️' },
  { id: 'electrical', name: 'Electrical Engineering', icon: '⚡' },
  { id: 'chemical', name: 'Chemical Engineering', icon: '🧪' },
  { id: 'computer-science', name: 'Computer Science', icon: '💻' }
];

export const services = [
  { id: 'assignment-help', name: 'Assignment Help', icon: '📋', desc: 'Step-by-step homework solutions, lab calculations, and daily coursework assistance.' },
  { id: 'dissertation-help', name: 'Dissertation Help', icon: '🎓', desc: 'High-quality research assistance, thesis chapters, literature reviews, and proposals.' },
  { id: 'exam-prep', name: 'Exam Preparation', icon: '📚', desc: 'Tailored revision plans, mock exams, concept summaries, and practice worksheets.' },
  { id: 'lab-projects', name: 'Lab & Projects Help', icon: '🛠️', desc: 'Practical lab report writing, software simulation runs, and semester project designs.' }
];

// Content map: [domainId][serviceId]
export const contentData = {
  mechanical: {
    'assignment-help': {
      title: 'Mechanical Engineering Assignment Help',
      desc: 'Accurate and detailed solutions for mechanical engineering assignments. We provide clear derivations, step-by-step math, and conceptual explanations.',
      topics: ['Thermodynamics Calculations', 'Fluid Mechanics Problems', 'Statics & Dynamics Derivations', 'Heat Transfer Equations', 'Solid Mechanics Problems', 'Kinematics Worksheets'],
      benefits: [
        { icon: '📐', title: 'Step-by-Step Derivations', desc: 'Every solution is written out clearly with all intermediate algebraic steps.' },
        { icon: '🔧', title: 'Experienced ME Grads', desc: 'Handled by mechanical engineers holding advanced Masters/PhD degrees.' }
      ]
    },
    'dissertation-help': {
      title: 'Mechanical Engineering Dissertation Help',
      desc: 'Professional research and writing assistance for undergraduate, masters, and PhD theses in Mechanical Engineering.',
      topics: ['FEA Structural Analysis Research', 'Renewable Energy Systems Study', 'Advanced Materials Science Thesis', 'Manufacturing Process Optimization', 'Vibration Analysis Literature Review'],
      benefits: [
        { icon: '📝', title: 'Research-Grade Writing', desc: 'In-depth literature reviews, methodologies, and thesis formatting.' },
        { icon: '📊', title: 'Data Analysis & Plotting', desc: 'Help plotting finite element analysis (FEA) and computational fluid dynamics (CFD) results.' }
      ]
    },
    'exam-prep': {
      title: 'Mechanical Engineering Exam Prep',
      desc: 'Ace your upcoming engineering examinations with targeted review packages, cheat sheets, and solved practice exams.',
      topics: ['Thermodynamics Exam Review', 'Fluid Dynamics Prep Problems', 'Mechanical Vibration Mock Exams', 'Heat Exchanger Design Worksheets'],
      benefits: [
        { icon: '🎯', title: 'Concept Summaries', desc: 'Condensed summaries of core equations, boundary conditions, and laws.' },
        { icon: '⏱️', title: 'Time-Management Prep', desc: 'Practice mock exams structured under standard university test durations.' }
      ]
    },
    'lab-projects': {
      title: 'Mechanical Lab & Projects Help',
      desc: 'Expert support with CAD models, robotic simulations, Control Systems lab reports, and HVAC layout projects.',
      topics: ['SolidWorks & AutoCAD 3D Models', 'ANSYS Structural & Thermal Simulations', 'MATLAB Control Systems Lab', 'Robotics & Automation Simulation', 'HVAC Design & Semester Projects'],
      benefits: [
        { icon: '💻', title: 'CAD/CFD Software Experts', desc: 'We deliver functional CAD source files, meshes, and simulation outputs.' },
        { icon: '🛠️', title: 'Rigorous Lab Reports', desc: 'Accurate data tables, error analysis, and engineering conclusions.' }
      ]
    }
  },
  electrical: {
    'assignment-help': {
      title: 'Electrical Engineering Assignment Help',
      desc: 'Reliable help solving circuit analysis, signals & systems, and analog electronics homework tasks with absolute precision.',
      topics: ['Circuit Analysis (AC/DC)', 'KCL/KVL & Mesh Analysis Problems', 'Signal & Systems Fourier Transforms', 'Electromagnetics & Field Equations', 'Analog Circuit Design Math'],
      benefits: [
        { icon: '⚡', title: 'EE Core Experts', desc: 'Assignments solved by qualified tutors specialized in electrical and electronics.' },
        { icon: '📈', title: 'Detailed Waveform Graphs', desc: 'Includes clear signal plots, phasor diagrams, and schematic drawings.' }
      ]
    },
    'dissertation-help': {
      title: 'Electrical Engineering Dissertation Help',
      desc: 'Academic research support for senior design papers, engineering theses, and research proposals in EE.',
      topics: ['Smart Grid Power Distribution System', 'VLSI Design & Semiconductor Thesis', 'Wireless Communication Systems Research', 'Renewable Energy Grid Integration'],
      benefits: [
        { icon: '🔬', title: 'Academic Research Standards', desc: 'Assistance formatting literature reviews and methodology chapters.' },
        { icon: '📂', title: 'Data Validation', desc: 'We help tabulate simulation data and run comparative performance analyses.' }
      ]
    },
    'exam-prep': {
      title: 'Electrical Engineering Exam Prep',
      desc: 'Structured study guides, step-by-step formula reviews, and mock papers for midterms and finals.',
      topics: ['Electronics Exam Prep', 'Power Systems Review Questions', 'Signals & Transforms Study Sheets', 'Digital Logic Design Mock Tests'],
      benefits: [
        { icon: '📝', title: 'Custom Formula Cards', desc: 'Cheat sheets covering Laplace, Z-transforms, and Fourier series.' },
        { icon: '🏆', title: 'Grading Rubric Target', desc: 'Solutions structured exactly to earn maximum points from university graders.' }
      ]
    },
    'lab-projects': {
      title: 'Electrical Lab & Projects Help',
      desc: 'Get your hardware projects, circuit simulations, microcontrollers coding, and lab reports done by experts.',
      topics: ['MATLAB/Simulink Simulations', 'LTSpice & Multisim Circuits', 'Embedded Systems & Arduino Coding', 'PCB Layout & Altium Design Projects', 'FPGA Programming (VHDL/Verilog)'],
      benefits: [
        { icon: '💻', title: 'Simulation File Delivery', desc: 'Direct delivery of source simulator files (.asc, .ms, etc.).' },
        { icon: '📝', title: 'Professional Lab Reports', desc: 'Well-formatted reports with scope plots, tables, and analysis.' }
      ]
    }
  },
  chemical: {
    'assignment-help': {
      title: 'Chemical Engineering Assignment Help',
      desc: 'Master material balances, chemical kinetics, and thermodynamics with calculations structured for clarity.',
      topics: ['Chemical Thermodynamics Problems', 'Reaction Kinetics & Rate Laws', 'Mass & Energy Balance Sheets', 'Fluid Flow & Pipe Network Math', 'Heat Exchanger Sizing Calculations'],
      benefits: [
        { icon: '🧪', title: 'Chemical Principles Specialists', desc: 'Assistance from chemistry and chemical engineering postgraduates.' },
        { icon: '🔍', title: 'Unit Consistency Checks', desc: 'Every solution includes rigorous unit analysis and check steps.' }
      ]
    },
    'dissertation-help': {
      title: 'Chemical Engineering Dissertation Help',
      desc: 'Top-tier thesis and dissertation research support for chemical process engineering and material science.',
      topics: ['Catalysis & Reactor Design Thesis', 'Polymer Science Research Paper', 'Biochemical Engineering Proposals', 'Green Chemistry Process Design'],
      benefits: [
        { icon: '🧬', title: 'Advanced Research Support', desc: 'Assistance writing literature reviews, chemical pathways, and conclusions.' },
        { icon: '📈', title: 'Process Flow Diagrams', desc: 'We help create clear process flows (PFD) and process layout studies.' }
      ]
    },
    'exam-prep': {
      title: 'Chemical Engineering Exam Prep',
      desc: 'Prepare for reaction engineering, separations, and process control exams with solved practice packages.',
      topics: ['Kinetics & Reactor Exam Prep', 'Separation Processes Study Guides', 'Process Control Mock Exams', 'Fluid Mechanics Practice Sets'],
      benefits: [
        { icon: '📖', title: 'Core Equation Guides', desc: 'Formula sheets covering transport phenomena, kinetics, and thermodynamics.' },
        { icon: '🏆', title: 'Solved Mock Exams', desc: 'Full step-by-step walkthroughs of past exams and standard review questions.' }
      ]
    },
    'lab-projects': {
      title: 'Chemical Lab & Projects Help',
      desc: 'Get help with Aspen Plus process design, biochemical lab reports, and semester design projects.',
      topics: ['Aspen Plus & HYSYS Process Simulation', 'Plant Design Semester Projects', 'Safety & HAZOP Analysis Reports', 'Biochemical Engineering Lab Reports'],
      benefits: [
        { icon: '📈', title: 'Simulation Flowsheets', desc: 'Detailed simulation reports with stream tables, design parameters, and charts.' },
        { icon: '🌿', title: 'Technical Reporting', desc: 'Reports formatted strictly to engineering department submission rules.' }
      ]
    }
  },
  'computer-science': {
    'assignment-help': {
      title: 'Computer Science Assignment Help',
      desc: 'Clean, working code and detailed analysis for algorithms, data structures, and database assignments.',
      topics: ['Data Structures (Trees, Graphs)', 'Algorithm Complexity (Big-O)', 'SQL Queries & Database Design', 'Computer Networks Protocols', 'Operating Systems Scripts'],
      benefits: [
        { icon: '🚀', title: 'Clean, Documented Code', desc: 'Code written following industry styles with extensive inline comments.' },
        { icon: '🌐', title: 'All Languages Supported', desc: 'Expertise in Python, Java, C++, JavaScript, Go, Rust, SQL, and Assembly.' }
      ]
    },
    'dissertation-help': {
      title: 'Computer Science Dissertation Help',
      desc: 'Research, architecture design, and academic writing support for computer science dissertations and AI/ML theses.',
      topics: ['Machine Learning Model Thesis', 'Distributed Systems Performance Study', 'Cloud Computing & Serverless Proposals', 'Blockchain Smart Contract Security'],
      benefits: [
        { icon: '🤖', title: 'Cutting-Edge Tech Support', desc: 'Advanced literature surveys on AI, NLP, computer vision, and systems.' },
        { icon: '📂', title: 'Architecture Documentation', desc: 'Help drafting system UML diagrams, data models, and API definitions.' }
      ]
    },
    'exam-prep': {
      title: 'Computer Science Exam Prep',
      desc: 'Practice logic problems, trace tables, complexity proofs, and mock exams for computing courses.',
      topics: ['Data Structures Midterm Prep', 'Algorithms Exam Practice Sheets', 'Automata & Theory of Computation', 'Computer Architecture Review Sheets'],
      benefits: [
        { icon: '📝', title: 'Trace & Debug Worksheets', desc: 'Guides on tracing loops, recursion, stack states, and pointers.' },
        { icon: '🏆', title: 'Solved Theory Proofs', desc: 'Step-by-step answers showing induction proofs and state machine diagrams.' }
      ]
    },
    'lab-projects': {
      title: 'Computer Science Lab & Projects Help',
      desc: 'Get full support for web apps, mobile applications, software engineering labs, and DevOps setups.',
      topics: ['Full-Stack Web App Projects', 'Mobile Development Labs (React Native/Flutter)', 'AI/ML Model Training & Simulation Runs', 'CI/CD Pipeline & DevOps Semester Projects'],
      benefits: [
        { icon: '✅', title: 'Fully Tested Repos', desc: 'We deliver working code packages tested and verified for correct execution.' },
        { icon: '📂', title: 'Setup Guides Included', desc: 'Comprehensive README files explaining how to install and run the code.' }
      ]
    }
  }
};
