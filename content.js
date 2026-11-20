/* ------------------------------------------------------------------
   EDIT THIS FILE TO UPDATE YOUR SITE. You don't need to touch anything else.

   To add new work:
   1. Put your video or image in the "media" folder (videos under 25 MB).
   2. Copy one of the projects below and change the details.
   3. Upload the site again.
------------------------------------------------------------------- */
window.PORTFOLIO = {
  // Your name or brand. Leave empty to show "Roblox UI Design" instead.
  name: "Mladen",

  role: "Roblox UI Designer",
  status: "Open for commissions",

  // Each item is one line of the big headline.
  headline: ["Game UI", "players want", "to click."],

  intro: "I design and animate Roblox interfaces, from shops to crafting benches, so your game feels finished from the very first click. Everything here was made for real client games.",

  // Your Discord username. The contact section stays hidden until this is filled in.
  discord: "nightydev.",

  // Optional extra links, for example: { label: "Roblox", url: "https://www.roblox.com/users/..." }
  links: [],

  // Which parts of your videos play in the opening showreel (times in seconds).
  reel: [
    { video: "media/work-03.mp4", poster: "media/work-03-reel-poster.jpg", start: 9, end: 25 },
    { video: "media/work-01.mp4", poster: "media/work-01-poster.jpg", start: 5.5, end: 16 },
  ],

  // Words in the moving band between projects.
  marquee: ["Shops", "Crafting", "Class select", "Quests", "Battle pass", "Emote wheel", "Seasonal themes", "Menus", "Motion"],

  projects: [
    {
      title: "Fossil Dig Interface",
      label: "Client project",
      description: "A full desert-themed interface set in one hand-drawn fossil style: a bone shop, crafting with locked tiers, class select with perks, party creation and a quest board.",
      tags: ["Shop", "Crafting", "Class select", "Quests", "Party"],
      video: "media/work-03.mp4",
      poster: "media/work-03-poster.jpg",
      // The two colours the page shifts to while this project is on screen.
      colors: ["#b8742c", "#128f88"],
      // Photos. size can be: "third", "half", "wide" (or "a7" and "a5" for an uneven pair).
      photos: [
        { src: "media/still-desert-buy-bones.jpg", alt: "Buy Bones shop with four bone packs and a Gift Bones button", size: "a5" },
        { src: "media/still-desert-crafting.jpg", alt: "Crafting menu with item grid, resource counters and craft button", size: "a7" },
        { src: "media/still-desert-classes.jpg", alt: "Class select with a grid of classes and a starter tools and perks panel", size: "wide" },
        { src: "media/still-desert-party.jpg", alt: "Create Party window with party size buttons", size: "a7" },
        { src: "media/still-desert-quests.jpg", alt: "Quest board with a quest header, star ratings and a grid of quests", size: "a5" },
      ],
    },
    {
      title: "Full Game Menu Set",
      label: "UI project",
      description: "A complete menu set for a unit-collecting battle game: store with bundles and currency, quests, areas, codes, daily rewards, settings and a battle pass, each with its own colour theme.",
      tags: ["Store", "Quests", "Daily rewards", "Battle pass", "Settings"],
      video: "media/work-06.mp4",
      poster: "media/work-06-poster.jpg",
      colors: ["#c2185b", "#12a37a"],
      photos: [
        { src: "media/still-ui-store.jpg", alt: "Store menu on the currency tab with gem and coin packs and a purchase notification", size: "half" },
        { src: "media/still-ui-quests.jpg", alt: "Quests menu with a reward progress bar and daily quest list", size: "half" },
        { src: "media/still-ui-areas.jpg", alt: "Areas menu with area cards and a teleport button", size: "half" },
        { src: "media/still-ui-daily.jpg", alt: "Daily rewards menu with a seven day login streak and a grand prize", size: "half" },
        { src: "media/still-ui-settings.jpg", alt: "Settings menu with volume sliders and toggles", size: "half" },
        { src: "media/still-ui-battlepass.jpg", alt: "Battle pass menu with free and premium reward tiers", size: "half" },
      ],
    },
    {
      title: "Emote Wheel",
      label: "UI project",
      description: "A radial emote menu in a dark, glassy blue style: eight quick-play slots, five pages to flip through and clear hover and selected states.",
      tags: ["Radial menu", "Emotes", "Hover states", "Paging"],
      video: "media/work-04.mp4",
      poster: "media/work-04-poster.jpg",
      colors: ["#1f4fd8", "#0f8fb8"],
      photos: [
        { src: "media/still-emote-wheel.jpg", alt: "Emote wheel on page 1 of 5 with Wave, Groove, Dance and Cheer emotes", size: "third" },
        { src: "media/still-emote-slot.jpg", alt: "Emote wheel with an empty slot highlighted under the cursor", size: "third" },
        { src: "media/still-emote-page-two.jpg", alt: "Emote wheel after flipping to page 2", size: "third" },
      ],
    },
    {
      title: "Seasonal Shops",
      label: "Client project",
      description: "A shop that changes with the season, with an animated switch from a Halloween storefront to a snow-covered Christmas one.",
      tags: ["Shop", "Seasonal themes", "Animated transitions"],
      video: "media/work-01.mp4",
      poster: "media/work-01-poster.jpg",
      colors: ["#5b2bc4", "#f0741a"],
      photos: [
        { src: "media/still-halloween-shop.jpg", alt: "Halloween shop frame with pumpkins and a ghost", size: "third" },
        { src: "media/still-christmas-featured.jpg", alt: "Christmas shop featured offers with a Mega Gift card", size: "third" },
        { src: "media/still-christmas-items.jpg", alt: "Christmas shop item cards with candy cane currency packs", size: "third" },
      ],
    },
  ],
};
