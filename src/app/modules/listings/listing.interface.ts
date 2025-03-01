export type IListing = {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  images: string[];
  userID: string;
  status: 'available' | 'sold';
};
