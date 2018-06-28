# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

  User.create!([
    {name: 'Paula Cole', 
      email: 'pcole@gmail.com', 
      username: 'PCole', 
      password_digest: 'password', 
      password_confirmation: 'password', 
      avatar: 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face3.png'},
    {name: 'Dr. Micheal Mirilashvili', 
      email: 'contact@water-gen.com', 
      username: 'MichaelMiri', 
      password_digest: 'password', 
      password_confirmation: 'password', 
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGIhsgOg8v0G6sKe9CPsZWv3EKs6snQx6OmvEyyLvV2WTAS3d_uQ'},
    {name: 'Peter Gabriel', 
      email: 'pgabriel@gmail.com', 
      username: 'PGabriel', 
      password_digest: 'password', 
      password_confirmation: 'password', 
      avatar: 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face3.png'},
    {name: 'Susan Delasantos', 
      email: 'sdelasantos@gmail.com', 
      username: 'SDelasantos', 
      password_digest: 'password', 
      password_confirmation: 'password', 
      avatar: 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face3.png'}
 ])


  Topic.create!([
    {name: "Energy"},
    {name: "Food"},
    {name: "Conservation"},
    {name: "Consumables"},
    {name: "Concepts"},
  ])


  Post.create({
    title: 'Where have all the cowboys gone?', 
    body: "Oh you get me ready in your 56 Chevy Why don't we go sit down in the shade Take shelter on my front porch The dandy lion sun scorching Like a glass of cold lemonade  I will do the laundry If you pay all the bills Where is my John Wayne Where is my prairie song Where is my happy ending", 
    user_id: 1, 
    link: 'http://paulacole.com/'})

  Post.create({
    title: 'Watergen: Turning Air into Drinking Water', 
    body: "Watergen is an Israeli-based, award-winning developer of Water-from-air solutions. Our cutting-edge and patented technology provides a low cost, abundant and renewable source of fresh and clean drinking water by extracting it directly from the atmosphere. Watergen’s solution is a game changer that will improve quality of life and health, as well as save lives. Watergen's water generators produce the safest, cleanest and fresh-tasting drinking water and can potentially service billions around the world. Watergen’s products are suitable for every community size from cities, villages, commercial centers, schools, and hospitals to offices, residential buildings and private homes.", 
    user_id: 2, 
    main_picture: 'http://water-gen.com/wp-content/uploads/2016/09/product_1-1.jpg',
    link: 'http://water-gen.com/'})

  Post.create({
    title: 'Solar Roadways: Smart Roads to Power the World', 
    body: "Solar Roadways® (SR) is a modular system of specially engineered solar panels that can be walked and driven upon. Our panels contain LED lights to create lines and signage without paint. They contain heating elements to prevent snow and ice accumulation. The panels have microprocessors, which makes them intelligent. This allows the panels to communicate with each other, a central control station, and vehicles. Many people are surprised to learn that our panels are made of glass… but not ordinary glass. SR panels are made of specifically formulated tempered glass, which can support the weight of semi-trucks. The glass has a tractioned surface which is equivalent to asphalt. You can read more technical information in the Specifics page. We’re still in an early phase of our company’s development. Eventually our panels will be available for highways, but first will come non-critical applications such as driveways and parking lots. We are readying to install the first projects now.", 
    user_id: 3, 
    main_picture: 'http://www.solarroadways.com/images/Journey/Journey_Main.png',
    link: 'hhttp://www.solarroadways.com/'})

  Post.create({
    title: 'BiWa: Bike Washing Machine by Barbora Tobolova', 
    body: "Students at the Dalian Nationalities University in China have designed a bike washing machine that will wash your clothes while you pedal. The invention is aptly called “Bike Washing Machine” or “BiWa,” and it aims to “bring health and convenience to our life” by combining a stationary bike and a washing machine. According to a description on Tuvie provided by the students who designed the bike, the way it works is quite simple: “When you ride this bike, the pedaling motion causes the drum of the washing machine to rotate; at the same time, superfluous electricity is generated which can be used to power the display screen or [be] stored for future use.”", 
    user_id: 4, 
    main_picture: 'https://i.huffpost.com/gen/2882958/thumbs/o-DALIAN-NATIONALITIES-UNIVERSITY-570.jpg?7',
    link: 'https://www.huffingtonpost.com/2015/04/27/bike-washing-machine_n_7136196.html'})


PostTopic.create!([
  {topic_id: 2, post_id: 1},
  {topic_id: 1, post_id: 2},
  {topic_id: 3, post_id: 2},
  {topic_id: 1, post_id: 3},
  {topic_id: 2, post_id: 3},
  {topic_id: 5, post_id: 3},
  {topic_id: 1, post_id: 4},
  {topic_id: 3, post_id: 4},
  {topic_id: 5, post_id: 4},
])









