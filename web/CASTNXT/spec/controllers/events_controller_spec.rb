require 'rails_helper'


RSpec.describe EventsController, type: :controller do
    before do
        Producer.destroy_all
        Client.destroy_all
        Talent.destroy_all
        Auth.destroy_all
        session.clear
        @auth_test = Auth.create!(name:'eventtest', email:'eventtest@gmail.com',password:'12345678',user_type:'ADMIN')
        @admin=Producer.create!(name:'eventtest', email:'eventtest@gmail.com')
        
        @form = Form.create!(producer_id:@admin._id.to_str,data:"{\"schema\":{\"type\":\"object\",\"properties\":{\"talentName\":{\"title\":\"Name\",\"type\":\"string\"},\"gender\":{\"title\":\"Gender\",\"type\":\"string\",\"enum\":[\"Male\",\"Female\",\"Other\"]},\"birthDate\":{\"title\":\"Birth Date\",\"format\":\"date\",\"type\":\"string\"},\"email\":{\"title\":\"Email\",\"type\":\"string\",\"description\":\"Enter your email address.\"},\"state\":{\"title\":\"State\",\"enum\":[\"Alabama\",\"Alaska\",\"Arizona\",\"Arkansas\",\"California\",\"Colorado\",\"Connecticut\",\"Delaware\",\"District of Columbia\",\"Florida\",\"Georgia\",\"Hawaii\",\"Idaho\",\"Illinois\",\"Indiana\",\"Iowa\",\"Kansas\",\"Kentucky\",\"Louisiana\",\"Maine\",\"Maryland\",\"Massachusetts\",\"Michigan\",\"Minnesota\",\"Mississippi\",\"Missouri\",\"Montana\",\"Nebraska\",\"Nevada\",\"New Hampshire\",\"New Jersey\",\"New Mexico\",\"New York\",\"North Carolina\",\"North Dakota\",\"Ohio\",\"Oklahoma\",\"Oregon\",\"Pennsylvania\",\"Rhode Island\",\"South Carolina\",\"South Dakota\",\"Tennessee\",\"Texas\",\"Utah\",\"Vermont\",\"Virginia\",\"Washington\",\"West Virginia\",\"Wisconsin\",\"Wyoming\"],\"description\":\"Enter your state of residence.\",\"type\":\"string\"},\"city\":{\"title\":\"City\",\"description\":\"Enter your city of residence.\",\"enum\":[\"Abilene\",\"Addison\",\"Akron\",\"Alameda\",\"Albany\",\"Albuquerque\",\"Alexandria\",\"Alhambra\",\"Aliso Viejo\",\"Allen\",\"Allentown\",\"Alpharetta\",\"Altamonte Springs\",\"Altoona\",\"Amarillo\",\"Ames\",\"Anaheim\",\"Anchorage\",\"Anderson\",\"Ankeny\",\"Ann Arbor\",\"Annapolis\",\"Antioch\",\"Apache Junction\",\"Apex\",\"Apopka\",\"Apple Valley\",\"Appleton\",\"Arcadia\",\"Arlington\",\"Arlington Heights\",\"Arvada\",\"Asheville\",\"Athens-Clarke County\",\"Atlanta\",\"Atlantic City\",\"Attleboro\",\"Auburn\",\"Augusta-Richmond County\",\"Aurora\",\"Austin\",\"Aventura\",\"Avondale\",\"Azusa\",\"Bakersfield\",\"Baldwin Park\",\"Baltimore\",\"Barnstable Town\",\"Bartlett\",\"Baton Rouge\",\"Battle Creek\",\"Bayonne\",\"Baytown\",\"Beaumont\",\"Beavercreek\",\"Beaverton\",\"Bedford\",\"Bell Gardens\",\"Belleville\",\"Bellevue\",\"Bellflower\",\"Bellingham\",\"Beloit\",\"Bend\",\"Bentonville\",\"Berkeley\",\"Berwyn\",\"Bethlehem\",\"Beverly\",\"Billings\",\"Biloxi\",\"Binghamton\",\"Birmingham\",\"Bismarck\",\"Blacksburg\",\"Blaine\",\"Bloomington\",\"Blue Springs\",\"Boca Raton\",\"Boise City\",\"Bolingbrook\",\"Bonita Springs\",\"Bossier City\",\"Boston\",\"Boulder\",\"Bountiful\",\"Bowie\",\"Bowling Green\",\"Boynton Beach\",\"Bozeman\",\"Bradenton\",\"Brea\",\"Bremerton\",\"Brentwood\",\"Bridgeport\",\"Bristol\",\"Brockton\",\"Broken Arrow\",\"Brookfield\",\"Brooklyn Park\",\"Broomfield\",\"Brownsville\",\"Bryan\",\"Buckeye\",\"Buena Park\",\"Buffalo\",\"Buffalo Grove\",\"Bullhead City\",\"Burbank\",\"Burien\",\"Burleson\",\"Burlington\",\"Burnsville\",\"Caldwell\",\"Calexico\",\"Calumet City\",\"Camarillo\",\"Cambridge\",\"Camden\",\"Campbell\",\"Canton\",\"Cape Coral\",\"Cape Girardeau\",\"Carlsbad\",\"Carmel\",\"Carol Stream\",\"Carpentersville\",\"Carrollton\",\"Carson\",\"Carson City\",\"Cary\",\"Casa Grande\",\"Casper\",\"Castle Rock\",\"Cathedral City\",\"Cedar Falls\",\"Cedar Hill\",\"Cedar Park\",\"Cedar Rapids\",\"Centennial\",\"Ceres\",\"Cerritos\",\"Champaign\",\"Chandler\",\"Chapel Hill\",\"Charleston\",\"Charlotte\",\"Charlottesville\",\"Chattanooga\",\"Chelsea\",\"Chesapeake\",\"Chesterfield\",\"Cheyenne\",\"Chicago\",\"Chico\",\"Chicopee\",\"Chino\",\"Chino Hills\",\"Chula Vista\",\"Cicero\",\"Cincinnati\",\"Citrus Heights\",\"Clarksville\",\"Clearwater\",\"Cleveland\",\"Cleveland Heights\",\"Clifton\",\"Clovis\",\"Coachella\",\"Coconut Creek\",\"Coeur d'Alene\",\"College Station\",\"Collierville\",\"Colorado Springs\",\"Colton\",\"Columbia\",\"Columbus\",\"Commerce City\",\"Compton\",\"Concord\",\"Conroe\",\"Conway\",\"Coon Rapids\",\"Coppell\",\"Coral Gables\",\"Coral Springs\",\"Corona\",\"Corpus Christi\",\"Corvallis\",\"Costa Mesa\",\"Council Bluffs\",\"Covina\",\"Covington\",\"Cranston\",\"Crystal Lake\",\"Culver City\",\"Cupertino\",\"Cutler Bay\",\"Cuyahoga Falls\",\"Cypress\",\"Dallas\",\"Daly City\",\"Danbury\",\"Danville\",\"Davenport\",\"Davie\",\"Davis\",\"Dayton\",\"Daytona Beach\",\"DeKalb\",\"DeSoto\",\"Dearborn\",\"Dearborn Heights\",\"Decatur\",\"Deerfield Beach\",\"Delano\",\"Delray Beach\",\"Deltona\",\"Denton\",\"Denver\",\"Des Moines\",\"Des Plaines\",\"Detroit\",\"Diamond Bar\",\"Doral\",\"Dothan\",\"Dover\",\"Downers Grove\",\"Downey\",\"Draper\",\"Dublin\",\"Dubuque\",\"Duluth\",\"Duncanville\",\"Dunwoody\",\"Durham\",\"Eagan\",\"East Lansing\",\"East Orange\",\"East Providence\",\"Eastvale\",\"Eau Claire\",\"Eden Prairie\",\"Edina\",\"Edinburg\",\"Edmond\",\"Edmonds\",\"El Cajon\",\"El Centro\",\"El Monte\",\"El Paso\",\"Elgin\",\"Elizabeth\",\"Elk Grove\",\"Elkhart\",\"Elmhurst\",\"Elyria\",\"Encinitas\",\"Enid\",\"Erie\",\"Escondido\",\"Euclid\",\"Eugene\",\"Euless\",\"Evanston\",\"Evansville\",\"Everett\",\"Fairfield\",\"Fall River\",\"Fargo\",\"Farmington\",\"Farmington Hills\",\"Fayetteville\",\"Federal Way\",\"Findlay\",\"Fishers\",\"Fitchburg\",\"Flagstaff\",\"Flint\",\"Florence\",\"Florissant\",\"Flower Mound\",\"Folsom\",\"Fond du Lac\",\"Fontana\",\"Fort Collins\",\"Fort Lauderdale\",\"Fort Myers\",\"Fort Pierce\",\"Fort Smith\",\"Fort Wayne\",\"Fort Worth\",\"Fountain Valley\",\"Franklin\",\"Frederick\",\"Freeport\",\"Fremont\",\"Fresno\",\"Friendswood\",\"Frisco\",\"Fullerton\",\"Gadsden\",\"Gainesville\",\"Gaithersburg\",\"Galveston\",\"Garden Grove\",\"Gardena\",\"Garland\",\"Gary\",\"Gastonia\",\"Georgetown\",\"Germantown\",\"Gilbert\",\"Gilroy\",\"Glendale\",\"Glendora\",\"Glenview\",\"Goldsboro\",\"Goodyear\",\"Goose Creek\",\"Grand Forks\",\"Grand Island\",\"Grand Junction\",\"Grand Prairie\",\"Grand Rapids\",\"Grapevine\",\"Great Falls\",\"Greeley\",\"Green Bay\",\"Greenacres\",\"Greenfield\",\"Greensboro\",\"Greenville\",\"Greenwood\",\"Gresham\",\"Grove City\",\"Gulfport\",\"Hackensack\",\"Hagerstown\",\"Hallandale Beach\",\"Haltom City\",\"Hamilton\",\"Hammond\",\"Hampton\",\"Hanford\",\"Hanover Park\",\"Harlingen\",\"Harrisburg\",\"Harrisonburg\",\"Hartford\",\"Hattiesburg\",\"Haverhill\",\"Hawthorne\",\"Hayward\",\"Hemet\",\"Hempstead\",\"Henderson\",\"Hendersonville\",\"Hesperia\",\"Hialeah\",\"Hickory\",\"High Point\",\"Highland\",\"Hillsboro\",\"Hilton Head Island\",\"Hoboken\",\"Hoffman Estates\",\"Hollywood\",\"Holyoke\",\"Homestead\",\"Honolulu\",\"Hoover\",\"Houston\",\"Huber Heights\",\"Huntersville\",\"Huntington\",\"Huntington Beach\",\"Huntington Park\",\"Huntsville\",\"Hurst\",\"Hutchinson\",\"Idaho Falls\",\"Independence\",\"Indianapolis\",\"Indio\",\"Inglewood\",\"Iowa City\",\"Irvine\",\"Irving\",\"Jackson\",\"Jacksonville\",\"Janesville\",\"Jefferson City\",\"Jeffersonville\",\"Jersey City\",\"Johns Creek\",\"Johnson City\",\"Joliet\",\"Jonesboro\",\"Joplin\",\"Jupiter\",\"Jurupa Valley\",\"Kalamazoo\",\"Kannapolis\",\"Kansas City\",\"Kearny\",\"Keizer\",\"Keller\",\"Kenner\",\"Kennewick\",\"Kenosha\",\"Kent\",\"Kentwood\",\"Kettering\",\"Killeen\",\"Kingsport\",\"Kirkland\",\"Kissimmee\",\"Knoxville\",\"Kokomo\",\"La Crosse\",\"La Habra\",\"La Mesa\",\"La Mirada\",\"La Puente\",\"La Quinta\",\"Lacey\",\"Lafayette\",\"Laguna Niguel\",\"Lake Charles\",\"Lake Elsinore\",\"Lake Forest\",\"Lake Havasu City\",\"Lake Oswego\",\"Lakeland\",\"Lakeville\",\"Lakewood\",\"Lancaster\",\"Lansing\",\"Laredo\",\"Largo\",\"Las Cruces\",\"Las Vegas\",\"Lauderhill\",\"Lawrence\",\"Lawton\",\"Layton\",\"League City\",\"Lee's Summit\",\"Leesburg\",\"Lehi\",\"Lenexa\",\"Leominster\",\"Lewisville\",\"Lexington-Fayette\",\"Lima\",\"Lincoln\",\"Lincoln Park\",\"Linden\",\"Little Rock\",\"Littleton\",\"Livermore\",\"Livonia\",\"Lodi\",\"Logan\",\"Lombard\",\"Lompoc\",\"Long Beach\",\"Longmont\",\"Longview\",\"Lorain\",\"Los Angeles\",\"Los Banos\",\"Louisville/Jefferson County\",\"Loveland\",\"Lowell\",\"Lubbock\",\"Lynchburg\",\"Lynn\",\"Lynwood\",\"Macon\",\"Madera\",\"Madison\",\"Malden\",\"Manassas\",\"Manchester\",\"Manhattan\",\"Mankato\",\"Mansfield\",\"Manteca\",\"Maple Grove\",\"Maplewood\",\"Marana\",\"Margate\",\"Maricopa\",\"Marietta\",\"Marion\",\"Marlborough\",\"Martinez\",\"Marysville\",\"McAllen\",\"McKinney\",\"Medford\",\"Melbourne\",\"Memphis\",\"Menifee\",\"Mentor\",\"Merced\",\"Meriden\",\"Meridian\",\"Mesa\",\"Mesquite\",\"Methuen\",\"Miami\",\"Miami Beach\",\"Miami Gardens\",\"Middletown\",\"Midland\",\"Midwest City\",\"Milford\",\"Milpitas\",\"Milwaukee\",\"Minneapolis\",\"Minnetonka\",\"Minot\",\"Miramar\",\"Mishawaka\",\"Mission\",\"Mission Viejo\",\"Missoula\",\"Missouri City\",\"Mobile\",\"Modesto\",\"Moline\",\"Monroe\",\"Monrovia\",\"Montclair\",\"Montebello\",\"Monterey Park\",\"Montgomery\",\"Moore\",\"Moorhead\",\"Moreno Valley\",\"Morgan Hill\",\"Mount Pleasant\",\"Mount Prospect\",\"Mount Vernon\",\"Mountain View\",\"Muncie\",\"Murfreesboro\",\"Murray\",\"Murrieta\",\"Muskegon\",\"Muskogee\",\"Nampa\",\"Napa\",\"Naperville\",\"Nashua\",\"Nashville-Davidson\",\"National City\",\"New Bedford\",\"New Berlin\",\"New Braunfels\",\"New Britain\",\"New Brunswick\",\"New Haven\",\"New Orleans\",\"New Rochelle\",\"New York\",\"Newark\",\"Newport Beach\",\"Newport News\",\"Newton\",\"Niagara Falls\",\"Noblesville\",\"Norfolk\",\"Normal\",\"Norman\",\"North Charleston\",\"North Las Vegas\",\"North Lauderdale\",\"North Little Rock\",\"North Miami\",\"North Miami Beach\",\"North Port\",\"North Richland Hills\",\"Northglenn\",\"Norwalk\",\"Norwich\",\"Novato\",\"Novi\",\"O'Fallon\",\"Oak Lawn\",\"Oak Park\",\"Oakland\",\"Oakland Park\",\"Oakley\",\"Ocala\",\"Oceanside\",\"Ocoee\",\"Odessa\",\"Ogden\",\"Oklahoma City\",\"Olathe\",\"Olympia\",\"Omaha\",\"Ontario\",\"Orange\",\"Orem\",\"Orland Park\",\"Orlando\",\"Ormond Beach\",\"Oro Valley\",\"Oshkosh\",\"Overland Park\",\"Owensboro\",\"Oxnard\",\"Pacifica\",\"Palatine\",\"Palm Bay\",\"Palm Beach Gardens\",\"Palm Coast\",\"Palm Desert\",\"Palm Springs\",\"Palmdale\",\"Palo Alto\",\"Paramount\",\"Park Ridge\",\"Parker\",\"Parma\",\"Pasadena\",\"Pasco\",\"Passaic\",\"Paterson\",\"Pawtucket\",\"Peabody\",\"Pearland\",\"Pembroke Pines\",\"Pensacola\",\"Peoria\",\"Perris\",\"Perth Amboy\",\"Petaluma\",\"Pflugerville\",\"Pharr\",\"Philadelphia\",\"Phoenix\",\"Pico Rivera\",\"Pine Bluff\",\"Pinellas Park\",\"Pittsburg\",\"Pittsburgh\",\"Pittsfield\",\"Placentia\",\"Plainfield\",\"Plano\",\"Plantation\",\"Pleasanton\",\"Plymouth\",\"Pocatello\",\"Pomona\",\"Pompano Beach\",\"Pontiac\",\"Port Arthur\",\"Port Orange\",\"Port St. Lucie\",\"Portage\",\"Porterville\",\"Portland\",\"Portsmouth\",\"Poway\",\"Prescott\",\"Prescott Valley\",\"Providence\",\"Provo\",\"Pueblo\",\"Puyallup\",\"Quincy\",\"Racine\",\"Raleigh\",\"Rancho Cordova\",\"Rancho Cucamonga\",\"Rancho Palos Verdes\",\"Rancho Santa Margarita\",\"Rapid City\",\"Reading\",\"Redding\",\"Redlands\",\"Redmond\",\"Redondo Beach\",\"Redwood City\",\"Reno\",\"Renton\",\"Revere\",\"Rialto\",\"Richardson\",\"Richland\",\"Richmond\",\"Rio Rancho\",\"Riverside\",\"Riverton\",\"Roanoke\",\"Rochester\",\"Rochester Hills\",\"Rock Hill\",\"Rock Island\",\"Rockford\",\"Rocklin\",\"Rockville\",\"Rockwall\",\"Rocky Mount\",\"Rogers\",\"Rohnert Park\",\"Romeoville\",\"Rosemead\",\"Roseville\",\"Roswell\",\"Round Rock\",\"Rowlett\",\"Roy\",\"Royal Oak\",\"Sacramento\",\"Saginaw\",\"Salem\",\"Salina\",\"Salinas\",\"Salt Lake City\",\"Sammamish\",\"San Angelo\",\"San Antonio\",\"San Bernardino\",\"San Bruno\",\"San Buenaventura (Ventura)\",\"San Clemente\",\"San Diego\",\"San Francisco\",\"San Gabriel\",\"San Jacinto\",\"San Jose\",\"San Leandro\",\"San Luis Obispo\",\"San Marcos\",\"San Mateo\",\"San Rafael\",\"San Ramon\",\"Sandy\",\"Sandy Springs\",\"Sanford\",\"Santa Ana\",\"Santa Barbara\",\"Santa Clara\",\"Santa Clarita\",\"Santa Cruz\",\"Santa Fe\",\"Santa Maria\",\"Santa Monica\",\"Santa Rosa\",\"Santee\",\"Sarasota\",\"Savannah\",\"Sayreville\",\"Schaumburg\",\"Schenectady\",\"Scottsdale\",\"Scranton\",\"Seattle\",\"Shakopee\",\"Shawnee\",\"Sheboygan\",\"Shelton\",\"Sherman\",\"Shoreline\",\"Shreveport\",\"Sierra Vista\",\"Simi Valley\",\"Sioux City\",\"Sioux Falls\",\"Skokie\",\"Smyrna\",\"Somerville\",\"South Bend\",\"South Gate\",\"South Jordan\",\"South San Francisco\",\"Southaven\",\"Southfield\",\"Sparks\",\"Spartanburg\",\"Spokane\",\"Spokane Valley\",\"Springdale\",\"Springfield\",\"St. Charles\",\"St. Clair Shores\",\"St. Cloud\",\"St. George\",\"St. Joseph\",\"St. Louis\",\"St. Louis Park\",\"St. Paul\",\"St. Peters\",\"St. Petersburg\",\"Stamford\",\"Stanton\",\"State College\",\"Sterling Heights\",\"Stillwater\",\"Stockton\",\"Streamwood\",\"Strongsville\",\"Suffolk\",\"Sugar Land\",\"Summerville\",\"Sumter\",\"Sunnyvale\",\"Sunrise\",\"Surprise\",\"Syracuse\",\"Tacoma\",\"Tallahassee\",\"Tamarac\",\"Tampa\",\"Taunton\",\"Taylor\",\"Taylorsville\",\"Temecula\",\"Tempe\",\"Temple\",\"Terre Haute\",\"Texarkana\",\"Texas City\",\"The Colony\",\"Thornton\",\"Thousand Oaks\",\"Tigard\",\"Tinley Park\",\"Titusville\",\"Toledo\",\"Topeka\",\"Torrance\",\"Tracy\",\"Trenton\",\"Troy\",\"Tucson\",\"Tulare\",\"Tulsa\",\"Turlock\",\"Tuscaloosa\",\"Tustin\",\"Twin Falls\",\"Tyler\",\"Union City\",\"Upland\",\"Urbana\",\"Urbandale\",\"Utica\",\"Vacaville\",\"Valdosta\",\"Vallejo\",\"Valley Stream\",\"Vancouver\",\"Victoria\",\"Victorville\",\"Vineland\",\"Virginia Beach\",\"Visalia\",\"Vista\",\"Waco\",\"Walnut Creek\",\"Waltham\",\"Warner Robins\",\"Warren\",\"Warwick\",\"Washington\",\"Waterbury\",\"Waterloo\",\"Watsonville\",\"Waukegan\",\"Waukesha\",\"Wausau\",\"Wauwatosa\",\"Wellington\",\"Weslaco\",\"West Allis\",\"West Covina\",\"West Des Moines\",\"West Haven\",\"West Jordan\",\"West New York\",\"West Palm Beach\",\"West Sacramento\",\"West Valley City\",\"Westerville\",\"Westfield\",\"Westland\",\"Westminster\",\"Weston\",\"Weymouth Town\",\"Wheaton\",\"Wheeling\",\"White Plains\",\"Whittier\",\"Wichita\",\"Wichita Falls\",\"Wilkes-Barre\",\"Wilmington\",\"Wilson\",\"Winston-Salem\",\"Winter Garden\",\"Woburn\",\"Woodbury\",\"Woodland\",\"Woonsocket\",\"Worcester\",\"Wylie\",\"Wyoming\",\"Yakima\",\"Yonkers\",\"Yorba Linda\",\"York\",\"Youngstown\",\"Yuba City\",\"Yucaipa\",\"Yuma\"],\"type\":\"string\"},\"paymentLink\":{\"title\":\"Payment Link\",\"type\":\"string\",\"description\":\"Enter your PayPal or Venmo payment link.\"}}},\"uischema\":{\"ui:order\":[\"talentName\",\"gender\",\"birthDate\",\"email\",\"state\",\"city\",\"paymentLink\"],\"gender\":{\"ui:widget\":\"radio\"}}}")
        @event = Event.create!(title: "test",producer_id:@admin._id.to_str,status:"ACCEPTING",form_id:@form._id.to_str)

        @auth_talent = Auth.create!(name:'eventtest_user', email:'eventtest_user@gmail.com',password:'12345678',user_type:'USER')
        @talent = Talent.create!(name:'eventtest_user', email:'eventtest_user@gmail.com')

        @auth_client = Auth.create!(name:'eventtest_client', email:'eventtest_client@gmail.com',password:'12345678',user_type:'CLIENT')
        @client = Client.create!(name:'eventtest_client', email:'eventtest_client@gmail.com')
    end
    describe "events#show" do
        it "should not show if no session" do
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            get :show, params: { id: @event._id.to_str }
            expect(response).to have_http_status(:redirect)
        end
        it "should show if session is admin"do 
            session[:userType]="ADMIN"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            get :show, params: { id: @event._id.to_str }
            expect(response).to have_http_status(:success)
        end
        it "should not show if client not assigned "do 
            session[:userType]="CLIENT"
            session[:userName]="eventtest_client"
            session[:userEmail]="eventtest_client@gmail.com"
            session[:userId]=@client._id.to_str
            expect{get :show, params: { id: @event._id.to_str }}.to raise_error
        end
        it "should show if session is user"do 
            session[:userType]="USER"
            session[:userName]="eventtest_user"
            session[:userEmail]="eventtest_user@gmail.com"
            session[:userId]=@talent._id.to_str
            get :show, params: { id: @event._id.to_str }
            expect(response).to have_http_status(:success)
        end
    end

    describe "events#new" do
        it "should get a new event page" do
            session[:userType]="ADMIN"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            get :new
            expect(response).to have_http_status(:success)
        end
        it "should not get a new event page" do
            session[:userType]="CLIENT"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            get :new
            expect(response).to have_http_status(:redirect)
        end
    end
    describe "events#post" do
        it "should create a new event" do
            session[:userType]="ADMIN"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            post :create, params:{form_id:@form._id, title:"event create", description:"event description",location:"Houston", statename:"Texas",eventdate:"2023-11-30T06:00:00.000Z",category:"Fashion",is_paid_event:"No"}
            expect(response).to have_http_status(:success)
        end
        it "should create a new event" do
            session[:userType]="USER"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            post :create, params:{form_id:@form._id, title:"event create", description:"event description",location:"Houston", statename:"Texas",eventdate:"2023-11-30T06:00:00.000Z",category:"Fashion",is_paid_event:"No"}
            expect(response).to_not have_http_status(:success)
        end
    end
    describe "event#edit" do
        it "should get a edit event page" do
            session[:userType]="ADMIN"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            get :edit, params:{id:@event._id}
            expect(response).to have_http_status(:success)
        end
        it "should not get a edit event page" do
            session[:userType]="USER"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            get :edit, params:{id:@event._id}
            expect(response).to_not have_http_status(:success)
        end
    end
    describe "event#update" do
        it "should update the event status" do
            session[:userType]="ADMIN"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            put :update, params:{id:@event._id ,status:"DELETED"}
            expect(response).to have_http_status(:success)
        end
        it "should update the event info" do
            session[:userType]="ADMIN"
            session[:userName]="eventtest"
            session[:userEmail]="eventest@gmail.com"
            session[:userId]=@admin._id.to_str
            put :update, params:{id:@event._id ,description:"event description modified"}
            expect(response).to have_http_status(:success)
        end
    end
end
