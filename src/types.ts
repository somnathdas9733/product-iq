export interface ProductInput {
  productName: string;
  category: string;
  material: string;
  specifications: string;
  applications: string;
  additionalInfo: string;
}

export interface SpecificationEntry {
  name: string;
  value: string;
}

export interface ScoreItem {
  field: string;
  present: boolean;
  impact: string;
}

export interface ProductValidation {
  status: 'READY' | 'NEEDS REVIEW';
  statusReason: string;
  completeInformation: string[];
  missingInformation: string[];
  potentialIssues: string[];
  completenessPercentage: number;
  scoreBreakdown: ScoreItem[];
}

export interface TraceabilityData {
  sourceProvided: {
    productName: string;
    category: string;
    material: string;
    specifications: string;
    applications: string;
    additionalInfo?: string;
  };
  aiEnriched: {
    shortDescription: string;
    features: string[];
    seoKeywords: string[];
    missingFieldsIdentified: string[];
  };
}

export interface ProductIntelligence {
  productName: string;
  category: string;
  shortDescription: string;
  features: string[];
  applications: string[];
  specifications: SpecificationEntry[] | string[];
  seoKeywords: string[];
  missingInformation: string[];
  completenessScore: number;
  validation: ProductValidation;
  traceability: TraceabilityData;
  generatedAt?: string;
}

export interface SamplePreset {
  id: string;
  label: string;
  badge: string;
  description: string;
  data: ProductInput;
}
