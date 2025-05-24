// Wait for the DOM (Document Object Model) to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map with a default center (latitude and longitude) and zoom level (7)
  const map = L.map('map').setView([41.1533, 20.1683], 7);
  
  // Add a tile layer to the map from OpenStreetMap, providing attribution for the map data
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Array of objects representing Albanian tourist locations, each containing information for the location
    const locations = [
        { 
            name: "Tirana", 
            coords: [41.3275, 19.8189], 
            info: "The vibrant capital city with colorful architecture and Skanderbeg Square",
            type: "urban",
            image: "https://media.brate.com/images/europa/albania/tirana/tirana.jpg?tr=n-hero",
            description: "Tirana, Albania's vibrant capital, is a city of contrasts where the old and new harmoniously coexist. Colorful buildings, wide boulevards, and an energetic atmosphere make Tirana a fascinating destination. At its heart lies Skanderbeg Square, named after Albania's national hero, surrounded by important landmarks including the National History Museum and the Et'hem Bey Mosque. The city features numerous parks, museums, and the iconic Pyramid of Tirana—once a museum dedicated to former communist dictator Enver Hoxha, now a cultural center.",
            attractions: [
              "Visit Skanderbeg Square and the National History Museum",
              "Explore the colorful buildings of the Blloku district",
              "Tour the Pyramid of Tirana",
              "Relax in the Grand Park of Tirana",
              "Take a cable car ride up Dajti Mountain for panoramic city views"
            ],
            bestTime: "Spring (April-June) and Fall (September-October) for pleasant weather and fewer tourists",
            howToGet: "Direct flights to Tirana International Airport from major European cities, or bus connections from neighboring countries",
            fact: "Tirana's colorful buildings were part of a revitalization project in the early 2000s by then-mayor Edi Rama, who later became Albania's Prime Minister."
          },
          { 
            name: "Durrës", 
            coords: [41.3246, 19.4565], 
            info: "A coastal city with sandy beaches and Albania's largest Roman amphitheater",
            type: "coastal",
            image: "https://mediaim.expedia.com/destination/1/944e75613446335ef7152f11cdeef186.jpg",
            description: "Durrës is Albania's main port city and one of the oldest settlements on the Adriatic coast. Founded in the 7th century BCE as Epidamnos, it offers a unique blend of ancient ruins, beautiful beaches, and modern development. The city's crown jewel is the Roman amphitheater, one of the largest in the Balkans, which once hosted gladiatorial combat for 20,000 spectators. Along with its rich archaeological heritage, Durrës boasts lovely beaches with fine golden sand and clear waters, making it popular with both history enthusiasts and sun-seekers.",
            attractions: [
              "Visit the ancient Roman Amphitheater",
              "Relax on Durres Beach",
              "Explore the Archaeological Museum",
              "Walk along the seafront promenade",
              "Visit the Byzantine walls and Venetian Tower"
            ],
            bestTime: "May-June and September for beach time without the intense summer crowds",
            howToGet: "30-minute drive from Tirana, frequent bus connections from the capital",
            fact: "The Roman amphitheater in Durrës remained hidden and forgotten until it was rediscovered in the 1960s when a resident was digging in his garden."
          },
          { 
            name: "Berat", 
            coords: [40.7058, 19.9522], 
            info: "The 'City of a Thousand Windows,' known for its Ottoman-era charm",
            type: "historical",
            image: "https://i0.wp.com/nomadehjerter.no/wp-content/uploads/2023/11/Berat-Albania-100554.jpg?fit=850%2C570&ssl=1",
            description: "Known as the 'City of a Thousand Windows,' Berat is one of Albania's most beautiful and historic towns. The UNESCO-listed old town is characterized by white Ottoman houses climbing up the hillside, their windows creating the distinctive appearance that earned the city its nickname. Berat is divided into three main historic neighborhoods: Mangalem, the Muslim quarter on the hill's south side; Gorica, the Christian quarter across the river; and Kalaja, the castle district on top of the hill.",
            attractions: [
              "Explore Berat Castle and its ancient churches",
              "Wander through the Mangalem and Gorica quarters",
              "Visit the Ethnographic Museum",
              "Tour the Onufri Museum in the castle",
              "Take in the view of the 'thousand windows'"
            ],
            bestTime: "Spring and fall for pleasant temperatures and beautiful lighting for photography",
            howToGet: "2-hour drive from Tirana, regular bus services available",
            fact: "Berat Castle is one of the oldest continuously inhabited fortifications in the Balkans, with people still living within its walls today."
          },
          { 
            name: "Gjirokastër", 
            coords: [40.0756, 20.1386], 
            info: "A UNESCO-listed stone city with a historic castle and rich heritage",
            type: "historical",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHFM5cJcVG_e8_Bu1GJuJqeIxCFYOPQYyuQ&s",
            description: "Gjirokastër, a UNESCO World Heritage Site, is known as the 'City of Stone' due to its distinctive architecture. Dominated by the imposing castle on the hill, the city features unique Ottoman-era stone houses that resemble small fortresses, with slate roofs and stone walls. The cobblestone streets wind through the old bazaar where artisans still practice traditional crafts. Gjirokastër Castle, one of the largest in the Balkans, houses a military museum featuring captured artillery and memorabilia from communist Albania.",
            attractions: [
              "Explore the massive Gjirokastër Castle",
              "Visit Enver Hoxha's childhood home",
              "Tour the Ethnographic Museum",
              "Wander through the Old Bazaar",
              "Visit the historic Zekate House"
            ],
            bestTime: "April to June or September to October for mild weather",
            howToGet: "4-hour drive from Tirana, or bus connections from major cities",
            fact: "Gjirokastër is the birthplace of two famous Albanians with opposing legacies: Communist dictator Enver Hoxha and internationally acclaimed writer Ismail Kadare."
          },
          { 
            name: "Ksamil & Albanian Riviera", 
            coords: [39.7675, 20.0000], 
            info: "Exotic beaches with crystal-clear waters",
            type: "coastal",
            image: "https://motoralb.com/wp-content/uploads/2025/02/Ksamil.webp",
            description: "The Albanian Riviera represents the country's most stunning stretch of coastline, with Ksamil as its crown jewel. Located just south of Sarandë near the Greek border, Ksamil features a series of small beaches with brilliant turquoise waters rivaling those of the Caribbean. Four small islands dot the bay, easily reachable by swimming or kayaking. The entire Riviera stretches from Vlorë to Sarandë, comprising numerous pristine beaches, hidden coves, and charming coastal villages perched on hillsides overlooking the Ionian Sea.",
            attractions: [
              "Swim in the crystal-clear waters of Ksamil Beach",
              "Visit the four small islands in Ksamil Bay",
              "Explore the nearby Butrint National Park",
              "Experience the vibrant beach bar scene",
              "Take a boat tour along the coast"
            ],
            bestTime: "June and September for perfect swimming weather without crowds",
            howToGet: "Drive from Sarandë (20 minutes) or take a bus from major southern cities",
            fact: "Despite its growing popularity, Ksamil was virtually unknown to international tourists until around 2010."
          },
          {
            name: "Theth National Park",
            coords: [42.3833, 19.7667],
            info: "A breathtaking mountain village with waterfalls and hiking trails",
            type: "nature",
            image: "https://eia476h758b.exactdn.com/wp-content/uploads/2021/10/Theth07_AlbaniaVisit.com_.jpg",
            description: "Nestled in the Albanian Alps (also called the Accursed Mountains), Theth National Park is a remote mountain paradise of stunning natural beauty. The centerpiece is the traditional village of Theth, with its iconic stone church and authentic stone houses. The valley is surrounded by dramatic mountain peaks, cascading waterfalls, and crystal-clear rivers. Highlights include the Blue Eye of Theth (a natural spring with striking blue water), the Grunas Waterfall, and the Lock-in Tower (Kulla) - a historic stone building once used for blood feud reconciliations.",
            attractions: [
              "Hike to the Blue Eye of Theth",
              "Visit the Grunas Waterfall",
              "Explore the historic Lock-in Tower",
              "Trek through the Theth to Valbona trail",
              "Photograph the iconic stone church"
            ],
            bestTime: "June to September when mountain roads are clear and trails are accessible",
            howToGet: "4WD vehicles from Shkodra (3 hours) through Theth Road or hike from Valbona over the mountain pass",
            fact: "The Lock-in Tower (Kulla) in Theth was used by families seeking protection from blood feuds, a traditional code of honor called the Kanun that persisted in northern Albania."
          },
          {
            name: "Valbona Valley National Park",
            coords: [42.4271, 19.8950],
            info: "Stunning alpine scenery and outdoor adventures",
            type: "nature",
            image: "https://sq.albanianews.it/wp-content/uploads/sites/2/2012/01/Alpi-Valbona.jpg",
            description: "Valbona Valley National Park offers some of Albania's most dramatic mountain landscapes, with towering limestone peaks, pristine forests, and the crystal-clear Valbona River flowing through it all. Located in the heart of the Albanian Alps, this remote valley provides a true wilderness experience with outstanding opportunities for hiking, wildlife viewing, and immersion in traditional mountain culture. The small village of Valbona serves as the park's main settlement, with family-run guesthouses offering authentic hospitality and homemade cuisine.",
            attractions: [
              "Hike the famous Valbona to Theth trail",
              "Explore the stunning Valbona Valley",
              "Experience traditional Albanian mountain hospitality",
              "Visit the historic village of Kukaj",
              "Photograph the dramatic limestone peaks"
            ],
            bestTime: "Late June to September when all hiking trails are accessible",
            howToGet: "Ferry from Koman to Fierza, then minibus to Valbona, or 4WD vehicle from Bajram Curri",
            fact: "Until recently, the valley was only accessible by horse or on foot for much of the year due to heavy snowfall blocking the mountain passes."
          },
          {
            name: "Llogara Pass",
            coords: [40.2122, 19.5883],
            info: "A scenic mountain road with panoramic views of the Ionian Sea",
            type: "nature",
            image: "https://eia476h758b.exactdn.com/wp-content/uploads/2023/12/Llogara-pass-in-Albania-1024x576.jpeg?strip=all&lossy=1&ssl=1",
            description: "The Llogara Pass is one of Europe's most spectacular coastal roads, winding through the Ceraunian Mountains at an elevation of 1,027 meters above sea level. This dramatic mountain pass connects the Dukat Valley with the Albanian Riviera, offering breathtaking panoramic views of the Ionian Sea. The contrast between the deep blue waters below and the rugged mountain landscape creates an unforgettable visual experience. Llogara National Park surrounds the pass, home to rare flora and fauna including the Balkan chamois and various birds of prey.",
            attractions: [
              "Drive the exhilarating serpentine road",
              "Enjoy the spectacular viewpoints overlooking the Ionian Sea",
              "Try paragliding from the mountain peaks",
              "Hike through the pine forests of Llogara National Park",
              "Dine at traditional restaurants serving mountain cuisine"
            ],
            bestTime: "May to October for clear visibility and safe driving conditions",
            howToGet: "Drive from Tirana (3-4 hours) or Vlora (1 hour) following the coastal highway",
            fact: "The unique 'Flag Pines' at Llogara are bent horizontally by strong winds from the Ionian Sea, creating natural bonsai-like shapes over centuries."
          },
          {
            name: "Butrint National Park",
            coords: [39.7456, 20.0214],
            info: "Ancient Greek and Roman ruins in a lush nature reserve",
            type: "historical",
            image: "https://nationalparks-15bc7.kxcdn.com/images/parks/butrint/Butrint%20National%20Park%20roman%20amphitheater.jpg",
            description: "Butrint National Park, a UNESCO World Heritage Site, is one of Albania's archaeological gems. Located on a peninsula surrounded by a lagoon, this ancient city was continuously inhabited for over 3,000 years. The archaeological site contains ruins from various periods including Greek, Roman, Byzantine, Venetian, and Ottoman. Visitors can walk among well-preserved ancient structures including a theater, baptistery with detailed mosaics, fortifications, and an acropolis. Beyond the archaeological ruins, the park encompasses 86 square kilometers of diverse ecosystems including wetlands, salt marshes, open plains, and dense woodlands, making it a haven for wildlife.",
            attractions: [
              "Explore the ancient Greek and Roman ruins",
              "Visit the 6th-century baptistery with intricate mosaics",
              "Climb the hill to the acropolis and Venetian castle",
              "Enjoy the natural beauty of the surrounding lagoon and forests",
              "Spot diverse bird species in the wetlands"
            ],
            bestTime: "April to June or September to October for mild weather and fewer tourists",
            howToGet: "30-minute drive from Saranda, with regular bus services and taxis available",
            fact: "According to legend, Butrint was founded by Trojan exiles following the fall of Troy, as described in Virgil's Aeneid."
          },
          {
            name: "Blue Eye (Syri i Kaltër)",
            coords: [39.9142, 20.1922],
            info: "A magical deep blue natural spring",
            type: "nature",
            image: "https://chasingthedonkey.b-cdn.net/wp-content/uploads/2021/12/lue-eye-spring-near-Sarande-Albania_Depositphotos_380727456_S-900x601.jpeg",
            description: "The Blue Eye (Syri i Kaltër) is a natural phenomenon and one of Albania's most mesmerizing natural attractions. This hypnotic spring forms a pool of intensely blue water that bubbles up from a depth of more than 50 meters, creating the appearance of a blue eye. The water is crystal clear and maintains a constant temperature of 10°C year-round, making it refreshingly cool even in summer. Surrounded by lush vegetation and oak forests, the site offers a tranquil, almost mystical atmosphere. While swimming is technically prohibited to preserve the natural integrity of the spring, visitors can enjoy the wooden platform and bridge that provide perfect viewpoints.",
            attractions: [
              "Marvel at the hypnotic blue waters of the spring",
              "Enjoy the peaceful forest setting and natural soundscape",
              "Take stunning photos from the viewing platform",
              "Explore the surrounding nature trails",
              "Visit the nearby restaurant for traditional Albanian cuisine"
            ],
            bestTime: "Late spring to early fall for the most vibrant colors and comfortable temperatures",
            howToGet: "25 km from Saranda, accessible by car or organized tours from Saranda and Gjirokastër",
            fact: "The exact depth of the Blue Eye remains unknown as divers have only been able to descend to about 50 meters before the powerful upward current and narrow opening prevent further exploration."
          },
          {
            name: "Lake Komani",
            coords: [42.1167, 19.8833],
            info: "A spectacular boat ride through fjord-like landscapes",
            type: "nature",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT189GCGjVXTjMFybroZVWwS-IsYJTPQKhZ-A&s",
            description: "Lake Komani is a man-made reservoir created in the 1970s, yet it offers one of Albania's most spectacular natural experiences. Often compared to the fjords of Norway, the lake winds through dramatic vertical cliff faces and isolated canyons of the Albanian Alps. The Komani Lake Ferry journey is widely considered one of the world's most beautiful boat rides, taking passengers through a twisting, narrow waterway surrounded by untouched wilderness. The three-hour trip reveals breathtaking views at every turn, with mountains plunging directly into emerald-green waters, creating a surreal, almost primordial landscape.",
            attractions: [
              "Take the legendary Komani Ferry boat ride",
              "Photograph the spectacular canyon landscapes",
              "Visit isolated lakeside villages accessible only by boat",
              "Spot eagles and other wildlife along the cliffs",
              "Continue to Valbona Valley for a complete northern Albania experience"
            ],
            bestTime: "May to October when ferry services run regularly",
            howToGet: "Ferry departs from Koman (reached by car from Shkodra) and travels to Fierza",
            fact: "Despite its natural appearance, Lake Komani is actually an artificial reservoir created when the Drin River was dammed for hydroelectric power, flooding the canyon and creating this spectacular waterway."
          },
          {
            name: "Dhermi",
            coords: [40.1531, 19.6394],
            info: "A picturesque coastal village with white sand beaches and nightlife",
            type: "coastal",
            image: "https://touralbania.org/storage/dhermi.jpg",
            description: "Dhermi is a stunning coastal village situated between the Ceraunian Mountains and the Ionian Sea, offering some of Albania's most beautiful beaches. The village itself clings to the mountainside, with whitewashed houses and narrow streets leading down to the coast. Below, a string of pristine beaches with crystal-clear turquoise waters stretch along the coastline. Dhermi Beach, the main attraction, features fine white pebbles and incredibly clear water. The area has developed into one of Albania's premier beach destinations, with a vibrant summer scene including beach bars, restaurants, and music festivals, while still maintaining its authentic charm in the old village area.",
            attractions: [
              "Relax on the stunning beaches with crystal-clear waters",
              "Explore the traditional old village with stone houses",
              "Visit the historic churches including St. Mary's and St. Theodore's",
              "Experience Albania's best beach nightlife in summer",
              "Take a boat trip to discover hidden coves and caves"
            ],
            bestTime: "June to early September for beach weather; July-August for nightlife",
            howToGet: "Drive from Tirana (3-4 hours) via the scenic Llogara Pass or take a bus from Vlora",
            fact: "Several of Albania's most famous music festivals are held in Dhermi, including Kala Festival and ION Festival, attracting international DJs and music lovers to its beaches."
          },
          {
            name: "Korça",
            coords: [40.6186, 20.7808],
            info: "Cultural city known for its historical architecture and traditional music",
            type: "urban",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0LR7Kt2Vhlv3-t2EkZCeMFD41RrAwOVOFnQ&s",
            description: "Often called 'The Little Paris of Albania,' Korça is a cultural and historic gem in the southeast of the country. The city is known for its well-preserved architecture, including Ottoman-era buildings, wide tree-lined boulevards, and traditional villas. Korça has a rich cultural heritage as a center for Albanian art, education, and music—particularly the traditional serenades for which the city is famous. The Old Bazaar area has been beautifully restored, with cobblestone streets lined with shops, cafes, and traditional restaurants. The city's elegant aesthetic is complemented by its vibrant cultural life and the surrounding mountain landscape.",
            attractions: [
              "Visit the National Museum of Medieval Art",
              "Explore the restored Old Bazaar",
              "Tour the First Albanian School Museum",
              "Experience authentic serenades at traditional taverns",
              "See the impressive Orthodox Cathedral"
            ],
            bestTime: "Summer for the beer festival and cultural events; winter for nearby skiing and cozy taverns",
            howToGet: "3-hour drive from Tirana, with regular bus services throughout the day",
            fact: "Korça was home to the first Albanian-language school, opened in 1887, playing a crucial role in the Albanian national awakening and independence movement."
          },
          {
            name: "Shkodra",
            coords: [42.0683, 19.5128],
            info: "Historic northern city with European charm and the largest castle in Albania",
            type: "urban",
            image: "https://storage.googleapis.com/mytour-prod/blog/1707297595349_shutterstock-1260190360-jpg.jpeg",
            description: "Shkodra (or Shkodër) is one of Albania's oldest and most historically significant cities, situated at the shores of Lake Shkodra—the largest lake in Southern Europe. With a history spanning over 2,000 years, the city displays a unique blend of Albanian, Venetian, Ottoman, and Austro-Hungarian influences. Often considered Albania's cultural capital, Shkodra is known for its liberal atmosphere, vibrant arts scene, and cycling culture, with bicycles being the preferred mode of transportation. The city center features beautiful Italianate buildings, lively pedestrian zones, and numerous cafes that reflect its cultural connections to both the Balkans and wider Europe.",
            attractions: [
              "Visit Rozafa Castle with panoramic views of the city and lake",
              "Explore the historic pedestrian street Rruga Kole Idromeno",
              "Tour the Marubi National Museum of Photography",
              "Cycle around Lake Shkodra",
              "Visit the Venice Art Mask Factory"
            ],
            bestTime: "April to June and September to October for pleasant weather and cultural events",
            howToGet: "90-minute drive from Tirana, with regular bus connections throughout the day",
            fact: "The legend of Rozafa Castle involves a young woman who was immured (built into) the castle walls as a sacrifice to prevent the walls from falling. She asked only that her right breast be left exposed to nurse her infant son, her right hand to caress him, and her right foot to rock his cradle."
          },
          {
            name: "Apollonia Archaeological Park",
            coords: [40.7208, 19.4875],
            info: "Ancient Greek colony with well-preserved ruins and stunning countryside views",
            type: "historical",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Apollonia%2C_Albania_%28by_Pudelek%29_-_Monument_of_Agonothetes.JPG/960px-Apollonia%2C_Albania_%28by_Pudelek%29_-_Monument_of_Agonothetes.JPG",
            description: "Founded in 588 BCE by Greek colonists from Corfu and Corinth, Apollonia developed into one of the most important cities in the Illyrian region. Named after the god Apollo, the city flourished as a cultural and trade center before declining after an earthquake changed the course of the Vjosa River in the 3rd century CE. Today, the archaeological park spans 137 hectares and contains numerous monuments including a magnificent Odeon, Bouleuterion (council chamber), triumphal arch, library, and temple ruins. The 13th-century Byzantine monastery at the center of the site now houses a museum with artifacts from excavations. The ruins are set against a backdrop of rolling hills and olive groves, creating a serene atmosphere for exploring Albania's ancient history.",
            attractions: [
              "Visit the restored Bouleuterion (Ancient Council House)",
              "Explore the archaeological museum in the Byzantine monastery",
              "See the remains of the ancient theater and library",
              "Tour the ancient Greek temples and monuments",
              "Enjoy the panoramic views over the Myzeqe Plain"
            ],
            bestTime: "Spring and fall for pleasant temperatures and good visibility",
            howToGet: "12 km from Fier, accessible by taxi or organized tours from Fier or Tirana",
            fact: "Roman emperor Augustus studied in Apollonia in his youth, and was there when he learned of Julius Caesar's assassination in 44 BCE."
          },
          {
            name: "Permet",
            coords: [40.2361, 20.3514],
            info: "Thermal springs, river canyons, and traditional Albanian cuisine",
            type: "nature",
            image: "https://www.nomads-travel-guide.com/wp-content/uploads/2020/01/Bridge-Permet.jpg",
            description: "Përmet is a picturesque town in southern Albania, nestled in the Vjosa River valley and surrounded by the majestic mountains of the region. Known as the 'City of Roses,' Përmet is famous for its natural thermal springs, especially the Benja Thermal Baths located in the nearby Lengarica Canyon. The town is also celebrated for its excellent cuisine and raki (fruit brandy) production, as well as traditional folk music. The surrounding area offers breathtaking natural scenery including canyons, mountain ranges, and the emerald-green Vjosa River, one of Europe's last wild rivers. This combination of natural beauty, culinary traditions, and authentic small-town Albanian atmosphere makes Përmet a hidden gem for travelers seeking authentic experiences.",
            attractions: [
              "Bathe in the healing waters of Benja Thermal Springs",
              "Explore the stunning Lengarica Canyon",
              "Taste traditional gliko (fruit preserves) and raki",
              "Visit the historic Stone Bridge of Katiu",
              "Hike to the Sopot Waterfall"
            ],
            bestTime: "May to October, with June and September offering ideal temperatures",
            howToGet: "3-hour drive from Gjirokastra or 4-hour drive from Saranda",
            fact: "Përmet's cuisine is so renowned in Albania that there's a saying: 'Go to Përmet to taste life itself,' referring to its excellent food, raki, and natural spring water."
          }
    ];
    
    // Combine all locations into a single array for easier manipulation
      const allLocations = [...locations];

      // Function to create a custom icon for markers based on location type
      const getCustomIcon = (type) => {
        let iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'; // Default icon
        
        // Check the type of location and set the icon URL accordingly
        if (type === "coastal") {
          iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png'; // Coastal locations
        } else if (type === "historical") {
          iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'; // Historical sites
        } else if (type === "nature") {
          iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'; // Nature & Parks
        }
        
        // Return a Leaflet icon with the appropriate properties
        return L.icon({
          iconUrl: iconUrl,
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png', // Shadow effect for marker
          iconSize: [25, 41], // Size of the marker
          iconAnchor: [12, 41], // Anchor point of the marker
          popupAnchor: [1, -34], // Position of the popup relative to the marker
          shadowSize: [41, 41] // Size of the shadow
        });
      };

      // Loop through all locations to add markers to the map
      allLocations.forEach(function(location) {
        const marker = L.marker(location.coords, {icon: getCustomIcon(location.type)}).addTo(map); // Add marker with custom icon
        marker.bindPopup(`
          <div class="map-popup">
            <div class="popup-image" style="background-image: url('${location.image}')"></div> <!-- Location image in popup -->
            <div class="popup-content">
              <h3>${location.name}</h3> <!-- Location name -->
              <p>${location.info}</p> <!-- Short information about the location -->
              <div class="popup-button" data-location="${location.name}">Explore</div> <!-- Button to explore more -->
            </div>
          </div>
        `, { maxWidth: 300 }); // Set maximum popup width
        
        // Add event listener when the popup is opened
        marker.on('popupopen', () => {
          // Add event listener to the "Explore" button within the popup
          setTimeout(() => {
            const exploreButtons = document.querySelectorAll('.popup-button');
            exploreButtons.forEach(button => {
              button.addEventListener('click', function() {
                const locationName = this.getAttribute('data-location'); // Get the location name from button
                showLocationDetails(locationName); // Call function to show location details
              });
            });
          }, 100); // Small delay to ensure the buttons are available
        });
      });

      // Add a legend to the map for better understanding of markers
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
          <div class="legend-title">Destination Types</div> <!-- Legend title -->
          <div class="legend-item">
            <img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png" width="20" height="30">
            <span>Coastal Destinations</span> <!-- Legend for coastal destinations -->
          </div>
          <div class="legend-item">
            <img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" width="20" height="30">
            <span>Historical Sites</span> <!-- Legend for historical sites -->
          </div>
          <div class="legend-item">
            <img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" width="20" height="30">
            <span>Nature & Parks</span> <!-- Legend for nature & parks -->
          </div>
          <div class="legend-item">
            <img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" width="20" height="30">
            <span>Other Attractions</span> <!-- Legend for other attractions -->
          </div>
        `;
        return div;
      };
      legend.addTo(map); // Add the legend to the map

      // Function to display detailed information about a location when "Explore" is clicked
      function showLocationDetails(locationName) {
        const location = locations.find(loc => loc.name === locationName); // Find the location by name
        if (!location) return; // If location is not found, exit the function
        
        const modal = document.getElementById('location-modal'); // Get the modal element
        const modalContent = modal.querySelector('.location-modal-content'); // Get the content area of the modal
        
        // Set modal content dynamically based on the location data
        modalContent.innerHTML = `
          <div class="location-hero" style="background-image: url('${location.image}')">
            <div class="location-title">
              <h1>${location.name}</h1> <!-- Location title -->
              <p>${location.info}</p> <!-- Location short description -->
            </div>
          </div>
          <div class="location-content">
            <div class="back-button">← Back to map</div> <!-- Back to map button -->
            <div class="location-details">
              <div class="location-main">
                <div class="location-description">
                  <h2>About ${location.name}</h2> <!-- Location detailed description title -->
                  <p>${location.description}</p> <!-- Detailed description of the location -->
                </div>
                <div class="location-attractions">
                  <h2>Things to Do</h2> <!-- Attractions title -->
                  <ul>
                    ${location.attractions.map(attraction => `<li>${attraction}</li>`).join('')} <!-- List of attractions -->
                  </ul>
                </div>
              </div>
              <div class="location-sidebar">
                <div class="sidebar-section">
                  <h3>Visitor Information</h3> <!-- Visitor info title -->
                  <div class="info-box">
                    <p><strong>Best time to visit:</strong> ${location.bestTime}</p> <!-- Best time to visit the location -->
                    <p><strong>How to get there:</strong> ${location.howToGet}</p> <!-- Travel information -->
                  </div>
                </div>
                <div class="sidebar-section">
                  <h3>Did You Know?</h3> <!-- Fun fact title -->
                  <p>${location.fact}</p> <!-- Fun fact about the location -->
                </div>
              </div>
            </div>
          </div>
        `;
        
        modal.classList.add('active'); // Show the modal
        
        // Add functionality to the back button
        const backButton = modalContent.querySelector('.back-button');
        backButton.addEventListener('click', function() {
          modal.classList.remove('active'); // Close the modal when the back button is clicked
        });
      }

      // Close the modal when clicking outside of it
      const modal = document.getElementById('location-modal');
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          modal.classList.remove('active'); // Close the modal if clicked outside of it
        }
    });
  });