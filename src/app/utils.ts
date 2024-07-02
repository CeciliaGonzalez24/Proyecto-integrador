export type ReservationFormValues = {
    id_user: string;
    id_service: string;
    date: string;
    start_time: string;
    id_review: string;
  };
  
  export type ResevationFormErrors = {
    id_user?: string;
    id_service?: string;
    date?: string;
    start_time?: string;
    id_review?: string;
  };