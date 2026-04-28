// Portfolio Item Interface
export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  s3Key: string;
  link: string;
  order: number;
  isActive: boolean;
}

// Portfolio Data Structure for DynamoDB
export interface PortfolioData {
  PK: string;
  SK: string;
  type: string;
  items: PortfolioItem[];
  updatedAt: string;
}
