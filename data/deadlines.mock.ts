export interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  category: 'academic' | 'financial' | 'event';
  priority: 'high' | 'medium' | 'low';
  location?: string;
  link?: string;
  isRecurring?: boolean;
}

export const MOCK_DEADLINES: Deadline[] = [
  // Academic Deadlines
  {
    id: '1',
    title: 'Spring 2024 Registration Opens',
    description: 'Priority registration for continuing students',
    dueDate: '2024-11-15T08:00:00Z',
    category: 'academic',
    priority: 'high',
    location: 'Online Portal',
    link: 'https://student.jjay.cuny.edu/registration',
  },
  {
    id: '2',
    title: 'Drop/Add Period Ends',
    description: 'Last day to drop or add classes without penalty',
    dueDate: '2024-09-15T23:59:00Z',
    category: 'academic',
    priority: 'high',
    location: 'Registrar Office',
  },
  {
    id: '3',
    title: 'Midterm Exams Begin',
    description: 'First day of midterm examination period',
    dueDate: '2024-10-21T09:00:00Z',
    category: 'academic',
    priority: 'medium',
    location: 'Various Classrooms',
  },
  {
    id: '4',
    title: 'Final Exam Schedule Released',
    description: 'Final exam schedule will be posted online',
    dueDate: '2024-11-01T12:00:00Z',
    category: 'academic',
    priority: 'medium',
    location: 'Student Portal',
  },
  {
    id: '5',
    title: 'Final Exams Begin',
    description: 'First day of final examination period',
    dueDate: '2024-12-16T09:00:00Z',
    category: 'academic',
    priority: 'high',
    location: 'Various Classrooms',
  },

  // Financial Deadlines
  {
    id: '6',
    title: 'Fall 2024 Tuition Payment Due',
    description: 'Full payment or approved payment plan required',
    dueDate: '2024-08-15T17:00:00Z',
    category: 'financial',
    priority: 'high',
    location: 'Bursar Office',
    link: 'https://student.jjay.cuny.edu/payment',
  },
  {
    id: '7',
    title: 'FAFSA Application Deadline',
    description: 'Federal student aid application deadline',
    dueDate: '2024-06-30T23:59:00Z',
    category: 'financial',
    priority: 'high',
    location: 'Online - fafsa.gov',
    link: 'https://fafsa.gov',
  },
  {
    id: '8',
    title: 'Scholarship Application Deadline',
    description: 'JJAY Foundation scholarship applications due',
    dueDate: '2024-03-15T17:00:00Z',
    category: 'financial',
    priority: 'medium',
    location: 'Financial Aid Office',
  },
  {
    id: '9',
    title: 'Book Voucher Distribution',
    description: 'Financial aid book vouchers available',
    dueDate: '2024-08-20T09:00:00Z',
    category: 'financial',
    priority: 'low',
    location: 'Bookstore',
  },

  // Events
  {
    id: '10',
    title: 'Career Fair 2024',
    description: 'Annual career fair with employers and graduate schools',
    dueDate: '2024-10-15T10:00:00Z',
    category: 'event',
    priority: 'medium',
    location: 'Gymnasium',
  },
  {
    id: '11',
    title: 'Study Abroad Application Deadline',
    description: 'Applications for spring semester study abroad programs',
    dueDate: '2024-09-30T17:00:00Z',
    category: 'event',
    priority: 'medium',
    location: 'International Programs Office',
  },
  {
    id: '12',
    title: 'Student Government Elections',
    description: 'Voting for student government representatives',
    dueDate: '2024-04-10T09:00:00Z',
    category: 'event',
    priority: 'low',
    location: 'Student Center',
  },
  {
    id: '13',
    title: 'Graduation Application Deadline',
    description: 'Application to graduate in May 2024',
    dueDate: '2024-02-15T17:00:00Z',
    category: 'event',
    priority: 'high',
    location: 'Registrar Office',
  },
];

export const getDeadlinesByCategory = (category: string) => {
  if (category === 'all') return MOCK_DEADLINES;
  return MOCK_DEADLINES.filter((deadline) => deadline.category === category);
};

export const getUpcomingDeadlines = (days: number = 30) => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return MOCK_DEADLINES.filter((deadline) => {
    const deadlineDate = new Date(deadline.dueDate);
    return deadlineDate >= now && deadlineDate <= futureDate;
  });
};

export const getUrgentDeadlines = () => {
  const now = new Date();
  const urgentDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  return MOCK_DEADLINES.filter((deadline) => {
    const deadlineDate = new Date(deadline.dueDate);
    return deadlineDate >= now && deadlineDate <= urgentDate;
  });
};
