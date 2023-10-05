import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  formatDateToMonthYear,
  getDaysOfMonth,
  weekDaysList,
} from 'util/dateUtil';
import LeftArrow from '../../asset/left-arrow.svg';
import RightArrow from '../../asset/right-arrow.svg';

interface Props {
  onDateClick: (date: Date) => void;
}

const Calendar = ({onDateClick}: Props) => {
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

  useEffect(() => {
    // 캘린더가 처음 렌더링될 때 현재 날짜로 설정합니다.
    setCurrentDate(new Date());
  }, []);

  const daysOfMonth = getDaysOfMonth(currentDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity key="prevButton" onPress={onPrevMonth}>
          <LeftArrow width={40} height={40} />
        </TouchableOpacity>
        <Text style={styles.yearAndMonth}>
          {formatDateToMonthYear(currentDate)}
        </Text>
        <TouchableOpacity key="nextButton" onPress={onNextMonth}>
          <RightArrow width={40} height={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekdaysContainer}>
        {weekDaysList.map((day, index) => (
          <Text key={index} style={styles.weekdayLabel}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.days}>
        {daysOfMonth.map((week, index) => (
          <View key={index} style={styles.week}>
            {week.map((day, weekindex) => (
              <View style={styles.day} key={weekindex}>
                {day && (
                  <TouchableOpacity
                    onPress={() =>
                      onDateClick(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day + 1,
                        ),
                      )
                    }>
                    <Text style={styles.dayText}>{day}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  header: {
    height: 24,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 30,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  prevButton: {
    width: 24,
    height: 24,
  },
  nextButton: {
    width: 24,
    height: 24,
  },
  days: {
    flexDirection: 'column',
  },
  week: {
    width: 360,
    height: 48,
    flexDirection: 'row',
  },
  day: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 360 / 7,
    height: 48,
  },
  dayText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
  },
  yearAndMonth: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

export default Calendar;
