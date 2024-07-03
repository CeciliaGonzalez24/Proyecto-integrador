import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.header`
  background-color: #007bff;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const CalendarContainer = styled.div`
  margin: 0 auto;
  max-width: none; 
`;

interface ReservationProps {
  serviceType: string;
  userName: string;
}

const Reservation: React.FC<ReservationProps> = ({ serviceType, userName }) => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ date: string; time: string } | null>(null);
  const [name, setName] = useState(userName);
  const service = serviceType;
  const services = [serviceType]; // Solo una opción que es el tipo de servicio contratado

  const handleDateClick = (arg: any) => {
    setSelectedDate({
      date: arg.dateStr,
      time: `${arg.date.getHours()}:${arg.date.getMinutes()}`,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName(userName);
  };

  const handleSave = () => {
    if (selectedDate) {
      // Aquí puedes agregar lógica para guardar la reserva
      console.log('Reserva guardada:', { selectedDate });
      // Por ejemplo, podrías redirigir al usuario a una página de confirmación
      history.push('/reservationConfirmation'); // Ajusta la ruta según tu estructura de rutas
      handleClose();
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <Container>
      <Header>
        <h1>Reserva de Servicios</h1>
      </Header>
      <CalendarContainer>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          dateClick={handleDateClick}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          slotDuration="01:00:00"
          hiddenDays={[0, 6]}
          contentHeight="auto"
          allDaySlot={false}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          }}
          eventContent={renderEventContent}
          eventBackgroundColor="#1976d2"
          eventBorderColor="#1976d2"
          eventTextColor="#ffffff"
        />
      </CalendarContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reserva de Servicio</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Fecha y Hora"
            type="text"
            fullWidth
            value={selectedDate ? `${selectedDate.date} ${selectedDate.time}` : ''}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const renderEventContent = (eventInfo: any) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
};

export default Reservation;
