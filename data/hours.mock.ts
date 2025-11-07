export interface VenueHours {
  id: string;
  name: string;
  open: string;
  close: string;
  isOpen: boolean;
  nextOpen?: string;
  description?: string;
}

export const venueHours: VenueHours[] = [
  {
    id: 'h1',
    name: 'Library',
    open: '8:00 AM',
    close: '10:00 PM',
    isOpen: true,
    description: 'Main campus library with study spaces',
  },
  {
    id: 'h2',
    name: 'Cafeteria',
    open: '7:00 AM',
    close: '8:00 PM',
    isOpen: true,
    description: 'Student dining hall',
  },
  {
    id: 'h3',
    name: 'Gym',
    open: '6:00 AM',
    close: '11:00 PM',
    isOpen: true,
    description: 'Fitness center and recreational facilities',
  },
  {
    id: 'h4',
    name: 'Bookstore',
    open: '9:00 AM',
    close: '5:00 PM',
    isOpen: false,
    nextOpen: 'Tomorrow 9:00 AM',
    description: 'Campus bookstore and supplies',
  },
  {
    id: 'h5',
    name: 'Student Services',
    open: '8:30 AM',
    close: '4:30 PM',
    isOpen: false,
    nextOpen: 'Tomorrow 8:30 AM',
    description: 'Academic and administrative services',
  },
];

export function getOpenVenues(): VenueHours[] {
  return venueHours.filter((venue) => venue.isOpen);
}

export function getClosedVenues(): VenueHours[] {
  return venueHours.filter((venue) => !venue.isOpen);
}

export function getVenueById(id: string): VenueHours | undefined {
  return venueHours.find((venue) => venue.id === id);
}
