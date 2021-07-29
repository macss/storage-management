interface Compartment {
  created_at: number;
  deposit_id: string;
  histories?: {
    [key: string]: boolean;
  };
  id: string;
  items?: {
    [key: string]: number;
  };
  location: string;
}

export default Compartment;
