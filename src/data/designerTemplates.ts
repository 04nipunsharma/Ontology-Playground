/**
 * Starter templates for the Ontology Designer: each Komatsu Australia module
 * can be opened as an editable starting point.
 */
import type { Ontology } from './ontology';
import { komatsuModuleOntology, komatsuModules } from './komatsu';

export interface DesignerTemplate {
  id: string;
  label: string;
  description: string;
  icon: string;
  ontology: Ontology;
}

export const designerTemplates: DesignerTemplate[] = komatsuModules.map((m) => ({
  id: m.slug,
  label: m.title.replace(/^\d+\s+/, ''),
  description: m.description,
  icon: m.icon,
  ontology: komatsuModuleOntology(m),
}));
