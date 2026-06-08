export type CEFRLevel = 'Random' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type VocabWord = {
   id: string;
   en: string;
   vi: string[];
   category: string;
   level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

   synonyms?: string[];
   cefrScore?: number;
   example?: string;
};

export type Category = 'All Topics' | 'IT' | 'Business' | 'Healthcare' | 'Daily Life';

export const ALL_CATEGORIES: Category[] = ['All Topics', 'IT', 'Business', 'Healthcare', 'Daily Life'];
