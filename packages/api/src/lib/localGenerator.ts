const subjects = [
  "Trump", "The White House", "The President", "Donald", "The Administration",
  "Trump's Twitter", "The Secret Service", "Melania", "Kushner", "Ivanka",
  "The Republican Party", "The Oval Office", "Trump's hair", "The Mar-a-Lago",
  "Trump's diet", "The Space Force", "Trump's wall", "The Trump Organization",
];

const actions = [
  "has declared that", "has officially renamed", "will now require all", 
  "has banned", "has proposed a new law making", "has announced a plan to",
  "is considering replacing", "has decreed that", "has ordered the Pentagon to",
  "has started a petition to", "has signed an executive order to",
  "has claimed that", "has denied that", "has tweeted that",
  "has revealed that", "has insisted that", "has promised to",
  "has threatened to", "has demanded that", "has urged Congress to",
];

const objects = [
  "coffee is a threat to national security",
  "the moon must be renamed 'Trump Star'",
  "all handshakes last exactly 45 seconds",
  "WiFi signals are liberal propaganda",
  "the presidential limo be gold-plated",
  "mirrors in the White House show him 10 years younger",
  "his tweets are historical documents",
  "the Atlantic Ocean be renamed 'Trump Ocean'",
  "he invented the high-five",
  "all pigeons be replaced with miniature drones",
  "the McDonald's Big Mac be served at state dinners",
  "every American own at least one Trump-branded item",
  "the Liberty Bell be replaced with a giant gold bell",
  "he can communicate with squirrels",
  "a wall be built around Hollywood",
  "Wednesday be renamed 'Trump Day'",
  "the national anthem's lyrics be his own tweets",
  "all clocks in America show his birth time",
  "the IRS accept TrumpBucks as payment",
  "he can run faster than a cheetah",
];

export function generateLocalPhrase(): string {
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const object = objects[Math.floor(Math.random() * objects.length)];
  return `${subject} ${action} ${object}.`;
}
