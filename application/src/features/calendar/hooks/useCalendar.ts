'use client';

import {
   useState, useEffect, useMemo
} from 'react';
import {
   CalendarEvent,
   CalendarFilter,
   loadEventsFromStorage,
   saveEventsToStorage,
   getEventsForDate,
   getEventsForWeek,
   getEventsForMonth,
   filterEvents,
   getDoctorEvents,
   initializeCalendarStorage
} from '@/data/mockData/calendarData';

export type CalendarView = 'month' | 'week' | 'day';

interface UseCalendarProps {
   initialView?: CalendarView;
   doctorId?: string;
}

export function useCalendar ({
   initialView = 'month', doctorId
}: UseCalendarProps = {
}) {
   const [currentDate, setCurrentDate] = useState(new Date());
   const [view, setView] = useState<CalendarView>(initialView);
   const [events, setEvents] = useState<CalendarEvent[]>([]);
   const [filters, setFilters] = useState<Partial<CalendarFilter>>({
      types: [],
      statuses: [],
      priorities: [],
      doctors: [],
      rooms: []
   });
   const [isLoading, setIsLoading] = useState(true);

   // Initialize calendar data
   useEffect(() => {
      initializeCalendarStorage();
      const storedEvents = loadEventsFromStorage();
      setEvents(storedEvents);
      setIsLoading(false);
   }, []);

   // Get filtered events based on doctor and filters
   const filteredEvents = useMemo(() => {
      let eventList = events;

      // Filter by doctor if specified
      if (doctorId) {
         eventList = getDoctorEvents(doctorId, eventList);
      }

      // Apply additional filters
      return filterEvents(eventList, filters);
   }, [events, doctorId, filters]);

   // Get events for current view
   const viewEvents = useMemo(() => {
      switch (view) {
         case 'day':
            return getEventsForDate(currentDate, filteredEvents);
         case 'week':
            const weekStart = new Date(currentDate);
            weekStart.setDate(currentDate.getDate() - currentDate.getDay());
            return getEventsForWeek(weekStart, filteredEvents);
         case 'month':
            return getEventsForMonth(currentDate.getFullYear(), currentDate.getMonth(), filteredEvents);
         default:
            return filteredEvents;
      }
   }, [view, currentDate, filteredEvents]);

   // Navigation functions
   const goToToday = () => {
      setCurrentDate(new Date());
   };

   const goToPrevious = () => {
      const newDate = new Date(currentDate);
      switch (view) {
         case 'day':
            newDate.setDate(currentDate.getDate() - 1);
            break;
         case 'week':
            newDate.setDate(currentDate.getDate() - 7);
            break;
         case 'month':
            newDate.setMonth(currentDate.getMonth() - 1);
            break;
      }
      setCurrentDate(newDate);
   };

   const goToNext = () => {
      const newDate = new Date(currentDate);
      switch (view) {
         case 'day':
            newDate.setDate(currentDate.getDate() + 1);
            break;
         case 'week':
            newDate.setDate(currentDate.getDate() + 7);
            break;
         case 'month':
            newDate.setMonth(currentDate.getMonth() + 1);
            break;
      }
      setCurrentDate(newDate);
   };

   const goToDate = (date: Date) => {
      setCurrentDate(new Date(date));
   };

   // Event management functions
   const addEvent = (event: CalendarEvent) => {
      const updatedEvents = [...events, event];
      setEvents(updatedEvents);
      saveEventsToStorage(updatedEvents);
   };

   const updateEvent = (eventId: string, updatedEvent: Partial<CalendarEvent>) => {
      const updatedEvents = events.map(event =>
         event.id === eventId
            ? {
               ...event,
               ...updatedEvent,
               updatedAt: new Date()
                  .toISOString()
            }
            : event
      );
      setEvents(updatedEvents);
      saveEventsToStorage(updatedEvents);
   };

   const deleteEvent = (eventId: string) => {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      saveEventsToStorage(updatedEvents);
   };

   // Filter management
   const updateFilters = (newFilters: Partial<CalendarFilter>) => {
      setFilters(prev => ({
         ...prev,
         ...newFilters
      }));
   };

   const clearFilters = () => {
      setFilters({
         types: [],
         statuses: [],
         priorities: [],
         doctors: [],
         rooms: []
      });
   };

   // Utility functions
   const getEventById = (eventId: string) => {
      return events.find(event => event.id === eventId);
   };

   const getEventsForSpecificDate = (date: Date) => {
      return getEventsForDate(date, filteredEvents);
   };

   // Get unique values for filter options
   const getFilterOptions = () => {
      const types = [...new Set(events.map(e => e.type))];
      const statuses = [...new Set(events.map(e => e.status))];
      const priorities = [...new Set(events.map(e => e.priority))];
      const doctors = [...new Set(events.map(e => e.doctorId)
         .filter(Boolean))] as string[];
      const rooms = [...new Set(events.map(e => e.room)
         .filter(Boolean))] as string[];

      return {
         types,
         statuses,
         priorities,
         doctors,
         rooms
      };
   };

   // Get current view title
   const getViewTitle = () => {
      // const options: Intl.DateTimeFormatOptions = {
      // };

      switch (view) {
         case 'day':
            return currentDate.toLocaleDateString('es-ES', {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric'
            });
         case 'week':
            const weekStart = new Date(currentDate);
            weekStart.setDate(currentDate.getDate() - currentDate.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            return `${weekStart.toLocaleDateString('es-ES', {
               day: 'numeric',
               month: 'short'
            })} - ${weekEnd.toLocaleDateString('es-ES', {
               day: 'numeric',
               month: 'short',
               year: 'numeric'
            })}`;
         case 'month':
            return currentDate.toLocaleDateString('es-ES', {
               year: 'numeric',
               month: 'long'
            });
         default:
            return '';
      }
   };

   return {
      // State
      currentDate,
      view,
      events: viewEvents,
      allEvents: events,
      filters,
      isLoading,

      // Navigation
      goToToday,
      goToPrevious,
      goToNext,
      goToDate,
      setView,

      // Event management
      addEvent,
      updateEvent,
      deleteEvent,
      getEventById,
      getEventsForSpecificDate,

      // Filters
      updateFilters,
      clearFilters,
      getFilterOptions,

      // Utilities
      getViewTitle
   };
}
