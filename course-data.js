// JobDiva ATS Mastery — course content derived from the Batch 118 Training Day 4 recording
// Source: "Batch 118_2026_Training day 4_Job Diva Training and Hands on-20260806_110230-Meeting Recording.mp4"
// Duration: 3:12:35 (11555s). All timestamps in seconds from recording start.

const VIDEO_PARTS = ["out/parts/Batch118_part1.mp4", "out/parts/Batch118_part2.mp4", "out/parts/Batch118_part3.mp4", "out/parts/Batch118_part4.mp4"];
const VIDEO_SRC = VIDEO_PARTS[0];

function fmt(s){
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = Math.floor(s%60);
  return (h>0? h+":" : "") + String(m).padStart(h>0?2:1,"0") + ":" + String(sec).padStart(2,"0");
}

const COURSE = {
  title: "JobDiva ATS Mastery for US Staffing Recruiters",
  subtitle: "From the live Batch 118 Training Day 4 recording",
  description: "A complete, hands-on walkthrough of JobDiva — the Applicant Tracking System used at HonorVet Technologies — built directly from a live trainer-led recruiter training session. Covers the full recruiter workflow: navigating JobDiva's interface, sourcing candidates with Boolean search, managing jobs and candidates, mass email outreach, and the end-to-end HireTrack placement process from Right-to-Represent through Start.",
  audience: "New and existing US healthcare/IT staffing recruiters who use (or will use) JobDiva as their primary ATS, plus team leads onboarding new hires.",
  prerequisites: "None required. Basic familiarity with staffing/recruiting terminology (client, submittal, candidate, RTR) is helpful but not mandatory — key terms are defined as they appear.",
  totalDuration: "~56 min of trimmed video clips (sourced from a 3h12m recording) + ~45 min knowledge checks and practice activities",
  objectives: [
    "Navigate JobDiva's interface — top bar, left navigation, and the four core functional bars (Sourcing, Jobs, Analytics, Engagement)",
    "Create and clean a new job order, including JobDiva Cleaning and Job Description Cleaning",
    "Build effective Boolean search strings using all six operators to source candidates in Talent Search",
    "Add, organize, and manage candidates — including hot lists, bulk uploads, and candidate profile tools",
    "Run compliant mass email merge campaigns without triggering spam flags",
    "Execute the full HireTrack process: ownership/RTR, internal submission, external submission, interview updates, and Start",
    "Apply healthcare-specific vs. IT-specific distinctions throughout the recruiting workflow"
  ],
  modules: [] // populated below
};

function addModule(id, title, summary, lessons){
  COURSE.modules.push({ id, title, summary, lessons });
}

// ---------------- MODULE 1 ----------------
addModule("m1", "Orientation: What Is JobDiva?", "The top bar, role-based access, and where to get help before touching a single job or candidate.", [
  {
    id:"1.1", title:"What Is an ATS, and Where JobDiva Fits", part:1, start:18, end:118,
    objective:"Explain what an ATS does and how JobDiva's role-based access model works.",
    learn:[
      "ATS = Applicant Tracking System — simplifies sourcing and job management; JobDiva is HonorVet's chosen ATS (others in the market: CEIPAL, Bullhorn, and in-house builds)",
      "JobDiva access is role-based: SuperAdmin/Admin users control the whole system; recruiters see only their allocated portion",
      "Every user gets individual credentials created by the SuperAdmin or their manager"
    ],
    skills:["Interface orientation", "Role/permission awareness"],
    terms:[["ATS","Applicant Tracking System — software that simplifies sourcing candidates and managing jobs, used broadly across recruiting companies."],["SuperAdmin/Admin","The highest-level JobDiva user with full rights to configure and change the system for the organization."]],
    takeaways:["Your JobDiva view is intentionally limited to your role — that's by design, not a bug.","Never expect the same screen as your manager or admin."],
    check:{q:"Who is responsible for creating a new recruiter's JobDiva login credentials?", options:["The recruiter, from a self-service portal","The SuperAdmin (or a manager working with the SuperAdmin)","JobDiva support, automatically","The client company"], answer:1, explain:"Credentials are always provisioned top-down by the SuperAdmin/Admin, often coordinated with the recruiter's manager."},
  },
  {
    id:"1.2", title:"The Upper Bar: Search, Favorites & Alerts", part:1, start:210, end:358,
    objective:"Use JobDiva's universal search bar and understand Favorites and Alerts.",
    learn:[
      "The universal search bar accepts a candidate name, email, phone, or Job ID / Reference ID, and can include close matches",
      "Favorites are admin-preset shortcuts tailored to your role — leave them alone",
      "Alerts show your own JobDiva activity (status changes, assignments, JD edits)",
      "VMS synchronization (a.k.a. the 'Codler') automatically feeds job requirements from a client's Vendor Management System into JobDiva"
    ],
    skills:["Universal search", "Reading Alerts", "Understanding VMS sync"],
    terms:[["VMS","Vendor Management System — the client's portal through which job requirements flow to the staffing vendor."],["VMS synchronization / Codler","JobDiva's built-in integration that connects to a client's VMS via saved login/link so job data flows automatically."]],
    takeaways:["The fastest, most precise search uses Job ID / Reference ID or an exact email — not a generic name.","Don't customize Favorites — they're calibrated to your position."],
    check:{q:"What does VMS synchronization (the 'Codler') actually do?", options:["Lets recruiters message each other inside JobDiva","Automatically exchanges job requirement data between a client's VMS and JobDiva","Backs up JobDiva data nightly","Posts jobs to LinkedIn automatically"], answer:1, explain:"It's an integration link (with saved credentials) that lets JobDiva and a client's VMS portal exchange job data automatically."},
  },
  {
    id:"1.3", title:"News, Training Webinars & the Help/Chatbot", part:1, start:455, end:809,
    objective:"Find release notes, role-specific training webinars, and self-service help inside JobDiva.",
    learn:[
      "The News icon lists Enhancements/Updates (e.g., AI-assisted job posting edits) — customization varies by company",
      "The Training tab under News offers role-based webinars: recruiter, admin, CRM/BDM, advanced BI, AI features, and a dedicated healthcare recruiting webinar",
      "The Help icon and general chatbot answer feature-specific questions; escalate to JobDiva support if unresolved"
    ],
    skills:["Self-service learning", "Using in-app help"],
    terms:[["Global Prompt","A team-level standard AI prompt configuration for refining AI-generated results consistently."]],
    takeaways:["JobDiva has an exclusive healthcare-recruiting training track — check it if you're in that vertical.","Use the chatbot before escalating a question to support."],
    check:{q:"Where would you look to find a JobDiva webinar specifically covering healthcare recruiting features?", options:["The Alerts icon","The News icon's Training tab","The Favorites bar","Settings"], answer:1, explain:"News > Training lists role- and vertical-specific webinars, including one exclusively for healthcare recruiting."},
  },
  {
    id:"1.4", title:"Your Profile, VPN Access & the Left Navigation", part:1, start:817, end:956,
    objective:"Manage your profile settings and understand the left-nav layout of applications and bars.", prerequisite:"1.1",
    learn:[
      "Your profile icon lets you sign out, check/verify your division and details, and request corrections from admin if wrong",
      "VPN installation (via IT) is required to access JobDiva outside office hours/network",
      "The left nav's Homepage icon returns you to your role-based homepage; 'Applications' and 'Bars' are the building blocks of the interface"
    ],
    skills:["Profile management", "Navigating applications vs. bars"],
    terms:[["Bars","The grouped white-space sections in the left nav (e.g., Sourcing, Jobs) that contain related applications."],["Applications","Individual clickable tools/icons within a bar."]],
    takeaways:["If your profile shows the wrong division, get it corrected by admin — don't work around it.","VPN is mandatory for any off-hours JobDiva access."],
  },
]);

// ---------------- MODULE 2 ----------------
addModule("m2", "Dashboard, History & the Four Bars", "Your personal dashboard, activity history, and the map of Sourcing / Jobs / Analytics / Engagement.", [
  {
    id:"2.1", title:"Your User Dashboard & History", part:1, start:969, end:1202,
    objective:"Customize your personal dashboard widgets and use History to trace past activity.",
    learn:[
      "The User Dashboard is individual and customizable: add/remove widgets like sales activity, current employees, submittal due dates, to-do lists, and 'my active opportunity funnel'",
      "Dashboard accuracy depends entirely on real-time data entry — if jobs/assignments aren't added in real time, your dashboard won't reflect reality",
      "The History section is a click-history log of candidates, jobs, and pages you've opened, filterable by date"
    ],
    skills:["Dashboard customization", "Using History for recall"],
    terms:[["User Dashboard","An individual, customizable homepage widget panel showing personal recruiting metrics."]],
    takeaways:["A clean, accurate dashboard is a direct result of real-time data entry discipline — not a JobDiva setting."],
    check:{q:"Why might your customized dashboard widget show inaccurate or incomplete numbers?", options:["JobDiva has a weekly refresh delay only","Because jobs/actions weren't added or updated in real time","Dashboards can only show data from the prior month","Only managers can see accurate dashboards"], answer:1, explain:"Dashboard metrics only reflect what's actually been entered in real time — stale or missing entries produce inaccurate widgets."},
  },
  {
    id:"2.2", title:"Settings & the Four Functional Bars", part:1, start:1225, end:1342,
    objective:"Identify the Sourcing, Jobs, Analytics, and Engagement bars and know which ones recruiters use most.",
    learn:[
      "Never self-edit Settings — request changes through your manager, who escalates to the admin team/SuperAdmin",
      "Sourcing bar (candidate management/allocation) and Jobs bar (job management/allocation) are a recruiter's primary tools",
      "Analytics (reports/ratings) access is individually restricted by manager/level",
      "Engagement (calendar, interviews, live interviews) is used more heavily in IT recruiting; healthcare recruiters use its calendar/interview features differently, covered later"
    ],
    skills:["Reading the four-bar structure", "Knowing escalation paths for settings"],
    terms:[["Sourcing bar","Candidate management and allocation tools."],["Jobs bar","Job management and allocation tools."],["Analytics","Reporting and ratings, access-restricted."],["Engagement","Calendar, tasks, interviews, live interviews, e-interviews."]],
    takeaways:["As a recruiter, you'll live mostly in Sourcing and Jobs — Analytics and parts of Engagement are more manager-facing."],
    check:{q:"Which two bars will a recruiter use the most day-to-day?", options:["Analytics and Engagement","Sourcing and Jobs","Jobs and Analytics","Engagement and Sourcing"], answer:1, explain:"Sourcing (candidates) and Jobs (job orders) are the two bars recruiters live in day-to-day."},
  },
]);

// ---------------- MODULE 3 ----------------
addModule("m3", "The Jobs Bar: Finding & Creating Jobs", "My Jobs, Search Jobs, and building a brand-new job order from scratch — including JobDiva Cleaning and JD Cleaning.", [
  {
    id:"3.1", title:"My Jobs, Primary vs. Secondary & Search Jobs", part:1, start:1393, end:1943,
    objective:"Distinguish primary/secondary recruiter roles and search for existing jobs efficiently.",
    learn:[
      "My Jobs shows all open jobs assigned to you; My Jobs as Primary filters to just the jobs where you're the primary recruiter (your priority fills)",
      "Primary Recruiter = primarily assigned; Secondary Recruiter = secondarily assigned; Primary Sales = the account manager you submit candidates to",
      "Search Jobs supports filtering by date range, status, and — best practice — searching directly by JobDiva ID or Reference ID",
      "Reference ID (a.k.a. Optional Reference ID) is the client's job number; JobDiva ID is JobDiva's own auto-generated number"
    ],
    skills:["Job list filtering", "Primary/secondary role identification", "Fast job lookup"],
    terms:[["Primary Recruiter","The recruiter primarily assigned to and responsible for filling a job."],["Secondary Recruiter","A recruiter secondarily assigned to help fill a job."],["Primary Sales","The account manager to whom a recruiter submits candidate profiles."],["Reference ID","The client-assigned unique job number (also called Optional Reference ID)."],["JobDiva ID","JobDiva's own system-generated unique job number."]],
    takeaways:["The fastest way to find a job is by its JobDiva ID or Reference ID — not by typing the title."],
    check:{q:"A job shows you as 'Secondary Recruiter.' What does that mean?", options:["You created the job manually","You are the account manager on the job","You're assigned to help fill the job, but you are not the primary owner","The job is closed"], answer:2, explain:"Secondary recruiter means you're assigned to assist, while the Primary Recruiter carries lead responsibility for filling it."},
    practice:"Open Search Jobs and locate one existing open job using only its JobDiva ID or Reference ID — note how much faster this is than a title search."
  },
  {
    id:"3.2", title:"Creating a New Job — Core Fields", part:1, start:1956, end:2315,
    objective:"Fill out a New Job form correctly: title, specialty, position type, division, client, facility, address, schedule, and billing.",
    learn:[
      "Create a job manually when the VMS/Codler integration fails, or when a requirement arrives by email",
      "'JobDiva Cleaning' = accurately entering all the structured job fields (title, specialty, position type, reference ID, priority, contact, division, company, facility, address, schedule, billing, openings, max submissions)",
      "The Divisions field changes based on whether you work in IT or healthcare — always select your own vertical's options",
      "Always enter a complete address (facility + city + street + zip + area code) and set a realistic Submitted Due Date"
    ],
    skills:["New Job data entry", "JobDiva Cleaning", "Vertical-aware division selection"],
    terms:[["JobDiva Cleaning","Accurately and completely filling in a job's structured fields as a quality-assurance step, distinct from JD Cleaning."],["Harvest","JobDiva's AI-assisted sourcing feature that pulls matching resumes from the database and job boards into an active job."],["Contact","The hiring manager or client representative for a position."]],
    takeaways:["Submitted Due Date is a mandatory field — don't skip it.","Bill rate should always be entered, even though JobDiva doesn't currently use it to auto-calculate total compensation."],
    check:{q:"When should you manually create a New Job instead of relying on automatic VMS sync?", options:["Every single time, regardless of source","Only for healthcare jobs","When the Codler/VMS sync fails, or the requirement came by email","Never — manual creation is disabled"], answer:2, explain:"Manual creation is the fallback for technical VMS sync issues or email-delivered requirements not yet in JobDiva."},
    practice:"Using a sample requirement (make one up: title, client, location, shift, bill rate), fill out every core New Job field you've learned before moving to the description."
  },
  {
    id:"3.3", title:"Job Description (JD) Cleaning", part:1, start:2322, end:2957,
    objective:"Format a raw job description into a clean, postable JD following the three-part structure.",
    prerequisite:"3.2",
    learn:[
      "JD Cleaning is distinct from JobDiva Cleaning — it's specifically about formatting the description text since it syncs live to external portals and the company website",
      "A good JD has three parts: (1) Intro to the job, (2) Requirements/Qualifications (must-haves), (3) Preferred/desired skills (nice-to-haves)",
      "Formatting rules: zero paragraph spacing, minimal highlighting, sparing use of underline (titles only), keep it simple and short",
      "Never include client-sensitive info or contract details; client name is optional to post — best practice is to omit it and share it manually via email instead",
      "Shift timing differs by vertical: IT tends to be fixed (e.g., 9–6); healthcare shifts vary by client and can be day/night/rotational"
    ],
    skills:["JD formatting", "Three-part JD structuring", "Client confidentiality judgment"],
    terms:[["JD Cleaning / Job Description Cleaning","Formatting the raw job description text (spacing, structure, confidentiality) before it posts live to portals/website."],["Submittal Packet","A healthcare-specific compliance package (references, drug test, security clearance, etc.) required for external submission."]],
    takeaways:["We highly recommend NOT posting the client's name publicly — share it manually by email instead.","If a client only gives requirements with no context, loop in your account manager for more detail rather than guessing."],
    check:{q:"Which of these should you avoid including when cleaning a job description for external posting?", options:["The professional specialty","The shift timing","The client's sensitive/contract information","The required certifications"], answer:2, explain:"Client-sensitive info and contract terms should never appear in an externally-posted job description."},
    practice:"Take a messy, unformatted paragraph (write one for an RN or IT role) and reformat it into the three-part JD structure: Intro, Requirements, Preferred Skills."
  },
  {
    id:"3.4", title:"Requirements, User Assignment & Saving the Job", part:2, start:19, end:255,
    objective:"Complete the Requirements and User tabs, then save a job to generate its JobDiva ID.",
    prerequisite:"3.3",
    learn:[
      "The Requirements tab captures client compliance needs (e.g., vaccination status, shift preference) and, in healthcare, ties into the Submittal Packet",
      "Only managers can assign a job to a Primary/Secondary Recruiter or Primary/Secondary Sales in the User tab — the assigned recruiter gets an email notification",
      "Remarks captures any extra client notes; clicking Save finalizes the job and generates its unique JobDiva ID"
    ],
    skills:["Compliance requirement entry", "Understanding assignment authority", "Finalizing a job record"],
    terms:[["Requirements tab","Where client compliance/qualification needs for a position are recorded."]],
    takeaways:["You'll always know a job is properly assigned because you'll receive a dedicated email notification."],
  },
  {
    id:"3.5", title:"My Job Dashboard & the Job-Level Dashboard", part:2, start:260, end:624,
    objective:"Read the My Job Dashboard's columns and filters, and the job-level cumulative dashboard.",
    learn:[
      "My Job Dashboard lists every assigned job's issue date, division, title, location, company, bill/salary rate, status, priority, submissions, and interview activity",
      "Useful filters: 'open jobs with no submitters' and 'pending interviews' (interview happened but status wasn't updated)",
      "The job-level dashboard is a cumulative view of one position's total submissions, interviews, and hires",
      "Dashboard accuracy for both views depends on recruiters updating statuses (submissions, interview outcomes) in real time in the 'node' section, covered later"
    ],
    skills:["Reading dashboard columns", "Using dashboard filters to prioritize work"],
    terms:[["Pending Interviews filter","Flags jobs where an interview occurred but its status was never updated in JobDiva."]],
    takeaways:["If your dashboard shows 'pending interviews,' that's a signal to go update statuses — not a system error."],
    check:{q:"Your My Job Dashboard shows a job under 'open jobs with no submitters.' What does that tell you?", options:["The job is closed","You haven't submitted any candidate to that job yet","The candidate was rejected","The interview hasn't been scheduled"], answer:1, explain:"That filter flags jobs assigned to you where zero submissions have been made so far — a prioritization cue."},
  },
]);

// ---------------- MODULE 4 ----------------
addModule("m4", "Analytics & Engagement", "Manager-facing reports, plus Calendar, Tasks, Live Interviews, and E-Interviews.", [
  {
    id:"4.1", title:"Analytics: Submittal Matrix & Activity Reports", part:2, start:690, end:802,
    objective:"Understand what the Submittal Matrix and job-activity reports show (mostly a manager's view).",
    learn:[
      "The Submittal Matrix Report checks submittals by user/department/date range — mainly a manager tool for tracking recruiter output (submissions, interviews, hires)",
      "A related activity/summary report breaks down open/closed jobs by client, group, or division",
      "Recruiter access to these reports is individually authorized"
    ],
    skills:["Reading manager-level reports"],
    terms:[["Submittal Matrix Report","A filterable report showing submissions/interviews/hires per user or team over a date range."]],
    takeaways:["Don't be surprised if you can't access every Analytics report — access is role-gated."],
  },
  {
    id:"4.2", title:"Engagement: Calendar & Task Assignment", part:2, start:880, end:1031,
    objective:"Create a calendar event and assign a task inside JobDiva's Engagement bar.",
    learn:[
      "My Calendar lets you create events with subject, candidate, time, recurrence type, location, and description; saving auto-emails the invite",
      "Outlook sync for the calendar was noted as temporarily non-functional (a known technical issue at time of recording) — verify current status locally",
      "Tasks can be assigned to a colleague, recruiter, manager, or candidate with a due date, type, and completion percentage; saving sends a notification email"
    ],
    skills:["Calendar event creation", "Task assignment"],
    terms:[["My Calendar","JobDiva's internal scheduling tool, intended to sync with Outlook."]],
    takeaways:["Always confirm exact event/task details before saving — the system auto-notifies the recipient immediately."],
    practice:"Create a mock calendar event: pick a candidate, set a 30-minute 'phone screen' appointment for tomorrow, and save."
  },
  {
    id:"4.3", title:"Live Interviews & E-Interviews", part:2, start:1075, end:1464,
    objective:"Conduct a JobDiva-native live interview and build/send an e-interview questionnaire.",
    learn:[
      "Live Interviews let you video-interview a candidate directly through JobDiva instead of Teams/Zoom — share an instant link or schedule a specific time",
      "E-Interviews are pre-built question sets a candidate fills out asynchronously (text, multiple choice, audio, or video answers) before or instead of a live interview",
      "Video-recorded e-interview answers help authenticate that the real candidate is answering — this practice is used specifically in IT recruiting to catch proxy/forgery candidates",
      "To send an e-interview: build the questionnaire (name, expiration date, questions with time limits and answer formats), then look up the candidate and click Assign"
    ],
    skills:["Live interview scheduling", "E-interview questionnaire creation", "Candidate authentication awareness"],
    terms:[["Live Interview","A video interview conducted natively inside JobDiva."],["E-Interview","A pre-set, asynchronous question set a candidate completes and submits for review."]],
    takeaways:["Video-answer e-interviews exist largely as an anti-fraud/anti-proxy measure — most heavily used in IT recruiting.","Both features send automatic email notifications to the candidate on assignment."],
    check:{q:"Why might a recruiter require video-recorded answers in an e-interview rather than text answers?", options:["Video answers are required by law","To authenticate that the real candidate is the one answering — guards against proxy/forgery candidates","Text answers are not supported in JobDiva","It's faster for the recruiter to review"], answer:1, explain:"The trainer specifically ties video answers to candidate authentication, especially against IT recruiting's proxy-candidate problem."},
  },
]);

// ---------------- MODULE 5 ----------------
addModule("m5", "Sourcing: Talent Search & Boolean Mastery", "The single most-used tool in the recruiter's day — title search, Boolean search, and all six operators.", [
  {
    id:"5.1", title:"Talent Search: Title Search vs. Boolean Search", part:2, start:1905, end:2121,
    objective:"Explain the difference between Title Search and Boolean Search and when to use each.",
    learn:[
      "Talent Search accounts for an estimated 80% of a recruiter's day-to-day work",
      "Title Search looks for an exact job title (e.g., 'RN', 'LPN') — narrow, highly specific results",
      "Boolean Search is built from six Boolean operators and returns broader results with variations/synonyms",
      "Boolean operators are described as 'the foundation of any recruitment sourcing process'"
    ],
    skills:["Choosing the right search type for the goal"],
    terms:[["Title Search","Search limited to an exact job title match."],["Boolean Search","Search built from Boolean operators, allowing broader logic and variation matching."]],
    takeaways:["Use Title Search when you want a small, precise pool; use Boolean Search to expand and combine variations."],
  },
  {
    id:"5.2", title:"The Six Boolean Operators", part:2, start:2122, end:2222,
    objective:"Correctly apply AND, OR, AND NOT, quotation marks, parenthesis, and asterisk (and know which one JobDiva doesn't support).",
    prerequisite:"5.1",
    learn:[
      "AND — requires both/all keywords present at once (e.g., RN AND ICU)",
      "OR — returns results with either keyword (e.g., ICU OR Emergency Room)",
      "AND NOT — includes the first keyword but excludes the second (e.g., RN ICU NOT RN ER)",
      "Quotation marks — force an exact multi-word phrase match (e.g., \"registered nurse\"); never used on a single word",
      "Parenthesis — groups keywords to control search logic/order; without it, a Boolean string is 'meaningless'",
      "Asterisk (*) — matches keyword variations (e.g., manage* → managed, management, managing) — NOT supported inside JobDiva; only usable on external boards like Monster, Dice, CareerBuilder",
      "String-building is framed as an individual skill/art requiring domain knowledge — there's no single fixed formula"
    ],
    skills:["Boolean string construction", "Operator selection", "Multi-operator combination with parenthesis"],
    terms:[["AND","Requires all specified keywords to be present."],["OR","Requires at least one of the specified keywords."],["AND NOT","Excludes results containing the second keyword."],["Quotation marks","Force an exact multi-word phrase match."],["Parenthesis","Groups keywords/clauses to control search logic and order."],["Asterisk (*)","Wildcard matching keyword variations — not usable inside JobDiva itself."]],
    takeaways:["Parenthesis is what makes a multi-part Boolean string actually parseable — skipping it breaks the logic.","The asterisk wildcard is a trap: it works on Monster/Dice/CareerBuilder, but NOT inside JobDiva's own search."],
    check:{q:"You want candidates who have 'RN' or 'registered nurse' AND either 'ICU' or 'intensive care unit' experience. Which operator MUST you use to make this string parse correctly?", options:["Asterisk","Quotation marks only","Parenthesis, to group each OR clause","AND NOT"], answer:2, explain:"Without parenthesis to group the RN/registered-nurse clause and the ICU/intensive-care-unit clause separately, the string's logic breaks down."},
    check2:{q:"Which Boolean operator is NOT usable directly inside JobDiva's own search (only on external boards like Monster/Dice)?", options:["OR","AND NOT","Quotation marks","Asterisk (*)"], answer:3, explain:"The trainer explicitly states the asterisk wildcard only works on external job boards, not within JobDiva itself."},
    practice:"Build a full Boolean string for: 'RN for burn ICU who has experience working in hospital and has ACLS and BLS.' Use quotation marks, OR, AND, and parenthesis correctly."
  },
  {
    id:"5.3", title:"Building & Filtering a Search in the Talent Search Screen", part:3, start:225, end:782,
    objective:"Use the Talent Search screen's mapping toggle, specialty selector, sourcing options, and filters together.",
    prerequisite:"5.2",
    learn:[
      "Title Search has a 'with mapping / without mapping' toggle for exact-title refinement, plus a years-of-experience field",
      "Boolean Search auto-builds the string as you add filters; adding a Specialty (from a healthcare-preloaded dropdown) narrows an otherwise broad result set",
      "Choose real-time job board access (sources from your assigned boards) or a specific board with its own sort/filter (relevancy, resume updated, last active)",
      "Location (state/zip + radius), period, degree/major, licenses, certifications, qualifications, and wallet status can all be layered on — but the trainer's rule of thumb is 'the lighter the string, the more the results'",
      "An Exclude field maps to AND NOT logic but is often unnecessary once your search criteria is already clear"
    ],
    skills:["Multi-filter search construction", "Sourcing channel selection", "Search-result tuning"],
    terms:[["Wallet Status filter","A candidate-profile completeness/compliance filter usable in Talent Search."]],
    takeaways:["We highly recommend NOT stacking too many filters — specialty and title alone usually deliver strong results.","Combine Boolean string + specialty + sourcing channel selection to maximize database coverage."],
    check:{q:"According to the trainer's guidance, what's the risk of adding too many filters to a Talent Search?", options:["JobDiva will crash","It slows down page load only","It over-narrows results — 'the lighter the string, the more the results'","There's no risk, always add every filter"], answer:2, explain:"The trainer repeatedly warns that over-filtering shrinks your candidate pool; titles/specialties alone are usually enough."},
  },
  {
    id:"5.4", title:"Practice: Build Your Own Boolean String", part:3, start:805, end:893,
    objective:"Independently construct a compliant Boolean string for a healthcare requirement.",
    prerequisite:"5.3",
    learn:["Applying everything from AND/OR/NOT, quotation marks, and parenthesis into one working search string, live, without guidance"],
    skills:["Independent Boolean string construction"],
    terms:[],
    takeaways:["This is the exact live exercise the trainer gave trainees — treat it as a checkpoint before moving on."],
    practice:"Write a Boolean string for: an RN role in burn ICU, hospital experience required, ACLS and BLS certifications required. Compare your string against the model answer in the lesson notes.",
    check:{q:"In your practice string for 'RN OR registered nurse, burn ICU, ACLS AND BLS,' which two operators are absolutely required to keep the logic correct?", options:["Asterisk and Exclude","OR (for title variants) and parenthesis (to group clauses)","AND NOT and quotation marks only","None — plain keywords work fine"], answer:1, explain:"OR lets you capture title variants (RN / registered nurse), and parenthesis groups that clause correctly against the ACLS/BLS requirement clause."}
  },
]);

// ---------------- MODULE 6 ----------------
addModule("m6", "Adding & Managing Candidates", "Four ways to add a candidate, finding existing ones, and building hot lists.", [
  {
    id:"6.1", title:"Four Ways to Add a New Candidate", part:3, start:1110, end:1316,
    objective:"Add a candidate via upload, email, copy-paste, or manual entry.",
    learn:[
      "Upload: select source, confirm file is under 5MB, choose folder, upload — then verify the auto-extracted Personal Info / Professional Specialty / Work Experience sections before submitting",
      "Dedicated email upload: email the resume to a dedicated address; you get a confirmation once it's added",
      "Copy-paste: select a source (or none), paste the full resume text, submit",
      "Manual: add a few key details and save to create a bare candidate record",
      "The Professional Specialty section is explicitly called out as very important for healthcare resumes"
    ],
    skills:["Candidate intake via all 4 methods", "Verifying extracted resume data"],
    terms:[["Professional Specialty","A candidate profile field flagged as especially important to fill for healthcare resumes."]],
    takeaways:["Emailing resumes to the dedicated upload address is called out as one of the best, easiest methods.","Always verify auto-extracted fields before clicking Submit — don't trust parsing blindly."],
    check:{q:"Which candidate-intake method is recommended as one of the best/easiest for adding a resume?", options:["Manual entry only","Copy-paste with no source selected","Emailing the resume to JobDiva's dedicated upload address","Bulk Excel upload"], answer:2, explain:"The trainer calls out the dedicated-email upload method specifically as one of the best and easiest ways."},
  },
  {
    id:"6.2", title:"Lookup, Search Candidate & Search Employee", part:3, start:1350, end:1536,
    objective:"Use the right lookup tool and understand when a 'candidate' becomes an 'employee.'",
    learn:[
      "Lookup a Candidate: fastest with name + email + phone, or the universal search bar",
      "Search Candidate: by name, contact info, or professional specialty/profession",
      "Search Employee vs. Search Candidate: 'employee' = already placed; 'candidate' = still in sourcing/submittal",
      "Status flips to 'employee' only after: interview → candidate accepts → client confirms onboarding → a 'Start' is recorded in JobDiva"
    ],
    skills:["Selecting the correct search tool", "Understanding candidate-to-employee status transition"],
    terms:[["Start","The JobDiva record marking a candidate has officially begun a placement, converting their status from candidate to employee."]],
    takeaways:["'Employee' isn't a manual label you apply — it only appears after a Start is properly recorded."],
    check:{q:"What triggers a candidate's status to change to 'employee' in JobDiva?", options:["The recruiter manually types 'employee' in a note","The candidate passes the phone screen","A 'Start' is recorded after the client confirms onboarding","The candidate is added to a hot list"], answer:2, explain:"Employee status is a system consequence of a properly recorded Start, following client onboarding confirmation."},
  },
  {
    id:"6.3", title:"Candidate Hot Lists: Building & Managing", part:3, start:1580, end:1838,
    objective:"Create a hot list tied to a job, add/remove candidates, and use Preview/Expand.",
    learn:[
      "A hot list is a personal, saved list of favorite candidates for a role, which also auto-fetches new matching resumes on a saved search string",
      "To create one: click New Hot List, define search criteria (Boolean + specialty + state), name the string, link it to the relevant job, and save — never assign users/groups/divisions yourself, only managers can",
      "Add a favorite candidate to the hot list via its icon, then refresh to confirm; remove the same way, or from the candidate's own profile",
      "Preview shows a short candidate summary inline; Expand shows more detail, including required years of experience matched against your criteria"
    ],
    skills:["Hot list creation", "Candidate curation", "Preview/Expand usage"],
    terms:[["Hot List","A recruiter's personal saved candidate list tied to a job, auto-updated by its search criteria."]],
    takeaways:["Hot lists work entirely off your saved search string — if results seem off, revisit the string, not the list."],
    practice:"Create a hot list for an RN Burn ICU role in a state of your choice, link it to a job, and add two candidates from your search results."
  },
  {
    id:"6.4", title:"Search Candidate Notes & Search Attributes", part:3, start:1870, end:1903,
    objective:"Search for standardized note actions and required submittal attributes.",
    learn:[
      "Search Candidate Notes lets you filter by note content, action, user, candidate, and date — but only works well if standardized note actions (RTR Log, RTR Signed/Interviewed, Start, RTR Receipt) are used instead of informal free text like 'logged' or 'DNC'",
      "Attributes are submittal-required info (e.g., last 4 SSN digits, DOB) tied to the quality-audit process — must be filled for every submission or they won't be searchable"
    ],
    skills:["Standardized note-action usage", "Attribute compliance"],
    terms:[["Note Actions","Standardized, searchable labels for candidate notes (RTR Log, RTR Signed/Interviewed, Start, RTR Receipt) as opposed to free-text notes."],["Attributes","Submittal-required candidate data (e.g., last-4 SSN, DOB) tracked for quality audit."]],
    takeaways:["We highly recommend using standardized note actions rather than free-text — it's the only way this search tool works well.","Missing attributes = failed quality audit for that submission."],
    check:{q:"Why does the trainer discourage writing informal free-text notes like 'logged' or 'DNC' instead of standardized note actions?", options:["Free text takes longer to type","It looks unprofessional to clients","Standardized note actions are what make notes searchable and auditable across the team","JobDiva blocks free text entirely"], answer:2, explain:"Only standardized note actions are reliably searchable/filterable by the whole team — free text defeats that."},
  },
]);

// ---------------- MODULE 7 ----------------
addModule("m7", "Bulk Sourcing & Posting Jobs", "Bulk-adding resumes, and the full Job posting toolbar including LinkedIn and Harvest.", [
  {
    id:"7.1", title:"Bulk Upload & Import Candidates", part:3, start:2380, end:2501,
    objective:"Bulk-import multiple resumes at once and know the file-count limit.",
    learn:[
      "New Candidate only adds one resume at a time; Bulk Upload (under Import Candidates) adds many at once",
      "Bulk upload requires fewer than 50 files; select source, optionally attach to a hot list, upload, then click Start Uploaded",
      "Bulk Excel upload exists but wasn't in active team use at time of recording"
    ],
    skills:["Bulk resume import", "Hot-list-linked bulk uploads"],
    terms:[["Bulk Upload","A feature for adding many resumes (under 50 files) to JobDiva and an optional hot list in one action."]],
    takeaways:["50 files is the hard ceiling for one bulk upload batch."],
    check:{q:"What is the maximum number of files allowed in a single Bulk Upload batch?", options:["10","25","50","No limit"], answer:2, explain:"The trainer states the file count condition must be under 50."},
  },
  {
    id:"7.2", title:"Job Toolbar: Clone, Merge & Posting to Job Boards / LinkedIn", part:3, start:2618, end:2775,
    objective:"Use Clone/Merge job tools and post a completed job to LinkedIn correctly.",
    prerequisite:"3.4",
    learn:[
      "Clone This Job duplicates a job under a new JobDiva ID; Merge combines two assigned jobs, letting you choose which details to keep",
      "A job must be Open, Assigned, and Saved before the LinkedIn posting fields even appear — this is a hard prerequisite, stated twice by the trainer",
      "LinkedIn posting uses the company's integrated LinkedIn (never your personal one): set Contract ID, Degree, Industries, Employment Status, Experience Level, and Expiry Date, then Post Update",
      "Posting isn't instantaneous — expect a backend delay",
      "Company-portal and Monster/Dice posting from JobDiva depends on available integration slots; otherwise post directly on those platforms"
    ],
    skills:["Job cloning/merging", "LinkedIn posting workflow"],
    terms:[["Clone This Job","Duplicates an existing job under a brand-new JobDiva ID."]],
    takeaways:["If LinkedIn posting fields aren't showing, check: is the job Open? Assigned? Saved? All three are required."],
    check:{q:"You try to post a job to LinkedIn from JobDiva but the posting fields aren't visible. What's the most likely cause?", options:["LinkedIn integration is permanently broken","The job isn't Open, Assigned, and Saved yet — all three are required first","You need a personal LinkedIn account linked","Posting only works on Mondays"], answer:1, explain:"The trainer emphasizes twice that a job must be Open, Assigned, and Saved before LinkedIn fields become available."},
  },
  {
    id:"7.3", title:"Job Applicants, Email Job & Email Merge Tracking", part:3, start:2934, end:3028,
    objective:"Process inbound applicants and track outbound Email Job / Email Merge activity.",
    learn:[
      "Job Applicants shows everyone who applied via any integrated portal or the company website; accepting auto-creates their candidate profile",
      "Email Job sends the job to a candidate — request the correct template from your manager rather than relying on a default one",
      "Email Merge tracking shows, per job, which candidates received the merged email, whether they responded, and what action followed"
    ],
    skills:["Applicant triage", "Template-appropriate outreach", "Merge response tracking"],
    terms:[["Job Applicants","Inbound candidates who self-applied via an integrated portal or website."]],
    takeaways:["Don't default to whatever template is pre-loaded — confirm the right one with your manager/DM first."],
  },
  {
    id:"7.4", title:"Harvest, AI Sourcing Suggestions & VPN Posting", part:4, start:46, end:250,
    objective:"Activate Harvest for automatic internal sourcing and post a job to VPN.",
    prerequisite:"3.2",
    learn:[
      "Harvest auto-feeds matching internal-database resumes into an active job based on a saved search string; toggle Schedule/Not Schedule and always Save for the toggle to take effect",
      "An AI feature can suggest a search-criteria string based on the job description itself",
      "Posting to VPN (a staffing job-posting network) happens from the User field: select VPN, click Post on VPN, add travel/weekly rate and shift details, save — expect ~30–45 minutes for it to reflect"
    ],
    skills:["Harvest activation/deactivation", "AI-assisted search criteria", "VPN posting"],
    terms:[["Harvest","Auto-sourcing function that continuously feeds matching internal-database resumes to an active job order."]],
    takeaways:["Forgetting to Save after toggling Harvest means the change never actually applies.","VPN posting delay is normal — don't assume it failed within the first 30 minutes."],
    check:{q:"You schedule Harvest for a job but candidates aren't flowing in. What's the first thing to check?", options:["Whether the job is closed","Whether you clicked Save after toggling Schedule","Whether the candidate has a resume","Whether LinkedIn is connected"], answer:1, explain:"Without clicking Save, a Harvest schedule/un-schedule toggle never actually takes effect."},
  },
]);

// ---------------- MODULE 8 ----------------
addModule("m8", "Mass Outreach & the Candidate Profile Toolbar", "Search Criteria results, safe email merge batching, and the deep candidate-profile feature set.", [
  {
    id:"8.1", title:"Activities Section & the Search Criteria Results Page", part:4, start:355, end:605,
    objective:"Read the Activities log for a job and use the Search Criteria results page.",
    learn:[
      "Activities shows every team member's submissions, interviews, and starts for a job — useful for seeing if a colleague already submitted someone",
      "The trainer recommends performing actual submissions from the candidate's profile rather than directly from Activities",
      "The Search Criteria page shows resumes matching your applied search in real time, with a Preview and an Expand option for more detail"
    ],
    skills:["Cross-team activity awareness", "Search-results navigation"],
    terms:[["Activities","A job-level log of every submission, interview update, and Start performed by any team member."]],
    takeaways:["Check Activities before submitting — avoid duplicate submissions to the same job."],
  },
  {
    id:"8.2", title:"Mass Email Merge: Full Workflow & Safe Sending Limits", part:4, start:614, end:786,
    objective:"Run a compliant email merge campaign without triggering spam flags or IT scrutiny.",
    prerequisite:"6.3",
    learn:[
      "Email Merge purpose: reach many candidates at once with one templated email, to speed up sourcing and increase responses",
      "Workflow: confirm relevant candidates → select sender email + template → choose batch size → optionally skip already-contacted candidates → 'beautify' the template (JD details, urgent-hiring framing, location, IT/healthcare-specific templates, or a manager-provided template) → add signature → Send Emails",
      "Safe batch sizes: 50, 100, 200, 250, or 300 — going bigger risks spam flags and can trigger IT scrutiny of your Outlook account for high daily volume",
      "Individual candidates can be excluded from merges (the 'E' icon) if they've asked not to receive mass emails"
    ],
    skills:["Email merge execution", "Safe batch sizing", "Template beautification", "Merge exclusions"],
    terms:[["Email Merge","A templated bulk email sent to many candidates at once for a job."],["Beautify (the template)","Making a merge email visually appealing and job-specific rather than plain."]],
    takeaways:["Stay at or under ~300 recipients per merge — bigger batches risk spam flags and internal IT flags on your account.","Always check for and honor per-candidate exclusion requests before sending."],
    check:{q:"What is the trainer's recommended safe range for a single email merge batch?", options:["10,000+ recipients","50–300 recipients","Exactly 1,000 recipients","There is no safe limit"], answer:1, explain:"The trainer explicitly recommends staying at 50, 100, 200, 250, or 300 recipients to avoid spam flags and IT scrutiny."},
    practice:"Draft (on paper) an email merge template for an urgent RN Burn ICU opening: subject line, JD highlights, urgency framing, and a signature block."
  },
  {
    id:"8.3", title:"Candidate Profile Toolbar: Availability, Opt-Out & Do Not Submit", part:4, start:813, end:1092,
    objective:"Use the candidate-profile icons that prevent duplicate outreach and enforce do-not-submit rules.",
    learn:[
      "Availability status (Available / Unavailable / Unavailable Indefinitely, with notes) is visible to every recruiter sharing that candidate — it prevents redundant outreach calls",
      "The opt-out/opt-in link icon lets a candidate stop (or resume) receiving emails",
      "Do Not Submit flags a specific client a candidate should never be submitted to, with a reason — this feature must be admin-enabled per user",
      "Never delete a candidate's resume from the Candidate Information section — the trainer flagged this as an observed real mistake"
    ],
    skills:["Availability status management", "Opt-out compliance", "Do Not Submit flagging"],
    terms:[["Do Not Submit","A flag preventing a candidate from being submitted to a specific client, with a documented reason."]],
    takeaways:["Updating availability status is a team courtesy — it stops colleagues from re-calling a candidate who already said no.","Resume deletion from Candidate Information is treated as a serious, avoidable mistake — never do it."],
    check:{q:"Why is keeping a candidate's Availability status updated considered a team best practice?", options:["It's required for payroll","It's purely cosmetic","It prevents other recruiters from redundantly re-contacting an already-unavailable candidate","It automatically emails the client"], answer:2, explain:"Availability status is visible to every recruiter sharing the candidate, preventing wasted, duplicate outreach."},
  },
  {
    id:"8.4", title:"Rates, Licenses, Qualifications & Certification Alerts", part:4, start:1165, end:1340,
    objective:"Maintain rate, license, and qualification data so Talent Search filters actually return results.",
    prerequisite:"6.4",
    learn:[
      "Licenses (including compact license) and certifications (e.g., BLS, ACLS) can be added with numbers, states, and expiration dates, with optional automatic expiration alerts to the candidate",
      "Profession/Specialty should be added for every candidate — missing it is the #1 reason recruiters get low-volume search results",
      "Qualifications (work authorization, ratings, shift preference) feed directly into Talent Search's filters — if left blank, filtered searches (e.g., 'US citizen') return nothing for that candidate",
      "This is long-term team hygiene: filling these fields consistently compounds into much better search results over months and years"
    ],
    skills:["License/certification data entry", "Qualifications maintenance", "Understanding filter dependency on profile completeness"],
    terms:[["Qualifications","Candidate attributes (work authorization, rating, shift preference) that Talent Search filters rely on."]],
    takeaways:["If a Talent Search filter (e.g., work authorization) returns zero results, the likely cause is incomplete candidate profiles — not a broken filter."],
    check:{q:"A recruiter filters Talent Search by 'US Citizen' and gets almost no results, even though many eligible candidates exist in the database. What's the most likely cause?", options:["The filter itself is broken","Those candidates' Qualifications fields (work authorization) were never filled in","JobDiva doesn't support that filter","The search needs an asterisk"], answer:1, explain:"Talent Search filters only work correctly when the underlying Qualifications fields were actually populated on candidate profiles."},
  },
]);

// ---------------- MODULE 9 ----------------
addModule("m9", "The HireTrack Process: End-to-End Placement", "Ownership and RTR rules, internal/external submission, interviews, Start, and the tools that support the whole journey.", [
  {
    id:"9.1", title:"Ownership, RTR & Node Status", part:4, start:1780, end:1930,
    objective:"Apply the RTR (Right to Represent) rule correctly and use node status to avoid team conflicts.",
    learn:[
      "RTR = Right to Represent — candidate authorization that must be obtained (via text or signed RTR) BEFORE a recruiter can claim ownership of a submission",
      "Claiming ownership without RTR is explicitly called out as an observed mistake: 'creating artificially ownership of a candidate' — don't do it",
      "The node section is where every action + conversation status must be logged every time you work a candidate, so colleagues can see current status before contacting them",
      "'Ownership taken' can claim a candidate for one week; a healthcare-specific phone screening template exists for recording detailed discussion notes"
    ],
    skills:["RTR-compliant ownership claims", "Node status discipline", "Phone screening documentation"],
    terms:[["RTR (Right to Represent)","Candidate authorization (text or signed) required before a recruiter can claim ownership of their submission."],["Node section","Where per-candidate action and conversation status are logged, visible to the whole team."],["Ownership","A recruiter's claim on a candidate submission — must be earned via RTR, not self-applied."]],
    takeaways:["No RTR, no ownership claim — full stop. This was flagged as a real, observed team mistake.","Check nodes before contacting any candidate someone else may already be working."],
    check:{q:"A recruiter calls a candidate to submit them without ever confirming rate or receiving an RTR, then marks themselves as 'owner' in JobDiva. What's wrong with this?", options:["Nothing — this is standard procedure","Ownership was claimed without the required RTR authorization first — flagged as artificially creating ownership","The recruiter should have used Search Employee instead","The candidate should be deleted"], answer:1, explain:"The training explicitly calls this exact scenario an observed mistake — ownership must follow RTR, not precede or skip it."},
  },
  {
    id:"9.2", title:"Internal Submission: Step-by-Step", part:4, start:2045, end:2230,
    objective:"Execute a full internal submission to a manager/primary sales with all required fields.",
    prerequisite:"9.1",
    learn:[
      "Steps: select assigned job by ID → confirm position type → update candidate's latest resume → select manager/primary sales → enter aggregate bill/pay rate → confirm submit date/time/time zone → add internal notes → the system emails primary sales",
      "The submission email includes a clinical profile (client, title, primary specialties), wallet status, licenses, availability, a 3–5 line background summary, a rating/percentage, and any red flags",
      "This is framed as automating what used to be a manual 'please submit my resume' request to a manager — especially valuable for remote recruiters",
      "'Cop to cop' rate arrangements are generally not used in healthcare"
    ],
    skills:["Internal submission execution", "Writing an effective candidate summary for a manager"],
    terms:[["Aggregate Bill Rate / Pay Rate","The rate fields (hourly/daily/weekly/yearly) entered during submission."],["Clinical Profile","The client/title/specialty combination described for a healthcare candidate submission."]],
    takeaways:["A well-written 3–5 line summary plus honest red flags is what makes an internal submission actually useful to a manager, not just a formality."],
    practice:"Write a mock 3–5 line candidate summary for an internal submission, including one honest 'red flag' concern and why the candidate still stands out."
  },
  {
    id:"9.3", title:"External Submission, Interview Updates & Start", part:4, start:2295, end:2436,
    objective:"Move a submission externally, update interview details, and understand who can record a Start.",
    prerequisite:"9.2",
    learn:[
      "From an internal submission, a manager can reject the candidate or move to external submission to the client",
      "Interview updates require: job, position type, resume, interview name (matching hiring manager's terms), agreeable/pay rate, and — most important — accurate interview date/time WITH time zone; Zoom link optional",
      "Start (marking a candidate as officially hired/placed) requires job reference ID, position type (rehire vs. new hire), final bill rate, period, client contacts, start/end dates, and a start action — normally restricted to managers/DMs"
    ],
    skills:["External submission handoff", "Interview record accuracy", "Understanding Start authorization"],
    terms:[["Start","The manager/DM-recorded action marking a candidate as officially placed, converting status to employee."]],
    takeaways:["Getting interview date/time/time zone wrong is called out as the single most important detail to double-check with the hiring manager."],
    check:{q:"Who is normally authorized to record a 'Start' for a candidate?", options:["Any recruiter on the team","Only managers/DMs","The candidate themselves","Only the account manager"], answer:1, explain:"The trainer states Start is normally restricted to managers/DMs, though recruiters should understand the process."},
  },
  {
    id:"9.4", title:"Candidate Wallet, Resume Tools & Diva Match", part:4, start:2820, end:2865,
    objective:"Use the Wallet, resume management tools, AI summary, and Diva Match to work a candidate efficiently.",
    learn:[
      "The Wallet aggregates a candidate's attachments, certifications, licenses, and RTR record in one place; status shows 'incomplete' until every parameter is filled — keeping it complete means fewer repeat calls to the candidate",
      "Resume tools: upload/download/print/email a resume; 'Find Ideal Job' surfaces matching open jobs for a candidate; auto-generating a tailored resume exists but isn't recommended — request an updated resume from the candidate instead",
      "AIS (JobDiva's built-in AI) can generate a candidate summary in a chosen tone/length — an alternative to using ChatGPT externally",
      "Diva Match shows a percentage match between a candidate and open jobs, sortable by highest match — but always double-check a matched job's real status on the client portal, since JobDiva may still show it open after it's actually closed",
      "All Outlook-integrated email history with a candidate (e.g., RTR emails) is visible to every recruiter working that candidate"
    ],
    skills:["Wallet maintenance", "Resume tool usage", "AI-assisted summaries", "Diva Match verification discipline"],
    terms:[["Wallet","An aggregated view of a candidate's certifications, licenses, attachments, and RTR record."],["Diva Match","JobDiva's percentage-based candidate-to-job matching feature."],["AIS","JobDiva's built-in AI summary-generation feature."]],
    takeaways:["A complete Wallet is 'a hard work of one recruiter, which benefits every recruiter' — it saves the whole team repeat verification calls.","Never trust a Diva Match 'open' status blindly — verify against the actual client portal before acting."],
    check:{q:"Diva Match shows a 95% match between your candidate and a job that appears 'Open' in JobDiva. What should you do before acting on it?", options:["Submit immediately, trust the match score","Verify the job's real status on the client's actual portal, since JobDiva's status can be stale","Ignore Diva Match entirely, it's unreliable","Ask the candidate to resubmit their resume"], answer:1, explain:"The trainer specifically warns that a job can show as open in JobDiva's match results while actually closed on the client portal — always verify."},
  },
  {
    id:"9.5", title:"Course Recap: The Full HireTrack Flow, End to End", part:4, start:2865, end:2955,
    objective:"Recap the complete recruiter journey from sourcing to placement, and identify what to review next.",
    learn:[
      "Full flow recap: Sourcing (Talent Search/Boolean) → New Candidate intake → Hot Lists & Email Merge outreach → RTR/Ownership → Internal Submission → External Submission → Interview → Start → Employee",
      "Supporting systems throughout: Wallet, Resume tools, Diva Match, Notes/Attributes, and Outlook-integrated email tracking",
      "Healthcare-specific threads running through the whole course: Professional Specialty tagging, Submittal Packets, phone screening templates, licenses/compact licenses, BLS/ACLS certifications"
    ],
    skills:["End-to-end process fluency"],
    terms:[],
    takeaways:["Every tool in this course exists to support one linear journey: source → engage → submit → place — keep that flow in mind when you're unsure which screen to use."],
  },
]);

const FINAL_ASSESSMENT = [
  {q:"What is JobDiva Cleaning?", options:["Formatting a job description's text before posting","Accurately entering all structured job fields (title, division, address, schedule, billing, etc.)","Deleting old closed jobs","Clearing a candidate's notes"], answer:1},
  {q:"What is JD (Job Description) Cleaning?", options:["Deleting a job posting","Formatting the raw job description text into a clean three-part structure before it syncs to external portals","Assigning a primary recruiter","Verifying a candidate's SSN"], answer:1},
  {q:"Which operator groups keywords so a multi-part Boolean string parses correctly?", options:["Asterisk","Parenthesis","Quotation marks","AND NOT"], answer:1},
  {q:"Which Boolean operator is NOT usable inside JobDiva itself?", options:["OR","Quotation marks","Asterisk (*)","AND"], answer:2},
  {q:"What must happen before a recruiter can claim ownership of a candidate submission?", options:["The candidate must be added to a hot list","The recruiter must receive RTR (Right to Represent) authorization","The job must be cloned","The candidate must upload a video interview"], answer:1},
  {q:"A job must be in which three states before LinkedIn posting fields appear?", options:["Closed, Unassigned, Draft","Open, Assigned, Saved","New, Pending, Reviewed","Cloned, Merged, Archived"], answer:1},
  {q:"What's the recommended safe batch size range for a single Email Merge send?", options:["1–10","50–300","1,000–5,000","No limit, send to everyone"], answer:1},
  {q:"Why does an incomplete candidate profile (missing Qualifications/Specialty) hurt a recruiter?", options:["It has no real effect","JobDiva auto-deletes incomplete profiles","Talent Search filters relying on those fields will return few or no results","It only affects the candidate's pay rate"], answer:2},
  {q:"What converts a 'candidate' to an 'employee' in JobDiva?", options:["Being added to a hot list","Passing a phone screen","A properly recorded Start after client onboarding confirmation","Uploading an updated resume"], answer:2},
  {q:"Diva Match shows a job as 'Open' at 95% match. What should you always do before acting?", options:["Submit immediately","Verify the job's real status on the actual client portal","Ignore the match score","Delete the job from JobDiva"], answer:1},
  {q:"Who is normally authorized to record a candidate's 'Start'?", options:["Any recruiter","Only managers/DMs","The candidate","The client's HR team directly inside JobDiva"], answer:1},
  {q:"Why are standardized Note Actions (RTR Log, Start, etc.) preferred over free-text notes like 'logged' or 'DNC'?", options:["They look better to clients","Only standardized actions are reliably searchable/filterable across the team","JobDiva blocks free text","They take less time to type"], answer:1},
];

// Attach fmt/VIDEO_SRC for use by app.js
window.COURSE = COURSE;
window.fmtTime = fmt;
window.VIDEO_SRC = VIDEO_SRC;
window.VIDEO_PARTS = VIDEO_PARTS;
window.FINAL_ASSESSMENT = FINAL_ASSESSMENT;
