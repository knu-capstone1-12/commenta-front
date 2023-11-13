import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  formatDateToMonthYear,
  formatDateToNumber,
  getDaysOfMonth,
  weekDaysList,
} from 'util/dateUtil';
import LeftArrow from '../../asset/left-arrow.svg';
import RightArrow from '../../asset/right-arrow.svg';
import Diary from 'model/Diary';
import {useDatabase} from '@nozbe/watermelondb/hooks';
import {Q} from '@nozbe/watermelondb';
import {useIsFocused} from '@react-navigation/native';
import {
  useSelectedDate,
  useSelectedDateDispatch,
} from 'contexts/SelectedDateContext';

interface Props {
  onDateClick: (date: Date) => void;
}

const Calendar = ({onDateClick}: Props) => {
  const {
    data: {selectedDate},
  } = useSelectedDate();
  const dispatch = useSelectedDateDispatch();
  const [thisMonthDiaries, setThisMonthDiaries] = useState<Diary[]>([]);

  const database = useDatabase();
  const isFocused = useIsFocused();

  const fetchCurrentMonthDiaries = useCallback(async () => {
    const dayMonthStart = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
      0,
      0,
      0,
    );
    const dayMonthEnd = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
      0,
      0,
      0,
    );
    let diaries: Diary[] = [];
    try {
      diaries = await database
        .get<Diary>('diaries')
        .query(
          Q.and(
            Q.where('date', Q.gte(formatDateToNumber(dayMonthStart))),
            Q.where('date', Q.lte(formatDateToNumber(dayMonthEnd))),
          ),
        );
    } catch (e) {
      console.error('error fetching diary', e);
    }
    setThisMonthDiaries(diaries);
  }, [database, selectedDate]);

  useEffect(() => {
    const loadDiaries = async () => {
      await fetchCurrentMonthDiaries();
    };
    loadDiaries();
  }, [fetchCurrentMonthDiaries, isFocused]);

  const onPrevMonth = () => {
    dispatch({type: 'PREV_MONTH'});
  };

  const onNextMonth = () => {
    dispatch({type: 'NEXT_MONTH'});
  };

  const daysOfMonth = getDaysOfMonth(selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity key="prevButton" onPress={onPrevMonth}>
          <LeftArrow width={40} height={40} />
        </TouchableOpacity>
        <Text style={styles.yearAndMonth}>
          {formatDateToMonthYear(selectedDate)}
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
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(),
                          day,
                        ),
                      )
                    }>
                    <Text
                      style={[
                        styles.dayText,
                        thisMonthDiaries &&
                          thisMonthDiaries.some(
                            diary =>
                              diary.date ===
                              formatDateToNumber(
                                new Date(
                                  selectedDate.getFullYear(),
                                  selectedDate.getMonth(),
                                  day,
                                ),
                              ),
                          ) &&
                          styles.hasDiary,
                      ]}>
                      {day}
                    </Text>
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
  hasDiary: {
    color: '#FF0000',
  },
});

export default Calendar;
