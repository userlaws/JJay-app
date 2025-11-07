export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  isLive?: boolean;
}

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Spring Career Fair',
    start: '10:00 AM',
    end: '3:00 PM',
    location: 'Student Center',
    description: 'Meet with top employers and explore career opportunities',
    isLive: true,
  },
  {
    id: 'e2',
    title: 'Student Government Meeting',
    start: '2:00 PM',
    end: '3:00 PM',
    location: 'Conference Room A',
    description: 'Monthly student government meeting',
    isLive: false,
  },
  {
    id: 'e3',
    title: 'Library Study Session',
    start: '6:00 PM',
    end: '7:30 PM',
    location: 'Main Library',
    description: 'Group study session for finals preparation',
    isLive: false,
  },
  {
    id: 'e4',
    title: 'Campus Tour',
    start: '11:00 AM',
    end: '12:00 PM',
    location: 'Main Entrance',
    description: 'Guided tour for prospective students',
    isLive: false,
  },
];

export function getUpcomingEvents(limit: number = 3): Event[] {
  return events.slice(0, limit);
}

export function getLiveEvents(): Event[] {
  return events.filter((event) => event.isLive);
}
