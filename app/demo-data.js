/* DISRUPT Launch — shared demo content for sales tour and booth dashboard.
 * Loaded by both launch.html (?tour=true / ?demo=true via demoSkipToOutput)
 * and dashboard.html (?demo=true / ?booth=true) so prospects see a consistent
 * Heritage Funeral Home demo across the whole product.
 *
 * Authored to match the current generation pipeline:
 *   - 7 strategic modules: goals, competitors, brand, personas, scripts,
 *     preneed, roadmap (overview only)
 *   - week_posts: 13 weeks × 5 posts each, fixed mix (1 Reel + 1 Gallery
 *     + 3 Photos), Facebook-first, no hashtags
 *   - scripts: 13 video scripts (one per week's Reel) with all 6 sections
 *
 * If the engine changes, regenerate Heritage's content via the admin
 * Regenerate flow against a Supabase row, then paste the new strings here.
 */
(function(){
'use strict';

// ── 7 STRATEGIC MODULES ─────────────────────────────────────────────────────

const GOALS = `YOUR 90-DAY GROWTH MISSION
Make Heritage Funeral Home the most visible, most trusted, and most talked-about funeral home in Franklin and Venango County — in a way that feels authentic, not performative.

90-DAY TARGETS
- 9 additional at-need cases above baseline of 111/year
- 6 qualified pre-need inquiries (2 per month from Month 2 onward)
- Increase Google reviews from 85 to 100
- 3x current organic Facebook reach
- Fully-staffed on-camera content cadence (James + Maddison weekly)

12-MONTH TARGETS
- 35-40 incremental cases (12-month run rate)
- 130+ Google reviews at 4.9+ stars
- 24+ pre-need contracts written
- Heritage recognized as the digital-first home in Franklin

ROI PROJECTION
- Cases needed to break even: 1 in Month 1 at $6,700 average revenue
- 90-day revenue upside (9 cases): $60,300
- 12-month revenue upside (40 cases): $268,000

SUCCESS METRICS — WEEK BY WEEK
Month 1: 3 incremental cases, 90 reviews, content cadence locked
Month 2: 3 additional cases, 95 reviews, 2 pre-need inquiries booked
Month 3: 3 additional cases, 100 reviews, 4 pre-need inquiries booked

KEY ASSUMPTIONS
- James is willing to be on camera weekly without a script
- The 115-year building can be filmed freely (no permits/restrictions)
- The team will execute weekly tasks consistently, not in batches
- At-need volume holds steady or grows naturally during the 90 days`;

const COMPETITORS = `COMPETITIVE LANDSCAPE
Franklin, Pennsylvania — Venango County. Heritage is competing with three named players plus the broader perception that all funeral homes are interchangeable. The opening is huge: every competitor is digitally invisible. Heritage can own the entire online conversation in 90 days.

COMPETITOR: Gardinier-Warren Funeral Home
MARKET POSITION: Legacy default. The home families call when they don't research first. Decades of word-of-mouth trust with older demographics.
STRENGTHS: Name recognition. Established referral base. Repeat-family loyalty.
WEAKNESSES: Zero digital presence worth noting. No video content. No community programming visible online. Invisible to families under 55 who research before calling.
ATTACK ANGLE: Show up where they don't. Every Facebook video, every Google review, every grief event post is territory they've abandoned. Own it before they notice you're taking it.
MESSAGE TO STEAL: They lean on "tradition." Heritage owns "tradition + showing up online" — the same story, but visible.

COMPETITOR: Timothy Hartle Funeral Home
MARKET POSITION: Local alternative. Minimal digital footprint. Drifting market share.
STRENGTHS: Lower-priced reputation among value-conscious families.
WEAKNESSES: No consistent content strategy. Families searching online find nothing compelling. No grief programming. No stated differentiator.
ATTACK ANGLE: Heritage's video volume + review volume makes the comparison irrelevant. Families who find Heritage online won't seriously consider Hartle.

COMPETITOR: Hile-Best Funeral Home
MARKET POSITION: Perceived budget option. Draws price-sensitive families who lead with cost.
STRENGTHS: Price visibility. Simple decision for cost-first buyers.
WEAKNESSES: Competing on price is the weakest possible position when trust is the actual product. Families choosing on price alone aren't Heritage's families anyway.
ATTACK ANGLE: Never compete on price. Educate families on what they're actually purchasing — the chapel, the building, the grief programming, the 110-year promise.

COMPETITIVE POSITIONING MAP
Heritage sits alone in the high-awareness + high-distinctiveness quadrant once the 90-day plan executes. Currently low-awareness but already high-distinctiveness — the gap is purely visibility, not substance.

THE OPENING
The single biggest competitive gap in Franklin is digital trust. No funeral home in Venango County has built a recognizable on-camera face, a steady review pipeline, or community-event content. Heritage can own all three in 90 days because the bar is on the floor.`;

const BRAND = `POSITIONING STATEMENT
Heritage Funeral Home is the only full-service, family-owned funeral home in Venango County with a full chapel, active grief support programming, and over 110 years of showing up completely — before the call, during the arrangement, and long after the burial.

BRAND PROMISE
You'll never wonder if you made the right choice.

MESSAGE PILLARS
PILLAR 1: Show Up Completely
The Suit at 2 AM — Suited professionals at every call. A phone answered by a real person. Community events with nothing to do with funerals but everything to do with relationship. The operating standard becomes the brand promise made visible.

PILLAR 2: Own the Building
115 years of architecture as a competitive moat — A 115-year Victorian landmark competitors can't replicate. Full chapel seating 200+. Visible, sustained investment in the place families trust with their hardest moments.

PILLAR 3: Put a Face to the Name
James and Maddison on camera, weekly — Families choose people before they choose funeral homes. Video content builds pre-trust before the call happens. Competitors are hiding. Heritage is showing up.

PILLAR 4: Lead With Aftercare
Aftercare as proof, not pamphlet — 10+ annual grief support events. Widow lunches. Butterfly releases. Holiday remembrance services. Community paint classes. Nobody else in Franklin invests in families after the service. It's not a program — it's proof.

VOICE & TONE GUIDE
DO: Speak in present tense ("we show up"). Be specific (not "compassionate care" — say "we answer at 2 AM in a suit"). Tell stories. Confidence without bragging. Honest about price.
DON'T: "At this difficult time." "We treat every family like our own." Generic stock photography. Hedging language. Apologizing for being premium.

TAGLINE OPTIONS
1. The Funeral Home That Shows Up — Simple. Earned. Defensible.
2. 110 Years of Showing Up — Legacy + present-tense action.
3. Franklin's Funeral Home Since 1912 — Local roots, bold claim.
4. We Answer. Every Time. — Operational promise as positioning.
5. The One Call You Make Once — Value claim, no apology.
RECOMMENDED: 1 — "The Funeral Home That Shows Up." Earned, distinctive, action-oriented.

BRAND ANTI-PATTERNS
1. Stock-photo families holding hands.
2. The phrase "in your time of need."
3. Hiding the price.
4. Generic templated review responses.
5. Anything that could be said by Hartle, Gardinier-Warren, or Hile-Best without changing a word.`;

const PERSONAS = `PERSONA 1: THE AT-NEED CALLER
NAME & PROFILE: Jennifer Torres. 54. Local. Employed in healthcare. Adult children of her own.
THE MOMENT: 11:47 PM on a Tuesday. She's at the hospital. Her father just died. She has never called a funeral home before.
FIRST GOOGLE SEARCH: "funeral home franklin pa open now"
TOP 3 FEARS: 1) Making the wrong choice and being judged by siblings. 2) Walking into a place that feels transactional. 3) Not having the energy to research properly.
TRUST TRIGGER: A real person answers the phone — in a suit, in a real building she recognizes from Facebook.
WINNING MESSAGE: "You'll never wonder if you made the right choice." She needs to BELIEVE this before she dials.
REVIEW DRIVER: When the entire experience matched what she saw on Facebook before she ever called.

PERSONA 2: THE PRE-PLANNER
NAME & PROFILE: Robert Mitchell. 71. Retired teacher. Widowed last spring. Two adult kids in different states.
THE MOMENT: He just attended a friend's funeral last week. The chaos he saw was the trigger. He doesn't want his kids to handle what he had to.
FIRST GOOGLE SEARCH: "pre-planning funeral franklin pa"
TOP 3 FEARS: 1) Being a burden to his kids. 2) Having no say in what happens. 3) Being upsold by a salesman in a suit.
TRUST TRIGGER: A no-pressure consultation that respects his time and lets him make decisions on his terms.
WINNING MESSAGE: "Pre-planning is a gift to your family — not a sale." Plain language. No urgency tactics.
REVIEW DRIVER: When he recommends Heritage to a friend at coffee — because the experience was straightforward and he didn't feel sold.

PERSONA 3: THE ADULT CHILD RESEARCHER
NAME & PROFILE: Alison Trebil. 39. Living in Pittsburgh. Mother lives alone in Franklin and is starting to decline.
THE MOMENT: She's researching now, ahead of need. She wants to give her mother options before it's an emergency.
FIRST GOOGLE SEARCH: "best funeral home franklin pa reviews"
TOP 3 FEARS: 1) Recommending the wrong place from far away. 2) Family backlash if her mother doesn't approve. 3) High-pressure sales when she finally calls.
TRUST TRIGGER: Strong reviews + visible community presence + clear pricing communication.
WINNING MESSAGE: "We make it easy for you, even from out of town." Heritage handles the family conversation for her.
REVIEW DRIVER: When her mother says "I'm glad you found them" after the consultation.

BUYING TRIGGER RANKINGS FOR HERITAGE FAMILIES
Local reputation / word of mouth: 5/5 — primary driver
Personal connection with staff: 5/5 — James and Maddison are the brand
Facility appearance: 5/5 — the building closes as many cases as the staff
Speed of response: 5/5 — the 2 AM standard is the product
Digital presence / reviews: 4/5 — rising fast as decision-makers shift younger
Pre-need planning urgency: 4/5 — strong for Robert, lower for Jennifer
Cultural / religious alignment: 3/5 — present but not primary
Price / affordability: 3/5 — present but not primary`;

const PRENEED = `PRE-NEED STRATEGY
Heritage's pre-need engine is its 90-day content plan. Pre-need families don't walk in because they saw an ad — they walk in because they already trust the home from weeks of seeing James on Facebook, the building lit at night, the grief events, and the 30-day card story. The content IS the funnel. Week 7 surfaces the offer to an audience already warm.

LEAD MAGNET OFFER
OFFER NAME: The Heritage Pre-Need Conversation
OFFER DESCRIPTION: A 45-minute, no-pressure sit-down with James or Maddison. We listen first, document what matters to the family, and only walk through pricing if asked. No quotas. No follow-up calls unless requested.
WHY IT WORKS: Robert's #1 fear is being upsold. Naming "no pressure" + "no follow-up unless requested" disarms that fear before he even dials.

LANDING PAGE COPY
HEADLINE: A 45-Minute Conversation. Zero Pressure.
SUBHEADLINE: Plan ahead on your terms. We listen first. We answer your questions. We only quote prices if you ask.
BODY COPY:
Most families don't pre-plan because they're afraid of getting sold. We get it. So we built a different conversation.
You sit with James (third generation) or Maddison. They listen. They answer the questions you came in with. If you want to know prices, they'll walk you through them. If you don't, they won't.
You leave with a written summary of your conversation. No contracts unless you ask for one. No follow-up calls unless you request them.
That's it. That's the whole offer.
BULLET POINTS:
- 45 minutes, in person at Heritage or at your home
- Free. Always.
- Pricing only if you request it
- Written summary of the conversation, mailed within a week
- Zero follow-up calls without your permission
CTA BUTTON TEXT: Schedule My Conversation

FOLLOW-UP SEQUENCE
SAME DAY — Phone call script: "This is James from Heritage. I just want to confirm we have you down for [date/time]. No need to bring anything. Park in the lot — I'll meet you at the front door."
DAY 2 — Email: Subject: "Looking forward to our conversation" — Brief confirmation, what to expect, no upsell.
DAY 7 — Phone call (only if no-show): "Just calling to see if you'd like to reschedule. Either way, no pressure."
DAY 14 — Text from director by name: "It's Maddison. Just thinking of you. If pre-planning isn't right for you right now, I get it. We're here whenever you're ready."
DAY 30 — Final email: Subject: "An open door, anytime" — Reaffirms no-pressure stance, links to free downloadable pre-need checklist.

FACEBOOK AD COPY
HEADLINE: We Built a Pre-Need Conversation Without the Pitch
PRIMARY TEXT: 45 minutes. James or Maddison. They listen first. You leave with a written summary, not a contract. Pricing only if you ask. That's the whole thing.
CTA BUTTON: Schedule Conversation
TARGET AUDIENCE NOTES: 60-78. Local (Franklin/Oil City/Titusville). Recently widowed indicators OR planning-life-events life event signal.`;

const ROADMAP = `CONTENT STRATEGY OVERVIEW
Heritage's 90-day plan is built around the four message pillars. Each week reinforces one or two pillars while introducing new content angles — building a coherent 13-week narrative that ends with momentum, not closure. Facebook-first; cross-post to Instagram via Meta Business Suite when relevant.

CONTENT PILLARS
PILLAR 1: Show Up Completely — Operating standards as proof of brand
PILLAR 2: Own the Building — Architecture and facility as moat
PILLAR 3: Put a Face to the Name — James and Maddison build pre-trust
PILLAR 4: Lead With Aftercare — Grief programming as differentiator

PLATFORM STRATEGY
FACEBOOK: 5 posts per week. Mix: 1 Reel + 1 Facebook Gallery + 3 Photos. Cadence: Tuesday/Wednesday/Thursday/Friday/Saturday. Post in the early evening for organic reach.
INSTAGRAM CROSS-POST: Use Meta Business Suite to mirror Facebook posts to Instagram when relevant. Reels translate directly. Galleries work as Instagram carousels (cap at 10 photos). Skip cross-posting on text-heavy story posts.
GOOGLE BUSINESS: Weekly post (any of the week's content), 2 review request texts per week from James or Maddison directly, respond to every review within 48 hours.

WEEKLY THEMES — MONTHS 1-3
WEEK 1: Why the Building Matters
Focus: Establish the 115-year Victorian as a competitive differentiator, not a backdrop.

WEEK 2: Aftercare Is Not a Brochure
Focus: Show the grief program in action — proof of long-term care.

WEEK 3: The Suit at 2 AM
Focus: James on camera. The professional dress standard as positioning.

WEEK 4: The Competitor Nobody Mentions
Focus: Position cheap as a risk families don't see coming. Education over comparison.

WEEK 5: Cremation Is Not One Thing
Focus: Demystify the full range of cremation options. Position Heritage as guide, not salesperson.

WEEK 6: 110 Years of Showing Up
Focus: Legacy as proof of staying power and reinvestment, not nostalgia.

WEEK 7: Pre-Need Without the Pressure
Focus: Dedicated pre-need push. Lead with peace of mind, not urgency.

WEEK 8: The Family Who Called at Midnight
Focus: Anonymized client story. Most human content of the quarter.

WEEK 9: Veterans Deserve More
Focus: Speak directly to veteran families with specific service details.

WEEK 10: What Premium Actually Means
Focus: Address the most-expensive perception directly and confidently.

WEEK 11: The Paint Class Nobody Expected
Focus: Grief support events as community-presence proof.

WEEK 12: The Chapel Nobody Else Has
Focus: Full chapel seating 200+ as defensible competitive advantage.

WEEK 13: The Next 110 Years Start Now
Focus: Forward-looking close. James and Maddison together. Momentum, not conclusion.

REVIEW GENERATION STRATEGY
STEP 1 — IMMEDIATE POST-SERVICE TEXT: Within 48 hours of every service, James or Maddison sends a personal text to the primary family contact. No review ask. Just presence. Plants the seed.
STEP 2 — 14-DAY REVIEW REQUEST: Two weeks after service, send a personalized email (not a template) with subject "Would you share your experience?" Include direct Google review link. Sign from the director who served them.
STEP 3 — IN-PERSON PRE-NEED ASK: At the end of every pre-need consultation that converts, James or Maddison says: "If you're comfortable, a Google review helps other families know what to expect."
STEP 4 — MONTHLY REVIEW SPOTLIGHT: Once a month, screenshot a recent 5-star review (with permission), post to Facebook + Instagram, thank the family publicly (first name unless they approve full name).
TARGET: 18 new reviews in 90 days (6/month average). Current count 85, end goal 100+.

90-DAY MILESTONES
DAY 30: 95 Google reviews, 3 incremental cases, content cadence locked, James filmed weekly.
DAY 60: 98 reviews, 6 total incremental cases, 2 pre-need inquiries booked.
DAY 90: 100+ reviews, 9+ incremental cases, 4-6 pre-need inquiries, Heritage recognized as Franklin's most active funeral home online.`;

// ── 13 WEEKS × 5 POSTS EACH ─────────────────────────────────────────────────

const WEEK_POSTS = {
  1: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Wide exterior shot of the 115-year Heritage building during golden hour. The full Victorian facade visible. James standing at the front entrance in a dark suit. No cars in frame. Natural light only.
CAPTION: There's a reason this building has been part of Franklin since 1912. We're the third generation to keep it standing. The stained glass behind me is original. The oak doors are original. So is our conviction that families deserve a place that feels as important as the moment.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James walks through the front doors, into the foyer, past the parlors, and up to the chapel. 30-second walk-and-talk. Open with: "Walk into Heritage with me for 30 seconds." End at the chapel entrance, full frame.
CAPTION: 115 years. Three generations. One full chapel that seats over 200. No other funeral home in Venango County has this. Walk in with me.
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 7-photo album. (1) Exterior wide. (2) Front entrance close-up of original woodwork. (3) Foyer with chandelier. (4) Stained-glass window detail. (5) Family parlor wide shot. (6) Chapel from the back of the room. (7) Architectural detail nobody usually notices.
CAPTION: A tour of 115 years. Each photo here is something we've maintained, restored, or reinvested in. None of this happens by accident. None of it can be replicated by a building five years old.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: Close-up of the original stained-glass window with afternoon light streaming through. Frame so the colored light is on the floor of the parlor. No people.
CAPTION: This window has watched over Franklin families for 115 years. It's not decoration. It's witness.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: James and Maddison in the chapel, suited, sitting in the front pew, in conversation. Mid-shot, natural light, candid feel.
CAPTION: We're a family running a funeral home for other families. That's not a marketing line. That's just true.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  2: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Close-up of a hand-written 30-day card on a kitchen table, with a coffee cup beside it. Soft afternoon light. The handwriting visible but not readable.
CAPTION: 30 days after every service, we send a card by hand. Not a printed sympathy template. A real note from the director who served you. Most families tell us it's the thing they remember most.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: Maddison in the gathering room, 30-second to-camera. Open: "Most funeral homes talk about aftercare in a brochure. We don't have a brochure." Walk through what aftercare actually means here — the cards, the events, the year-anniversary call.
CAPTION: Aftercare isn't a service line at Heritage. It's the relationship. Here's what that looks like.
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 6-photo album from a recent butterfly release event. Faces visible only with permission, otherwise back-of-head shots and details. (1) Setup wide shot. (2) Sign with names. (3) Family at the table. (4) Butterfly being released, mid-flight. (5) Group photo. (6) Empty chairs at the end.
CAPTION: Last month's butterfly release. 47 names. 47 stories. One afternoon. We host events like this 10+ times a year — included for every Heritage family, free, forever.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: Stack of envelopes on a desk, each addressed by hand. Pen visible. Director's hand mid-write on the top one (anonymized).
CAPTION: This is a Tuesday afternoon at Heritage. Cards going out to families at the 30-day mark, the 90-day mark, and the one-year anniversary. By name, by hand.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: Wide shot of the gathering room set up for a widow's lunch. Tables, place settings, flowers. No people in frame yet.
CAPTION: Tomorrow's widow's lunch. We host these monthly. Lunch is on us. Connection is the point.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  3: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: James in full suit, standing at the front entrance under the porch light. Late evening. Building lit behind him. Confident, direct gaze at camera.
CAPTION: You called us at 2 in the morning. I answered in a suit. That's not an accident. That's our standard.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James direct-to-camera at the front entrance, full suit, evening light. 60-90 seconds. Open with: "Most families have never called a funeral home before they call us." Tell the suit-at-2-AM story in his own words. End at the threshold, looking up at the building.
CAPTION: Most people have never called a funeral home before. They're scared. They've never done this. What they see in the first five minutes tells them everything. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 5-photo album showing the readiness standard. (1) Director's office at 11 PM, lights on. (2) Pressed suits on hangers. (3) Phone log on a clean desk. (4) Hearse parked, polished. (5) Front entrance lit at night.
CAPTION: What "always ready" actually looks like. Lights on. Suits pressed. Phone answered. Every night. Every call.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: Close-up of a phone on a desk, 2:14 AM visible on the clock. Hands of a director (suit cuffs visible) reaching for it. Soft desk lamp light.
CAPTION: This phone is answered. Every time. By a real person. In a suit.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: James and Maddison in matching dark suits, standing side-by-side at the front entrance. Confident, side-by-side, looking forward. Natural exterior light.
CAPTION: Two generations. Same standard. Same suit. Same answer at 2 AM.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  4: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Wide shot of Heritage's main parlor — empty, fully prepared for a service. Flowers, programs, podium, lighting. Looks expensive. Looks like care.
CAPTION: Cheap is a gamble. The lowest price doesn't tell you what's missing. We don't sell cheap. We sell thorough.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: Maddison in the parlor, walking and talking. 60 seconds. Educational tone. Open: "Here are 5 questions to ask any funeral home before you choose." Number them clearly. End: "If they can't answer these, you have your answer."
CAPTION: Five questions every family should ask before choosing a funeral home. Save this. Share it with someone who's planning. — Maddison
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 6-photo album showing what families actually see at Heritage. (1) Front entrance. (2) Parlor with flowers. (3) Casket selection room (warm, not clinical). (4) Chapel with the lights up. (5) Reception space. (6) Pricing sheet visible on a clean desk.
CAPTION: The walk-through, from the moment you arrive. Pricing is on the sheet. Questions are welcome. No surprises.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: Aerial-ish shot of a family arrangement table — pen, paper, brochure, coffee cups, a tissue box, a phone. Mid-conversation feel.
CAPTION: An arrangement conference at Heritage takes 90 minutes on average. Not 30. We don't rush the parts that matter.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: Close-up of a priced services menu (anonymized so specific numbers aren't visible). Clean, organized, professional.
CAPTION: We share pricing in writing, before you decide anything. Always. Cheap homes hide their numbers because they have to. We don't.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  5: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Side-by-side display of three different cremation memorial options on a clean table — urn, scattering tube, keepsake jewelry. Soft natural light.
CAPTION: Cremation isn't one thing. Here are three options most families don't know they have. We walk you through every one.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: Maddison in a sun-lit room with cremation urns visible on shelves behind her. 60-second to-camera. Open: "If you're considering cremation, here's what nobody tells you." Walk through the 3-4 things families wish they'd known. Plain language.
CAPTION: Cremation has more options than most families realize. Here's what we wish every family knew before deciding. — Maddison
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 7-photo album of the cremation memorial options at Heritage. (1) Urn display wide. (2) Wood urns close-up. (3) Memorial jewelry. (4) Scattering tubes. (5) Keepsake stones. (6) Engraving samples. (7) Pricing sheet visible.
CAPTION: Cremation memorial options at Heritage. Every one of these has a price visible on the sheet. Take your time.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A single hand-crafted urn on a velvet cloth. Studio-style lighting. Clean and dignified.
CAPTION: Cremation doesn't mean less care. It means different choices. We honor every one.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: A family member's hand placing a memorial keepsake on a fireplace mantel at home (anonymized). Warm domestic setting.
CAPTION: Where memory lives matters. We help families think through it carefully — not quickly.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  6: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Side-by-side of a 1920s archival photo of the Heritage building and a 2026 photo from the same angle. Time-passing visual.
CAPTION: 1912. 2026. Same building. Same family. Three generations of showing up — through a Depression, two world wars, and every Tuesday in between.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James walking through the building from front to back, narrating the renovation history. 60-90 seconds. Open: "We've been investing in this building for 110 years." Point out specific renovations from each decade. End in the chapel.
CAPTION: 110 years of reinvestment. Roof replaced four times. Chapel expanded twice. Original woodwork preserved every time. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 8-photo album showing renovation timeline. (1) Original 1912 photo. (2) 1950s exterior. (3) 1980s addition. (4) 2010 chapel renovation. (5) 2020 facade restoration. (6) 2024 reception room update. (7) Current exterior. (8) The original cornerstone with the date carved in.
CAPTION: A funeral home that hasn't reinvested in itself in 30 years isn't a legacy. It's a relic. Here's what 110 years of upkeep actually looks like.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: Close-up of the original cornerstone of the building, "1912" engraved.
CAPTION: 1912. Same building. Same family. Same answer.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: Three generations of Whitfield family photos arranged on a desk — the founder, James's father, James and Maddison.
CAPTION: Three generations. One promise. We're not going anywhere.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  7: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: A couple in their late 60s sitting together at a kitchen table reviewing paperwork. Warm light. Calm posture, not stressed.
CAPTION: Pre-planning isn't morbid. It's a gift. The people who love you don't have to guess.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James in his office, sitting at a desk with a folder of pre-planning documents. 60-second to-camera. Open: "Most families don't pre-plan because they're afraid of getting sold. We get it. So we built a different conversation." Walk through the no-pressure offer.
CAPTION: Our pre-need conversation is 45 minutes. No pressure. No follow-up calls without your permission. We listen first. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 5-photo album. (1) The pre-planning consultation room — warm, comfortable, not corporate. (2) A pre-planning checklist on the table. (3) Coffee being poured. (4) A handshake at the start. (5) A folder being handed across the table at the end.
CAPTION: What a pre-planning conversation actually looks like at Heritage. No high-pressure pitch. No artificial urgency. Just a real conversation.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A hand placing a Heritage pre-planning folder into a home filing cabinet labeled "Important Stuff" (anonymized).
CAPTION: Where pre-planning ends up: in the folder labeled "Important Stuff." Where your family will find it. Without scrambling.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: A real handwritten testimonial card on the desk (anonymized). Not staged.
CAPTION: "They didn't try to sell me anything. They just helped me get it done." That's the highest review we get.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  8: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: The Heritage building lit at night. Front porch lamp on. Otherwise dark exterior. Sense of stillness and readiness.
CAPTION: A family called us last month at 2:14 in the morning. The porch light was on. The phone was answered. That's the standard.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James in his office, evening light from desk lamp, suit on. 90-second to-camera. He tells the midnight call story (anonymized) in his own words. Open: "I won't tell you their name. But I'll tell you what happened that night." Slow, deliberate pace.
CAPTION: The midnight call story. Anonymized. Real. This is why we answer. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 5-photo album of the building at different night hours. (1) 9 PM front porch. (2) 11 PM with director silhouette in the office window. (3) 1 AM front entrance lit. (4) 3 AM interior light from foyer. (5) 5 AM exterior with sunrise behind.
CAPTION: A night at Heritage. The porch light stays on. Someone is here. Always.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A hand-written note from a family on a desk — the kind that arrives a few weeks after a service. Anonymized.
CAPTION: The notes we save. The reminders of why we answer.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: James in suit, sitting alone in the office at evening, light from a single desk lamp, looking thoughtful.
CAPTION: Most nights are quiet. The point is being ready when they're not.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  9: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: An American flag folded in formal triangle on a presentation table. Honor guard cap visible nearby. Soft lighting, dignified composition.
CAPTION: Veteran services aren't a checkbox at Heritage. They're a ceremony. A real one. With every honor your family is due.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James outside the building, near the flagpole, in suit. 60-second to-camera. Open: "Most funeral homes can't tell you what veteran honors actually involve. We can." Walk through what Heritage does specifically — flag presentation, military escort coordination, VA paperwork help.
CAPTION: For our veteran families. Here's what Heritage does that most homes skip — and why it matters. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 6-photo album of veteran service elements (no faces unless permission). (1) Honor guard preparing. (2) Flag presentation moment. (3) Folded flag close-up. (4) Cemetery setting with military honors. (5) VA paperwork being completed at our desk. (6) Wide shot of attendees in respectful silence.
CAPTION: A veteran service at Heritage. The honors are full. The paperwork is handled. The family doesn't have to ask twice.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A weathered military service medal on a wood table, alongside a photo frame (faces blurred for privacy).
CAPTION: The medals don't just sit in a box. We make sure the story lives with them.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: Honor guard rifle salute mid-action at a Heritage service, taken from behind so faces aren't visible.
CAPTION: When we say "with every honor due" — we mean every one.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  10: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: A single chandelier in the chapel, photographed from below. Detailed, ornate, expensive-looking.
CAPTION: They call us the most expensive funeral home in Franklin. They're not wrong. Here's what that pays for.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James direct-to-camera in the chapel, suit on, evening light. 60-90 seconds. Open: "People call us the most expensive funeral home in Franklin. They're not wrong. Here's why that doesn't bother me." Confident, no apology.
CAPTION: We're not for everyone. But for families who want to know they got it right — we're the call you make once. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 7-photo album of what premium actually includes at Heritage. (1) Full chapel wide. (2) Full-time grief counselor's office. (3) Reception space ready. (4) Hand-bound memorial book in progress. (5) Restored Victorian woodwork detail. (6) Director on staff at 2 AM. (7) Final pricing sheet showing what's included.
CAPTION: Premium isn't a markup. It's everything in this album. We don't apologize for what's included. We name it.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A Heritage-bound memorial book on a velvet table. Hand-stitched binding visible. Closed.
CAPTION: A hand-bound memorial book. Included for every Heritage family. Nobody else does this. That's what premium means.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: A real client review screenshot (with permission) saying something like "Worth every penny. They thought of everything."
CAPTION: From a recent family. We didn't write this. They did.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  11: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Wide shot of the Heritage gathering room set up for a paint class — easels, canvases, brushes laid out, late afternoon light.
CAPTION: We host a community paint class once a month. At a funeral home. We know how that sounds. We do it anyway.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: Maddison in the gathering room before a paint class starts, walking through the easel setup. 60 seconds. Open: "A funeral home running a paint class. We get the look. Here's why we do it anyway." Explain grief programming as community presence.
CAPTION: Yes, we run a paint class. At a funeral home. This is what aftercare looks like at Heritage. — Maddison
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 7-photo album of last month's paint class. (1) Setup wide. (2) Group of attendees painting. (3) Close-up of canvas in progress. (4) Maddison talking with an attendee. (5) Coffee and cookies on a side table. (6) Smiling participants (with permission). (7) Finished paintings displayed.
CAPTION: 12 people. 3 hours. One Wednesday afternoon at Heritage. We host events like this because grief doesn't end at the service.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A finished painting from the class, leaning against an easel. Simple, hopeful image.
CAPTION: A painting from last month's class. The artist is doing better than she was. That's the whole point.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: Sign-up sheet for next month's paint class on a clipboard at the front desk. Handwritten names visible (anonymized).
CAPTION: Next class is filling up. We never charge for these. We never will.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  12: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: Wide shot of the Heritage chapel from the back, fully set up for a service. 200+ seats visible. High ceilings, original woodwork, central podium.
CAPTION: 200+ seats. Original 1912 woodwork. Audio-visual system. Acoustics designed for a packed room. No other funeral home in Venango County has this.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James walking the chapel — start at the podium, walk down the center aisle, end at the back, then turn to face camera. 60-second to-camera. Open: "Walk this chapel with me." Explain capacity, AV, why a full chapel matters when the family is bigger than a parlor.
CAPTION: A full chapel matters when the family is bigger than a parlor. Here's why ours holds 200. — James
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 6-photo album of the chapel. (1) Wide from the back. (2) Original woodwork detail. (3) Podium close-up. (4) AV booth with equipment. (5) Stained-glass window from inside. (6) Full-room view with seating arranged.
CAPTION: A tour of the only full chapel in Venango County. 200+ seats. Acoustics designed for it. Every family who needs the space gets it, no upcharge.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: Programs printed on a polished table, ready for guests. Heritage logo visible on the cover.
CAPTION: We print programs in-house. Same day. Whatever count you need.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: A wide shot of a Heritage chapel service in progress (taken from behind so faces aren't visible). Full or near-full seats visible.
CAPTION: A service we hosted last month. 180 people. One chapel. Heritage doesn't move services off-site. We never have to.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,

  13: `POST 1
POST TYPE: Photo
VISUAL DIRECTION: James and Maddison standing together at the front entrance of Heritage, suits on, looking forward. Wide framing showing the building behind them. Late golden hour light.
CAPTION: 110 years down. The next 110 start now. Same building. Same family. Same answer at 2 AM. We're not going anywhere.
CROSS-POST: Yes
BEST TIME: Tuesday 7-9 PM

POST 2
POST TYPE: Reel
VISUAL DIRECTION: James and Maddison together in the chapel. 90-second walk-and-talk. Open: "We just spent 90 days showing you who we are. Here's what comes next." Recap the quarter, look forward to the next one.
CAPTION: 90 days of showing up online. Here's what's next for Heritage — and what it means for the families we serve. — James and Maddison
CROSS-POST: Yes (re-format as IG Reel)
BEST TIME: Wednesday 6-8 PM

POST 3
POST TYPE: Facebook Gallery
VISUAL DIRECTION: 9-photo album recapping the quarter. (1) Building exterior. (2) James on camera. (3) Maddison on camera. (4) Butterfly release. (5) Paint class. (6) Chapel service. (7) Veteran tribute. (8) Pre-need conversation. (9) Two of them at the entrance.
CAPTION: 90 days. Every post on this page. Every video filmed. Every event hosted. Thank you for following along. The next 90 start tomorrow.
CROSS-POST: Yes (cap at 10 photos for IG)
BEST TIME: Thursday 12-2 PM

POST 4
POST TYPE: Photo
VISUAL DIRECTION: A handwritten thank-you note from James to "Franklin" — calligraphic, sincere, on Heritage letterhead.
CAPTION: A thank-you note to Franklin. We mean it. You let us serve you for 110 years. We'll keep earning that.
CROSS-POST: Yes
BEST TIME: Friday 10-12 AM

POST 5
POST TYPE: Photo
VISUAL DIRECTION: Heritage building exterior at sunrise, light hitting the front facade, the sign visible.
CAPTION: Tomorrow morning. Same building. Same family. Same answer. Forever.
CROSS-POST: Yes
BEST TIME: Saturday 11 AM-1 PM`,
};

// ── 13 SCRIPTS — ONE PER WEEK'S REEL ────────────────────────────────────────

const SCRIPTS = `SCRIPT 1: 115 Years of Showing Up
PLATFORM: Facebook Reel
RUNTIME: 45-60s
PERSONA TARGET: Jennifer Torres
SOURCE: Week 1 Post 2 (Reel)

HOOK (0-3 sec): Walk into Heritage with me for 30 seconds.

PROBLEM (3-15 sec): Most families have never set foot in a funeral home until they need one. By then, they're scared and exhausted. They don't have the energy to evaluate whether they're in the right place.

CREDIBILITY (15-25 sec): I'm James Whitfield. My family has run this building since 1912. The stained glass is original. The oak floors are original. So is the standard.

PROOF (25-40 sec): No other funeral home in Venango County has a full chapel that seats over 200. Or a building that's been continuously reinvested in for 110 years. Or three generations of one family that answer the phone in person.

CTA (final 5 sec): If you ever need us — you'll already know us. Heritage Funeral Home, Franklin.

DIRECTOR NOTES: Shoot at the entrance during golden hour. James in full suit. Walk through naturally — no teleprompter. Three takes minimum, cut the most natural.

SCRIPT 2: Aftercare Isn't a Brochure
PLATFORM: Facebook Reel
RUNTIME: 30-60s
PERSONA TARGET: Alison Trebil
SOURCE: Week 2 Post 2 (Reel)

HOOK (0-3 sec): Most funeral homes talk about aftercare in a brochure. We don't have a brochure.

PROBLEM (3-15 sec): A service ends. The flowers wilt. The casseroles stop coming. And the family that grieved publicly six weeks ago is suddenly grieving alone.

CREDIBILITY (15-25 sec): I'm Maddison. My dad and I run aftercare at Heritage as a relationship, not a service line. Hand-written 30-day cards. Year-anniversary calls. Monthly widow lunches. Free, forever, for every family we serve.

PROOF (25-40 sec): We host 10+ events a year. Butterfly releases. Holiday remembrances. Paint classes. We invented community grief programming in Franklin because nobody else was doing it — and grief doesn't end at the service.

CTA (final 5 sec): That's the difference. That's the relationship. Heritage Funeral Home.

DIRECTOR NOTES: Film in the gathering room. Maddison standing, comfortable, walking the room as she talks. Daylight from the windows.

SCRIPT 3: The Suit at 2 AM
PLATFORM: Facebook Reel
RUNTIME: 60-90s
PERSONA TARGET: Jennifer Torres
SOURCE: Week 3 Post 2 (Reel)

HOOK (0-3 sec): You called us at 2 in the morning. I answered in a suit. That's not an accident.

PROBLEM (3-15 sec): Most people have never called a funeral home before. They're scared. They're exhausted. They've never done this. And what they see in the first five minutes tells them everything they need to know about whether they made the right call.

CREDIBILITY (15-25 sec): I've been doing this in Franklin for over 22 years. My family did it before me. And the one thing I know is — how you show up matters. It tells a family: we take this seriously. You made the right call. Exhale.

PROOF (25-40 sec): Every director on staff at Heritage answers the phone in a suit. Every time. 2 AM, 3 AM, doesn't matter. That's the standard. We don't advertise it. We just live it.

CTA (final 5 sec): If you ever wondered what it feels like to have someone truly show up — Heritage Funeral Home, Franklin, Pennsylvania.

DIRECTOR NOTES: Front entrance, evening light, James in full suit. No teleprompter. The confidence IS the message — if he hedges, the whole thing falls apart. Coach him: own it.

SCRIPT 4: Five Questions to Ask Any Funeral Home
PLATFORM: Facebook Reel
RUNTIME: 45-60s
PERSONA TARGET: Alison Trebil
SOURCE: Week 4 Post 2 (Reel)

HOOK (0-3 sec): Here are five questions to ask any funeral home before you choose. Save this.

PROBLEM (3-15 sec): Most families pick a funeral home from a Google search and a phone call. Cheap or convenient. Then they walk in and find out what they actually purchased.

CREDIBILITY (15-25 sec): I'm Maddison Whitfield from Heritage. We've been the home in Franklin for 110 years. We watch families regret their choice when they didn't know what to ask.

PROOF (25-40 sec): One — Do you answer the phone in person at 2 AM? Two — Can I see your facility today? Three — Is your pricing in writing? Four — What aftercare do you provide? Five — Will the same person who answered the phone be there when I arrive?

CTA (final 5 sec): If they can't answer those, you have your answer. Heritage Funeral Home.

DIRECTOR NOTES: Maddison in the parlor or chapel, walking and talking. Number each question with a clear hand gesture. Energetic, educational tone, not somber.

SCRIPT 5: Cremation Has Options
PLATFORM: Facebook Reel
RUNTIME: 30-60s
PERSONA TARGET: Robert Mitchell
SOURCE: Week 5 Post 2 (Reel)

HOOK (0-3 sec): If you're considering cremation, here's what nobody tells you.

PROBLEM (3-15 sec): Most families think cremation is one decision. It's actually four or five — and they only find out the day they're sitting at our arrangement table.

CREDIBILITY (15-25 sec): I'm Maddison. We do cremation services every week at Heritage. We've watched families wish they'd known the options before they had to decide.

PROOF (25-40 sec): There's traditional cremation. There's direct cremation. There's cremation with a memorial service afterward. There's keepsake jewelry. Scattering options. Our pricing for every one of these is in writing — before you decide anything.

CTA (final 5 sec): Come see the options before you need them. Heritage Funeral Home, Franklin.

DIRECTOR NOTES: Sun-lit room with cremation urns visible behind. Maddison seated. Calm, educational, no urgency.

SCRIPT 6: 110 Years of Reinvestment
PLATFORM: Facebook Reel
RUNTIME: 60-90s
PERSONA TARGET: Both Jennifer + Robert
SOURCE: Week 6 Post 2 (Reel)

HOOK (0-3 sec): We've been investing in this building for 110 years.

PROBLEM (3-15 sec): A funeral home that hasn't reinvested in itself in 30 years isn't a legacy. It's a relic. Families can feel the difference the moment they walk in.

CREDIBILITY (15-25 sec): I'm James Whitfield. My grandfather bought this building in 1912. My father expanded the chapel in 1981. I restored the original woodwork in 2010. My daughter Maddison oversaw the reception room update in 2024.

PROOF (25-40 sec): The roof has been replaced four times. The chapel has been expanded twice. The original 1912 cornerstone is still in the foundation. None of this happens by accident — and none of it can be replicated by a building that opened five years ago.

CTA (final 5 sec): Come see what 110 years of staying power looks like. Heritage Funeral Home.

DIRECTOR NOTES: Walk-through from front entrance to chapel. Pause at specific renovation details — a doorframe, a pew, the cornerstone. Use natural light wherever possible.

SCRIPT 7: Pre-Planning Without the Pitch
PLATFORM: Facebook Reel
RUNTIME: 45-60s
PERSONA TARGET: Robert Mitchell
SOURCE: Week 7 Post 2 (Reel)

HOOK (0-3 sec): Most families don't pre-plan because they're afraid of getting sold. We get it.

PROBLEM (3-15 sec): Pre-planning has a reputation. High-pressure sales. Artificial urgency. "Lock in your rate today." Everything that makes a thoughtful person walk away.

CREDIBILITY (15-25 sec): I'm James Whitfield. I've watched my friends get sold pre-planning by salespeople who didn't know their kids' names. So we built a different conversation.

PROOF (25-40 sec): A Heritage pre-planning conversation is 45 minutes. We listen first. We answer your questions. We only walk through pricing if you ask. You leave with a written summary — no contracts, no follow-up calls without your permission.

CTA (final 5 sec): That's the whole offer. Schedule your conversation at Heritage.

DIRECTOR NOTES: James in his office, suit, evening light from desk lamp. Quiet, deliberate pace. No urgency, no salesy tone.

SCRIPT 8: The Midnight Call Story
PLATFORM: Facebook Reel
RUNTIME: 60-90s
PERSONA TARGET: Jennifer Torres
SOURCE: Week 8 Post 2 (Reel)

HOOK (0-3 sec): I won't tell you their name. But I'll tell you what happened that night.

PROBLEM (3-15 sec): A family called us at 2:14 in the morning. The mother had just died. The daughter was at the hospital alone — her brothers couldn't get there in time, her dad was already gone, and she had never done this before.

CREDIBILITY (15-25 sec): I'm James. I answered. I drove over. I was there in 25 minutes. I sat with her in our front parlor for two hours before we even started talking arrangements.

PROOF (25-40 sec): That's what answering at 2 AM actually means. It's not about the phone. It's about who shows up at 2:30 AM when a family has nobody else.

CTA (final 5 sec): If you ever need us — we'll be here. Heritage Funeral Home.

DIRECTOR NOTES: James in the office, single desk lamp, evening. Slow, reflective pace. Don't rush the silences.

SCRIPT 9: Veterans Deserve More
PLATFORM: Facebook Reel
RUNTIME: 45-60s
PERSONA TARGET: Veteran families directly
SOURCE: Week 9 Post 2 (Reel)

HOOK (0-3 sec): Most funeral homes can't tell you what veteran honors actually involve. We can.

PROBLEM (3-15 sec): When a veteran dies, their family is owed a ceremony. Honor guard. Flag presentation. Three rifle volleys. Taps. VA paperwork handled. Most homes know this exists. Few of them coordinate it well.

CREDIBILITY (15-25 sec): I'm James Whitfield. We've handled veteran services in Franklin for 110 years. We work directly with the local honor guard. We complete VA paperwork at our desk so the family doesn't have to.

PROOF (25-40 sec): A veteran service at Heritage includes the full military honors. Coordinated by us. The family doesn't ask twice. The flag is folded properly. The paperwork is handled. The ceremony is real.

CTA (final 5 sec): For our veteran families — we serve you the way you served us. Heritage Funeral Home.

DIRECTOR NOTES: James outside near the flagpole, suit on, formal posture. Salute the flag at the open if natural. Dignified, not stiff.

SCRIPT 10: What Premium Actually Means
PLATFORM: Facebook Reel
RUNTIME: 60-90s
PERSONA TARGET: Alison Trebil
SOURCE: Week 10 Post 2 (Reel)

HOOK (0-3 sec): People call us the most expensive funeral home in Franklin. They're not wrong.

PROBLEM (3-15 sec): When a family is making this decision in the worst week of their life, the last thing they need is to wonder what they're getting. Cheap is a gamble. They're not gambling with money. They're gambling with how their person is remembered.

CREDIBILITY (15-25 sec): I'm James. We have a full-time grief counselor on staff. A 115-year building we've never stopped investing in. A full chapel that seats 200+. Hand-bound memorial books for every family. Staff who answer in a suit at 2 AM. That's what the price pays for.

PROOF (25-40 sec): We're not for everyone. But for families who want to know they got it right — we're the call you make once and never regret.

CTA (final 5 sec): Heritage Funeral Home. The Funeral Home That Shows Up.

DIRECTOR NOTES: Chapel, evening, James in suit. Confident, no apology, no hedging. The confidence IS the message — if he wavers, kill the take.

SCRIPT 11: The Paint Class Nobody Expected
PLATFORM: Facebook Reel
RUNTIME: 30-60s
PERSONA TARGET: Both Jennifer + Robert
SOURCE: Week 11 Post 2 (Reel)

HOOK (0-3 sec): A funeral home running a paint class. We get the look.

PROBLEM (3-15 sec): When grief gets quiet — six weeks, twelve weeks, six months in — that's when most families need community most. And that's when most funeral homes have moved on.

CREDIBILITY (15-25 sec): I'm Maddison. We host a community paint class at Heritage once a month. Free, forever, for our families and anyone who needs it. We started it because nobody else was offering anything that quiet, that real.

PROOF (25-40 sec): 12 people show up each month. They paint. They eat cookies. They talk to people who get it. Some come back for years. We invented community grief programming in Franklin — and it works.

CTA (final 5 sec): Next class is filling up. Sign up at Heritage.

DIRECTOR NOTES: Gathering room set up before a class starts. Maddison walking through, casual, warm. Daylight.

SCRIPT 12: A Full Chapel Matters
PLATFORM: Facebook Reel
RUNTIME: 45-60s
PERSONA TARGET: Both personas
SOURCE: Week 12 Post 2 (Reel)

HOOK (0-3 sec): Walk this chapel with me.

PROBLEM (3-15 sec): When a family is bigger than a parlor, most funeral homes ask them to move the service to a church or a community center. Suddenly the family is coordinating two locations on the worst week of their life.

CREDIBILITY (15-25 sec): I'm James Whitfield. Our chapel seats over 200 people. AV system designed for it. Acoustics designed for it. No other home in Venango County has this — and we never charge a family extra to use it.

PROOF (25-40 sec): Last month we hosted a service for 180 people. One building. One family. One coordinated team. The family didn't worry about logistics for a single minute.

CTA (final 5 sec): When the family is bigger than the parlor — Heritage handles it. Heritage Funeral Home.

DIRECTOR NOTES: Walk through the chapel from podium to back. Wide angles. Show the scale. End with James turning to camera at the back of the room.

SCRIPT 13: The Next 110 Years Start Now
PLATFORM: Facebook Reel
RUNTIME: 60-90s
PERSONA TARGET: Both personas
SOURCE: Week 13 Post 2 (Reel)

HOOK (0-3 sec): We just spent 90 days showing you who we are. Here's what comes next.

PROBLEM (3-15 sec): Anyone can talk about being there for the long haul. Most funeral homes won't be in business in 30 years — and the families who chose them won't have anywhere to go for an anniversary call or a 30-day card.

CREDIBILITY (15-25 sec): I'm James. This is Maddison. We're three generations into Heritage. We're not selling. We're not consolidating. We're staying in Franklin, in this building, doing this work, for the next 110 years.

PROOF (25-40 sec): Same building. Same family. Same answer at 2 AM. The reinvestment doesn't stop. The aftercare doesn't stop. The standard doesn't change.

CTA (final 5 sec): If you ever need us — we'll be here. Heritage Funeral Home.

DIRECTOR NOTES: James and Maddison together at the front entrance, golden hour. End with both of them turning to look at the building before walking back inside. Warm, hopeful, forward-looking.`;

// ── EXPORTED OBJECT ─────────────────────────────────────────────────────────

window.DEMO_GENERATED_OUTPUT = {
  goals: GOALS,
  competitors: COMPETITORS,
  brand: BRAND,
  personas: PERSONAS,
  scripts: SCRIPTS,
  preneed: PRENEED,
  roadmap: ROADMAP,
  week_posts: WEEK_POSTS,
};

})();
