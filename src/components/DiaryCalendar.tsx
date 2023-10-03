import React, {useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';

interface Props {
  onDateClick: (date: DateData) => void;
}

const DiaryCalendar = ({onDateClick}: Props) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const onPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const onNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const dateString = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  return (
    <Calendar
      date={dateString}
      onDateChange={setCurrentDate}
      onPrevMonth={onPrevMonth}
      onNextMonth={onNextMonth}
      onDayPress={onDateClick}
    />
  );
};

export default DiaryCalendar;
