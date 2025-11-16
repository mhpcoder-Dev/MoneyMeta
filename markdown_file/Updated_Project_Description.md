Moneymeta Project Description

Website: moneymeta.app

Site host: Either Google Sites or Webflow


What I need

I need a website with ads on the site

Everything needs to work automatically. If I need to do anything at all on the website or on an external platform being used for the website I need know before you proceed with the project. With the exception of the ads, I’m assuming there’s things I will have to do with those. 

The website must be compatible for desktops, tablets, and phones.

I need to be the admin on any sites that are used to help create website, netlify, react, etc.

I need to know how to work whatever we are using for the ads.

I need any documents that were uploaded into external sites so I can edit them if I need to.

We need widget that show different things that governments are selling/auctioning. We can use the APIs and open data feeds. 

This widget should only show current things being sold or up for auction. Nothing from the past. 

Land/buildings should appear first in the widgets, followed by trailers, cars, motorcycles, bikes

I basically want one giant widget on the homepage that neatly shows things governments have up for sale/auction. I do want a location of each place listed before the things for sale/auction are listed. For example:

United States
Thing for sale
Thing for sale
Thing for sale
Thing for sale
United Kingdom
Thing for sale
Thing for sale
Thing for sale
Thing for sale


For the US feed I/you need to sign up for API key, the instructions for that are below. 

•	the U.S. GSA Auctions API appears to be active and operational as of November 2025. It’s listed as a public GET API on official government resources like data.gov, with recent data harvesting noted in September 2025.  The main GSA Auctions website is also live and open for bidding, with no indications of downtime or discontinuation in current documentation or news releases.   To use it, you’ll need an API key (sign up at api.data.gov/signup for a free one, as demo keys have limits), and the endpoint is https://api.gsa.gov/assets/gsaauctions/v2/auctions (append ?api_key=YOUR_KEY and optional parameters like format=json).  If you encounter issues, check the GitHub docs repository for updates.  



This is the link to the land the US is selling: https://disposal.gsa.gov/s/searchproperty?state=ALL&type=ALL

This is the link to the US surplus auction site: https://gsaauctions.gov/auctions/auctions-list?page=1&size=50&searchType=ALL_WORDS&status=active&sort=auctionEndDateSoon,DESC&advanced=false

United States: GSA Auctions API/Data
•  Description: Provides data on federal surplus items (e.g., vehicles, electronics, real estate) up for auction, including listings, bids, and sale details. Accessible via API or datasets on data.gov.
•  License: Public domain under U.S. law (17 U.S.C. § 105 for federal works); no copyright applies domestically, though CC0 may be suggested for international use—I’ve included it as the core is public domain, not a CC license. 
•  Legal for Use: Yes, unrestricted commercial reuse; no attribution required but recommended for transparency.
•  Link: https://catalog.data.gov/dataset/auctions-api or https://gsaauctions.gov/
United Kingdom
The Register of Surplus Land dataset is available on data.gov.uk, providing information on surplus government land availability. Access it here: https://www.data.gov.uk/dataset/49b15726-1603-4618-b7bb-38af6ed111e8/register-of-surplus-land  (includes XLS downloads as of March 31, 2025 ).
A mirrored version is also on the EU data portal: https://data.europa.eu/data/datasets/register-of-surplus-land?locale=en 
United Kingdom: Register of Surplus Land Dataset
•  Description: Data on surplus government land and property available for sale or auction, including locations and availability details.
•  License: Open Government Licence v3.0 (OGL), a UK-specific license not part of Creative Commons (though compatible with some CC terms). 
•  Legal for Use: Yes, royalty-free for commercial and non-commercial use with attribution.
•  Link: https://www.data.gov.uk/dataset/49b15726-1603-4618-b7bb-38af6ed111e8/register-of-surplus-land
Canada
The Open Government Portal provides a dataset for GCSurplus historical sold items (items sold since August 21, 2015, including descriptions and sale prices). You can download it in CSV format here: https://open.canada.ca/data/en/dataset/1a09c5c1-3554-4b70-9e53-6322a72ec7d4 

Australia
While there’s no specific open dataset for government surplus auctions, you can search for related procurement or asset data on the main portal: https://data.gov.au/data/dataset/  (filter by tags like “sales” or organization like Department of Finance  ).
European Union
For Tenders Electronic Daily (TED), open data downloads and exploration tools (including procurement notices that may cover surplus-related tenders) are available here: https://data.ted.europa.eu/  (supports SPARQL queries for custom datasets).
The main TED dataset page on the EU data portal: https://data.europa.eu/data/datasets/ted-1?locale=en 
New Zealand
No specific open dataset for government surplus auctions was found, but you can explore procurement and related data on the main portal: https://data.govt.nz/  (includes guidance on open data releases ).

Canada: GCSurplus Historical Sold Items Dataset
•  Description: Open data on government surplus assets sold via auction (e.g., equipment, vehicles), including descriptions, prices, and dates from 2015 onward.
•  License: Open Government Licence - Canada (OGL-Canada), a custom license not affiliated with Creative Commons. 
•  Legal for Use: Yes, explicitly allows commercial purposes with attribution to the source.
•  Link: https://open.canada.ca/data/en/dataset/1a09c5c1-3554-4b70-9e53-6322a72ec7d4

India: Weekly Auctions of Treasury Bills Dataset
•  Description: Data on government treasury bill auctions, including bid details, amounts, and results; broader procurement/auction data available on the portal.
•  License: Government Open Data License - India (GODL), a custom Indian license not Creative Commons.
•  Legal for Use: Yes, permits commercial reuse, modification, and distribution with attribution.  
•  Link: https://www.data.gov.in/keywords/Auction (search for treasury or surplus datasets)
Dubai United Arab Emirates (UAE/Dubai): Procurement Tenders and Auctions Dataset
•  Description: Data on government tenders, auctions, bids, and surplus sales from the Ministry of Finance or Dubai Customs.
•  License: UAE Federal Open Data License, a custom policy not Creative Commons.
•  Legal for Use: Yes, allows free commercial reuse with conditions like source acknowledgment and no harm to UAE reputation. 
•  Link: https://bayanat.ae/en/Datasets/Dataset-info?id=psf4ejE4ZkZIQWJS95sdrb8u2xnNWsS23b_1syxWXHs or https://www.dubaicustoms.gov.ae/en/OpenData/Pages/default.aspx
France: Agence France Trésor (AFT) Auction Results or FOPPA Procurement Data
•  Description: Data on government bond auctions (e.g., latest adjudications) and broader public procurement notices that include surplus sales/auctions.
•  License: Licence Ouverte / Etalab Open Licence, a French custom license not Creative Commons (compatible with CC BY 2.0 but separate). 
•  Legal for Use: Yes, free for commercial exploitation, reproduction, and adaptation with attribution.
•  Link: https://www.aft.gouv.fr/en/dernieres-adjudications or https://doi.org/10.5281/zenodo.7808664 (FOPPA via Zenodo, under Etalab)
(China SAR): Government Auction List Dataset
•  Description: Data on surplus or confiscated items up for auction, including descriptions and quantities.
•  License: Custom terms and conditions of DATA.GOV.HK, not Creative Commons. 
•  Legal for Use: Yes, allows commercial and non-commercial distribution, reproduction, and hyperlinking with attribution and ownership acknowledgment.
•  Link: https://data.gov.hk/en-data/dataset/hk-gld-suppmgmt2-auction-list
Japan: Ministry of Finance Historical Auction Results
•  Description: Data on government bond (JGB) and treasury bill auctions, including past results and details.
•  License: No explicit license mentioned; treated as public government data with no copyright restrictions for factual information.
•  Legal for Use: Yes, generally reusable for commercial purposes under Japanese fair use/public data policies, with no endorsement implied. 
•  Link: https://www.mof.go.jp/english/policy/jgbs/auction/past_auction_results/index.html

Australia: AusTender Procurement and Auction Data
•  Description: Data on government tenders, contracts, and auctions (including surplus asset disposals) from the Department of Finance, covering planned procurements, awards, and sales notices that may include surplus items.
•  License: Australian Government custom open data policy (not Creative Commons; often under terms allowing reuse with attribution, as per data.gov.au guidelines for non-CC datasets).
•  Legal for Use: Yes, supports commercial reuse and distribution with source acknowledgment and no misrepresentation.  
•  Link: https://www.tenders.gov.au/ (data exports via API or downloads; see api.gov.au for integration).
Australia: Victorian Government Land Sales Dataset
•  Description: Information on surplus government land and property auctions/sales, including details on identification, valuation, and disposal processes for Victorian state assets.
•  License: Victorian Government custom terms (not Creative Commons; public data under state policy allowing open access).
•  Legal for Use: Yes, free for commercial purposes with attribution to the source. 
•  Link: https://www.vic.gov.au/government-land-sales (datasets downloadable via related portals like data.vic.gov.au under non-CC terms).
Ireland: Public Procurement Tenders Dataset (eTenders)
•  Description: Data on government tenders and auctions, including surplus asset sales (e.g., equipment, vehicles) via the national eProcurement platform, with details on notices, awards, and bids.
•  License: Irish Open Data Licence (a custom national license, not Creative Commons). 
•  Legal for Use: Yes, explicitly permits commercial reuse, modification, and distribution with attribution and compliance with EU Open Data Directive.  
•  Link: https://www.etenders.gov.ie/ (open data via data.gov.ie or API at https://data.gov.ie/dataset/public-procurement-tenders).
Ireland: Open Government Data API (Various Datasets)
•  Description: Aggregated API access to government datasets, including procurement and auction-related information (e.g., public sector sales notices that cover surplus).
•  License: Irish Open Data Licence (custom, not Creative Commons).
•  Legal for Use: Yes, free for commercial applications with source attribution.  
•  Link: https://data.gov.ie/ (API endpoints via the portal; search for “auction” or “procurement”).

Italy
•  Description: Open data on cohesion policy projects (2007-2027), including procurement tenders and asset-related funding that can involve surplus disposals (e.g., public works, land, and infrastructure sales). Datasets in CSV/Excel formats with details on projects, payments, and locations.
•  License: Italian Open Data License (IODL) 2.0, a custom national license not Creative Commons. 
•  Legal for Use: Yes, permits commercial reuse, modification, and distribution with attribution.
•  Link: https://opencoesione.gov.it/en/opendata/
Italy: Agenzia del Demanio State Property Sales Portal
•  Description: Official portal for sales and auctions of state-owned real estate (e.g., buildings, land, and surplus properties). Includes public auctions, notices for properties under €400,000, and initiatives like Terrevive for agricultural land (5,500 hectares). Listings include property details, bids, and timelines.
•  License: Italian public sector information reuse law (Legge 37/2007 and EU Directive 2019/1024), a custom framework not Creative Commons.
•  Legal for Use: Yes, allows commercial reuse with attribution and preservation of metadata. 
•  Link: https://venditaimmobili.agenziademanio.it/AsteDemanio/sito.php
Italy: Global Public Procurement Database (GPPD) - Italy Profile
•  Description: Data on Italian public procurement, including tenders and awards for assets (e.g., surplus equipment, land, or services). Includes historical data from 2010 onward, useful for tracking potential surplus sales.
•  License: Custom EU open data policy (not Creative Commons; based on national implementations like IODL for Italian contributions).
•  Legal for Use: Yes, supports commercial applications with attribution. 
•  Link: https://www.globalpublicprocurementdata.org/gppd/country_profile/IT
Italy: Istat Open Data Portal
•  Description: National statistics institute’s open data on economic indicators, including procurement and public asset management (e.g., datasets on government spending that tie into surplus sales). Search for “procurement” or “public assets” for related CSVs.
•  License: Custom Italian government terms (not Creative Commons; aligned with IODL or public reuse laws).
•  Legal for Use: Yes, free for commercial reuse with source acknowledgment. 
•  Link: https://www.istat.it/en/data/open-data/
If you need more details or sources for specific types of assets (e.g., defense or cultural properties), let me know!   Kju
ko
Spain: Plataforma de Contratación del Sector Público (PLACSP) Open Data
•  Description: Data on public tenders, contracts, and awards from the Spanish government’s procurement platform, including auctions for works, supplies, services, and surplus asset disposals (e.g., vehicles, equipment, or property when excess). Available as downloadable datasets in formats like CSV or via tools like OpenPLACSP for generating custom data.
•  License: Custom license based on Spanish Law on Reuse of Public Sector Information (Ley 37/2007), not Creative Commons. 
•  Legal for Use: Yes, explicitly allows commercial and non-commercial reuse, reproduction, modification, and distribution with attribution to the source, preservation of metadata, and no distortion of information. 
•  Link: https://contrataciondelestado.es/wps/portal/datosAbiertos (open data section; datasets also mirrored on datos.gob.es, e.g., https://datos.gob.es/es/catalogo/l01241152-licitaciones).  
Spain: Subastas Agencia Tributaria (Tax Agency Auctions Data)
•  Description: Data on auctions of seized or mortgaged assets by the Spanish Tax Agency (e.g., real estate, vehicles, goods), including listings, bids, and results. Used in apps for public access to ongoing and historical auctions, often integrated with the BOE (Official State Gazette) portal.
•  License: Custom reuse policy under Spanish public sector information law (Ley 37/2007), not Creative Commons. 
•  Legal for Use: Yes, supports commercial applications (e.g., apps or websites) with attribution and no misrepresentation.  
•  Link: https://subastas.boe.es/ (main auction portal; open data use cases and feeds via integrations like those on data.europa.eu or hacienda.gob.es).  

England/UK: Register of Surplus Land Dataset
•  Description: Data on surplus public sector land and property available for sale or auction, including site details, locations, and disposal status from central government departments and agencies (e.g., via the Office of Government Property). Updated periodically with XLS/CSV downloads. 
•  License: Open Government Licence v3.0 (OGL), a UK-specific custom license not part of Creative Commons.
•  Legal for Use: Yes, royalty-free for commercial and non-commercial use, reproduction, and adaptation with attribution to the source. 
•  Link: https://www.data.gov.uk/dataset/49b15726-1603-4618-b7bb-38af6ed111e8/register-of-surplus-land
England/UK: Use Land and Property Data Service API
•  Description: API access to datasets on government-owned land and property, including surplus assets up for sale or auction (e.g., buildings, sites), with details like ownership, valuations, and disposal records. Supports JSON queries for integration. 
•  License: Open Government Licence v3.0 (OGL), a custom UK license not Creative Commons.
•  Legal for Use: Yes, allows commercial reuse and applications with attribution and no misrepresentation. 
•  Link: https://use-land-property-data.service.gov.uk/api-information (datasets also via data.gov.uk API at https://www.api.gov.uk/gds/data-gov-uk/) 

UK: Government Land and Property Disposals Data 2015 to 2016 and 2016 to 2017
•  Description: Details of all commercial sales of central government surplus land (e.g., sites disposed of via auction or direct sale) during the 2015-2016 and 2016-2017 financial years, including transaction data, locations, and values. Available as downloadable spreadsheets. 
•  License: Open Government Licence v3.0 (OGL), a UK-specific custom license not part of Creative Commons.
•  Legal for Use: Yes, royalty-free for commercial and non-commercial use with attribution.
•  Link: https://www.data.gov.uk/dataset/government-land-and-property-disposals-data-2015-to-2016-and-2016-to-2017

Current Government Assets and Things for Sale in Mumbai and Other Parts of India
These are official government platforms and portals for ongoing auctions and sales of assets, including surplus property, NPA (non-performing assets), liquidation items, enemy properties, and more. Many are e-auction based, and some are specific to Mumbai (e.g., municipal or telecom properties). All are from government or government-affiliated entities, legal for public access and use under Indian open data policies (with attribution if republishing data).           
•  eAuction India (Central Government Platform): Secure platform for electronic auctions of government assets, including surplus stores, vehicles, and properties across India. Register to bid.
https://eauction.gov.in/
•  Government eAuction India (National Portal): Central hub for online auctions by government departments for sale/purchase of assets like land, equipment, and scrap. Covers all states, including Maharashtra/Mumbai.
https://services.india.gov.in/service/detail/government-auction-eauction-india-1
•  eAuctions India (Bank Auctions under SARFAESI): Portal for bank auctions of mortgaged properties, NPAs, and foreclosures, including in Mumbai and other cities. Government-regulated.
https://www.eauctionsindia.com/
•  Insolvency and Bankruptcy Board of India (IBBI) Auction Notices: Lists liquidation auctions for corporate assets, including properties, machinery, and stocks in various states, with recent notices for 2025.
https://ibbi.gov.in/en/liquidation-auction-notices/lists

•	 MTNL Mumbai E-Auction: Auctions of MTNL (government telecom) properties, including commercial and residential buildings in Mumbai/Delhi regions (latest RFP June 2025).
https://mtnlmumbai.in/index.php/e-auction
I also need a widget that shows thing that could potentially be for sale in the future on a different page of the website. I think this is the list I compiled for future sales/auctions, though my mind might be mixing things up at this point. 

India (Open Government Data Platform)
Yes, the Government Open Data License - India (GODL) explicitly allows reuse for commercial and non-commercial purposes, including adaptation and distribution, with attribution to the source. It’s royalty-free and non-exclusive, governed by Indian law.    No restrictions on ads as long as terms are followed.
UAE/Dubai (Bayanat.ae)
Yes, the UAE Federal Open Data License and related guidelines (e.g., from the Ministry of Finance) allow free reuse for public purposes, without explicit prohibition on commercial use. However, data cannot be used for political, illegal, or activities harming the UAE’s reputation.  Commercial integration on ad-supported sites is permissible if compliant, but confirm per dataset for any additional terms.
Italy (OpenCoesione)
Yes, data is released under CC BY 4.0 or IODL 2.0 licenses, which permit commercial reuse, modification, and distribution with attribution. Even copyleft versions (e.g., CC BY-SA) allow commercial use if derivatives are shared under the same license.    No issues with ads if attribution is provided.
France (FOPPA or data.gouv.fr)
Yes, the Etalab Open License (Licence Ouverte) is permissive and allows commercial reuse, reproduction, and modification with attribution. It’s designed for wide dissemination, including on commercial sites.    FOPPA data on Zenodo follows similar open principles.

Australia: AusTender Procurement and Auction Data
•  Description: Data on government tenders, contracts, and auctions (including surplus asset disposals) from the Department of Finance, covering planned procurements, awards, and sales notices that may include surplus items.
•  License: Australian Government custom open data policy (not Creative Commons; often under terms allowing reuse with attribution, as per data.gov.au guidelines for non-CC datasets).
•  Legal for Use: Yes, supports commercial reuse and distribution with source acknowledgment and no misrepresentation.  
•  Link: https://www.tenders.gov.au/ (data exports via API or downloads; see api.gov.au for integration).
Australia: Victorian Government Land Sales Dataset
•  Description: Information on surplus government land and property auctions/sales, including details on identification, valuation, and disposal processes for Victorian state assets.
•  License: Victorian Government custom terms (not Creative Commons; public data under state policy allowing open access).
•  Legal for Use: Yes, free for commercial purposes with attribution to the source. 
•  Link: https://www.vic.gov.au/government-land-sales (datasets downloadable via related portals like data.vic.gov.au under non-CC terms).
Ireland: Public Procurement Tenders Dataset (eTenders)
•  Description: Data on government tenders and auctions, including surplus asset sales (e.g., equipment, vehicles) via the national eProcurement platform, with details on notices, awards, and bids.
•  License: Irish Open Data Licence (a custom national license, not Creative Commons). 
•  Legal for Use: Yes, explicitly permits commercial reuse, modification, and distribution with attribution and compliance with EU Open Data Directive.  
•  Link: https://www.etenders.gov.ie/ (open data via data.gov.ie or API at https://data.gov.ie/dataset/public-procurement-tenders).
Ireland: Open Government Data API (Various Datasets)
•  Description: Aggregated API access to government datasets, including procurement and auction-related information (e.g., public sector sales notices that cover surplus).
•  License: Irish Open Data Licence (custom, not Creative Commons).
•  Legal for Use: Yes, free for commercial applications with source attribution.  
•  Link: https://data.gov.ie/ (API endpoints via the portal; search for “auction” or “procurement”).

Spain: Plataforma de Contratación del Sector Público (PLACSP) Open Data
•  Description: Data on public tenders, contracts, and awards from the Spanish government’s procurement platform, including auctions for works, supplies, services, and surplus asset disposals (e.g., vehicles, equipment, or property when excess). Available as downloadable datasets in formats like CSV or via tools like OpenPLACSP for generating custom data.
•  License: Custom license based on Spanish Law on Reuse of Public Sector Information (Ley 37/2007), not Creative Commons. 
•  Legal for Use: Yes, explicitly allows commercial and non-commercial reuse, reproduction, modification, and distribution with attribution to the source, preservation of metadata, and no distortion of information. 
•  Link: https://contrataciondelestado.es/wps/portal/datosAbiertos (open data section; datasets also mirrored on datos.gob.es, e.g., https://datos.gob.es/es/catalogo/l01241152-licitaciones).  
Spain: Subastas Agencia Tributaria (Tax Agency Auctions Data)
•  Description: Data on auctions of seized or mortgaged assets by the Spanish Tax Agency (e.g., real estate, vehicles, goods), including listings, bids, and results. Used in apps for public access to ongoing and historical auctions, often integrated with the BOE (Official State Gazette) portal.
•  License: Custom reuse policy under Spanish public sector information law (Ley 37/2007), not Creative Commons. 
•  Legal for Use: Yes, supports commercial applications (e.g., apps or websites) with attribution and no misrepresentation.  
•  Link: https://subastas.boe.es/ (main auction portal; open data use cases and feeds via integrations like those on data.europa.eu or hacienda.gob.es).  



The information used from everywhere except from United States needs some type of attribution. We can add this in after the widgets are built if that’s easier.
Land/buildings should appear first in the widgets, followed by trailers, cars, motorcycles, bikes

Id like each item to have it’s own comment section 

I would like people to be able to share the links to the sales/auctions on my site, and have the link take people to that card on my site. I would like there to be something you click inside the cards though that takes you to whatever site the sale/auction is happening on

If any of these sites don’t work, or something is taking you a long time, or my widgets can’t automatically update themselves from these sources, et me know and then move on to something else. Having the information for the things for sale/aunction in the US is the most important thing.
According to AI scraping is not allowed for this
There should be a search bar on both pages for people to type in things like “land” or “land in the United States, ” but I think whatever platform we end up using will have a built in search bar feature. 
Let me know if you need access to my netlify or if I need to create another account on something
