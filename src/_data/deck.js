// Card content for the QR code pages (one page per Ink system card).
// Source: The AMP Deck field guide PDF — threats on pages 18–32, systems on pages 34–58.
// Slugs match the URLs printed on the cards / QR codes (AMP Deck QR.xlsx) and must not change.

const stages = [
  { key: "attention", number: 1, name: "Attention", line: "They find you." },
  { key: "interest", number: 2, name: "Interest", line: "They want to know more." },
  { key: "trust", number: 3, name: "Trust", line: "They believe you can deliver." },
  { key: "conversion", number: 4, name: "Conversion", line: "They hire you." },
  { key: "delivery", number: 5, name: "Delivery", line: "They experience the work." },
  { key: "growth", number: 6, name: "Growth", line: "They return and refer." },
];

const threats = {
  "AMP-TH-01": { name: "Invisible Expertise", stage: "attention", hook: "You are better at what you do than most of the people getting the work." },
  "AMP-TH-02": { name: "Low Visibility Lead Flow", stage: "attention", hook: "You can’t grow a business the market doesn’t know exists." },
  "AMP-TH-03": { name: "Inconsistent Marketing", stage: "attention", hook: "Sporadic marketing produces sporadic revenue. The two are not a coincidence." },
  "AMP-TH-04": { name: "Traffic No Leads", stage: "interest", hook: "Getting visitors to your website is not the same as getting leads. Most websites confuse the two." },
  "AMP-TH-05": { name: "Unqualified Leads", stage: "interest", hook: "Busy sales conversations with the wrong people are not a growth problem. They’re a positioning problem." },
  "AMP-TH-06": { name: "Weak Market Position", stage: "trust", hook: "If you can’t explain why you’re different in one sentence, your prospects can’t either." },
  "AMP-TH-07": { name: "Confused Messaging", stage: "trust", hook: "You have ten seconds. Most businesses waste all ten." },
  "AMP-TH-08": { name: "Low Trust", stage: "trust", hook: "People buy from businesses they trust… from businesses that have already proven it." },
  "AMP-TH-09": { name: "Commodity Perception", stage: "trust", hook: "When buyers can’t tell you apart from your competitors, they make the decision on price." },
  "AMP-TH-10": { name: "Poor Sales Conversions", stage: "conversion", hook: "If leads are coming in but not closing, the problem isn’t your marketing. It’s what happens after." },
  "AMP-TH-11": { name: "Broken Delivery Experience", stage: "delivery", hook: "Great results don’t save a bad experience." },
  "AMP-TH-12": { name: "Scope Creep", stage: "delivery", hook: "Every undocumented yes is a margin problem waiting to show up on your books." },
  "AMP-TH-13": { name: "Owner Bottleneck", stage: "delivery", hook: "Your business can only grow as fast as you can personally show up." },
  "AMP-TH-14": { name: "No Repeat Business", stage: "growth", hook: "Your best source of new revenue just finished working with you and you have no plan to keep them." },
  "AMP-TH-15": { name: "Stuck Growth", stage: "growth", hook: "Flat revenue with a full calendar means the model is the problem, not the effort." },
};

// `sign`: the word on the neon sign in the hero card (the one action the card asks for; 8 characters or fewer).
// `threats`: threat cards that name this system. `pull`: guidance for the six systems no threat names.
// `pairs`: other system refs mentioned in `pull`, linked on the page.
const systems = [
  {
    ref: "AMP-SY-01", slug: "campaign-engine", sign: "LAUNCH", name: "Campaign Engine", stage: "attention",
    hook: "Random acts of marketing don’t compound. A coordinated campaign does.",
    what: "A repeatable structure for running marketing in focused blocks, each with one goal, one audience, one message, and one measurable outcome, so effort accumulates instead of restarting.",
    steps: [
      "Pick one goal. Build a campaign around it with a clear audience, a message, and a channel mix.",
      "Run it for 30 days.",
      "Measure what worked.",
      "Do that every month.",
    ],
    working: "You can name what you are running this month without checking, and you know the number it is meant to move.",
    threats: ["AMP-TH-03", "AMP-TH-15"],
  },
  {
    ref: "AMP-SY-02", slug: "seo-visibility", sign: "SHOW UP", name: "SEO Visibility System", stage: "attention",
    hook: "When buyers search for what you do, you either show up or you don’t.",
    what: "The work that gets your business found by people actively searching for the problem you solve, in the places and regions you serve.",
    steps: [
      "Find the three search terms your best clients would type when they have the problem you solve.",
      "Create one piece of content for each.",
      "Optimise your website pages around those terms.",
      "Add one new piece every month.",
    ],
    working: "Enquiries arrive from people you have never met who found you without a referral.",
    threats: ["AMP-TH-02"],
  },
  {
    ref: "AMP-SY-03", slug: "paid-acquisition", sign: "TEST", name: "Paid Acquisition System", stage: "attention",
    hook: "Paid ads work when you know your numbers. Most businesses don’t.",
    what: "A controlled way to buy attention from the right people, with spend tied to what a client is actually worth to you.",
    steps: [
      "Define your ideal client. Set a daily budget you can sustain for 30 days.",
      "Run one ad to one audience with one offer.",
      "Track cost per lead.",
      "Test one variable at a time until the numbers work.",
    ],
    working: "You know your cost per lead to the dollar, and it is lower than what a client is worth.",
    threats: ["AMP-TH-02"],
  },
  {
    ref: "AMP-SY-04", slug: "authority-content", sign: "PUBLISH", name: "Authority Content Engine", stage: "interest",
    hook: "Your expertise is invisible if the market can’t see it. Visibility wins the work.",
    what: "A sustainable rhythm for turning what you already know into published work that positions you as the expert before anyone speaks to you.",
    steps: [
      "Pick one platform where your buyers spend time.",
      "Post one insight per week drawn from your own experience.",
      "No recycled or generic content.",
      "Your perspective, consistently. That’s the engine.",
    ],
    working: "Prospects arrive at the first call already believing you can do the work.",
    threats: ["AMP-TH-01", "AMP-TH-03", "AMP-TH-06", "AMP-TH-09"],
  },
  {
    ref: "AMP-SY-05", slug: "lead-capture", sign: "CAPTURE", name: "Lead Capture System", stage: "interest",
    hook: "A visitor who leaves without a way to follow up is a lead you paid for and threw away.",
    what: "The mechanism that turns anonymous attention into a name and an email address you are allowed to contact.",
    steps: [
      "Add a specific next step to every page of your website. One call to action.",
      "Make it easy to take. Name, email, done.",
      "If a visitor can leave without identifying themselves, fix that page.",
    ],
    working: "Your list grows every week without you doing anything that week.",
    threats: ["AMP-TH-04"],
  },
  {
    ref: "AMP-SY-06", slug: "email-nurture", sign: "NURTURE", name: "Email Nurture System", stage: "interest",
    hook: "Most buyers aren’t ready yet. Stay in the room.",
    what: "A set of scheduled emails that keep you useful and present with leads until the moment they are ready to buy.",
    steps: [
      "Write five emails. Send one per week to every new lead.",
      "Each one answers a question your best clients had before they hired you.",
      "That sequence runs automatically. Every new lead gets it.",
    ],
    working: "Someone replies months after they signed up and asks to talk.",
    threats: [],
    pull: "Pull it alongside Lead Capture System, so the leads it collects stay warm until they are ready.",
    pairs: ["AMP-SY-05"],
  },
  {
    ref: "AMP-SY-07", slug: "lead-qualification", sign: "FILTER", name: "Lead Qualification System", stage: "interest",
    hook: "The wrong leads waste more time than no leads at all.",
    what: "A filter that sorts enquiries before they reach your calendar, so selling time goes to people who can and will buy.",
    steps: [
      "Write down three things that make a client a good fit and three that make them a bad fit.",
      "Ask those questions in your first conversation.",
      "Stop pursuing anyone who fails the bad fit criteria.",
    ],
    working: "Your calendar has fewer calls on it and a higher share of them close.",
    threats: ["AMP-TH-05"],
  },
  {
    ref: "AMP-SY-08", slug: "messaging-framework", sign: "CLARIFY", name: "Messaging Framework", stage: "interest",
    hook: "If people can’t quickly understand what you do, they move on.",
    what: "One set of words for the problem you solve, what you do about it, and what changes, used identically everywhere you show up.",
    steps: [
      "Write one sentence that names the problem you solve, one that says what you do about it, and one that says what changes for the client.",
      "Use those three sentences everywhere. Website. Pitch. Proposal.",
    ],
    working: "Someone outside your industry can explain what you do after hearing it once.",
    threats: ["AMP-TH-01", "AMP-TH-05", "AMP-TH-07"],
  },
  {
    ref: "AMP-SY-09", slug: "positioning", sign: "OWN IT", name: "Positioning System", stage: "trust",
    hook: "If you don’t own a clear position, buyers default to comparing prices.",
    what: "A deliberate decision about who you serve and what you are known for, so the market has a specific place to put you.",
    steps: [
      "Name the one type of client you serve best.",
      "Name the one outcome you deliver better than anyone else.",
      "Name the one reason a client should choose you over the next option.",
      "That’s your position. Put it everywhere.",
    ],
    working: "You turn down work that does not fit and the decision feels obvious rather than expensive.",
    threats: ["AMP-TH-06", "AMP-TH-07", "AMP-TH-09"],
  },
  {
    ref: "AMP-SY-10", slug: "reputation-engine", sign: "PROVE IT", name: "Reputation Engine", stage: "trust",
    hook: "A prospect trusts what your clients say more than anything you put in a proposal.",
    what: "A routine for collecting and publishing what clients say about you, in the places prospects actually check.",
    steps: [
      "After every completed engagement, ask the client for a written testimonial. Ask specifically about the result, not the experience.",
      "Publish it on your website and anywhere a prospect might be evaluating you.",
    ],
    working: "New clients mention something they read about you before you sent anything.",
    threats: ["AMP-TH-08"],
  },
  {
    ref: "AMP-SY-11", slug: "case-studies", sign: "SHOW IT", name: "Case Study System", stage: "trust",
    hook: "Telling people you get results is easy. Documented proof is what closes deals.",
    what: "A repeatable format for turning finished work into evidence a prospect can read in two minutes and see themselves in.",
    steps: [
      "Document three client results.",
      "For each one, write what the situation was before, what you did, and what changed after.",
      "Send the relevant case study to every prospect before a proposal.",
    ],
    working: "Proposals get fewer questions and faster decisions.",
    threats: ["AMP-TH-08"],
  },
  {
    ref: "AMP-SY-12", slug: "retargeting", sign: "REMIND", name: "Retargeting System", stage: "conversion",
    hook: "Most buyers don’t convert on the first visit. Retargeting keeps you in front of them.",
    what: "Low cost ads shown only to people who already visited you, so you stay present through the weeks a buyer spends deciding.",
    steps: [
      "Install a tracking pixel on your website. Create one ad that shows only to people who visited but didn’t contact you.",
      "Run it for 30 days. You’re staying visible while they decide.",
    ],
    working: "People enquire and mention they have been seeing you everywhere.",
    threats: [],
    pull: "Pull it once your website converts and buyers still take weeks to decide. It sits behind Website Conversion System.",
    pairs: ["AMP-SY-13"],
  },
  {
    ref: "AMP-SY-13", slug: "website-conversion", sign: "CONVERT", name: "Website Conversion System", stage: "conversion",
    hook: "Your website is either selling or it isn’t.",
    what: "A website structured to move a stranger from arrival to enquiry, with one path and nothing in the way.",
    steps: [
      "Look at your homepage. If a stranger can’t tell in ten seconds what you do, who it’s for, and what to do next, rewrite it.",
      "One clear headline. One clear call to action. Nothing else competes.",
    ],
    working: "The same traffic produces more enquiries than it did last quarter.",
    threats: ["AMP-TH-04"],
  },
  {
    ref: "AMP-SY-14", slug: "sales-pipeline", sign: "TRACK", name: "Sales Pipeline System", stage: "conversion",
    hook: "Leads without a follow-up process disappear. A pipeline needs structure to move.",
    what: "A visible list of every open opportunity, where it stands, and what happens next, so no lead is lost to a full inbox.",
    steps: [
      "List every active lead. Give each one a stage: new, contacted, proposal sent, decision pending.",
      "Set a follow-up date for each.",
      "Review the list every Monday.",
      "Nothing moves forward unless you move it.",
    ],
    working: "Nothing in your pipeline has gone more than two weeks without contact.",
    threats: ["AMP-TH-10"],
  },
  {
    ref: "AMP-SY-15", slug: "sales-conversation", sign: "ASK", name: "Sales Conversation Framework", stage: "conversion",
    hook: "The best sales conversations feel like the right diagnosis.",
    what: "A consistent structure for sales calls that leads with questions, earns the right to recommend, and ends with a clear decision.",
    steps: [
      "Write down the five questions you ask in every sales conversation. Add two more that uncover budget and timeline.",
      "Ask them in the same order every time.",
      "Let the answers tell you whether to proceed.",
    ],
    working: "Calls end with a yes, a no, or a booked decision, never with you saying you will send something over.",
    threats: ["AMP-TH-10", "AMP-TH-12"],
  },
  {
    ref: "AMP-SY-16", slug: "pricing-structure", sign: "PRICE IT", name: "Pricing Structure", stage: "conversion",
    hook: "Underpricing is a business model that doesn’t work.",
    what: "A pricing model built on the value you deliver and the margin you need, written down so it holds under pressure.",
    steps: [
      "List your services. Assign a price to each based on the outcome it delivers, not the time it takes.",
      "If the price makes you uncomfortable, it’s probably right.",
    ],
    working: "You quote without flinching and your margin survives the project.",
    threats: [],
    pull: "Pull it with Scope Creep or Commodity Perception, or any time the work is full and the margin is not.",
  },
  {
    ref: "AMP-SY-17", slug: "client-onboarding", sign: "WELCOME", name: "Client Onboarding System", stage: "delivery",
    hook: "The first two weeks set the tone.",
    what: "A fixed sequence every new client walks through in their first two weeks, so they feel certain they made the right choice.",
    steps: [
      "Write a checklist for the first week of every new client engagement. What gets sent, what gets explained, what gets confirmed.",
      "Every new client receives the same start. No exceptions.",
    ],
    working: "New clients stop asking what happens next, because they already know.",
    threats: ["AMP-TH-11", "AMP-TH-13"],
  },
  {
    ref: "AMP-SY-18", slug: "delivery-workflow", sign: "WRITE IT", name: "Delivery Workflow", stage: "delivery",
    hook: "If the process lives in your head, the business stops when you do.",
    what: "Your service written down as a sequence of steps with owners and standards, so someone other than you can run it.",
    steps: [
      "Write down every step required to deliver your service from start to finish. Assign each step to a role, not a person.",
      "If a step only works when you do it personally, that’s the bottleneck. Fix it.",
    ],
    working: "A project moves forward on a day you were not in it.",
    threats: ["AMP-TH-11", "AMP-TH-12", "AMP-TH-13"],
  },
  {
    ref: "AMP-SY-19", slug: "client-communication", sign: "UPDATE", name: "Client Comms System", stage: "delivery",
    hook: "Clients don’t lose confidence because of bad work. They lose it because of silence.",
    what: "A predictable rhythm of updates that tells clients where things stand before they have to ask.",
    steps: [
      "Set a weekly update cadence for every active client.",
      "One message, every week, that tells them where things stand.",
      "Send it before they ask. Every time.",
    ],
    working: "Clients stop chasing you, because your update always arrives first.",
    threats: [],
    pull: "Pull it with Client Onboarding System when Broken Delivery Experience is on your table. Onboarding sets the tone, this keeps it.",
    pairs: ["AMP-SY-17"],
  },
  {
    ref: "AMP-SY-20", slug: "analytics-metrics", sign: "MEASURE", name: "Analytics + Metrics", stage: "growth",
    hook: "Without tracking the right numbers, every business decision is a guess.",
    what: "A short list of numbers you review every week, so decisions come from what is happening rather than how it feels.",
    steps: [
      "Pick five numbers that tell you whether the business is growing. Track them weekly.",
      "If a number moves in the wrong direction two weeks in a row, investigate before it becomes a problem.",
    ],
    working: "You can answer how the business is doing with a number instead of a mood.",
    threats: [],
    pull: "Pull it first if you cannot tell which stage is breaking. It makes every future run of the deck sharper.",
  },
  {
    ref: "AMP-SY-21", slug: "client-feedback", sign: "LISTEN", name: "Client Feedback Loop", stage: "growth",
    hook: "The clients who don’t return rarely say why. A feedback system finds out.",
    what: "A structured way of asking clients what worked and what did not, at a moment when they will actually tell you.",
    steps: [
      "At the end of every engagement, ask the client two questions: what worked well, and what would have made the experience better.",
      "Log the answers. Look for patterns every quarter.",
    ],
    working: "The same complaint stops appearing, because you fixed it after the first time.",
    threats: ["AMP-TH-14"],
  },
  {
    ref: "AMP-SY-22", slug: "client-retention", sign: "CHECK IN", name: "Client Retention System", stage: "growth",
    hook: "Acquisition fills the pipeline. Retention is what makes the business sustainable.",
    what: "A plan for what happens after the project ends, so good clients stay close and come back.",
    steps: [
      "Make a list of every client from the last two years. Reach out to anyone you haven’t spoken to in 90 days.",
      "Don’t pitch. Just check in and stay in the relationship.",
    ],
    working: "A meaningful share of this year’s revenue came from people who already bought once.",
    threats: ["AMP-TH-14"],
  },
  {
    ref: "AMP-SY-23", slug: "referral-engine", sign: "ASK", name: "Referral Engine", stage: "growth",
    hook: "A client who had a great experience is a referral waiting to happen.",
    what: "A deliberate way of asking for and making easy the introductions from people who already trust you.",
    steps: [
      "At the end of every successful engagement, ask the client directly: do you know anyone else who could use this?",
      "Ask every time. Most won’t refer unless you ask.",
    ],
    working: "Referrals arrive in months when you did not chase any.",
    threats: ["AMP-TH-14", "AMP-TH-15"],
  },
  {
    ref: "AMP-SY-24", slug: "offer-expansion", sign: "EXPAND", name: "Offer Expansion System", stage: "growth",
    hook: "The next problem your client has is your next opportunity. Build something that solves it.",
    what: "A method for identifying what clients need after they buy from you, and packaging it so they can buy that too.",
    steps: [
      "Look at your best clients. What do they need six months after working with you?",
      "Build one offer that solves that. Offer it before they go looking elsewhere.",
    ],
    working: "Existing clients buy a second thing without you pitching from scratch.",
    threats: [],
    pull: "Pull it with No Repeat Business or Stuck Growth when retention alone will not move the number.",
  },
  {
    ref: "AMP-SY-25", slug: "strategic-partnerships", sign: "PARTNER", name: "Strategic Partnerships", stage: "growth",
    hook: "A referral partnership puts you in front of the right people without starting from scratch.",
    what: "Formal relationships with businesses that serve your ideal client before or alongside you, so their trust becomes your introduction.",
    steps: [
      "List five businesses that serve the same clients you do but don’t compete with you.",
      "Reach out to one this week. Propose a simple referral arrangement. Both sides win.",
    ],
    working: "A partner sends you work without being reminded.",
    threats: ["AMP-TH-15"],
  },
];

const byRef = Object.fromEntries(systems.map((s) => [s.ref, s]));
const stageByKey = Object.fromEntries(stages.map((s) => [s.key, s]));

// Resolve references once so templates stay simple (links are kept shallow: no circular data).
const link = (s) => (s ? { ref: s.ref, slug: s.slug, name: s.name } : null);
systems.forEach((s, i) => {
  s.number = s.ref.slice(-2);
  s.stageInfo = stageByKey[s.stage];
  s.threatCards = s.threats.map((ref) => ({ ref, ...threats[ref], stageInfo: stageByKey[threats[ref].stage] }));
  s.pairCards = (s.pairs || []).map((ref) => link(byRef[ref]));
  // Neon sign: letter size (in % of the sign's width) shrinks for longer words so every word fits the tube;
  // one middle letter flickers.
  const w = s.sign;
  let f = Math.floor(w.length / 2);
  if (w[f] === " ") f -= 1;
  s.signSize = Math.min(20, 114 / w.length).toFixed(1);
  s.signPre = w.slice(0, f);
  s.signFlicker = w[f];
  s.signPost = w.slice(f + 1);
  s.prev = link(systems[i - 1]);
  s.next = link(systems[i + 1]);
});

module.exports = { stages, threats, systems };
