// utils/statusUtils.ts
export function translateStatus(status: string): string {
    switch (status) {
      case 'PEN':
        return 'Pendiente';
      case 'REV':
        return 'En revisión';
      case 'RES':
        return 'Resuelto';
      default:
        return status;
    }
  }
  