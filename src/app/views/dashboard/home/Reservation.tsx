import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { DateSelectArg, EventApi, EventInput } from '@fullcalendar/core';

export function Reservation() {
    const [events, setEvents] = useState<EventInput[]>([]);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection

        const title = prompt('Ingrese el título de la reserva:');
        if (title) {
            const newEvent = {
                id: String(events.length + 1),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (clickInfo: { event: EventApi }) => {
        if (window.confirm(`¿Está seguro de que desea eliminar la reserva '${clickInfo.event.title}'?`)) {
            clickInfo.event.remove();
            setEvents(events.filter(event => event.id !== clickInfo.event.id));
        }
    };



    return (
        <div className="calendar-container">
            <h1>Reservas</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                selectable={true}
                select={handleDateSelect}
                events={events}
                eventClick={handleEventClick}
                slotMinTime="09:00:00"
                slotMaxTime="17:00:00"
                allDaySlot={false}
                height="auto"
                contentHeight="auto"
                expandRows={true}
                locale={esLocale}
                slotDuration="01:00:00"
                weekends={false}
                dayHeaderFormat={{ weekday: 'short' }}
                eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: 'short' }}
                windowResizeDelay={10}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }}
            />
        </div>
    );
}
