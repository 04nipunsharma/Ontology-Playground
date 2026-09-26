/**
 * UPSTREAM TEST FIXTURE — the Microsoft Ontology Playground "Fourth Coffee"
 * sample ontology, bindings, quests and canned NL answers.
 *
 * It is no longer used by the app (the default ontology is the Komatsu
 * Australia enterprise model). It is kept only as a small, stable fixture for
 * unit tests of the generic ontology tooling (RDF, share links, quests, UI).
 */
import type { Ontology, EntityInstance, DataBinding } from '../../data/ontology';
import type { Quest } from '../../data/quests';

// The Fourth Coffee Ontology
export const cosmicCoffeeOntology: Ontology = {
  name: "Fourth Coffee",
  description: "A sample ontology representing a modern coffee shop chain with suppliers, products, stores, customers, and orders.",
  entityTypes: [
    {
      id: "customer",
      name: "Customer",
      description: "A person who purchases coffee products from our stores",
      icon: "👤",
      color: "#0078D4", // Microsoft Blue
      properties: [
        { name: "customerId", type: "string", isIdentifier: true, description: "Unique customer identifier" },
        { name: "name", type: "string", description: "Full name of the customer" },
        { name: "email", type: "string", description: "Contact email address" },
        { name: "loyaltyTier", type: "enum", values: ["Bronze", "Silver", "Gold", "Platinum"], description: "Loyalty program tier" },
        { name: "joinDate", type: "date", description: "Date the customer joined" },
        { name: "totalSpend", type: "decimal", unit: "USD", description: "Lifetime spend amount" }
      ]
    },
    {
      id: "order",
      name: "Order",
      description: "A customer purchase transaction at a store",
      icon: "🧾",
      color: "#107C10", // Microsoft Green
      properties: [
        { name: "orderId", type: "string", isIdentifier: true, description: "Unique order identifier" },
        { name: "timestamp", type: "datetime", description: "When the order was placed" },
        { name: "total", type: "decimal", unit: "USD", description: "Total order amount" },
        { name: "status", type: "enum", values: ["Pending", "Preparing", "Ready", "Completed", "Cancelled"], description: "Current order status" },
        { name: "paymentMethod", type: "enum", values: ["Card", "Cash", "Mobile", "Gift Card"], description: "Payment method used" }
      ]
    },
    {
      id: "product",
      name: "Product",
      description: "A coffee product or item available for sale",
      icon: "☕",
      color: "#5C2D91", // Microsoft Purple
      properties: [
        { name: "productId", type: "string", isIdentifier: true, description: "Unique product identifier" },
        { name: "name", type: "string", description: "Product name" },
        { name: "category", type: "enum", values: ["Espresso", "Brewed", "Cold Brew", "Tea", "Food", "Merchandise"], description: "Product category" },
        { name: "price", type: "decimal", unit: "USD", description: "Unit price" },
        { name: "origin", type: "string", description: "Coffee bean origin country" },
        { name: "isOrganic", type: "boolean", description: "Whether the product is certified organic" }
      ]
    },
    {
      id: "store",
      name: "Store",
      description: "A physical coffee shop location",
      icon: "🏪",
      color: "#FFB900", // Microsoft Yellow/Gold
      properties: [
        { name: "storeId", type: "string", isIdentifier: true, description: "Unique store identifier" },
        { name: "name", type: "string", description: "Store name" },
        { name: "city", type: "string", description: "City location" },
        { name: "state", type: "string", description: "State/Province" },
        { name: "openDate", type: "date", description: "Store opening date" },
        { name: "capacity", type: "integer", description: "Seating capacity" }
      ]
    },
    {
      id: "supplier",
      name: "Supplier",
      description: "A coffee bean or goods supplier partner",
      icon: "🚚",
      color: "#D83B01", // Microsoft Orange
      properties: [
        { name: "supplierId", type: "string", isIdentifier: true, description: "Unique supplier identifier" },
        { name: "name", type: "string", description: "Supplier company name" },
        { name: "country", type: "string", description: "Country of operation" },
        { name: "certification", type: "enum", values: ["Fair Trade", "Rainforest Alliance", "Organic", "Direct Trade", "None"], description: "Sustainability certification" },
        { name: "rating", type: "decimal", description: "Quality rating (1-5)" }
      ]
    },
    {
      id: "shipment",
      name: "Shipment",
      description: "A delivery of goods from supplier to store",
      icon: "📦",
      color: "#00A9E0", // Light Blue
      properties: [
        { name: "shipmentId", type: "string", isIdentifier: true, description: "Unique shipment identifier" },
        { name: "dispatchDate", type: "date", description: "Date shipped from supplier" },
        { name: "arrivalDate", type: "date", description: "Date arrived at store" },
        { name: "status", type: "enum", values: ["In Transit", "Delivered", "Delayed"], description: "Shipment status" },
        { name: "weight", type: "decimal", unit: "kg", description: "Total shipment weight" }
      ]
    }
  ],
  relationships: [
    {
      id: "customer_places_order",
      name: "places",
      from: "customer",
      to: "order",
      cardinality: "one-to-many",
      description: "A customer places one or more orders"
    },
    {
      id: "order_contains_product",
      name: "contains",
      from: "order",
      to: "product",
      cardinality: "many-to-many",
      description: "An order contains one or more products",
      attributes: [
        { name: "quantity", type: "integer" },
        { name: "customizations", type: "string" }
      ]
    },
    {
      id: "order_processed_at_store",
      name: "processedAt",
      from: "order",
      to: "store",
      cardinality: "many-to-one",
      description: "An order is processed at a specific store"
    },
    {
      id: "product_sourced_from_supplier",
      name: "sourcedFrom",
      from: "product",
      to: "supplier",
      cardinality: "many-to-one",
      description: "A product's ingredients are sourced from a supplier"
    },
    {
      id: "shipment_from_supplier",
      name: "sentBy",
      from: "shipment",
      to: "supplier",
      cardinality: "many-to-one",
      description: "A shipment is sent by a supplier"
    },
    {
      id: "shipment_to_store",
      name: "deliveredTo",
      from: "shipment",
      to: "store",
      cardinality: "many-to-one",
      description: "A shipment is delivered to a store"
    },
    {
      id: "shipment_contains_product",
      name: "carries",
      from: "shipment",
      to: "product",
      cardinality: "many-to-many",
      description: "A shipment carries products",
      attributes: [
        { name: "quantity", type: "integer" }
      ]
    }
  ]
};

// Sample entity instances for demonstration
export const sampleInstances: EntityInstance[] = [
  // Customers
  { id: "cust-001", entityTypeId: "customer", values: { customerId: "CUST-001", name: "Arif Ramadhan", email: "customer001@example.com", loyaltyTier: "Gold", joinDate: "2024-03-15", totalSpend: 1245.50 }},
  { id: "cust-002", entityTypeId: "customer", values: { customerId: "CUST-002", name: "Jaroslav Cerny", email: "customer002@example.com", loyaltyTier: "Platinum", joinDate: "2023-01-20", totalSpend: 3420.00 }},
  { id: "cust-003", entityTypeId: "customer", values: { customerId: "CUST-003", name: "Sumber Agvaan", email: "customer003@example.com", loyaltyTier: "Bronze", joinDate: "2025-11-01", totalSpend: 89.00 }},
  
  // Products
  { id: "prod-001", entityTypeId: "product", values: { productId: "PROD-001", name: "Ethiopian Single Origin", category: "Brewed", price: 4.50, origin: "Ethiopia", isOrganic: true }},
  { id: "prod-002", entityTypeId: "product", values: { productId: "PROD-002", name: "Colombian Latte", category: "Espresso", price: 5.75, origin: "Colombia", isOrganic: false }},
  { id: "prod-003", entityTypeId: "product", values: { productId: "PROD-003", name: "Nebula Cold Brew", category: "Cold Brew", price: 5.25, origin: "Guatemala", isOrganic: true }},
  
  // Stores
  { id: "store-001", entityTypeId: "store", values: { storeId: "STORE-001", name: "Fourth Coffee - Downtown Seattle", city: "Seattle", state: "WA", openDate: "2022-06-15", capacity: 45 }},
  { id: "store-002", entityTypeId: "store", values: { storeId: "STORE-002", name: "Fourth Coffee - Capitol Hill", city: "Seattle", state: "WA", openDate: "2023-02-28", capacity: 32 }},
  
  // Suppliers
  { id: "supp-001", entityTypeId: "supplier", values: { supplierId: "SUPP-001", name: "Ethiopia Highlands Farm", country: "Ethiopia", certification: "Fair Trade", rating: 4.8 }},
  { id: "supp-002", entityTypeId: "supplier", values: { supplierId: "SUPP-002", name: "Colombian Mountain Roasters", country: "Colombia", certification: "Rainforest Alliance", rating: 4.6 }},
  
  // Orders
  { id: "order-001", entityTypeId: "order", values: { orderId: "ORD-2025-001", timestamp: "2025-01-28T09:15:00", total: 12.50, status: "Completed", paymentMethod: "Mobile" }},
  { id: "order-002", entityTypeId: "order", values: { orderId: "ORD-2025-002", timestamp: "2025-01-28T10:30:00", total: 8.75, status: "Preparing", paymentMethod: "Card" }},
  
  // Shipments
  { id: "ship-001", entityTypeId: "shipment", values: { shipmentId: "SHIP-001", dispatchDate: "2025-01-20", arrivalDate: "2025-01-27", status: "Delivered", weight: 250.5 }},
];

// Sample data bindings showing connection to a data lakehouse platform
export const sampleBindings: DataBinding[] = [
  {
    entityTypeId: "customer",
    source: "Data Lakehouse",
    table: "lakehouse.bronze.customers",
    columnMappings: {
      customerId: "customer_id",
      name: "full_name",
      email: "email_address",
      loyaltyTier: "loyalty_status",
      joinDate: "registration_date",
      totalSpend: "lifetime_value"
    }
  },
  {
    entityTypeId: "order",
    source: "Data Lakehouse",
    table: "lakehouse.silver.orders",
    columnMappings: {
      orderId: "order_id",
      timestamp: "order_timestamp",
      total: "order_total",
      status: "order_status",
      paymentMethod: "payment_type"
    }
  },
  {
    entityTypeId: "product",
    source: "Semantic model",
    table: "semantic_model.Products",
    columnMappings: {
      productId: "ProductKey",
      name: "ProductName",
      category: "ProductCategory",
      price: "UnitPrice",
      origin: "OriginCountry"
    }
  }
];

export const quests: Quest[] = [
  {
    id: "quest-1",
    title: "Meet the Entities",
    description: "Discover the core building blocks of the Fourth Coffee ontology by exploring entity types.",
    difficulty: "beginner",
    category: "exploration",
    steps: [
      {
        id: "step-1-1",
        instruction: "Click on the Customer entity to learn about customers",
        targetType: "entity",
        targetId: "customer",
        hint: "Look for the 👤 icon in the graph"
      },
      {
        id: "step-1-2",
        instruction: "Now explore the Product entity",
        targetType: "entity",
        targetId: "product",
        hint: "Find the ☕ coffee cup icon"
      },
      {
        id: "step-1-3",
        instruction: "Finally, check out the Store entity",
        targetType: "entity",
        targetId: "store",
        hint: "Locate the 🏪 store icon"
      }
    ],
    reward: {
      badge: "Entity Explorer",
      badgeIcon: "🎖️",
      points: 100
    }
  },
  {
    id: "quest-2",
    title: "The Bean Trail",
    description: "Trace the journey of a coffee bean from supplier to customer by following relationships.",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-2-1",
        instruction: "Start at the Supplier entity - this is where beans originate",
        targetType: "entity",
        targetId: "supplier",
        hint: "Find the 🚚 truck icon"
      },
      {
        id: "step-2-2",
        instruction: "Follow the 'sourcedFrom' relationship to Product",
        targetType: "relationship",
        targetId: "product_sourced_from_supplier",
        hint: "Click the line connecting Supplier to Product"
      },
      {
        id: "step-2-3",
        instruction: "Explore the 'contains' relationship to see how products appear in orders",
        targetType: "relationship",
        targetId: "order_contains_product",
        hint: "Look at the connection between Order and Product"
      },
      {
        id: "step-2-4",
        instruction: "Finally, see the 'places' relationship showing who placed the order",
        targetType: "relationship",
        targetId: "customer_places_order",
        hint: "Find the relationship from Customer to Order"
      }
    ],
    reward: {
      badge: "Bean Detective",
      badgeIcon: "🔍",
      points: 250
    }
  },
  {
    id: "quest-3",
    title: "Supply Chain Navigator",
    description: "Understand how shipments connect suppliers to stores.",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-3-1",
        instruction: "Click on the Shipment entity",
        targetType: "entity",
        targetId: "shipment",
        hint: "Find the 📦 package icon"
      },
      {
        id: "step-3-2",
        instruction: "Explore the 'sentBy' relationship to Supplier",
        targetType: "relationship",
        targetId: "shipment_from_supplier",
        hint: "See where shipments come from"
      },
      {
        id: "step-3-3",
        instruction: "Follow the 'deliveredTo' relationship to Store",
        targetType: "relationship",
        targetId: "shipment_to_store",
        hint: "See where shipments go"
      }
    ],
    reward: {
      badge: "Supply Chain Master",
      badgeIcon: "🌐",
      points: 200
    }
  },
  {
    id: "quest-4",
    title: "Query Explorer",
    description: "Learn to ask questions using natural language queries.",
    difficulty: "advanced",
    category: "query",
    steps: [
      {
        id: "step-4-1",
        instruction: "Try asking: 'Show me all Gold tier customers'",
        targetType: "query",
        hint: "Type in the query playground"
      },
      {
        id: "step-4-2",
        instruction: "Now ask: 'Which products come from Ethiopia?'",
        targetType: "query",
        hint: "Use natural language to filter by origin"
      },
      {
        id: "step-4-3",
        instruction: "Try a traversal query: 'What orders did Arif Ramadhan place?'",
        targetType: "query",
        hint: "This follows the Customer → Order relationship"
      }
    ],
    reward: {
      badge: "Query Wizard",
      badgeIcon: "🧙",
      points: 300
    }
  },
  {
    id: "quest-5",
    title: "Data Binding Discovery",
    description: "Learn how ontology concepts connect to real data platform sources.",
    difficulty: "advanced",
    category: "exploration",
    steps: [
      {
        id: "step-5-1",
        instruction: "Select the Customer entity and view its data bindings",
        targetType: "entity",
        targetId: "customer",
        hint: "Look for the 'Data Bindings' section in the inspector"
      },
      {
        id: "step-5-2",
        instruction: "Examine how Customer properties map to source columns",
        targetType: "property",
        targetId: "name",
        hint: "Notice how 'name' maps to 'full_name' in the source"
      },
      {
        id: "step-5-3",
        instruction: "Check the Product entity's binding and note the source and table",
        targetType: "entity",
        targetId: "product",
        hint: "Look at the Data Bindings card under Product"
      }
    ],
    reward: {
      badge: "Binding Expert",
      badgeIcon: "🔗",
      points: 350
    }
  }
];

// Pre-defined NL query responses for demo
export interface QueryResponse {
  query: string;
  matches: string[];
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
}

export const nlQueryResponses: QueryResponse[] = [
  {
    query: "show me all gold tier customers",
    matches: ["gold tier", "gold customers", "customers gold"],
    result: "Found 1 Gold tier customer:\n• Arif Ramadhan (CUST-001) - Gold tier since 2024",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "which products come from ethiopia",
    matches: ["products ethiopia", "ethiopian", "from ethiopia"],
    result: "Found 1 product from Ethiopia:\n• Ethiopian Single Origin (☕ Brewed) - $4.50\n  Sourced from: Ethiopia Highlands Farm",
    highlightEntities: ["product", "supplier"],
    highlightRelationships: ["product_sourced_from_supplier"]
  },
  {
    query: "what orders did arif ramadhan place",
    matches: ["orders arif", "arif ramadhan orders", "arif placed"],
    result: "Arif Ramadhan's orders:\n• ORD-2025-001 - $12.50 (Completed)\n  Items: Ethiopian Single Origin x2, Colombian Latte x1\n  Store: Downtown Seattle",
    highlightEntities: ["customer", "order", "store"],
    highlightRelationships: ["customer_places_order", "order_processed_at_store"]
  },
  {
    query: "how many stores are in seattle",
    matches: ["stores seattle", "seattle stores", "how many stores"],
    result: "Found 2 stores in Seattle:\n• Fourth Coffee - Downtown Seattle (45 seats)\n• Fourth Coffee - Capitol Hill (32 seats)",
    highlightEntities: ["store"],
    highlightRelationships: []
  },
  {
    query: "show supply chain for colombian latte",
    matches: ["supply chain", "colombian latte", "where does colombian latte come from"],
    result: "Supply chain for Colombian Latte:\n• Bean Origin: Colombia 🇨🇴\n• Supplier: Colombian Mountain Roasters\n• Certification: Rainforest Alliance 🌿\n• Latest Shipment: SHIP-001 (Delivered Jan 27)",
    highlightEntities: ["product", "supplier", "shipment"],
    highlightRelationships: ["product_sourced_from_supplier", "shipment_from_supplier"]
  },
  {
    query: "what is an entity type",
    matches: ["what is entity", "entity type", "define entity"],
    result: "An Entity Type is a reusable logical model of a real-world concept (like Customer, Product, or Order). It standardizes the name, description, identifiers, and properties so every team means the same thing when using a term.",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "what is a relationship",
    matches: ["what is relationship", "define relationship", "relationships"],
    result: "A Relationship is a typed, directional link between entity types. For example, 'Customer places Order' defines how customers connect to their orders. Relationships can have attributes like quantity or confidence.",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "show me platinum customers",
    matches: ["platinum", "platinum customers", "customers platinum"],
    result: "Found 1 Platinum tier customer:\n• Jaroslav Cerny (CUST-002) - Platinum tier\n  Total spend: $3,420.00\n  Member since: Jan 2023",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "list all organic products",
    matches: ["organic", "organic products", "is organic"],
    result: "Found 2 organic products:\n• Ethiopian Single Origin (Brewed) - $4.50 🌱\n• Nebula Cold Brew (Cold Brew) - $5.25 🌱",
    highlightEntities: ["product"],
    highlightRelationships: []
  }
];
