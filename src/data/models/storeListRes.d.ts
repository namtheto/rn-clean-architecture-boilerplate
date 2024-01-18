export interface ICoffeeShop {
  id: number;
  pos_id: number;
  name: string;
  street: string;
  street2: string | null;
  country: string;
  phone: string;
  latitude: number;
  longitude: number;
  image_1: string;
  image_2: string;
  image_3: string;
  state_name: string;
  district_name: string;
  external_name: string;
  address: {
    street: string;
    ward: string | null;
    district: string;
    state: string;
    country: string;
    full_address: string;
  };
  opening_time: string;
  closing_time: string;
  images: string[];
}
