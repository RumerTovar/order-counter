import { SetStateAction } from 'react';

export type Order = {
 id: number;
 number: number;
 user_id: number;
 order_date: Date;
};

export interface SupabaseResponse {
 data: Order[] | null;
 error: any;
}

export interface DataProps {
 inputValue: string;
 setInputValue: React.Dispatch<SetStateAction<string>>;
 selectedDate: string;
 setAllOrders: React.Dispatch<SetStateAction<Order[] | null>>;
 setHasValueChanged: React.Dispatch<SetStateAction<boolean>>;
}

export interface DateSelector {
 tabIndex: number;
 selectedDate: string;
 setSelectedDate: React.Dispatch<SetStateAction<string>>;
 setHasValueChanged: React.Dispatch<SetStateAction<boolean>>;
}

export interface OrderInput {
 inputValue: string;
 setInputValue: React.Dispatch<SetStateAction<string>>;
 setHasValueChanged: React.Dispatch<SetStateAction<boolean>>;
 filterOrders: ResultObject;
}

export interface SaveButton {
 filterOrders: ResultObject;
 hasValueChanged: boolean;
 inputValue: string;
 selectedDate: string;
 setAllOrders: React.Dispatch<SetStateAction<Order[] | null>>;
 setInputValue: React.Dispatch<SetStateAction<string>>;
 setHasValueChanged: React.Dispatch<SetStateAction<boolean>>;
}

export interface ResultObject {
 value: string;
 exist: boolean;
}
