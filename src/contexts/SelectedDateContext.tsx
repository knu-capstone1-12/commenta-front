import React, {createContext, useContext, ReactNode, useReducer} from 'react';

type SelectedDateType = {
  data: {
    selectedDate: Date;
  };
};

const SelectedDateContext = createContext<SelectedDateType | undefined>(
  undefined,
);

type SelectedDateActionType = {type: 'PREV_MONTH'} | {type: 'NEXT_MONTH'};
const SelectedDateDispatchContext = createContext<
  React.Dispatch<SelectedDateActionType> | undefined
>(undefined);

const selectedDateReducer = (
  state: SelectedDateType,
  action: SelectedDateActionType,
) => {
  switch (action.type) {
    case 'PREV_MONTH':
      return {
        ...state,
        data: {
          selectedDate: new Date(
            state.data.selectedDate.getFullYear(),
            state.data.selectedDate.getMonth() - 1,
            1,
          ),
        },
      };
    case 'NEXT_MONTH':
      return {
        ...state,
        data: {
          selectedDate: new Date(
            state.data.selectedDate.getFullYear(),
            state.data.selectedDate.getMonth() + 1,
            1,
          ),
        },
      };
    default:
      throw new Error(
        `Unhandled action type: ${(action as SelectedDateActionType).type}`,
      );
  }
};

type SelectedDateProviderProps = {
  children: ReactNode;
};

export const SelectedDateProvider = ({children}: SelectedDateProviderProps) => {
  const [state, dispatch] = useReducer(selectedDateReducer, {
    data: {selectedDate: new Date()},
  });

  return (
    <SelectedDateDispatchContext.Provider value={dispatch}>
      <SelectedDateContext.Provider value={state}>
        {children}
      </SelectedDateContext.Provider>
    </SelectedDateDispatchContext.Provider>
  );
};

export const useSelectedDate = () => {
  const context = useContext(SelectedDateContext);
  if (!context) {
    throw new Error(
      'SelectedDateContext must be used within SelectedDateProvider',
    );
  }
  return context;
};

export const useSelectedDateDispatch = () => {
  const context = useContext(SelectedDateDispatchContext);
  if (!context) {
    throw new Error(
      'SelectedDateDispatchContext must be used within SelectedDateProvider',
    );
  }
  return context;
};
