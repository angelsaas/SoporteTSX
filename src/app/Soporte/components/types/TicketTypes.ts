export interface Evidence {
  _id: string;
  url?: string;
  descripcion?: string;
  fecha: string;
}

export interface Estado {
  idusuario: string;
  estado: string;
  mensaje: string;
  fecha: string;
  _id: string;
}

export interface Historial {
  idusuario: string;
  movimiento: string;
  mensaje: string;
  fecha: string;
  _id: string;
}

export interface Comment {
  idusuario: string;
  mensaje: string;
  fecha: string;
  _id: string;
}

export interface Ticket {
  _id: string;
  descripcion: string;
  evidencia: Evidence[];
  estado?: Estado;
  historial: Historial[];
  comentarios?: Comment[];
}
