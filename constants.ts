import {
  ConversationData,
  Step,
  StepId,
  Topic,
  Initiative,
  InterestArea,
  DeineReflection,
  ContactInfo,
} from "./types";

import HouseIcon from "@mui/icons-material/House";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ParkIcon from "@mui/icons-material/Park";
import EditNoteIcon from "@mui/icons-material/EditNote";

import YardIcon from "@mui/icons-material/Yard";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import { red } from "@mui/material/colors";
import {ShoppingCart} from "@mui/icons-material";

export const STEPS: Step[] = [
  { id: StepId.Welcome, title: "Willkommen" },
  { id: StepId.Core, title: "Notizen" },
  { id: StepId.District, title: "Bezirk auswählen" },
  { id: StepId.Topics, title: "Kategorien" },
  { id: StepId.Initiatives, title: "Initiativen" },
  { id: StepId.Consent, title: "In Kontakt bleiben" },
  { id: StepId.Reflection, title: "Reflexion" },
  { id: StepId.Metrics, title: "Gesprächspartner:innen" },
  { id: StepId.reflectionDistrict, title: "Select Reflection Districts" },
  { id: StepId.Summary, title: "Zusammenfassung" },
  { id: StepId.ThankYou, title: "Danke." },
];

export const INITIAL_CONVERSATION_DATA: ConversationData = {
  mainInterest: "",
  livableCity: "",
  notes: "",
  topicDetails: {},
  districts: [],
  selectedInitiatives: [],
  interestAreas: [],
  interestDistricts: [],
  shareContact: false,
  contactInfo: "",
  isAnonymous: true,
  observerReflection: "",
  surprise: "",
  numPeople: 1,
  duration: 10,
};

export const CONTACT_INFO: ContactInfo = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
};

export const DEINE_REFLECTION: DeineReflection = {
  observerReflection: "",
  surprise: "",
  numPeople: 1,
  duration: 10,
};

export const BERLIN_DISTRICTS: string[] = [
  "Mitte",
  "Friedrichshain-Kreuzberg",
  "Pankow",
  "Charlottenburg-Wilmersdorf",
  "Spandau",
  "Steglitz-Zehlendorf",
  "Tempelhof-Schöneberg",
  "Neukölln",
  "Treptow-Köpenick",
  "Marzahn-Hellersdorf",
  "Lichtenberg",
  "Reinickendorf",
];

export const TOPIC_DEFINITIONS: Topic[] = [
  {
    id: "wohnen_bauwende",
    nameKey: "topics.housingBuildingTransition",
    icon: HouseIcon,
    subGroups: [
      {
        id: "building_transition",
        nameKey: "topics.buildingTransition",
        options: [
          { id: "concrete", nameKey: "topics.concrete" },
          { id: "waste", nameKey: "topics.waste" },
          { id: "costs", nameKey: "topics.costs" },
          { id: "rent", nameKey: "topics.rent" },
          { id: "existing_stock", nameKey: "topics.existingStock" },
          { id: "community", nameKey: "topics.community" },
          { id: "quality_of_life", nameKey: "topics.qualityOfLife" },
          { id: "displacement", nameKey: "topics.displacement" },
          { id: "wood", nameKey: "topics.wood" },
        ],
      },
    ],
  },
  {
    id: "wohnen_warmewende",
    nameKey: "topics.housingHeatTransition",
    icon: ThermostatIcon,
    subGroups: [
      {
        id: "heating_transition",
        nameKey: "topics.heatingTransition",
        options: [
          { id: "tech_openness", nameKey: "topics.techOpenness" },
          { id: "uneconomical", nameKey: "topics.uneconomical" },
          { id: "rent_increase", nameKey: "topics.rentIncrease" },
          { id: "costs", nameKey: "topics.costs" },
          { id: "monument_protection", nameKey: "topics.monumentProtection" },
          { id: "district_heating", nameKey: "topics.districtHeating" },
          { id: "old_building", nameKey: "topics.oldBuilding" },
          { id: "homeownership", nameKey: "topics.homeownership" },
        ],
      },
    ],
  },
  {
    id: "mobilitat",
    nameKey: "topics.mobility",
    icon: DirectionsCarIcon,
    subGroups: [
      {
        id: "transport",
        nameKey: "topics.transport",
        options: [
          { id: "costs", nameKey: "topics.costs" },
          { id: "electric_car", nameKey: "topics.electricCar" },
          { id: "bicycle", nameKey: "topics.bicycle" },
          { id: "parking", nameKey: "topics.parking" },
          { id: "public_transport", nameKey: "topics.publicTransport" },
          { id: "health", nameKey: "topics.health" },
        ],
      },
    ],
  },
  {
    id: "klimaanpassung",
    nameKey: "topics.climateAdaptation",
    icon: ParkIcon,
    subGroups: [
      {
        id: "climate_adaptation",
        nameKey: "topics.climateAdaptation",
        options: [
          { id: "heat", nameKey: "topics.heat" },
          { id: "heavy_rain", nameKey: "topics.heavyRain" },
          { id: "trees", nameKey: "topics.trees" },
        ],
      },
    ],
  },
  {
    id: "konsum",
    nameKey: "topics.consumption",
    icon: ShoppingCart,
    subGroups: [
      {
        id: "consumption",
        nameKey: "topics.consumption",
        options: [
          { id: "disposableAndPackaging", nameKey: "topics.disposableAndPackaging" },
          { id: "food", nameKey: "topics.food" },
          { id: "recyclingAndRepair", nameKey: "topics.recyclingAndRepair" },
          { id: "littering", nameKey: "topics.littering" },
        ],
      },
    ],
  },
  {
    id: "sonstiges_notizen",
    nameKey: "topics.otherNotes",
    icon: EditNoteIcon,
    type: "notes",
  },
];

export const INITIATIVES: Initiative[] = [
  {
    id: "garten_projekt",
    nameKey: "initiatives.garten_projekt.name",
    descriptionKey: "initiatives.garten_projekt.description",
    district: ["Friedrichshain-Kreuzberg"],
    themes: ["Urban Garden", "Food", "Biodiversity"],
    link: "https://prinzessinnengarten-kollektiv.net/",
  },
  {
    id: "repair_cafe_mitte",
    nameKey: "initiatives.repair_cafe_mitte.name",
    descriptionKey: "initiatives.repair_cafe_mitte.description",
    district: ["Mitte"],
    themes: ["Repair Café", "Zero Waste", "Circular Economy"],
    link: "https://kunst-stoffe-berlin.de/",
  },
  {
    id: "neukolln_hilft",
    nameKey: "initiatives.neukolln_hilft.name",
    descriptionKey: "initiatives.neukolln_hilft.description",
    district: ["Neukölln"],
    themes: ["Mutual Aid"],
    link: "https://www.neukoelln-hilft.de/",
  },
  {
    id: "pankow_solar",
    nameKey: "initiatives.pankow_solar.name",
    descriptionKey: "initiatives.pankow_solar.description",
    district: ["Pankow"],
    themes: ["Community Energy", "Heating Transition", "Solar Power"],
    link: "https://www.buerger-energie-berlin.de/",
  },
  {
    id: "klima_kiez_charlottenburg",
    nameKey: "initiatives.klima_kiez_charlottenburg.name",
    descriptionKey: "initiatives.klima_kiez_charlottenburg.description",
    district: ["Charlottenburg-Wilmersdorf"],
    themes: ["Local Politics", "Climate Adaptation"],
    link: "https://klausenerplatz.de/",
  },
  // Added using Gemini:
  {
    id: "changing_cities",
    nameKey: "initiatives.changing_cities.name",
    descriptionKey: "initiatives.changing_cities.description",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Sustainable Mobility", "Cycling", "Local Politics", "Activism"],
    link: "https://changing-cities.org/",
  },
  {
    id: "berliner_tafel",
    nameKey: "initiatives.berliner_tafel.name",
    descriptionKey: "initiatives.berliner_tafel.description",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Food", "Food Waste", "Social Justice"],
    link: "https://www.berliner-tafel.de/",
  },
  {
    id: "berliner_tafel",
    nameKey: "initiatives.berliner_tafel.name",
    descriptionKey: "initiatives.berliner_tafel.description",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Food", "Food Waste", "Social Justice"],
    link: "https://www.berliner-tafel.de/",
  },
  {
    id: "flussbad_berlin",
    nameKey: "initiatives.flussbad_berlin.name",
    descriptionKey: "initiatives.flussbad_berlin.description",
    district: ["Mitte"],
    themes: [
      "Water Quality",
      "Urban Development",
      "Climate Adaptation",
      "Biodiversity",
    ],
    link: "https://www.flussbad-berlin.de/",
  },
  {
    id: "zero_waste_ev",
    nameKey: "initiatives.zero_waste_ev.name",
    descriptionKey: "initiatives.zero_waste_ev.description",
    district: ["Friedrichshain-Kreuzberg", "Berlin-wide"],
    themes: ["Zero Waste", "Circular Economy", "Education"],
    link: "https://zerowasteverein.de/",
  },
  {
    id: "kohleausstieg_berlin",
    nameKey: "initiatives.kohleausstieg_berlin.name",
    descriptionKey: "initiatives.kohleausstieg_berlin.description",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Fossil Fuel Divestment", "Community Energy", "Activism"],
    link: "https://www.kohleausstieg-berlin.de/",
  },
  {
    id: "fridays_for_future_berlin",
    nameKey: "initiatives.fridays_for_future_berlin.name",
    descriptionKey: "initiatives.fridays_for_future_berlin.description",
    district: [
      "Mitte",
      "Friedrichshain-Kreuzberg",
      "Pankow",
      "Charlottenburg-Wilmersdorf",
      "Spandau",
      "Steglitz-Zehlendorf",
      "Tempelhof-Schöneberg",
      "Neukölln",
      "Treptow-Köpenick",
      "Marzahn-Hellersdorf",
      "Lichtenberg",
      "Reinickendorf",
    ],
    themes: ["Activism", "Youth Movement", "Climate Policy"],
    link: "https://fridaysforfuture.berlin/",
  },
  {
    id: "repair_cafe_klausenerplatz",
    nameKey: "initiatives.repair_cafe_klausenerplatz.name",
    descriptionKey: "initiatives.repair_cafe_klausenerplatz.description",
    district: ["Charlottenburg-Wilmersdorf"],
    themes: ["Repair Café", "Community", "Circular Economy"],
    link: "http://www.remap-berlin.de/projekte/825",
  },
  {
    id: "repair_cafe_lichterfelde_west",
    nameKey: "initiatives.repair_cafe_lichterfelde_west.name",
    descriptionKey: "initiatives.repair_cafe_lichterfelde_west.description",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Zero Waste", "Seniors"],
    link: "https://www.seniorenmitpower.com/repair-cafe/",
  },
  {
    id: "repair_cafe_mekki",
    nameKey: "initiatives.repair_cafe_mekki.name",
    descriptionKey: "initiatives.repair_cafe_mekki.description",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Community", "Sustainability"],
    link: "https://www.mekki-steglitz.de/repair-cafe/",
  },
  {
    id: "repair_cafe_zehlendorf",
    nameKey: "initiatives.repair_cafe_zehlendorf.name",
    descriptionKey: "initiatives.repair_cafe_zehlendorf.description",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Community", "Seniors"],
    link: "https://seniorennetz.berlin/de/item/service/repair-cafe-zehlendorf",
  },
  {
    id: "repair_cafe_kliq",
    nameKey: "initiatives.repair_cafe_kliq.name",
    descriptionKey: "initiatives.repair_cafe_kliq.description",
    district: ["Steglitz-Zehlendorf"],
    themes: ["Repair Café", "Youth", "Education", "Sustainability"],
    link: "https://kliq-berlin.de/repaircafe/",
  },
  {
    id: "repair_cafe_spandau",
    nameKey: "initiatives.repair_cafe_spandau.name",
    descriptionKey: "initiatives.repair_cafe_spandau.description",
    district: ["Spandau"],
    themes: ["Repair Café", "Climate Action", "Circular Economy"],
    link: "https://klimawerkstatt-spandau.de",
  },
  {
    id: "bund_repair_cafe_schoeneberg",
    nameKey: "initiatives.bund_repair_cafe_schoeneberg.name",
    descriptionKey: "initiatives.bund_repair_cafe_schoeneberg.description",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Environmentalism", "Activism"],
    link: "http://bund-berlin.de/themen/klima-ressourcen/abfall/repair-cafe",
  },
  {
    id: "rcf_repair_cafe_fahrraeder",
    nameKey: "initiatives.rcf_repair_cafe_fahrraeder.name",
    descriptionKey: "initiatives.rcf_repair_cafe_fahrraeder.description",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Cycling", "Sustainable Mobility"],
    link: "http://www.repaircafe.berlin/",
  },
  {
    id: "reparatur_cafe_mariendorf",
    nameKey: "initiatives.reparatur_cafe_mariendorf.name",
    descriptionKey: "initiatives.reparatur_cafe_mariendorf.description",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Community", "Zero Waste"],
    link: "https://steglitz-museum.de/reparatur-cafe-2",
  },
  {
    id: "faradgang_ev",
    nameKey: "initiatives.faradgang_ev.name",
    descriptionKey: "initiatives.faradgang_ev.description",
    district: ["Tempelhof-Schöneberg"],
    themes: ["Repair Café", "Cycling", "DIY", "Sustainable Mobility"],
    link: "https://faradgang.berlin/de/",
  },
  {
    id: "repair_cafe_schoeneweide",
    nameKey: "initiatives.repair_cafe_schoeneweide.name",
    descriptionKey: "initiatives.repair_cafe_schoeneweide.description",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "Community", "Local History"],
    link: "http://www.industriesalon.de/angebote/repair-cafe",
  },
  {
    id: "repair_cafe_grenzenlos",
    nameKey: "initiatives.repair_cafe_grenzenlos.name",
    descriptionKey: "initiatives.repair_cafe_grenzenlos.description",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "Community", "Social Justice"],
    link: "https://www.cafe-grenzenlos.de/repair-cafe.html",
  },
  {
    id: "repair_cafe_resi",
    nameKey: "initiatives.repair_cafe_resi.name",
    descriptionKey: "initiatives.repair_cafe_resi.description",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "DIY", "Community Workshop"],
    link: "https://resi-ressourcen.org/veranstaltungen.html",
  },
  {
    id: "kiezklub_alte_schule",
    nameKey: "initiatives.kiezklub_alte_schule.name",
    descriptionKey: "initiatives.kiezklub_alte_schule.description",
    district: ["Treptow-Köpenick"],
    themes: ["Repair Café", "Community", "Seniors"],
    link: "https://www.berlin.de/ba-treptow-koepenick/politik-und-verwaltung/aemter/amt-fuer-soziales/kiezklubs/kiezklub-alte-schule/",
  },
  {
    id: "repair_cafe_friedrichshain",
    nameKey: "initiatives.repair_cafe_friedrichshain.name",
    descriptionKey: "initiatives.repair_cafe_friedrichshain.description",
    district: ["Friedrichshain-Kreuzberg"],
    themes: ["Repair Café", "Zero Waste", "Community"],
    link: "https://repair-cafe-fhain.jimdosite.com",
  },
  {
    id: "reparatur_initiative_jungfernmuehle",
    nameKey: "initiatives.reparatur_initiative_jungfernmuehle.name",
    descriptionKey:
      "initiatives.reparatur_initiative_jungfernmuehle.description",
    district: ["Neukölln"],
    themes: ["Repair Café", "Community", "Sustainability"],
    link: "http://initiative-jungfernmühle.de",
  },
  {
    id: "repair_cafe_kiezkiosk_open_tiny",
    nameKey: "initiatives.repair_cafe_kiezkiosk_open_tiny.name",
    descriptionKey: "initiatives.repair_cafe_kiezkiosk_open_tiny.description",
    district: ["Neukölln"],
    themes: ["Repair Café", "Community", "Urban Design"],
    link: "https://opentiny.de",
  },
  {
    id: "rueckenwind_fahrraeder",
    nameKey: "initiatives.rueckenwind_fahrraeder.name",
    descriptionKey: "initiatives.rueckenwind_fahrraeder.description",
    district: ["Neukölln"],
    themes: ["Repair Café", "Cycling", "Social Justice", "Integration"],
    link: "http://rueckenwind.berlin",
  },
  {
    id: "bike_kitchen_north_east",
    nameKey: "initiatives.bike_kitchen_north_east.name",
    descriptionKey: "initiatives.bike_kitchen_north_east.description",
    district: ["Pankow"],
    themes: ["Repair Café", "Cycling", "DIY", "Community Workshop"],
    link: "https://bikekitchennortheast.wordpress.com/",
  },
  {
    id: "repair_cafe_stz_pankow",
    nameKey: "initiatives.repair_cafe_stz_pankow.name",
    descriptionKey: "initiatives.repair_cafe_stz_pankow.description",
    district: ["Pankow"],
    themes: ["Repair Café", "Community", "Zero Waste"],
    link: "http://stz-pankow.de",
  },
  {
    id: "reparatur_cafe_im_mv",
    nameKey: "initiatives.reparatur_cafe_im_mv.name",
    descriptionKey: "initiatives.reparatur_cafe_im_mv.description",
    district: ["Reinickendorf"],
    themes: ["Repair Café", "Community", "Sustainability"],
    link: "https://wertstatt-reparaturcafe.de/",
  },
  {
    id: "repair_cafe_bbk_linde",
    nameKey: "initiatives.repair_cafe_bbk_linde.name",
    descriptionKey: "initiatives.repair_cafe_bbk_linde.description",
    district: ["Reinickendorf"],
    themes: ["Repair Café", "Community", "Integration"],
    link: "https://salamkulturclub.de/repaircafe/",
  },
];

export const INTEREST_AREAS2: InterestArea[] = [
  {
    id: "Urban Garden",
    nameKey: "interestAreas.urbanGarden.name",
    descriptionKey: "interestAreas.urbanGarden.description",
    icon: YardIcon,
  },
  {
    id: "Repair Café",
    nameKey: "interestAreas.repairCafe.name",
    descriptionKey: "interestAreas.repairCafe.description",
    icon: BuildIcon,
  },
  {
    id: "Climate Education",
    nameKey: "interestAreas.climateEducation.name",
    descriptionKey: "interestAreas.climateEducation.description",
    icon: SchoolIcon,
  },
  {
    id: "Policy Advocacy",
    nameKey: "interestAreas.policyAdvocacy.name",
    descriptionKey: "interestAreas.policyAdvocacy.description",
    icon: GavelIcon,
  },
  {
    id: "Mutual Aid",
    nameKey: "interestAreas.mutualAid.name",
    descriptionKey: "interestAreas.mutualAid.description",
    icon: PeopleIcon,
  },
  {
    id: "Digital Inclusion",
    nameKey: "interestAreas.digitalInclusion.name",
    descriptionKey: "interestAreas.digitalInclusion.description",
    icon: DevicesIcon,
  },
];

export const COLORS = {
  heading: "#333333",
  border_black: "#111111",
  black: "#000000",
  primary_background: "#ffffff",
  white2: "#f4f4f4",
  white3: "#f8f8f8",
  white4: "#f9f9f9",
  white5: "#feffff",
  white6: "#fffffe",
  white7: "#fdffff",
  white8: "#fffeff",
  grey1: "#f7f7f7",
  card_background: "#f5f5f5", // light background
  grey2: "#DDDDDD",
  tint1: "#eee6db",
  green2: "#1ca549",
  green3: "#36ae6e",
  green4: "#4bac6b",
  green5: "#4cac6c",
  green6: "#4cac6b", // heading
  green7: "#4cad6c",
  green8: "#4cac6d",
  green9: "#93c47D",
  green10: "#b6d7a8", // light green
  green11: "#DAFFD6", // very light green
  green12: "#e6f2e6", // very very light green
  green13: "#f2f9f2", // almost white green
  button_background_yellow: "#FBBF24",
  button_border_yellow: "#F59E0B",
  button_background_green: "#00bb70",
  primary: "#fc2a1d",
  red1: "#e20912",
  red2: "#dd3333",
  red3: "#dd3332",
  red4: "#fb2a1d",
  new_red: " #e70000",
  title_red: "#fc2b1c", // impactful titles
  red5: "#de3333", // thank you heading
  red6: "#dc3433",
  red7: "#dd3433",
  red8: "#fb9993",
  red9: "#fbb2b0", // light red
  red10: "#fcd6d5", // very light red
  red11: "#fdf2f2", // almost white red
  brown0: "#8b1813", // dark brown
  brown1: "#8b1813",
  brown2: "#7d150e", // steps color
  blue1: "#0c328a",
  blue2: "#2e4c94",
  blue3: "#35348c",
  blue4: "#758bbd",
  blue5: "#9fc5f8",
  blue6: "#b0c4de", // light blue
  blue7: "#c0d4e8",
  blue8: "#D9E8FC",
  feuerrot: "#e70000", // PDF: Feuerrot
  chlorophyll: "#00bb70", // PDF: Chlorophyll
};

// Font families (to be used in styled-components, MUI theme, or global CSS)
export const FONTS = {
  header: '"VC Henrietta Condensed Black", Arial, Helvetica, sans-serif', // Main headings
  body: '"VC Nudge Normal", Arial, Helvetica, sans-serif', // Body text
  legal: "Arial, Helvetica, sans-serif", // Legal/fallback
};

export { StepId };
