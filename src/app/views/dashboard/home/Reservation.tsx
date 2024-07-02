import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  MenuItem,
} from '@mui/material';

const Container = styled.div`
  padding: 16px;
`;

const Header = styled.header`
  background-color: #282c34;
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

const Reservation: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceType = queryParams.get('serviceType') || '';

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ date: string; time: string } | null>(null);
  const [name, setName] = useState('');
  const [service, setService] = useState(serviceType);
  const services = ['Peluquería', 'Barbería']; // Aquí se añaden las opciones de categorías de servicios

  const handleDateClick = (arg: any) => {
    setSelectedDate({
      date: arg.dateStr,
      time: arg.date.getHours() + ':' + arg.date.getMinutes(),
    });
    setOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    alert(`Evento: ${clickInfo.event.title}`);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setService(serviceType);
  };

  const handleSave = () => {
    console.log('Reserva guardada:', { name, service, selectedDate });
    handleClose();
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
          eventClick={handleEventClick}
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
            select
            margin="dense"
            label="Categoría de Servicio"
            fullWidth
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {services.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
