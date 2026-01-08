export interface NewsArticle {
  id: string;
  companyId: string;
  title: string;
  snippet: string;
  source: string;
  url: string;
  publishedDate: string;
  category: 'funding' | 'partnership' | 'product' | 'team' | 'press' | 'general';
}

export const companyNews: NewsArticle[] = [];

export function getNewsByCompanyId(companyId: string): NewsArticle[] {
  return companyNews.filter(news => news.companyId === companyId);
}
