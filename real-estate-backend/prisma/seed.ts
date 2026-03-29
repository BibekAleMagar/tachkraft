import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Seeding properties...');

  const properties = [
    { 
      title: 'Modern Luxury Villa', 
      price: 45000000, 
      location: 'Budhanilkantha, Kathmandu', 
      description: 'Featuring a private infinity pool, smart home automation, and floor-to-ceiling windows with panoramic mountain views.',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800' 
    },
    { 
      title: 'Skyline Penthouse', 
      price: 28000000, 
      location: 'Jhamsikhel, Lalitpur', 
      description: 'Exclusive top-floor living with a private terrace, designer kitchen, and 360-degree views of the Kathmandu Valley.',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800' 
    },
    { 
      title: 'Cozy Alpine Cottage', 
      price: 18000000, 
      location: 'Godawari, Lalitpur', 
      description: 'A peaceful escape featuring authentic woodwork, a stone fireplace, and lush botanical gardens right outside your door.',
      imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800' 
    },
    { 
      title: 'Newari Heritage Home', 
      price: 35000000, 
      location: 'Patan Durbar Square', 
      description: 'Meticulously restored traditional architecture blended with modern amenities in the heart of the historic square.',
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800' 
    },
    { 
      title: 'The Glass Mansion', 
      price: 95000000, 
      location: 'Baluwatar, Kathmandu', 
      description: 'An architectural masterpiece using steel and glass. Includes a private gym, cinema room, and underground parking.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800' 
    },
    { 
      title: 'Minimalist Urban Studio', 
      price: 7500000, 
      location: 'Lazimpat, Kathmandu', 
      description: 'Smart-designed studio perfect for young professionals. High ceilings and multi-functional furniture included.',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800' 
    },
    { 
      title: 'Suburban Family Estate', 
      price: 22000000, 
      location: 'Imadol, Lalitpur', 
      description: 'Spacious 4-bedroom home with a dedicated playground, outdoor BBQ area, and 24/7 security in a gated community.',
      imageUrl: 'https://images.unsplash.com/photo-1580587767526-d36b1dba50d5?q=80&w=800' 
    },
    { 
      title: 'Sanepa Garden Duplex', 
      price: 31000000, 
      location: 'Sanepa, Lalitpur', 
      description: 'A premium two-story unit featuring a private backyard, open-plan living area, and premium hardwood flooring.',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800' 
    },
    { 
      title: 'Boutique Loft', 
      price: 12000000, 
      location: 'Thamel, Kathmandu', 
      description: 'Industrial-style loft with exposed brick walls, spiral staircase, and walking distance to the citys best cafes.',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800' 
    },
    { 
      title: 'Eco-Friendly Residence', 
      price: 26000000, 
      location: 'Gokarneshwor, Kathmandu', 
      description: 'Zero-emission home with solar roofing, rainwater harvesting, and an organic vegetable garden.',
      imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800' 
    },
    { 
      title: 'Lakeside Summer House', 
      price: 15000000, 
      location: 'Pokhara Lakeside', 
      description: 'The ultimate vacation home with a large wrap-around porch and direct access to water activities.',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800' 
    },
    { 
      title: 'Grand Brick Manor', 
      price: 39000000, 
      location: 'Suryabinayak, Bhaktapur', 
      description: 'Sophisticated red-brick estate featuring a library, wine cellar, and manicured English-style lawns.',
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800' 
    },
    { 
      title: 'Contemporary City Flat', 
      price: 14000000, 
      location: 'Koteshwor, Kathmandu', 
      description: 'Conveniently located near the airport and ring road. Modern finishes with high-speed fiber internet ready.',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800' 
    },
    { 
      title: 'Hidden Gem Villa', 
      price: 52000000, 
      location: 'Bansbari, Kathmandu', 
      description: 'Tucked away from the noise, this villa offers maximum privacy with a high perimeter wall and lush greenery.',
      imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800' 
    },
    { 
      title: 'Micro-Living Unit', 
      price: 6000000, 
      location: 'Chabahal, Kathmandu', 
      description: 'Affordable and stylish. Includes built-in appliances and clever storage solutions for maximum efficiency.',
      imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800' 
    },
    { 
      title: 'Industrial Art Loft', 
      price: 19500000, 
      location: 'Teku, Kathmandu', 
      description: 'Massive open windows and gallery lighting make this the ideal space for creative professionals.',
      imageUrl: 'https://images.unsplash.com/photo-1536376074432-8d63d5929230?q=80&w=800' 
    },
    { 
      title: 'Rustic Artist Retreat', 
      price: 24000000, 
      location: 'Kirtipur, Kathmandu', 
      description: 'Inspiration meets comfort. Overlooking the valley with a peaceful atmosphere and traditional charm.',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' 
    },
    { 
      title: 'Urban Sanctuary', 
      price: 33000000, 
      location: 'Maharajgunj, Kathmandu', 
      description: 'A quiet oasis in the middle of the city. Soundproofed walls and a beautiful Zen-inspired interior.',
      imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=800' 
    },
    { 
      title: 'Smart Home X-Series', 
      price: 41000000, 
      location: 'Dhumbarahi, Kathmandu', 
      description: 'Fully voice-controlled home with advanced security, biometric locks, and automated climate control.',
      imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=800' 
    },
    { 
      title: 'Zen Courtyard House', 
      price: 27500000, 
      location: 'Naxal, Kathmandu', 
      description: 'Centered around a peaceful inner courtyard, this home promotes wellness and natural ventilation.',
      imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800' 
    },
  ];

  // Using createMany for better performance since there are no relations in this insert
  await prisma.property.createMany({
    data: properties,
  });

  console.log(' Properties seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });