import { create } from 'zustand';

export interface Reservation {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'handoff' | 'released';
  amount: number;
  platformFee: number;
  total: number;
  meetupTime: string;
  meetupPlace: string;
  createdAt: string;
}

interface ReservationStore {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  getReservation: (id: string) => Reservation | undefined;
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
  reservations: [
    {
      id: 'res_1',
      listingId: '1',
      buyerId: 'buyer_1',
      sellerId: 'seller_1',
      status: 'pending',
      amount: 4500, // $45.00 in cents
      platformFee: 250, // $2.50 in cents
      total: 4750, // $47.50 in cents
      meetupTime: 'Today 2:00 PM',
      meetupPlace: 'Library Entrance',
      createdAt: new Date().toISOString(),
    },
  ],

  addReservation: (reservation) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `res_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      reservations: [...state.reservations, newReservation],
    }));
  },

  updateReservationStatus: (id, status) => {
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      ),
    }));
  },

  getReservation: (id) => {
    return get().reservations.find((reservation) => reservation.id === id);
  },
}));
