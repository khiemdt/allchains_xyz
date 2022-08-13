import { Moment } from "moment";

export const renderMonthText = (month: Moment) => month.format("MMMM - YYYY");
