/* the words on the site. change them here, no other file needs touching */

const CONTENT = {
  roles: ["Aspiring Data Analyst", "Data Enthusiast", "Curious Problem Solver"],
  heroText: "I like turning numbers into clear, useful stories.",
  bio: "Hi, I'm Mikaella! I'm an aspiring data analyst who enjoys cleaning messy data, finding patterns and turning them into simple charts and insights. I'm always learning new tools and looking for real projects to practice on.",

  // her photo: drop a picture in assets/images/ and put its name here, like "assets/images/me.jpg"
  photo: "assets/images/avatar.svg",

  // an empty url hides that link. copy a line to add more
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mikaella-daet-65246a337?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { name: "GitHub", url: "https://github.com/KAELLAAA" },
    { name: "Facebook", url: "https://www.facebook.com/share/1L8d7sd1yW/" },
    { name: "Instagram", url: "https://www.instagram.com/justkaellaa?jplx=aDBobzJ6MWd5ajV1" },
    { name: "Gmail: mikadaett@gmail.com", url: "https://mail.google.com/mail/u/2/#inbox"}
  ],

  ticker: ["DATA ANALYTICS", "DATA CLEANING", "DATA VISUALIZATION", "DASHBOARDS", "REPORTING", "STATISTICS", "OPEN FOR OPPORTUNITIES"],

  terminal: [
    { cmd: "SELECT name FROM me;", out: "Mikaella C. Daet" },
    { cmd: "SELECT role FROM me;", out: "aspiring data analyst" },
    { cmd: "SELECT strengths FROM me;", out: "clean data, clear charts, good stories" },
    { cmd: "SELECT status FROM me;", out: "learning something new every day" }
  ]
};

// level is 0-100. these are just sample skills, swap in what she really knows.
// under 40 shows "learning", under 65 "comfortable", 65+ "strong"
const SKILLS = [
  { name: "Data Cleaning", lvl: 60, color: "a1", note: "Fixing messy data so it is ready to analyze." },
  { name: "Excel / Spreadsheets", lvl: 65, color: "a2", note: "Formulas, pivot tables and simple charts." },
  { name: "Data Visualization", lvl: 55, color: "a3", note: "Turning numbers into clear charts." },
  { name: "SQL", lvl: 40, color: "a4", note: "Querying data from tables." },
  { name: "Statistics", lvl: 45, color: "a1", note: "Averages, trends and basic analysis." },
  { name: "Python", lvl: 30, color: "a2", note: "Learning pandas for analysis." }
];

// projects that always show first. anything published from the admin comes after these.
// category: "game" shows as Analysis, "website" shows as Dashboard (old internal names)
const FEATURED_PROJECTS = [];
