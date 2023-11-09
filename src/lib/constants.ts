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
 inputValue: string | number;
 selectedYear: number;
 month: number;
 selectedDay: number;
}

export interface SaveButton {
 selectedMonth: string;
 selectedDay: number;
 selectedYear: number;
 totalFilteredOrders: number;
 inputValue: number | string;
 hasValueChanged: boolean;
}
