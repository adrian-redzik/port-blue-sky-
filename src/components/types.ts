export enum PaymentType {
    BONUS = 'BONUS',
    SALARY = 'SALARY',
}

export interface DateData {
    type: PaymentType,
    date: string,
}
