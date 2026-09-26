// Core ontology types shared by the app, RDF tooling and the Fabric exporter.

export interface Property {
  name: string;
  type: 'string' | 'integer' | 'decimal' | 'double' | 'date' | 'datetime' | 'boolean' | 'enum';
  isIdentifier?: boolean;
  unit?: string;
  values?: string[];
  description?: string;
}

export interface RelationshipAttribute {
  name: string;
  type: string;
}

export interface Relationship {
  id: string;
  name: string;
  from: string;
  to: string;
  cardinality: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  description?: string;
  attributes?: RelationshipAttribute[];
}

export interface EntityType {
  id: string;
  name: string;
  description: string;
  properties: Property[];
  icon: string;
  color: string;
}

export interface EntityInstance {
  id: string;
  entityTypeId: string;
  values: Record<string, unknown>;
}

export interface Ontology {
  name: string;
  description: string;
  entityTypes: EntityType[];
  relationships: Relationship[];
}

export interface DataBinding {
  entityTypeId: string;
  source: string;
  table: string;
  columnMappings: Record<string, string>;
}
