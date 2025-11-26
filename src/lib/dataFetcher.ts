import { AuctionItem, DataSource } from '@/types/auction';
import { classifyAsset } from './assetClassifier';

// Mock data for development - will be replaced with real API calls
export const DATA_SOURCES: DataSource[] = [
  {
    id: 'us-public-domain',
    name: 'GSA Auctions',
    country: 'United States',
    attribution: {
      required: false,
      text: 'Source: GSA Auctions (public domain)',
      link: 'https://gsaauctions.gov/',
      license: 'Public Domain'
    }
  },
  {
    id: 'uk-ogl',
    name: 'UK Register of Surplus Land',
    country: 'United Kingdom',
    attribution: {
      required: true,
      text: 'Contains public sector information licensed under the Open Government Licence v3.0',
      link: 'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/',
      license: 'OGL v3.0'
    }
  },
  {
    id: 'canada-ogl',
    name: 'GCSurplus Historical Sold Items',
    country: 'Canada',
    attribution: {
      required: true,
      text: 'Contains information licensed under the Open Government Licence – Canada',
      link: 'https://open.canada.ca/en/open-government-licence-canada',
      license: 'OGL-Canada'
    }
  }
];

// Generate mock auction items for demonstration
function generateMockItems(): AuctionItem[] {
  const items: AuctionItem[] = [];
  const now = new Date();
  const endDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  // US Items
  items.push({
    id: 'gsa-001',
    title: 'Commercial Building - Downtown Office Space',
    description: 'Well-maintained 5-story commercial office building in prime downtown location. Approximately 25,000 sq ft of leasable space. Recent renovations include updated HVAC systems, modern electrical infrastructure, and energy-efficient windows. Excellent transportation access with nearby metro stations and parking facilities. Ideal for corporate offices, coworking spaces, or mixed-use development.',
    shortDescription: '5-story commercial office building, 25,000 sq ft',
    location: 'Washington, DC',
    country: 'United States',
    state: 'District of Columbia',
    city: 'Washington',
    assetType: 'land-buildings',
    auctionStartDate: now.toISOString(),
    auctionEndDate: endDate.toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-002',
    title: '2018 Ford F-150 Pickup Truck',
    description: 'Government surplus pickup truck in good condition. 4WD, V8 engine, approximately 45,000 miles. Well-maintained with complete service records. Features include crew cab, towing package, bed liner, and tonneau cover. Regular oil changes and tire rotations performed. Clean title, no accidents. All original equipment and manuals included.',
    shortDescription: '2018 Ford F-150, 4WD, 45k miles',
    location: 'Austin, TX',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    assetType: 'cars',
    auctionStartDate: now.toISOString(),
    auctionEndDate: endDate.toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-003',
    title: 'Utility Trailer - Dual Axle',
    description: 'Heavy-duty utility trailer with dual axles. 16-foot bed, excellent for hauling equipment or vehicles. Features include rear ramp gate, side access door, interior tie-down points, and weatherproof construction. Recent tire replacement and brake service. DOT compliant with all lights functioning. Maximum payload capacity 7,000 lbs. Clear title and registration documents included.',
    shortDescription: 'Heavy-duty 16-foot dual axle utility trailer',
    location: 'Phoenix, AZ',
    country: 'United States',
    state: 'Arizona',
    city: 'Phoenix',
    assetType: 'trailers',
    auctionStartDate: now.toISOString(),
    auctionEndDate: endDate.toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-004',
    title: 'Harley-Davidson Police Motorcycle',
    description: 'Retired police motorcycle in working condition. Well-maintained, ready for civilian use. Police equipment can be removed. Approximately 28,000 miles with complete maintenance records. Engine runs strong with no mechanical issues. New battery and fresh fluids. Clean title ready for transfer. Includes all original equipment manuals and service documentation.',
    shortDescription: 'Retired police motorcycle, working condition',
    location: 'Miami, FL',
    country: 'United States',
    state: 'Florida',
    city: 'Miami',
    assetType: 'motorcycles',
    auctionStartDate: now.toISOString(),
    auctionEndDate: endDate.toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // UK Items
  items.push({
    id: 'uk-001',
    title: 'Surplus Land Parcel - Former Council Property',
    description: 'Approximately 2.5 acres of land formerly used for council operations. Zoned for mixed-use development. Flat terrain with existing access road and utilities nearby. Planning permission considerations for residential or commercial development. Located in growing neighborhood with good transport links. Site has been cleared and is ready for development. Full survey and soil reports available.',
    shortDescription: '2.5 acres surplus land, mixed-use zoning',
    location: 'Manchester',
    country: 'United Kingdom',
    region: 'Greater Manchester',
    city: 'Manchester',
    assetType: 'land-buildings',
    auctionEndDate: endDate.toISOString(),
    sourceUrl: 'https://www.data.gov.uk/dataset/49b15726-1603-4618-b7bb-38af6ed111e8',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-002',
    title: 'Government Fleet Vehicle - 2019 Vauxhall Astra',
    description: 'Former government fleet vehicle in good condition. Regular maintenance records available. Approximately 35,000 miles with full service history. 1.4 turbo petrol engine, manual transmission. MOT valid until next year. Well-maintained interior and exterior. All standard equipment functioning properly including air conditioning, parking sensors, and infotainment system.',
    shortDescription: '2019 Vauxhall Astra, ex-government fleet',
    location: 'London',
    country: 'United Kingdom',
    region: 'Greater London',
    city: 'London',
    assetType: 'cars',
    auctionEndDate: endDate.toISOString(),
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // Canada Items
  items.push({
    id: 'canada-001',
    title: 'Office Furniture Lot - Desks and Chairs',
    description: 'Previously sold government surplus office furniture. Historical listing for reference. This lot included 25 office desks, 50 ergonomic chairs, and various filing cabinets. All items were in good working condition at time of sale. This listing is maintained for historical purposes and shows typical surplus office equipment available through government sales.',
    shortDescription: 'Office furniture lot (Historical)',
    location: 'Ottawa, ON',
    country: 'Canada',
    region: 'Ontario',
    city: 'Ottawa',
    assetType: 'other',
    sourceUrl: 'https://open.canada.ca/data/en/dataset/1a09c5c1-3554-4b70-9e53-6322a72ec7d4',
    sourceName: 'GCSurplus Historical Sold Items',
    isActive: false,
    isFuture: false,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    licenseId: 'canada-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // More US Items with varied end times
  items.push({
    id: 'gsa-005',
    title: 'Industrial Warehouse - 50,000 sq ft',
    description: 'Large industrial warehouse facility with high ceilings, loading docks, and rail access. Perfect for manufacturing or distribution operations.',
    shortDescription: 'Industrial warehouse with rail access',
    location: 'Detroit, MI',
    country: 'United States',
    state: 'Michigan',
    city: 'Detroit',
    assetType: 'land-buildings',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 30 * 60 * 1000).toISOString(), // 30 minutes
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-006',
    title: 'Medical Equipment - Hospital Grade',
    description: 'Surplus medical equipment including monitors, diagnostic tools, and patient care devices. All equipment recently decommissioned and in working order.',
    shortDescription: 'Hospital-grade medical equipment lot',
    location: 'Boston, MA',
    country: 'United States',
    state: 'Massachusetts',
    city: 'Boston',
    assetType: 'other',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-007',
    title: 'Construction Equipment - Excavator',
    description: 'Heavy-duty construction excavator in excellent working condition. Recent maintenance and inspection completed. Ideal for construction or excavation projects.',
    shortDescription: 'Heavy-duty excavator, well-maintained',
    location: 'Denver, CO',
    country: 'United States',
    state: 'Colorado',
    city: 'Denver',
    assetType: 'other',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-008',
    title: '2020 Chevrolet Tahoe SUV',
    description: 'Former government vehicle, well-maintained with complete service records. 4WD, leather interior, towing package. Approximately 38,000 miles.',
    shortDescription: '2020 Chevy Tahoe, 4WD, 38k miles',
    location: 'Atlanta, GA',
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    assetType: 'cars',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-009',
    title: 'IT Equipment Lot - Servers and Networking',
    description: 'Surplus IT infrastructure including enterprise servers, network switches, and storage systems. All equipment securely wiped and ready for deployment.',
    shortDescription: 'Enterprise IT equipment and servers',
    location: 'San Jose, CA',
    country: 'United States',
    state: 'California',
    city: 'San Jose',
    assetType: 'other',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-010',
    title: 'Cargo Van Fleet - Set of 8',
    description: 'Fleet of 8 cargo vans previously used for government operations. All vehicles maintained regularly with complete service records. Variety of makes and models available.',
    shortDescription: 'Fleet of 8 cargo vans, well-maintained',
    location: 'Chicago, IL',
    country: 'United States',
    state: 'Illinois',
    city: 'Chicago',
    assetType: 'cars',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1562583489-bf23ec64651d?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1562583489-bf23ec64651d?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-011',
    title: 'Portable Office Trailers - Set of 3',
    description: 'Three mobile office trailers in good condition. Each unit includes HVAC, electrical, and basic furnishings. Perfect for temporary job sites or additional workspace.',
    shortDescription: 'Set of 3 portable office trailers',
    location: 'Houston, TX',
    country: 'United States',
    state: 'Texas',
    city: 'Houston',
    assetType: 'trailers',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-012',
    title: 'Retail Space - High Traffic Location',
    description: '4,200 sq ft retail space in busy shopping district. Large storefront windows, modern fixtures, and ample parking. Excellent visibility and foot traffic.',
    shortDescription: '4,200 sq ft retail space, prime location',
    location: 'Seattle, WA',
    country: 'United States',
    state: 'Washington',
    city: 'Seattle',
    assetType: 'land-buildings',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-013',
    title: '2021 Honda CB500X Adventure Bike',
    description: 'Government surplus adventure motorcycle in excellent condition. Low mileage, well-maintained, ready for civilian use. Includes all original equipment and documentation.',
    shortDescription: '2021 Honda CB500X, low mileage',
    location: 'Portland, OR',
    country: 'United States',
    state: 'Oregon',
    city: 'Portland',
    assetType: 'motorcycles',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-014',
    title: 'Industrial Generator - 750kW',
    description: 'High-capacity diesel generator with automatic transfer switch. Recently serviced and tested. Suitable for large facilities or emergency backup power.',
    shortDescription: '750kW industrial diesel generator',
    location: 'Dallas, TX',
    country: 'United States',
    state: 'Texas',
    city: 'Dallas',
    assetType: 'other',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // More UK Items
  items.push({
    id: 'uk-003',
    title: 'Former NHS Property - Medical Office',
    description: '3,800 sq ft former medical office space. Includes multiple examination rooms, waiting area, and administrative offices. Well-maintained facility in good condition.',
    shortDescription: 'Former NHS medical office, 3,800 sq ft',
    location: 'Birmingham',
    country: 'United Kingdom',
    region: 'West Midlands',
    city: 'Birmingham',
    assetType: 'land-buildings',
    auctionEndDate: new Date(now.getTime() + 45 * 60 * 1000).toISOString(), // 45 minutes
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-004',
    title: 'Government Fleet Vans - Set of 5',
    description: 'Five Ford Transit vans from government fleet. All vehicles regularly serviced with complete maintenance records. Various mileages, all in good working order.',
    shortDescription: 'Set of 5 Ford Transit vans, ex-fleet',
    location: 'Leeds',
    country: 'United Kingdom',
    region: 'West Yorkshire',
    city: 'Leeds',
    assetType: 'cars',
    auctionEndDate: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-005',
    title: 'Surplus Land - Development Opportunity',
    description: '1.8 acres of former council land with planning potential. Flat terrain with utilities available. Located in developing area with good transport links.',
    shortDescription: '1.8 acres development land',
    location: 'Bristol',
    country: 'United Kingdom',
    region: 'South West England',
    city: 'Bristol',
    assetType: 'land-buildings',
    auctionEndDate: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // Future items for Future Items page
  items.push({
    id: 'gsa-future-001',
    title: 'Commercial Property - Waterfront Location',
    description: 'Upcoming auction for premium waterfront commercial property. 8,000 sq ft building with stunning views. Ideal for restaurant, retail, or office use.',
    shortDescription: 'Waterfront commercial property, 8,000 sq ft',
    location: 'San Francisco, CA',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    assetType: 'land-buildings',
    auctionStartDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-future-002',
    title: 'Electric Vehicle Fleet - 15 Units',
    description: 'Upcoming auction for fleet of 15 electric vehicles from government operations. Various makes and models, all with charging equipment included.',
    shortDescription: 'Fleet of 15 electric vehicles',
    location: 'Los Angeles, CA',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    assetType: 'cars',
    auctionStartDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-future-003',
    title: 'Laboratory Equipment - Research Grade',
    description: 'Upcoming surplus sale of advanced laboratory equipment including microscopes, centrifuges, and analytical instruments. All equipment recently decommissioned.',
    shortDescription: 'Research-grade lab equipment',
    location: 'Research Triangle, NC',
    country: 'United States',
    state: 'North Carolina',
    city: 'Research Triangle Park',
    assetType: 'other',
    auctionStartDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-future-001',
    title: 'Historic Building - Conversion Opportunity',
    description: 'Upcoming sale of Grade II listed building with conversion potential. Former government administrative building in prime central location.',
    shortDescription: 'Historic building conversion opportunity',
    location: 'Edinburgh',
    country: 'United Kingdom',
    region: 'Scotland',
    city: 'Edinburgh',
    assetType: 'land-buildings',
    auctionStartDate: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // Additional Active Items
  items.push({
    id: 'gsa-015',
    title: 'Ambulance Fleet - Emergency Vehicles',
    description: 'Set of 4 decommissioned ambulances. All vehicles fully functional, medical equipment removed. Perfect for conversion to mobile businesses or transport vehicles.',
    shortDescription: 'Set of 4 ambulances, fully functional',
    location: 'New York, NY',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    assetType: 'cars',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-016',
    title: 'Boat Trailer - Heavy Duty',
    description: 'Commercial-grade boat trailer suitable for vessels up to 30 feet. Galvanized steel construction, tandem axle with electric brakes. Excellent condition.',
    shortDescription: 'Heavy-duty boat trailer, 30ft capacity',
    location: 'Miami, FL',
    country: 'United States',
    state: 'Florida',
    city: 'Miami',
    assetType: 'trailers',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 90 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-017',
    title: 'Agricultural Land - 45 Acres',
    description: 'Fertile agricultural land with irrigation system. Previously used for government research. Excellent soil quality with access to water rights.',
    shortDescription: '45 acres agricultural land with irrigation',
    location: 'Sacramento, CA',
    country: 'United States',
    state: 'California',
    city: 'Sacramento',
    assetType: 'land-buildings',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-018',
    title: '2019 Kawasaki Police Motorcycles - Set of 6',
    description: 'Six retired police motorcycles, all in excellent working condition. Low mileage, well-maintained. Police equipment to be removed before sale.',
    shortDescription: 'Set of 6 Kawasaki police motorcycles',
    location: 'Las Vegas, NV',
    country: 'United States',
    state: 'Nevada',
    city: 'Las Vegas',
    assetType: 'motorcycles',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-019',
    title: 'Shipping Containers - Set of 20',
    description: '20-foot shipping containers in good condition. Weather-tight and secure. Ideal for storage, construction sites, or conversion projects.',
    shortDescription: 'Set of 20 shipping containers, 20ft',
    location: 'Baltimore, MD',
    country: 'United States',
    state: 'Maryland',
    city: 'Baltimore',
    assetType: 'other',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-020',
    title: 'Printing Equipment - Commercial Press',
    description: 'Industrial printing press with binding equipment. Recently decommissioned from government printing office. Includes maintenance records and manuals.',
    shortDescription: 'Commercial printing press with binding',
    location: 'Philadelphia, PA',
    country: 'United States',
    state: 'Pennsylvania',
    city: 'Philadelphia',
    assetType: 'other',
    auctionStartDate: now.toISOString(),
    auctionEndDate: new Date(now.getTime() + 11 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1578664182689-57e8b2e3d9a4?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1578664182689-57e8b2e3d9a4?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-006',
    title: 'Council Office Building - City Centre',
    description: '12,000 sq ft former council offices in prime city centre location. Multiple floors with lift access. Suitable for conversion to apartments or commercial use.',
    shortDescription: 'City centre office building, 12,000 sq ft',
    location: 'Glasgow',
    country: 'United Kingdom',
    region: 'Scotland',
    city: 'Glasgow',
    assetType: 'land-buildings',
    auctionEndDate: new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-007',
    title: 'Police Patrol Cars - Set of 8',
    description: 'Eight decommissioned police patrol vehicles. Various models including BMW and Volvo. All with high-performance specifications and maintenance records.',
    shortDescription: 'Set of 8 ex-police patrol cars',
    location: 'Liverpool',
    country: 'United Kingdom',
    region: 'North West England',
    city: 'Liverpool',
    assetType: 'cars',
    auctionEndDate: new Date(now.getTime() + 150 * 60 * 1000).toISOString(),
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: true,
    isFuture: false,
    images: ['https://images.unsplash.com/photo-1506015391300-1012d0ee2ea7?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-1012d0ee2ea7?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  // More Future Items
  items.push({
    id: 'gsa-future-004',
    title: 'Airport Hangar - Private Aviation',
    description: 'Upcoming auction for private aviation hangar at regional airport. 15,000 sq ft with modern facilities and excellent runway access.',
    shortDescription: 'Private aviation hangar, 15,000 sq ft',
    location: 'Austin, TX',
    country: 'United States',
    state: 'Texas',
    city: 'Austin',
    assetType: 'land-buildings',
    auctionStartDate: new Date(now.getTime() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 55 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'gsa-future-005',
    title: 'Fire Trucks - Emergency Response Vehicles',
    description: 'Upcoming sale of 3 decommissioned fire trucks. All in working order with recent inspections. Suitable for rural fire departments or collectors.',
    shortDescription: 'Set of 3 fire trucks, working order',
    location: 'Phoenix, AZ',
    country: 'United States',
    state: 'Arizona',
    city: 'Phoenix',
    assetType: 'cars',
    auctionStartDate: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 43 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://gsaauctions.gov/',
    sourceName: 'GSA Auctions',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&h=600&fit=crop',
    licenseId: 'us-public-domain',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  items.push({
    id: 'uk-future-002',
    title: 'Coastal Property - Development Site',
    description: 'Upcoming sale of 5-acre coastal development site with planning permission. Stunning sea views and excellent location for residential development.',
    shortDescription: '5-acre coastal development site',
    location: 'Brighton',
    country: 'United Kingdom',
    region: 'South East England',
    city: 'Brighton',
    assetType: 'land-buildings',
    auctionStartDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndDate: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    sourceUrl: 'https://www.data.gov.uk/',
    sourceName: 'UK Register of Surplus Land',
    isActive: false,
    isFuture: true,
    images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop'],
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
    licenseId: 'uk-ogl',
    fetchedAt: now.toISOString(),
    createdAt: now.toISOString()
  });

  return items;
}

export async function fetchAuctionItems(): Promise<{
  items: AuctionItem[];
  errors: { source: string; error: string }[];
}> {
  // In production, this would fetch from real APIs
  // For now, return mock data
  const items = generateMockItems();
  const errors: { source: string; error: string }[] = [];

  return { items, errors };
}

export function groupItemsByCountry(items: AuctionItem[]) {
  const grouped = new Map<string, Map<string, AuctionItem[]>>();

  items.forEach(item => {
    if (!grouped.has(item.country)) {
      grouped.set(item.country, new Map());
    }
    
    const countryGroup = grouped.get(item.country)!;
    const location = item.state || item.region || item.city || 'Other';
    
    if (!countryGroup.has(location)) {
      countryGroup.set(location, []);
    }
    
    countryGroup.get(location)!.push(item);
  });

  // Sort items within each location by asset type priority
  grouped.forEach(countryGroup => {
    countryGroup.forEach((items, location) => {
      items.sort((a, b) => {
        const priorityA = ['land-buildings', 'trailers', 'cars', 'motorcycles', 'bikes', 'other'].indexOf(a.assetType);
        const priorityB = ['land-buildings', 'trailers', 'cars', 'motorcycles', 'bikes', 'other'].indexOf(b.assetType);
        return priorityA - priorityB;
      });
    });
  });

  return grouped;
}
