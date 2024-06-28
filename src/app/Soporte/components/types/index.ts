export interface Comment {
    user: string;
    message: string;
    date: string;
  }
  
  export interface Evidence {
    id: number;
    name: string;
    url: string;
  }
  
  export interface Ticket {
    id: number;
    description: string;
    status: 'En revisión' | 'Resuelto' | 'Pendiente';
    lastUpdate: string;
    creationDate: string;
    comments: Comment[];
    evidences: Evidence[];
  }
  