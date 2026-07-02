import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const properties = [
  {
    title: "Modern Glass Villa",
    price: "$2,450,000",
    address: "124 Luxury Ave, Beverly Hills, CA",
    beds: 5, baths: 4.5, sqft: "4,200",
    status: "For Sale",
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Contemporary Estate",
    price: "$1,850,000",
    address: "892 Summit Drive, Austin, TX",
    beds: 4, baths: 3, sqft: "3,100",
    status: "For Rent",
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Suburban Oasis",
    price: "$1,250,000",
    address: "786 Maple Street, Denver, CO",
    beds: 4, baths: 3.5, sqft: "3,800",
    status: "For Sale",
    image_url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Downtown Penthouse",
    price: "$2,100,000",
    address: "100 Skyline Way, New York, NY",
    beds: 2, baths: 2, sqft: "1,800",
    status: "For Sale",
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
  }
];

async function seed() {
  const { data, error } = await supabase.from("properties").insert(properties).select();
  if (error) {
    console.error("Error seeding properties:", error);
  } else {
    console.log("Successfully seeded properties:", data);
  }
}

seed();
