import { db } from "./client";
import { phrases, badges } from "./schema";

const samplePhrases: string[] = [
  "Trump just signed a decree to rename Wednesday to 'Trump Day'",
  "Trump tweeted that Italian coffee is a threat to national security",
  "Trump announced he wants to build a wall around Hollywood",
  "Trump declared that all mirrors in the White House must show him 10 years younger",
  "Trump appointed his cat as Secretary of Interior",
  "Trump wants to replace the presidential limo with a gold-plated golf cart",
  "Trump claimed he invented the moon and will sue NASA for copyright infringement",
  "Trump now requires that all handshakes last exactly 45 seconds",
  "Trump tweeted that WiFi signals are liberal and will create 'TrumpNet'",
  "Trump's new diet plan: only food that is the color of his skin",
  "Trump ordered the Pentagon to design a stealth bomber shaped like his signature",
  "Trump replaced the national anthem's lyrics with his own tweets",
  "Trump banned the word 'small' from all official documents",
  "Trump believes that adding his name to a product doubles its value",
  "Trump proposed to rename the Atlantic Ocean to the 'Trump Ocean'",
  "Trump claims he knows all the world's leaders' passwords",
  "Trump mandated that every fifth tweet must contain an emoji of a crown",
  "Trump's Secret Service codename is now 'Very Stable Genius'",
  "Trump offered to buy Greenland with TrumpBucks",
  "Trump wants to rename July to 'Trump-uly'",
  "Trump told supporters he can communicate with squirrels",
  "Trump's first executive order: rename the dollar to 'TrumpBuck'",
  "Trump claimed his hair has its own security clearance",
  "Trump tweeted that he never makes typos – they are 'alternative spellings'",
  "Trump wants to replace all White House paintings with his own portraits",
  "Trump announced a new exercise program: 'Golfing for Greatness'",
  "Trump declared his tweets are historical documents",
  "Trump ordered the creation of a National Trump Appreciation Day",
  "Trump revealed he can speak dolphin",
  "Trump wants to add a Trump Tower wing to the White House",
  "Trump said he could beat Einstein in a math contest",
  "Trump claimed his childhood drawings are worth millions",
  "Trump demanded that his face be carved on Mount Rushmore facing forward",
  "Trump wants to replace Air Force One with a solid gold rocket",
  "Trump believes he invented the high-five",
  "Trump announced all clocks in America must show his birth time",
  "Trump's new plan: replace all pigeons with miniature drones",
  "Trump claimed he can cook the world's best spaghetti – secret ingredient: ketchup",
  "Trump said he does not need sleep, he 'recharges'",
  "Trump ordered the CIA to find the 'any' key on keyboards",
  "Trump wants all McDonald's restaurants to serve a 'Trump Burger'",
  "Trump claimed he knows the exact number of stars in the sky",
  "Trump tweeted that the sun rises because he commands it to",
  "Trump announced he will personally teach a course on 'Art of the Deal' at Harvard",
  "Trump declared his voice is the most beautiful sound on Earth",
  "Trump wants to build a giant golden statue of himself in the middle of Times Square",
  "Trump believes he can run faster than a cheetah",
  "Trump's new slogan: 'Make Everything Trump Again'",
  "Trump said his favorite color is 'golden, like me'",
  "Trump ordered the Secret Service to learn how to golf",
  "Trump wants to replace the Washington Monument with a Trump statue",
  "Trump claimed he has never made a mistake in his entire life",
  "Trump proposed that every state rename its capital after him",
  "Trump believes he can speak every language if he just talks louder",
  "Trump wants to host a reality show from the Oval Office",
  "Trump claims his handshake is stronger than any power tool",
  "Trump's new foreign policy: send an angry tweet first, ask questions later",
  "Trump declared he already won the next election – it's just not announced yet",
  "Trump wants to rename Monday to 'TrumpDay' and make it a holiday",
  "Trump announced he will cure every disease by 'thinking really hard'",
  "Trump believes the Earth is flat but with a curve only he can see",
  "Trump ordered the IRS to accept TrumpBucks as payment",
  "Trump wants a 'Trump filter' on all social media that makes everything about him",
  "Trump claimed he once beat a computer at chess",
  "Trump said he can lift a car with one hand",
  "Trump's new airline: 'Trump Air' with gold-plated seats",
  "Trump wants to replace the Liberty Bell with a giant gold bell that plays his campaign song",
  "Trump tweeted that the 'delete' key should be renamed 'un-Trump'",
  "Trump ordered that all future books must include a chapter about him",
  "Trump claimed he can smell a bad deal from 100 miles away",
  "Trump announced he will personally negotiate with aliens",
  "Trump wants to turn Area 51 into Trump Tower 51",
  "Trump claims his signature is worth more than the Constitution",
  "Trump wants to rename the internet 'The Trump Web'",
  "Trump tweeted that he never ages – he just 'upgrades'",
  "Trump announced a new department: the Department of Trump Affairs",
  "Trump believes he invented the word 'great'",
  "Trump wants to replace all street signs with ones pointing to his properties",
  "Trump claimed he can make it rain by doing his hair flips",
  "Trump wants a Trump-branded cryptocurrency called 'TrumpCoin' (even though TrumpBucks exists)",
  "Trump ordered the military to design a tank shaped like a giant comb",
  "Trump believes mirrors are portals to a perfect universe where he has 100% approval",
  "Trump announced he will teach astronauts how to land on the sun",
  "Trump wants a giant red button on his desk that plays his theme song when pressed",
  "Trump claims his sneeze can power a small wind turbine",
  "Trump wants to rename summer to 'Trump Season'",
  "Trump ordered the National Zoo to name all newborn animals 'Trump'",
  "Trump believes he can jump higher than any basketball player",
  "Trump's new social network: 'Trumpter' – posts limited to 280 characters about him",
  "Trump announced he will personally oversee the painting of all Golden Arches",
  "Trump claims he has a secret handshake with every foreign leader (including those who don't know him)",
  "Trump wants a national 'Trump Look-Alike Day' with himself as the judge",
  "Trump declared that every American must own at least one Trump-branded item",
  "Trump believes he can predict the weather by looking at his reflection",
  "Trump wants to replace the Supreme Court with a panel of his 'best buddies'",
  "Trump announced he will build a time machine to go back and appoint himself president forever",
  "Trump claims he once won a staring contest against an owl",
  "Trump wants a Trump-branded flavor at every ice cream shop",
  "Trump ordered the treasury to print a $3 bill with his face",
  "Trump believes his hair has its own weather system",
  "Trump wants to rename the concept of 'winning' to 'Trumping'",
  "Trump announced he will write a sequel to all Shakespeare plays adding his own character",
  "Trump claims he can read minds (but only his own tweets)",
  "Trump wants a daily flyover of his personal jet during lunchtime",
  "Trump declared that all world maps must show the 'Trump Zone'",
  "Trump believes he can outrun a bullet",
  "Trump wants a national 'Trump Toast' at every breakfast",
  "Trump claims he can hold his breath longer than anyone",
  "Trump wants to replace all statues with holograms of himself",
  "Trump announced he will build a second Wall – this time out of compliments",
  "Trump claims he already knows what people will tweet before they do",
  "Trump wants a new agency: the Federal Bureau of Trump Style",
  "Trump believes he can make plants grow by talking about deals",
  "Trump wants to rename the White House garden to 'Trump's Secret Garden'",
  "Trump announced a plan to coat the entire Golden Gate Bridge in gold leaf",
  "Trump claims he has never read a book and yet wrote the 'Art of the Deal'",
  "Trump wants a law that makes it illegal to not smile when seeing his picture",
  "Trump believes his shadow has its own fan base",
  "Trump wants to replace the currency system entirely with TrumpBucks, but with his face on every coin",
  "Trump announced he will run a marathon – in a golf cart",
  "Trump claims his handshake is so powerful it can cure the hiccups",
  "Trump wants to install a 'Big Red Button' that launches a fireworks show when his approval rating goes up",
  "Trump believes clouds are made of cotton candy if he wishes hard enough",
  "Trump announced he will run for 'President of the Internet' and win by a landslide",
  "Trump wants to require all news channels to broadcast his tweets in real time with dramatic music",
  "Trump claims he has a black belt in 'verbal karate'",
  "Trump wants to rename sleep to 'Trump recharge time'",
  "Trump believes every planet should be named after a member of his family",
  "Trump announced he will create a 'Trump University' where the only subject is him"
];

const badgeData = [
  {
    name: "First Click",
    description: "Clicked the button for the first time",
    imageUrl: "/images/badges/first-click.svg"
  },
  {
    name: "Click Addict",
    description: "Clicked 100 times total",
    imageUrl: "/images/badges/click-addict.svg"
  },
  {
    name: "True Believer",
    description: "Subscribed to the newsletter",
    imageUrl: "/images/badges/true-believer.svg"
  },
  {
    name: "Prophet",
    description: "Won 5 bets correctly",
    imageUrl: "/images/badges/prophet.svg"
  },
  {
    name: "Whale",
    description: "Accumulated 1000 TrumpBucks",
    imageUrl: "/images/badges/whale.svg"
  }
];

async function seed() {
  console.log("🌱 Inizio seeding...");
  await db.insert(phrases).values(
    samplePhrases.map(text => ({ text, isProphecy: false }))
  ).onConflictDoNothing();
  console.log(`✅ Inserite ${samplePhrases.length} frasi`);
  await db.insert(badges).values(badgeData).onConflictDoNothing();
  console.log("✅ Badge inseriti");
  console.log("🎉 Seeding completato.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Errore durante il seeding:", err);
  process.exit(1);
});