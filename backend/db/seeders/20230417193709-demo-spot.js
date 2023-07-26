"use strict";

/** @type {import('sequelize-cli').Migration} */
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let options = {};
options.tableName = "Spots";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Argyle Lane",
          city: "Peshastin",
          state: "WA",
          country: "USA",
          lat: 47.5707,
          lng: 120.604,
          name: "Hansel Creek Guest House",
          description:
            "Welcome to our charming Airbnb in Peshastin, Washington, nestled amidst the breathtaking beauty of the Cascade Mountains. This cozy and inviting retreat offers an idyllic escape for nature enthusiasts and adventure seekers alike. The cabin's rustic elegance and modern amenities create a perfect balance of comfort and wilderness immersion. Whether you spend your days exploring nearby hiking trails, visiting local wineries, or simply unwinding on the spacious deck with panoramic views of the Wenatchee River, this tranquil haven promises an unforgettable getaway. Experience the magic of Peshastin from the comfort of our thoughtfully designed retreat, where memories are made and dreams come true.",
          price: 265,
          type: "treehouse",
        },
        {
          ownerId: 2,
          address: "321 Mountain Drive",
          city: "Telluride",
          state: "CO",
          country: "USA",
          lat: 37.9375,
          lng: 107.8123,
          name: "Telluride Guest House",
          description:
            "Welcome to our exquisite Airbnb in Telluride, Colorado, a picturesque mountain haven that embodies the true essence of alpine luxury. This stunning retreat offers discerning travelers an unparalleled experience amidst the rugged beauty of the San Juan Mountains. Step inside the beautifully appointed chalet, where contemporary elegance meets rustic charm, creating a warm and inviting ambiance. Bask in the splendor of sweeping views from the floor-to-ceiling windows or unwind in the private hot tub overlooking the majestic peaks. Whether you're hitting the slopes of the world-class ski resorts, savoring local cuisine in the vibrant downtown, or simply reveling in the serenity of nature, this idyllic sanctuary promises an unforgettable escape where every moment is cherished and treasured. Discover the magic of Telluride from the lap of luxury in our exceptional Airbnb, where unforgettable memories are waiting to be created.",
          price: 987,
          type: "house",
        },
        {
          ownerId: 3,
          address: "505 Hobbit Hill Way",
          city: "Hardwick",
          state: "VT",
          country: "USA",
          lat: 44.5416,
          lng: 72.3487,
          name: "Hardwick Tree House",
          description:
            "Welcome to our enchanting Airbnb treehouse in Hardwick, Vermont, a magical retreat suspended amidst the lush beauty of the forest. This one-of-a-kind getaway offers a whimsical and eco-friendly escape for nature lovers seeking a unique experience. Nestled among the treetops, the charming treehouse boasts cozy comforts and rustic charm, inviting guests to disconnect from the modern world and reconnect with nature. Wake up to the gentle rustling of leaves and birdsong, savoring morning coffee on the wraparound deck with panoramic views of the surrounding woodland. Explore nearby hiking trails, immerse yourself in the serene ambiance of Vermont's countryside, or simply relax with a good book in the hammock, swaying gently in harmony with the breeze. This treehouse sanctuary promises an unforgettable escape where cherished memories are woven among the branches, creating a storybook adventure you'll carry in your heart for years to come.",
          price: 230,
          type: "treehouse",
        },
        {
          ownerId: 1,
          address: "42 Western Way",
          city: "Benton",
          state: "TN",
          country: "USA",
          lat: 35.1742,
          lng: 84.6535,
          name: "The Band Wagon",
          description:
            "Welcome to our charming Airbnb covered wagon in Benton, Tennessee, a nostalgic escape that takes you back in time to the era of pioneers and adventurers. This unique accommodation offers a truly immersive experience, combining the allure of the Old West with modern comforts. Set amidst the serene countryside, the lovingly restored covered wagon features cozy accommodations, with rustic wooden interiors and thoughtful amenities. As you step outside, you'll be surrounded by the picturesque beauty of the Tennessee landscape, where rolling hills and tranquil streams await your exploration. Gather around the campfire under the starry night sky, sharing stories and creating cherished memories with loved ones. Whether you spend your days fishing in nearby rivers, exploring historic sites, or simply relishing the peace and tranquility of this remarkable retreat, your stay in the covered wagon promises an unforgettable journey into the past, filled with adventure and a sense of wonder.",
          price: 161,
          type: "other",
        },
        {
          ownerId: 2,
          address: "13 Tumbleweed Drive",
          city: "Coconino County",
          state: "AZ",
          country: "USA",
          lat: 35.6648,
          lng: 111.4753,
          name: "The Kyoob at Shash",
          description:
            "Welcome to our spectacular Airbnb in Coconino County, Arizona, a breathtaking desert oasis that offers a true escape into the heart of the Southwest. Nestled amidst the iconic red rocks and towering canyons, this enchanting accommodation provides a serene and unique retreat like no other. Immerse yourself in the beauty of the Sonoran Desert as you relax in the comfort of a tastefully designed adobe-style home, seamlessly blending modern amenities with rustic charm. Step outside onto the expansive patio, where panoramic views of the majestic landscape await, offering unforgettable sunrises and sunsets. Explore nearby natural wonders such as the Grand Canyon, Sedona's vortexes, or enjoy stargazing in one of the best dark sky areas in the country. Whether you seek adventure in the great outdoors or a tranquil escape from the bustle of everyday life, this remarkable Airbnb in Coconino County promises an unforgettable experience where the spirit of the Southwest captivates your soul.",
          price: 293,
          type: "container",
        },
        {
          ownerId: 3,
          address: "85 Hilltop Drive",
          city: "Big Bear Lake",
          state: "CA",
          country: "USA",
          lat: 34.2439,
          lng: 116.9114,
          name: "Big Bear Getaway",
          description:
            "Welcome to 'The Big Bear Getaway,' a delightful Airbnb nestled in the picturesque mountain town of Big Bear Lake, California. This charming retreat offers an idyllic escape for nature enthusiasts and relaxation seekers alike. Surrounded by the towering San Bernardino Mountains, the cabin-style accommodation exudes cozy warmth with its rustic decor and modern amenities. Step outside to discover the natural wonders of Big Bear Lake, where adventure awaits in every season, from skiing and snowboarding in winter to hiking and mountain biking in summer. After a day of exploration, unwind on the spacious deck, breathing in the fresh alpine air and taking in the breathtaking views. Whether you're roasting marshmallows around the fire pit or simply relishing the peace and tranquility of the forest, 'The Big Bear Getaway' promises a memorable and rejuvenating experience, where cherished memories are made in the heart of nature's embrace.",
          price: 105,
          type: "a-frame",
        },
        {
          ownerId: 1,
          address: "75 Lox Lane",
          city: "Vero Beach",
          state: "FL",
          country: "USA",
          lat: 27.6386,
          lng: 80.3973,
          name: "Pura Vida Farm",
          description:
            "Welcome to our serene Airbnb farmstay in Vero Beach, Florida, where the tranquil beauty of the countryside awaits. Set amidst lush fields and swaying palm trees, this charming farmhouse offers a unique escape from the hustle and bustle of everyday life. Embrace the slow-paced lifestyle as you explore the working farm, where you can pick fresh fruits and vegetables or interact with friendly farm animals. The farmhouse itself exudes rustic charm and modern comforts, providing a cozy retreat after a day of farm adventures. Relax on the wraparound porch, savoring the gentle breeze and the sweet fragrance of blossoming flowers. Just a short drive away, Vero Beach's pristine beaches beckon you for a day of sun-soaked relaxation. Whether you seek a peaceful retreat in nature, an educational farm experience, or a blend of both, our Vero Beach farmstay promises an enriching and unforgettable getaway for families and couples alike.",
          price: 97,
          type: "barn",
        },
        {
          ownerId: 2,
          address: "1866 Ashurst Road",
          city: "Copper Hill",
          state: "VA",
          country: "USA",
          lat: 37.0818,
          lng: 80.1342,
          name: "Apple Ridge Caboose",
          description:
            "Welcome to our unique Airbnb train car accommodation in Copper Hill, Virginia, where history and charm come together to create an unforgettable experience. This vintage railway car has been lovingly restored and transformed into a cozy and eclectic retreat, offering a nostalgic journey back in time. As you step inside, you'll be captivated by the old-world ambiance, with original details preserved and modern comforts seamlessly integrated. Relax in the comfortable lounge area, gazing out the windows at the scenic countryside passing by. The train car sits amidst the natural beauty of Copper Hill, providing a peaceful escape surrounded by lush forests and rolling hills. Whether you're a history enthusiast, a nature lover, or simply seeking an offbeat adventure, our Copper Hill train car Airbnb promises a one-of-a-kind stay, where the spirit of the rails meets the tranquility of the Virginia countryside.",
          price: 180,
          type: "other",
        },
        {
          ownerId: 3,
          address: "0 Gulf of Mexico",
          city: "Key West",
          state: "FL",
          country: "USA",
          lat: 24.5554,
          lng: 81.7842,
          name: "The Grand Tiki",
          description:
            "Welcome to our extraordinary Airbnb floating tiki hut in Key West, Florida, where paradise meets adventure on the crystal-clear waters of the Gulf of Mexico. This one-of-a-kind accommodation offers a truly unique and unforgettable stay, combining the laid-back charm of a tiki hut with the excitement of being afloat on the turquoise sea. Wake up to the gentle lull of the waves, surrounded by panoramic views of the ocean and breathtaking sunrises and sunsets. Dive into the inviting waters for a refreshing swim or try your hand at paddleboarding right from your doorstep. The tiki hut itself is thoughtfully designed, providing a cozy and comfortable space to relax and unwind. Whether you're sipping cocktails on the deck, snorkeling with colorful marine life, or simply basking in the warm Florida sun, our floating tiki hut in Key West promises an extraordinary island getaway, where blissful moments and cherished memories are made on the water's surface.",
          price: 649,
          type: "boat",
        },
        {
          ownerId: 1,
          address: "1122 Fantasy Lane",
          city: "Cedar City",
          state: "UT",
          country: "USA",
          lat: 37.6775,
          lng: 113.0619,
          name: "The Hobbit Cottage",
          description:
            "Welcome to our enchanting Airbnb hobbit home in Cedar City, Utah, where fantasy becomes reality in the heart of the American Southwest. Nestled within the picturesque landscape, this whimsical dwelling captures the essence of J.R.R. Tolkien's Middle-earth, providing a truly magical escape for guests of all ages. Step into the cozy and intricately designed hobbit house, where curved ceilings, round doors, and rustic furnishings create an immersive experience like no other. As you explore the surrounding area, you'll be captivated by the stunning red rock formations and breathtaking vistas, offering a perfect backdrop for outdoor adventures. Whether you're stargazing under clear desert skies, savoring meals al fresco on the patio, or simply embracing the peace and tranquility of this unique retreat, our Cedar City hobbit home promises an extraordinary and unforgettable journey into a world of fantasy and wonder.",
          price: 107,
          type: "other",
        },
        {
          ownerId: 2,
          address: "50 Raspberry Road",
          city: "Smithville",
          state: "TN",
          country: "USA",
          lat: 35.9606,
          lng: 85.8142,
          name: "Five Meadows Dome",
          description:
            "Welcome to our unique Airbnb dome house in Smithville, Tennessee, where modern architecture meets the beauty of nature. This stunning geodesic dome provides a one-of-a-kind retreat, offering a harmonious blend of contemporary design and rustic charm. Set amidst the lush greenery of the Tennessee countryside, the dome house boasts panoramic views of the surrounding landscape through its expansive windows. Step inside the spacious and light-filled interior, where the open-plan living space creates a seamless connection between the indoors and outdoors. Whether you're relaxing by the fireplace in the cozy lounge area or preparing meals in the fully-equipped kitchen, you'll be immersed in the tranquility of your natural surroundings. Outside, explore the nearby hiking trails, take a dip in the pristine waters of a nearby lake, or simply unwind on the deck, listening to the gentle sounds of nature. Our Smithville dome house promises an unforgettable stay, where modern comfort meets the serenity of the Tennessee countryside, creating a truly rejuvenating and inspiring experience.",
          price: 365,
          type: "dome",
        },
        {
          ownerId: 3,
          address: "7 Noahs Way",
          city: "Springfield",
          state: "TN",
          country: "USA",
          lat: 36.5092,
          lng: 86.885,
          name: "The Ark",
          description:
            "Welcome to our extraordinary Airbnb in Springfield, Tennessee, a unique and awe-inspiring retreat that resembles Noah's Ark itself. This one-of-a-kind accommodation offers a truly biblical experience, where you can step into the pages of history and immerse yourself in the legendary tale of the great flood. The ark-inspired design provides a captivating and whimsical ambiance, while modern amenities ensure a comfortable and memorable stay. As you explore the ark, you'll find beautifully crafted interiors that evoke the spirit of the ancient vessel, complete with arched ceilings and wooden accents. Step outside to discover expansive gardens and lush landscapes, creating a serene oasis perfect for relaxation and reflection. Whether you're enjoying the panoramic views from the ark's deck or venturing into the nearby town of Springfield for local attractions and dining, our Noah's Ark-inspired Airbnb promises a once-in-a-lifetime experience, where history, spirituality, and comfort converge to create cherished memories for guests of all ages.",
          price: 195,
          type: "other",
        },
        {
          ownerId: 1,
          address: "484 Dusty Lane",
          city: "Taos",
          state: "NM",
          country: "USA",
          lat: 36.4072,
          lng: 105.5734,
          name: "Taos Mesa Earthship",
          description:
            "Welcome to our sustainable and innovative Airbnb Earthship in Taos, New Mexico, where eco-living and artistic design harmoniously blend with the rugged beauty of the high desert landscape. This extraordinary dwelling is a masterpiece of sustainable architecture, utilizing recycled materials and renewable energy systems to create a self-sufficient and off-grid oasis. Step inside the Earthship's unique interior, where the natural curves and earthy tones create a cozy and tranquil atmosphere. Bask in the sunlight pouring through the large south-facing windows, providing natural warmth and breathtaking views of the surrounding mountains. Embrace the eco-friendly lifestyle as you experience rainwater harvesting, solar power, and passive solar heating and cooling. Stargaze at night, marveling at the pristine skies undisturbed by light pollution. Whether you're exploring the nearby Taos Pueblo, hiking in the Sangre de Cristo Mountains, or simply relishing the peace and harmony of your Earthship retreat, this Taos, New Mexico Airbnb promises an unforgettable and sustainable getaway, where you'll leave with a renewed appreciation for the beauty and ingenuity of nature and human creativity.",
          price: 170,
          type: "earthship",
        },
        {
          ownerId: 2,
          address: "215 Blue Ridge Drive",
          city: "Woodfin",
          state: "NC",
          country: "USA",
          lat: 35.6334,
          lng: 82.5821,
          name: "The Aerie",
          description:
            "Welcome to our charming Airbnb in Woodfin, North Carolina, a hidden gem nestled in the scenic Blue Ridge Mountains. This idyllic retreat offers a perfect blend of tranquility and convenience, located just minutes away from the vibrant city of Asheville. The cozy and thoughtfully designed accommodation provides a peaceful escape, surrounded by lush forests and mountain vistas. Wake up to the sound of birdsong and sip your morning coffee on the private patio, immersing yourself in the beauty of nature. Explore nearby hiking trails or indulge in a day of shopping and dining in downtown Asheville, known for its arts, culture, and culinary delights. Whether you're unwinding in the comfort of your retreat or discovering the charm of the Woodfin area, our Woodfin, North Carolina Airbnb promises a rejuvenating and memorable experience, where the enchanting mountains meet the warmth of Southern hospitality.",
          price: 320,
          type: "treehouse",
        },
        {
          ownerId: 3,
          address: "954 Lone Star Highway",
          city: "Dripping Springs",
          state: "TX",
          country: "USA",
          lat: 30.1902,
          lng: 98.0867,
          name: "Hill Country Retreat",
          description:
            "Welcome to our delightful Airbnb in Dripping Springs, Texas, a fun-filled haven for game enthusiasts and anyone seeking a playful retreat. This charming accommodation offers a wide array of games and entertainment options to ensure that every moment is filled with laughter and excitement. Step inside to discover a dedicated game room equipped with board games, card games, and a variety of classic and modern gaming consoles. Challenge friends and family to a friendly game of foosball, ping pong, or air hockey. Venture outdoors to find a spacious backyard featuring a cornhole set, a horseshoe pit, and a large lawn for frisbee or other outdoor games. After a day of spirited competition, unwind around the fire pit, sharing stories and making memories under the Texas night sky. Whether you're a board game enthusiast, a competitive gamer, or simply love to have fun, our Dripping Springs Airbnb promises an entertaining and unforgettable stay, where the joy of playtime is embraced in every corner of the property.",
          price: 2605,
          type: "house",
        },
        {
          ownerId: 1,
          address: "1306 Bourbon Street",
          city: "New Orleans",
          state: "LA",
          country: "USA",
          lat: 29.9511,
          lng: 90.0715,
          name: "The Syd",
          description:
            "Welcome to our vibrant and eclectic Airbnb in the heart of New Orleans, Louisiana, where the spirit of the city comes alive in every corner. This unique accommodation reflects the rich cultural heritage and artistic flair that define the Big Easy. Step inside to find a colorful and stylish interior, adorned with local artwork and décor that celebrates the city's diverse history. Embrace the New Orleans charm as you relax on the spacious balcony, sipping on a classic cocktail and watching the lively streets below. Located in a prime neighborhood, you'll have easy access to world-renowned music venues, mouthwatering cuisine, and historical landmarks. Whether you're exploring the French Quarter's lively atmosphere, indulging in a jazz performance, or joining in the festivities of a Mardi Gras parade, our New Orleans Airbnb promises an unforgettable stay filled with the energy and magic that only NOLA can offer. Get ready to immerse yourself in the soulful spirit of this enchanting city, where every moment is a celebration of life, culture, and the joy of being in New Orleans.",
          price: 937,
          type: "house",
        },
        {
          ownerId: 2,
          address: "981 Bauhaus Boulevard",
          city: "Pagosa Springs",
          state: "CO",
          country: "USA",
          lat: 37.2694,
          lng: 107.0098,
          name: "Wonder Haus",
          description:
            "Welcome to our tranquil and picturesque Airbnb in Pagosa Springs, Colorado, a serene mountain retreat nestled in the heart of the San Juan National Forest. This enchanting accommodation offers a perfect blend of relaxation and outdoor adventure. Step inside to find a cozy and inviting cabin, where rustic charm meets modern comfort. Warm yourself by the fireplace after a day of exploring the nearby hot springs or skiing on the world-class slopes of Wolf Creek Ski Area. The cabin's location provides easy access to hiking trails, fishing spots, and breathtaking vistas, making it an ideal destination for nature enthusiasts. Unwind on the spacious deck, surrounded by the beauty of nature and the soothing sounds of the nearby river. Whether you're soaking in the healing waters of the hot springs, marveling at the starry night sky, or simply enjoying the peaceful ambiance of the forest, our Pagosa Springs Airbnb promises a rejuvenating and unforgettable mountain getaway, where the serenity of nature embraces you in every moment.",
          price: 351,
          type: "earthship",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ["Holly House", "Peter Nincompoop Mansion", "Bali Mobile"],
        },
      },
      {}
    );
  },
};
